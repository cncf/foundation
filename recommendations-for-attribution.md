# CNCF Recommendations for Attribution Notices

All CNCF projects make use of third-party components in some form. These components may include dependencies that are under open source licenses that differ from CNCF’s required license of Apache-2.0. Even for those that are under Apache-2.0, it is important to retain applicable copyright notices as part of redistributing third-party components. See our guidance on [Copyright Notices for Third Party Code](https://github.com/cncf/foundation/blob/main/copyright-notices.md#what-about-third-party-code) for more information.  

Most open source licenses require that a redistribution should retain the applicable license text and copyright notices. Some open source licenses include additional obligations (such as the provision of source code for “copyleft”-style licenses). This guidance document focuses on the “attribution”-related provisions of open source licenses for third-party dependencies that are distributed as a part of CNCF projects. 

This guidance document does not cover other topics, such as considerations for copyright notice formats and policies for non-Apache-2.0 licenses. Related topics are covered in other guidance documents in the cncf/foundation repo.

Please note that CNCF cannot provide legal advice to third parties, including its members and contributors. This guidance document does not purport to provide legal advice for matters such as their own redistribution of software, or to advise on compliance with open source licenses. Rather, it is intended to provide general recommendations for retention of license and copyright notices for CNCF projects’ own distribution of third-party dependencies. For any legal advice or related questions about your or your company’s specific use case, please contact your own legal counsel.

## Scope and Nature of Dependencies

Open source dependencies may be utilized by CNCF projects in a variety of contexts. These may include the following, among others:

1. **Incorporated code**: portions of code that are taken from a third-party software component and incorporated directly into a CNCF project’s own source code 
2. **Vendored component**: a component whose code is incorporated, _unmodified_, into a folder specifically intended for third-party dependencies, often with a name such as `vendor/`, `third_party/`, `node_modules/` (for NPM dependencies), etc.
3. **Build-time dependency**: a component whose code is not incorporated into the CNCF project itself, but is instead obtained from an upstream source _at build time_ and incorporated into the built artifacts
4. **Build and test tooling**: a component which is used in the course of building and testing the CNCF project code, but which is _not_ incorporated in any form into the built artifacts
5. **Install-time dependency**: a component whose code is not incorporated into the CNCF project itself, but is instead obtained from an upstream source _when the user installs the built artifacts_
6. **Required upstream dependencies**: a component which is required to be present on the user’s system in order to run the built artifacts, but which is not itself distributed by CNCF.

Of these, the guidance below focuses on use cases 1 (Incorporated code), 2 (Vendored component) and 3 (Build-time dependency). 

For use case 4, because the CNCF project is not distributing build and test tooling as described above, notice and attribution requirements typically will not apply.

Similarly, guidance is not provided for use cases 5 and 6 (install-time dependency and required upstream dependencies), because for these use cases, providing notice and attribution is the responsibility of the user or adopter at the time they acquire and use the third party code, rather than the responsibility of the CNCF project or its contributors, who are not distributing these dependencies.

## Use case 1: Incorporated Code

When a portion of code is taken from a third-party software component and incorporated directly into a CNCF project’s source code, special care should be taken to ensure that license information and copyright notices are retained appropriately.

As a general matter, it is often easier to retain license information and copyright notices if a third-party component is “vendored” (see “Use case 2” below) rather than incorporated as snippets or portions of code.

However, where it is necessary to incorporate portions of code directly into project code, the following steps can be taken to help preserve license information and copyright notices:

* **Identify the applicable notices**: Review the third-party code to find the applicable copyright notice(s) and license text(s) for the portion of code being copied. These may be located in the source code file itself, or potentially elsewhere in the repository (such as README, LICENSE or NOTICE files).
* **Insert the notices into the source file**: In each file where the code is inserted, also include the following:
  - the applicable copyright notice(s), reproduced exactly as received
  - a statement that portions of the code are subject to the applicable license(s) and are under the applicable copyright notice(s).
    - For example: _Portions of this file are used pursuant to the XYZ license, and are Copyright (c) 2019 Casey Developer and FrobozzCo, Inc._
  - Although generally not required by most open source licenses, consider also including in comments a URL or other pointer to the component from which the third-party code originated, so that recipients can trace it back to the original source if desired.
* **Handle different licenses**: If the license differs from Apache-2.0, then also do the following:
  - **Add or update the SPDX identifier**: If the CNCF project uses [SPDX license identifiers](https://spdx.dev/ids), then update the license expression in the applicable source code file to reflect the added content.
    - For example, for a CNCF source code file under Apache-2.0 to which code is added from an MIT third-party project, the identifier would be: `SPDX-License-Identifier: Apache-2.0 AND MIT`
    - License identifiers can be found on the [SPDX License List](https://spdx.org/licenses).
    - If an applicable license is not included on the SPDX License List, a `LicenseRef-` custom license identifier can also be used (e.g. `LicenseRef-Custom-License`); see [Annex D](https://spdx.github.io/spdx-spec/v2.3/SPDX-license-expressions/) and [Annex E](https://spdx.github.io/spdx-spec/v2.3/using-SPDX-short-identifiers-in-source-files/) of the SPDX specification for more details.
  - **Include the license text**: either in comments in the same file or else in a “LICENSES/” or similar directory, include the full text of the license from the third-party repository. Also include a statement indicating the code to which this license applies.

## Use case 2: Vendored component

When a vendored component is included in _unmodified_ form in a CNCF project repository, retaining license and copyright notices is easier: the vendored component’s own code should already include the applicable information.

You should still review the directory containing the vendored component, to confirm that any copyright notices and license texts from the third-party repository are correctly carried over into the CNCF project repo.

Additionally, in some cases a third-party component may include just a reference to a license (for example, a statement like “License: MIT”) but not an actual copy of the license text itself. In such a case, it may be desirable to include a copy of the license text corresponding to the identifier, even if the upstream component did not include the license text.

## Use case 3: Build-time dependency

If a CNCF project provides compiled binaries or other build executable versions of the project code, then in many cases it will incorporate into the binary some components whose code is not present in the CNCF source code repo, but is instead obtained from an upstream source _at build time_ and incorporated into the built artifacts.

In this case, it is necessary that the redistributed version of the built artifacts also comply with the attribution requirements contained in the licenses for those redistributed dependencies.

In some cases, the language or packaging ecosystem may automatically result in the built artifacts containing the complete source code of those dependencies, including copyright notices and license texts. For these situations, the license attribution requirements may automatically be handled where that source code and relevant notices are included as a part of the built artifacts.

Where these notices are not automatically retained, the project community may need to take additional steps to ensure that they are incorporated into the built artifacts. License scanning tools may be useful in obtaining these notices, or (particularly for projects with a small number of such dependencies) the project may take manual steps to collect and maintain these notices within the project’s own documentation.

In either case, the project may want to establish a checkpoint (such as an additional criteria as part of a release checklist) to confirm that it has included any necessary copyright notices and license texts together with any built artifacts that contain build-time dependencies, together with any such notices from use cases 1 and 2 above.

## Additional considerations

### Apache-2.0 and NOTICE files

Section 4(d) of [the Apache-2.0 license](https://www.apache.org/licenses/LICENSE-2.0) includes specific language relating to NOTICE files:

> d. If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. . . .

Because of this, when a project redistributes part or all of a third-party component that is licensed under Apache-2.0, it is also important to review any text file called NOTICE within that component’s source code. If there is a NOTICE file, and the notices within it relate to the portion of the component that is being redistributed, then the contents of the NOTICE file must also be reproduced in one of the ways described in Section 4(d).

As a side note: for the project’s own code, the project community may want to consider _not_ adding NOTICE files for code that has originated within the project itself, if the project does not already have one. Because of Section 4(d), the presence of a NOTICE file imposes an additional compliance requirement on downstream users of the project code. While it is necessary to comply with Section 4(d) with regards to any third-party components’ NOTICE files, the project contributors may likely want to avoid adding them unnecessarily in order to minimize the downstream compliance requirements for their own project community.

### REUSE Software

This document provides general guidance about attribution notices, such as the need to include applicable license text in the repository. However, it does not specify a mandated location or format for where and how those notices are required to appear.

The [REUSE Software specification](https://reuse.software/spec/) from the [Free Software Foundation Europe (FSFE)](https://fsfe.org/) provides one proposed format for including this information in a machine-readable form, which extends the use of SPDX short-form license identifiers and file tags.

Some parts of the REUSE Software specification are likely more extensive than CNCF projects will want to follow (such as mandated copyright notice tags in each file). However, the recommendation for a top-level `LICENSES/` directory containing the text of each non-Apache-2.0 license may be beneficial for the project to consider. See also the [Linux kernel’s license-rules process documentation](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/process/license-rules.rst) for a related approach.
