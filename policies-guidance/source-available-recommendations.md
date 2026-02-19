# Source Available Recommendations v1.2

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
Apache-2.0 to the GNU Affero General Public License v3.0, [AGPL-3.0]. Following such changes, [CNCF published guidance and recommendations for the community regarding such dependencies](https://github.com/cncf/foundation/blob/main/policies-guidance/agpl-recommendations.md).

Separately, other dependencies that were once available under Apache-2.0 or other permissive licenses have been relicensed such that, while being "source available", newer versions are no longer available under open source licenses. This document is intended to provide guidance to the CNCF community regarding such source available licenses.

## "Open Source" and "Source Available" licenses

"Open source" licenses, as such term is used by CNCF, refers to licenses that satisfy the [Open Source Definition] published by the [Open Source Initiative]. Among other things, open source licenses ensure that anyone has the right to use the software for any and all purposes, as well as modify and redistribute it freely, without use restrictions.

Speaking broadly, "source available" means that the source code is made available by the licensor, but a source available license does not necessarily grant the full set of rights and freedoms for use, modification, and distribution that are granted by open source licenses. For example, some source available licenses may prohibit the recipient of software from using it for commercial purposes, or in production environments, or may forbid certain types of people or companies from using or redistributing it. Other source available licenses may grant the full set of open source rights, but may impose conditions that are vague or effectively impossible to comply with. Often these licenses are used to make the source code available for evaluation or testing purposes only.

Because of these restrictions or limitations on rights, certain "source available" licenses do not qualify as “open source” under the [Open Source Definition], and are therefore unlikely to be approved by the CNCF Governing Board for inclusion as dependencies for CNCF projects.

Where a third-party dependency was once available under Apache-2.0 or another license approved by the Governing Board on an exception basis or subject to the [Allowlist License Policy], but has changed to a "source available" non-open source license, this can present a problem for CNCF projects. In such cases, the license of the component they depend on was previously aligned with the CNCF project's own license, but is no longer aligned.

## Examples of "source available," non-open source licenses

The following are a few examples of licenses that CNCF understands to be "source available" but not open source. Please note that this is not an exhaustive list, and may include other versions of such licenses as well. Bracketed identifiers refer to [SPDX License List] identifiers, where applicable.

* Business Source License 1.1 (BUSL-1.1)
  - BUSL-1.1 includes several custom fields to be determined by the licensor, so its restrictions and requirements will likely differ among products.
* Elastic License 2.0 (Elastic-2.0)
* Hippocratic License 2.1 (Hippocratic-2.1)
* licenses using the "Commons Clause" additional text
* Prosperity Public License 2.0.0
* Creative Commons "NonCommercial" and "NoDerivatives" variants

## Recommendations

There are a few approaches that CNCF projects should consider taking, for
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

### Fork and maintain

Finally, the project might decide to take on the responsibility for maintaining its own fork of the open source version of the component, typically based on the final release prior to the change to a source available license.

Please see [below](#considerations-for-forking-and-maintaining) for details to consider if the community desires to take this approach.

### Exception requests

Source-available or non-open source licenses, and use by CNCF projects of dependencies distributed under such licenses, are not eligible for approval under the [CNCF IP Policy] on an exception basis. However, certain technical interactions between a CNCF project and such packages may be permitted. For guidance on permissible interaction types, please see
[Guidance for Interactions between CNCF Project Code and Closed Source / Source-Available Products]

## Considerations for Forking and Maintaining

A decision to fork and maintain a pre-existing independent project is typically not a small undertaking. Below are some of the considerations that a CNCF project would likely want to take into account when going this route. In any case, please reach out early to CNCF staff via the [CNCF Service Desk] to discuss details if you are considering this approach.

### Governance and IP policy formalities

The forked project’s ongoing maintenance could potentially be managed (1) within CNCF; (2) within a [separate open collaboration project under the Linux Foundation](https://www.linuxfoundation.org/projects); or (3) as part of a fully-separate community effort.

If the fork would be part of the existing CNCF project which uses it, then it would need to comply with the IP policy from the [CNCF Charter] and be recorded as a sub-project subject to the CNCF project's existing governance processes. Similarly, if it would be set up as its own CNCF project, it would also be subject to CNCF’s standard processes for onboarding new projects; [initiating an application to join the CNCF](https://github.com/cncf/toc/tree/main/process).

If the maintained fork would be a new project under the Linux Foundation, then it would likely need to be set up with its own governance structure and charter as with other LF-supported projects.

Or, if it would be maintained via a separate community effort (as a standalone project or part of another open source foundation), then the CNCF project may want to review and confirm that its future licensing structure will align with the IP policy from the [CNCF Charter].

### Comply with existing license requirements

A fork is built upon the pre-existing third party project, and therefore needs to comply with all requirements of the pre-existing license(s).

Open source license compliance is beyond the scope of this guidance document. However, as specific points (and as with any inclusion of a third party’s content), note that [all existing copyright and license notices should generally be retained without modification](https://github.com/cncf/foundation/blob/main/copyright-notices.md#dont-change-someone-elses-notice-without-their-permission).

### Trademark changes

It will typically be necessary to change the name of the forked project. The licensor will typically continue to use the old project names and logos in reference to the newly source-available project, and the fork would need to find a different name and logo, if applicable, for future diverging developments.

As described [above](#comply-with-existing-license-requirements), trademarks referencing the original project can and should be retained where used in _pre-existing copyright notices_. And it will generally be acceptable to use a project’s name in _unstylized_ form solely for purposes of accurately describing the nature of the fork’s relationship to the original project (e.g., something like “Our project Frobozz is derived from Foo, and is forked from its final open source release. Foo is a trademark of FooBar, Inc.”).

Please contact CNCF staff in advance via the [CNCF Service Desk] to discuss details for how to handle these changes.

### Future developments

For any collaborative open source development effort, proper attention to license compliance and provenance of contributions is an important part of project governance. When a development effort is building on top of a forked version of a non-participating licensor, compliance and provenance become especially crucial.

Ultimately, a project’s formal contribution mechanisms -- such as Developer Certificate of Origin (DCO) sign-offs or Contributor License Agreements (CLAs) -- spell out the commitments that a contributor makes to the project and the community. A forked project may decide to establish additional processes to assist with demonstrating the community’s commitment to appropriate and transparent development.

Here are a few guidelines and recommendations that a forked project will want to consider:

**Do not’s**:

* **Do not** copy any PRs, code or other content from the post-fork upstream source, where such content is published under the new non-open source license.
  - It may be appropriate to e.g. read release notes and develop similar functionality, as long as such developments are done fully independently of the post-fork upstream project.
* **Do not** remove or modify pre-existing license texts or copyright notices unless you are certain that they no longer apply (e.g., if a file no longer contains _any_ content that is arguably subject to that notice).

**Do’s**:

* **Do** talk to CNCF staff early and often during this process! Start by reaching out via the [CNCF Service Desk].
* **Do** consider requiring contributors to document provenance details, such as explicitly marking within the repo:
  - any content not originally written by the contributor, together with a pointer to its original source and license terms
  - any content copied from one file within the codebase to another
* **Do** require, as applicable, DCO sign-offs and/or authorization under signed CLAs for all contributions.
  - Appropriate tooling can and should be used to help with ensuring that _all_ contributions are subject to the applicable sign-offs.
* **Do** consider establishing a process for reviewing pull requests to confirm they are not similar to the post-fork upstream source.
  - Depending on whether it is feasible given the project's size and the number of maintainers, a maintainer or reviewer who reviews a questionable pull request can subsequently limit their development in that area of the codebase to minimize this risk that their exposure to post-fork upstream code could influence their future contributions.

[CNCF Charter]: https://github.com/cncf/foundation/blob/main/charter.md
[CNCF IP Policy]: https://github.com/cncf/foundation/blob/main/charter.md](https://github.com/cncf/foundation/blob/main/charter.md#11-ip-policy
[CNCF Service Desk]: https://cncfservicedesk.atlassian.net/servicedesk/customer/portal/1/group/1/create/14
[Allowlist License Policy]: https://github.com/cncf/foundation/blob/main/policies-guidance/allowed-third-party-license-policy.md
[AGPL-3.0]: https://www.gnu.org/licenses/agpl-3.0.en.html
[Open Source Definition]: https://opensource.org/osd/
[Open Source Initiative]: https://opensource.org/
[SPDX License List]: https://spdx.org/licenses
[Guidance for Interactions between CNCF Project Code and Closed Source / Source-Available Products]: https://github.com/cncf/foundation/blob/main/policies-guidance/proprietary-interactions-guidance.md
