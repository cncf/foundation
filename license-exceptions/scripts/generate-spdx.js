#!/usr/bin/env node

/**
 * Generate SPDX tag-value format from exceptions.json
 * Output: cncf-exceptions-current.spdx
 */

const fs = require('fs');
const path = require('path');

const EXCEPTIONS_FILE = path.join(__dirname, '..', 'exceptions.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'cncf-exceptions-current.spdx');

/**
 * Strip common prefixes from package names for SPDX format
 */
function stripPackagePrefix(packageName) {
  return packageName
    .replace(/^github\.com\//, '')
    .replace(/^golang\.org\//, '');
}

/**
 * Generate ISO timestamp for Created field
 */
function getISOTimestamp() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function main() {
  // Read exceptions.json
  const data = JSON.parse(fs.readFileSync(EXCEPTIONS_FILE, 'utf8'));
  const { lastUpdated, exceptions } = data;

  const lines = [];

  // Document header
  lines.push('SPDXVersion: SPDX-2.1');
  lines.push('DataLicense: CC0-1.0');
  lines.push('SPDXID: SPDXRef-DOCUMENT');
  lines.push(`DocumentName: cncf-exceptions-${lastUpdated}`);
  lines.push(`DocumentNamespace: https://github.com/cncf/foundation/license-exceptions-${lastUpdated}`);
  lines.push('Creator: Organization: CNCF');
  lines.push(`Created: ${getISOTimestamp()}`);
  lines.push('');

  // Package entries
  let packageNum = 1;
  for (const exc of exceptions) {
    const strippedName = stripPackagePrefix(exc.package);
    const comment = exc.comment || `approved ${exc.approvedDate}`;

    lines.push(`##### Package: ${strippedName}`);
    lines.push('');
    lines.push(`PackageName: ${strippedName}`);
    lines.push(`SPDXID: SPDXRef-Package${packageNum}`);
    lines.push('PackageDownloadLocation: NOASSERTION');
    lines.push('FilesAnalyzed: false');
    lines.push(`PackageLicenseConcluded: ${exc.license}`);
    lines.push('PackageLicenseDeclared: NOASSERTION');
    lines.push('PackageCopyrightText: NOASSERTION');
    lines.push(`PackageComment: ${comment}`);
    lines.push('');

    packageNum++;
  }

  // Write output
  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'));
  console.log(`Generated ${OUTPUT_FILE}`);
  console.log(`  - ${exceptions.length} packages`);
  console.log(`  - Document name: cncf-exceptions-${lastUpdated}`);
}

main();
