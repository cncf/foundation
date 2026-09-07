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

### Consuming the Data

Programmatic consumers should fetch from the published site, which is rebuilt from `exceptions.json` on every merge to `main`:

| Format | URL |
|--------|-----|
| JSON | <https://exceptions.cncf.io/exceptions.json> |
| CSV | <https://exceptions.cncf.io/CNCF-licensing-exceptions.csv> |
| SPDX | <https://exceptions.cncf.io/cncf-exceptions-current.spdx> |

Do not link to `raw.githubusercontent.com` paths under `site/`; those are build artifacts and are not kept current.

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

### Recording a decision (staff)

Once the Governing Board has voted on a request, staff record the outcome directly on the request issue. No hand-editing of `exceptions.json` is needed for the normal flow.

1. Apply exactly one decision label to the request issue:
   - `license-exception/approved`
   - `license-exception/denied`
   - `license-exception/not-eligible`
2. The `license-exception-decision.yml` workflow runs on the label event. It parses the issue's component table (5 columns: Component | Upstream URL | Project Usage URL | License(s) | Purpose) and writes one entry per row to `exceptions.json`:
   - `status` = the label suffix (`approved`, `denied`, or `not-eligible`)
   - `approvedDate` = the issue's close date if the issue is already closed, otherwise the date the label was applied. This is the date of the decision, regardless of outcome.
   - `issueUrl` = the URL of the request issue; `results` = the same URL
   - `scope` = the Purpose column, with ` (used at: <Project Usage URL>)` appended when a usage URL is given
   - `id` = `exc-<date>-NNN`, continuing from any existing ids for that date
3. The workflow regenerates the CSV and SPDX files and opens a signed-off PR assigned to @joannalee333, titled "Record license exception decision (<status>) for <project> (#<issue>)", with `Closes #<issue>` in the body. It also comments on the issue with a link to the PR.
4. The PR is **not** auto-merged. A maintainer reviews and merges it. Once merged, Netlify redeploys [exceptions.cncf.io](https://exceptions.cncf.io/) from `main` and the decision appears on the site.

If the run fails (red workflow run plus a comment on the issue), no valid table rows were found. Fix the component table in the issue body (valid markdown, one component per row, Component and License(s) filled in), then remove and re-apply the decision label to trigger a fresh run.

When an issue with the `licensing` label is opened or edited, the triage workflow adds `needs-review`, adds `possible-duplicate` if a component already exists in the database, and posts or updates a single "Automated Triage Summary" comment.

For backfills and historical corrections, the manual-edit path below remains available.

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
  "issueUrl": "https://github.com/cncf/foundation/issues/123",
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
| `approvedDate` | Yes (by convention) | Date of the decision (YYYY-MM-DD), regardless of outcome. Not required by the schema, but every recorded entry is expected to have one. For `denied` and `not-eligible` rows it is the date the decision was made, not an approval. |
| `project` | No | Requesting CNCF project, or "All CNCF Projects" for blanket exceptions |
| `scope` | No | How the dependency is used (e.g., "build-time dependency, unmodified") |
| `issueUrl` | No | URL of the request issue where the exception was applied for |
| `results` | No | URL to the decision documentation. Historically a Google Doc or the request issue; newer entries point at the request issue |
| `comment` | No | Additional context or notes |

### Status Values

| Status | Description |
|--------|-------------|
| `approved` | Approved by Governing Board vote |
| `denied` | Denied by Governing Board (e.g., non-OSS license) |
| `not-eligible` | Not eligible for the exception process (e.g., proposed use is inconsistent with the CNCF IP Policy) |
| `allowlisted` | Meets allowlist criteria automatically |
| `apache-2.0` | Apache-2.0 licensed (no exception needed) |

### Blanket Exceptions

Blanket exceptions apply to all CNCF projects and have `project: "All CNCF Projects"`. Current blanket exceptions:
- **GPL for in-kernel eBPF programs** - GPL-2.0 licensed code for in-kernel eBPF programs
- **libpathrs / go-pathrs** - MPL-2.0 licensed secure path resolution libraries
- **cyphar/filepath-securejoin** - MPL-2.0 licensed secure path construction
