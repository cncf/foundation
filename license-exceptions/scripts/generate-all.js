#!/usr/bin/env node

/**
 * Generate all output formats from exceptions.json
 */

require('./generate-csv.js');
require('./generate-spdx.js');

console.log('\nAll formats generated successfully!');
