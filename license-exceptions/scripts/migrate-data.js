#!/usr/bin/env node

/**
 * Migration script for CNCF License Exceptions
 * 
 * This script consolidates data from:
 * - CNCF-licensing-exceptions.csv (primary source)
 * - cncf-exceptions-*.json files (supplementary sources)
 * 
 * Into the new unified exceptions.json format
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(DATA_DIR, 'exceptions.json');

/**
 * Parse CSV line handling quoted fields with commas
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
}

/**
 * Parse the CSV file
 */
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Skip header row
  const entries = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length >= 4 && fields[0]) {
      entries.push({
        package: fields[0],
        license: fields[1],
        comment: fields[2],
        datePublished: fields[3]
      });
    }
  }
  
  return entries;
}

/**
 * Parse JSON exception files (handles different formats)
 */
function parseJSONFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  // Handle SPDX format (like the 2021-07-19 file)
  if (data.packages) {
    return data.packages.map(pkg => ({
      package: pkg.name,
      license: pkg.licenseConcluded,
      comment: pkg.comment || ''
    }));
  }
  
  // Handle array format
  if (Array.isArray(data)) {
    return data.map(entry => ({
      package: entry.package,
      license: entry.license ? entry.license.trim() : '',
      comment: entry.comment || ''
    }));
  }
  
  return [];
}

/**
 * Extract approval date from comment
 * Pattern: "approved by GB exception YYYY-MM-DD"
 */
function extractApprovalDate(comment, fallbackDate) {
  if (!comment) return fallbackDate;
  
  // Match YYYY-MM-DD pattern (also handles typos like 20212-04-12)
  const match = comment.match(/approved by GB exception (\d{4,5}-\d{2}-\d{2})/);
  if (match) {
    let date = match[1];
    // Fix common typo: 20212 -> 2022
    if (date.startsWith('20212')) {
      date = date.replace('20212', '2022');
    }
    return date;
  }
  
  return fallbackDate;
}

/**
 * Determine status from comment
 */
function determineStatus(comment) {
  if (!comment) return 'approved';
  
  const lowerComment = comment.toLowerCase();
  
  if (lowerComment.includes('allowlisted') && !lowerComment.includes('not auto-allowlist')) {
    return 'allowlisted';
  }
  
  if (lowerComment.includes('apache-2.0, no approval needed') || 
      lowerComment.includes('apache-2.0,no approval needed')) {
    return 'apache-2.0';
  }
  
  return 'approved';
}

/**
 * Generate unique ID for an exception
 */
function generateId(date, index) {
  return `exc-${date}-${String(index).padStart(3, '0')}`;
}

/**
 * Main migration function
 */
