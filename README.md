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

- [`project-maintainers-.project.csv`](project-maintainers-.project.csv) — the generated active roster for projects using `.project`. To change the roster, update `maintainers.yaml` in the project's own `.project` repository and follow its documented review process. Single-project repositories keep the file at the root; multi-project repositories use `org.yaml` and a project directory. **Do not edit this generated CSV directly.**
- [`project-maintainers.csv`](project-maintainers.csv) — the legacy list for projects not yet using `.project`. Existing maintainers of those projects can update the list by pull request and should email cncf-maintainer-changes@cncf.io (or raise a Service Desk ticket) so CNCF mailing-list access can be updated.

Access to the CNCF Service Desk and project maintainer mailing lists is controlled by the link between a maintainer's GitHub handle and their LFID, which can be updated at [openprofile.dev](https://openprofile.dev). The name and affiliation shown in this generated list are also taken from the LFID profile.

Keep these records in sync: update maintainer membership in the project's `.project/maintainers.yaml`, keep each maintainer's name, primary email, and current affiliation accurate in their LFID profile, and ensure current affiliations are shown in the project's public maintainer or governance documentation. The `.project/maintainers.yaml` file records GitHub handles and teams; changing it does not update LFID or project documentation, and updating a profile does not update the project repository.

Questions about maintainer records can be sent to cncf-maintainer-changes@cncf.io.

## How to request changes

You are welcome to file non-technical [issues](https://github.com/cncf/foundation/issues/new) related to [CNCF](https://cncf.io) on this repo.
