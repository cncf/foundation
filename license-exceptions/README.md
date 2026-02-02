<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# CNCF License Exceptions

This directory contains license exceptions approved by the CNCF Governing Board.

## Browse Exceptions

**[View the searchable exceptions database](https://cncf.github.io/foundation/license-exceptions/site/)**

The web interface allows you to:
- Search by package name
- Filter by license type, approval status, or year
- Sort by date or name
- Download data in JSON, CSV, or SPDX formats

## Data Files

| File | Description |
|------|-------------|
| `exceptions.json` | **Source of truth** - All exception data in structured JSON |
| `CNCF-licensing-exceptions.csv` | Generated CSV for spreadsheet tools |
| `cncf-exceptions-current.spdx` | Generated SPDX tag-value format |
| `schema/exception.schema.json` | JSON Schema for validation |

> **Note:** The CSV and SPDX files are auto-generated from `exceptions.json`. Edit only the JSON file.

## Blanket Exceptions

### GPL for in-kernel eBPF programs

By email vote concluded on August 31, 2023, the Governing Board approved a blanket exception for in-kernel eBPF programs licensed under:

- GPL-2.0-only
- GPL-2.0-or-later

This applies only to in-kernel eBPF programs, either standalone or dual-licensed with any [allowlist license](../policies-guidance/allowed-third-party-license-policy.md).

[Background documentation](https://docs.google.com/document/d/10CY8V1w8aQ6CrJ_US_Gnz8cx2SoOtOBqpUKX4cWl_4w/edit)

## Request an Exception

If your CNCF project needs to use a component with a non-allowlisted license, [submit an exception request](https://github.com/cncf/foundation/issues/new?template=license-exception-request.yaml).

See also:
- [CNCF Allowlist License Policy](../policies-guidance/allowed-third-party-license-policy.md)
- [CNCF Charter (IP Policy)](../charter.md#11-ip-policy)

## For Maintainers

### Updating Exception Data

1. Edit `exceptions.json` directly
2. Run `node scripts/generate-all.js` to update derived formats
3. Submit a PR

### Schema

All exception entries follow this structure:

```json
{
  "id": "exc-2023-08-31-001",
  "package": "github.com/example/package",
  "packageUrl": "https://github.com/example/package",
  "license": "MPL-2.0",
  "requestingProject": "ProjectName",
  "approvedDate": "2023-08-31",
  "issueUrl": "https://github.com/cncf/foundation/issues/123",
  "status": "approved",
  "comment": "Optional notes"
}
```

### Status Values

| Status | Description |
|--------|-------------|
| `approved` | Approved by Governing Board vote |
| `allowlisted` | Meets allowlist criteria automatically |
| `apache-2.0` | Apache-2.0 licensed (no exception needed) |
