# Source Available Recommendations v1.0

Third Party Dependencies that have been Relicensed to Source Available, non-open source licenses

## Background

CNCF's IP policy is set forth in the [CNCF charter], section 11.

Under the IP policy, CNCF projects use Apache-2.0 for their code. The CNCF
Governing Board reviews and approves other non-Apache-2.0 licenses, for
code in the repositories or dependencies of CNCF projects, on an exception basis.

The CNCF Governing Board has previously adopted an [Allowlist License Policy]
that permits most permissively-licensed components to be automatically
approved as exceptions, when used in an unmodified manner provided certain other conditions are met. The CNCF Governing Board reviews components that are not automatically approved under the Allowlist License Policy, including those that are under copyleft-style licenses, and may approve exceptions to the IP policy to permit such components in particular circumstances.

In early 2021, CNCF projects discovered that some existing
dependencies they were using had been relicensed in subsequent releases by their licensors from
Apache-2.0 to the GNU Affero General Public License v3.0, [AGPL-3.0]. Following such changes, [CNCF published guidance and recommendations for the community regarding such dependencies](https://github.com/cncf/foundation/blob/main/agpl-recommendations.md).

Separately, other dependencies that were once available under Apache-2.0 or other permissive licenses have been relicensed such that, while being "source available", newer versions are no longer available under open source licenses. This document is intended to provide guidance to the CNCF community regarding such source available licenses.

## "Open Source" and "Source Available" licenses

"Open source" licenses, as such term is used by CNCF, refers to licenses that satisfy the [Open Source Definition] published by the [Open Source Initiative]. Among other things, open source licenses ensure that anyone has the right to use the software for any and all purposes, as well as modify and redistribute it freely, without use restrictions.

Speaking broadly, "source available" means that the source code is made available by the licensor, but a source available license does not necessarily grant the full set of rights and freedoms for use, modification, and distribution that are granted by open source licenses. For example, some source available licenses may prohibit the recipient of software from using it for commercial purposes, or in production environments, or may forbid certain types of people or companies from using or redistributing it. Other source available licenses may grant the full set of open source rights, but may impose conditions that are vague or effectively impossible to comply with. Often these licenses are used to make the source code available for evaluation or testing purposes only.

Because of these restrictions or limitations on rights, certain "source available" licenses do not qualify as “open source” under the [Open Source Definition], and are therefore unlikely to be approved by the CNCF Governing Board  for inclusion as dependencies for CNCF projects.

Where a third-party dependency was once available under Apache-2.0 or another license approved by the Governing Board on an exception basis or subject to the [Allowlist License Policy], but has changed to a "source available" non-open source license, this can present a problem for CNCF projects. In such cases, the license of the component they depend on was previously aligned with the CNCF project's own license, but is no longer aligned.

## Examples of "source available," non-open source licenses

The following are a few examples of licenses that CNCF understands to be "source available" but not open source. Please note that this is not an exhaustive list, and may include other versions of such licenses as well. Bracketed identifiers refer to [SPDX License List] identifiers, where applicable.

* Business Source License 1.1 (BUSL-1.1)
* Elastic License 2.0 (Elastic-2.0)
* Hippocratic License 2.1 (Hippocratic-2.1)
* licenses using the "Commons Clause" additional text
* Prosperity Public License 2.0.0
* Creative Commons "NonCommercial" and "NoDerivatives" variants

## Recommendations

There are a couple of approaches that CNCF projects should consider taking, for
dependencies that fall into this category.

### Switch to an alternative component

The project will likely want to evaluate alternative components with
similar functionality, and switch to one that is licensed under Apache-2.0 or an open source license under the [Allowlist License Policy].

### Freeze the component at the version prior to the license change

As a short-term solution, the project might consider freezing the version
of the component so that it is fixed at the last release prior to the
license change.

This is unlikely to be tenable as a long-term solution, particularly as
the prior release is presumably unlikely to continue receiving maintenance
updates, security fixes, etc.

In either case, while a project's maintainers may request a license exception from the CNCF Governing Board, it is _extremely_ unlikely that one will be granted for the use of a dependency under a source available, non-open source license.

[CNCF Charter]: https://github.com/cncf/foundation/blob/master/charter.md
[Allowlist License Policy]: https://github.com/cncf/foundation/blob/master/allowed-third-party-license-policy.md
[AGPL-3.0]: https://www.gnu.org/licenses/agpl-3.0.en.html
[Open Source Definition]: https://opensource.org/osd/
[Open Source Initiative]: https://opensource.org/
[SPDX License List]: https://spdx.org/licenses
