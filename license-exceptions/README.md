<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# CNCF License Exceptions

This directory contains license exceptions approved by the CNCF Governing Board.

## Browse Exceptions

**[View the searchable exceptions database](https://exceptions.cncf.io/)**

The web interface allows you to:
- Search by package name
- Filter by license type, approval status, project, or year
- Sort by date, name, or project
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

Blanket exceptions apply to **all CNCF projects** and are tracked in the main exceptions database with `project: "All CNCF Projects"`.

### GPL Exceptions for In-Kernel eBPF Programs

By email vote concluded on August 31, 2023, the Governing Board approved a blanket exception for in-kernel eBPF programs licensed under:

- GPL-2.0-only
- GPL-2.0-or-later

This applies only to in-kernel eBPF programs, either standalone or dual-licensed with any [allowlist license](../policies-guidance/allowed-third-party-license-policy.md).

[Background documentation](https://docs.google.com/document/d/10CY8V1w8aQ6CrJ_US_Gnz8cx2SoOtOBqpUKX4cWl_4w/edit)

### Secure Path Resolution Libraries (November 2025)

By [GB decision in issue #1154](https://github.com/cncf/foundation/issues/1154), the following are approved for all CNCF projects:

- **libpathrs** (MPL-2.0 OR LGPL-3.0-or-later) - Projects using libpathrs statically linked MUST elect MPL-2.0
- **go-pathrs** (MPL-2.0) - Go bindings for libpathrs
- **cyphar/filepath-securejoin** (BSD-3-Clause AND MPL-2.0) - Secure path construction

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
  "project": "ProjectName",
  "scope": "build-time dependency, unmodified",
  "approvedDate": "2023-08-31",
  "results": "https://github.com/cncf/foundation/issues/123",
  "status": "approved",
  "comment": "Optional notes"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (format: `exc-YYYY-MM-DD-NNN`) |
| `package` | Yes | Package name or category |
| `license` | Yes | SPDX license identifier(s) |
| `status` | Yes | Approval status (see below) |
| `approvedDate` | Yes | Date of decision (YYYY-MM-DD) |
| `project` | No | Requesting CNCF project, or "All CNCF Projects" for blanket exceptions |
| `scope` | No | How the dependency is used (e.g., "build-time dependency, unmodified") |
| `results` | No | URL to GitHub issue or documentation |
| `comment` | No | Additional context or notes |

### Status Values

| Status | Description |
|--------|-------------|
| `approved` | Approved by Governing Board vote |
| `denied` | Denied by Governing Board (e.g., non-OSS license) |
| `allowlisted` | Meets allowlist criteria automatically |
| `apache-2.0` | Apache-2.0 licensed (no exception needed) |

### Blanket Exceptions

Blanket exceptions apply to all CNCF projects and have `project: "All CNCF Projects"`. Current blanket exceptions:
- **GPL for in-kernel eBPF programs** - GPL-2.0 licensed code for in-kernel eBPF programs
- **libpathrs / go-pathrs** - MPL-2.0 licensed secure path resolution libraries
- **cyphar/filepath-securejoin** - MPL-2.0 licensed secure path construction