function migrate() {
  console.log('Starting migration...\n');
  
  const stats = {
    csvEntries: 0,
    jsonEntries: 0,
    totalUnique: 0,
    byStatus: {
      approved: 0,
      allowlisted: 0,
      'apache-2.0': 0
    },
    duplicates: 0
  };
  
  // Map to store unique entries by package name (CSV is primary)
  const packageMap = new Map();
  
  // 1. Parse CSV file (primary source)
  const csvPath = path.join(DATA_DIR, 'CNCF-licensing-exceptions.csv');
  console.log(`Parsing CSV: ${csvPath}`);
  const csvEntries = parseCSV(csvPath);
  stats.csvEntries = csvEntries.length;
  console.log(`  Found ${csvEntries.length} entries in CSV\n`);
  
  for (const entry of csvEntries) {
    const key = entry.package.toLowerCase();
    if (!packageMap.has(key)) {
      packageMap.set(key, {
        package: entry.package,
        license: entry.license,
        comment: entry.comment,
        approvedDate: extractApprovalDate(entry.comment, entry.datePublished),
        status: determineStatus(entry.comment),
        source: 'csv'
      });
    }
  }
  
  // 2. Parse JSON files (supplementary)
  const jsonFiles = fs.readdirSync(DATA_DIR)
    .filter(f => f.startsWith('cncf-exceptions-') && f.endsWith('.json'))
    .sort();
  
  console.log(`Processing ${jsonFiles.length} JSON files:`);
  
  for (const jsonFile of jsonFiles) {
    const filePath = path.join(DATA_DIR, jsonFile);
    console.log(`  Parsing: ${jsonFile}`);
    
    // Extract date from filename
    const fileDate = jsonFile.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || '2019-11-01';
    
    try {
      const entries = parseJSONFile(filePath);
      stats.jsonEntries += entries.length;
      console.log(`    Found ${entries.length} entries`);
      
      let newFromFile = 0;
      for (const entry of entries) {
        const key = entry.package.toLowerCase();
        if (!packageMap.has(key)) {
          packageMap.set(key, {
            package: entry.package,
            license: entry.license,
            comment: entry.comment,
            approvedDate: extractApprovalDate(entry.comment, fileDate),
            status: determineStatus(entry.comment),
            source: jsonFile
          });
          newFromFile++;
        }
      }
      console.log(`    New unique entries: ${newFromFile}`);
    } catch (err) {
      console.error(`    Error parsing ${jsonFile}: ${err.message}`);
    }
  }
  
  // Calculate duplicates
  stats.duplicates = stats.csvEntries + stats.jsonEntries - packageMap.size;
  stats.totalUnique = packageMap.size;
  
  console.log(`\nDeduplication: ${stats.csvEntries + stats.jsonEntries} total -> ${stats.totalUnique} unique (${stats.duplicates} duplicates removed)\n`);
  
  // 3. Convert to exceptions array
  const exceptions = [];
  const entriesByDate = new Map();
  
  for (const entry of packageMap.values()) {
    const date = entry.approvedDate || '2019-11-01';
    if (!entriesByDate.has(date)) {
      entriesByDate.set(date, []);
    }
    entriesByDate.get(date).push(entry);
    stats.byStatus[entry.status]++;
  }
  
  // Sort dates descending (newest first)
  const sortedDates = Array.from(entriesByDate.keys()).sort().reverse();
  
  // Generate IDs and build final array
  for (const date of sortedDates) {
    const dateEntries = entriesByDate.get(date);
    // Sort alphabetically by package name within each date
    dateEntries.sort((a, b) => a.package.localeCompare(b.package));
    
    for (let i = 0; i < dateEntries.length; i++) {
      const entry = dateEntries[i];
      exceptions.push({
        id: generateId(date, i + 1),
        package: entry.package,
        license: entry.license,
        approvedDate: date,
        status: entry.status,
        comment: entry.comment || undefined
      });
    }
  }
  
  // 4. Create blanket exceptions
  const blanketExceptions = [
    {
      id: 'blanket-ebpf-gpl',
      name: 'GPL for in-kernel eBPF programs',
      description: 'GPL-2.0 licensed code is permitted for in-kernel eBPF programs only, as this is required by the Linux kernel BPF subsystem.',
      licenses: ['GPL-2.0-only', 'GPL-2.0-or-later'],
      scope: 'in-kernel eBPF programs only',
      approvedDate: '2023-08-31',
      documentUrl: 'https://github.com/cncf/foundation/blob/main/license-exceptions/README.md'
    }
  ];
  
  // 5. Build output structure
  const output = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString().split('T')[0],
    blanketExceptions,
    exceptions
  };
  
  // 6. Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + '\n');
  console.log(`Output written to: ${OUTPUT_FILE}`);
  
  // 7. Print summary
  console.log('\n=== Migration Summary ===');
  console.log(`CSV entries processed:     ${stats.csvEntries}`);
  console.log(`JSON entries processed:    ${stats.jsonEntries}`);
  console.log(`Duplicates removed:        ${stats.duplicates}`);
  console.log(`Total unique exceptions:   ${stats.totalUnique}`);
  console.log(`Blanket exceptions:        ${blanketExceptions.length}`);
  console.log('\nBy status:');
  console.log(`  approved:     ${stats.byStatus.approved}`);
  console.log(`  allowlisted:  ${stats.byStatus.allowlisted}`);
  console.log(`  apache-2.0:   ${stats.byStatus['apache-2.0']}`);
  
  // Count unique dates
  const uniqueDates = new Set(exceptions.map(e => e.approvedDate));
  console.log(`\nUnique approval dates: ${uniqueDates.size}`);
  console.log('Date range:', [...uniqueDates].sort().join(', '));
  
  return stats;
}

// Run migration
try {
  migrate();
  process.exit(0);
} catch (err) {
  console.error('Migration failed:', err);
  process.exit(1);
}
