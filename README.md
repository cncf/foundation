# ☁️♮🏛Cloud Native Computing Foundation Policy Repo

This repo contains several documents related to the operation of the [Cloud Native Computing Foundation](https://cncf.io).

## Governance

* The [charter](charter.md) under which CNCF operates
* [Maintainer election policy](policies-guidance/maintainers-election-policy.md) for the maintainer-elected TOC member and the two maintainers on the governing board
* The [membership](cncf-membership-agreement.pdf) agreement
* The [Code of Conduct](code-of-conduct.md) which has been translated into multiple languages

## Project Guidance

* [Copyright](copyright-notices.md) notice recommendations
* [Website guidelines](policies-guidance/website-guidelines.md) for mentioning companies while maintaining neutrality
* [Allowlist License Policy](policies-guidance/allowed-third-party-license-policy.md) for which licenses are acceptable in upstream dependencies without requiring an explicit vote of the governing board

## Community recommendations

* [CNCF Blog Guidelines](policies-guidance/blog-guidelines.md) outlining who can submit, suggested topics, and how to submit. 
* A [style guide](style-guide.md) with recommendations for cloud native terminology
* A [translation guide](translation.md) for the Chinese equivalent of cloud native phrases

## Other content

A lot of project, TAG, and TOC-related content is in the TOC [repo](https://github.com/cncf/toc#cncf-technical-oversight-committee-toc). [cncf.io](https://cncf.io) has information on all programs offered publicly by CNCF.

### Project maintainers

CNCF project maintainers are recorded in two files:

- [`project-maintainers-.project.csv`](project-maintainers-.project.csv) — the primary list. It is generated automatically for projects that manage their maintainers in their own `.project` repo. To change these maintainers, update `maintainers.yaml` in the project's `.project` repo; the change is picked up by automation. **Do not edit `project-maintainers-.project.csv` directly** — any manual edits are overwritten.
- [`project-maintainers.csv`](project-maintainers.csv) — a legacy list for the projects not yet onboarded to the `.project` process. An existing maintainer of one of these projects can update it by Pull Request, and should also email cncf-maintainer-changes@cncf.io (or raise a service desk ticket) so the project's CNCF-run maintainer mailing list is updated to match.

Access to the CNCF Service Desk and project maintainer mailing lists is controlled by the link between a maintainer's GitHub handle and their LFID, which can be updated at [openprofile.dev](https://openprofile.dev). The name and affiliation shown for a maintainer are also taken from their LFID.

Questions about maintainer records can be sent to cncf-maintainer-changes@cncf.io.

## How to request changes

You are welcome to file non-technical [issues](https://github.com/cncf/foundation/issues/new) related to [CNCF](https://cncf.io) on this repo.
