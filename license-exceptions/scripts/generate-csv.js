#!/usr/bin/env node

/**
 * Generate CSV format from exceptions.json
 * Output: CNCF-licensing-exceptions.csv
 */

const fs = require('fs');
const path = require('path');

const EXCEPTIONS_FILE = path.join(__dirname, '..', 'exceptions.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'CNCF-licensing-exceptions.csv');

/**
 * Escape a field for CSV format
 * - Wrap in quotes if contains comma, quote, or newline
 * - Double any existing quotes
 */
function escapeCSVField(field) {
  if (field === null || field === undefined) {
    return '';
  }
  const str = String(field);
  // Check if field needs quoting
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    // Escape quotes by doubling them
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * Format a date for CSV (keeping YYYY-MM-DD format)
 */
function formatDate(dateStr) {
  return dateStr || '';
}

function main() {
  // Read exceptions.json
  const data = JSON.parse(fs.readFileSync(EXCEPTIONS_FILE, 'utf8'));
  const { lastUpdated, exceptions } = data;

  // Build CSV content
  const lines = [];

  // Header row - note "Last updated" column includes the date in the header
  const header = [
    'Package Name',
    'License Concluded',
    'Comments',
    'Date Published',
    `Last updated: ${lastUpdated}`
  ];
  lines.push(header.map(escapeCSVField).join(','));

  // Data rows
  for (const exc of exceptions) {
    const row = [
      exc.package,
      exc.license,
      exc.comment || '',
      formatDate(exc.approvedDate),
      '' // Last updated column is empty for data rows
    ];
    lines.push(row.map(escapeCSVField).join(','));
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, lines.join('\n') + '\n');
  console.log(`Generated ${OUTPUT_FILE}`);
  console.log(`  - ${exceptions.length} exceptions`);
  console.log(`  - Last updated: ${lastUpdated}`);
}

main();
