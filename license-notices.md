<!-- SPDX-License-Identifier: CC-BY-4.0 -->

## License Notices in CNCF Files

Where reasonably possible, each source code and documentation file that is contributed to a CNCF project should contain a copyright notice and license notice.

There are several reasons to include notices on a file-by-file basis, rather than just in a single LICENSE file in the repo root directory. In particular, including notices on a file-by-file basis enables better code reuse, by helping to ensure that the relevant information travels along with the file when it is reused in other projects.

There is no one mandatory way in which license notices need to be provided. Following are some options for ways to provide notices in various use cases.

For additional details regarding attribution notices for third party code used
in CNCF projects, see the [CNCF attribution recommendations] document.

### Original content for CNCF projects

Under the [CNCF charter], section 11, source code is to be made available under the Apache License, version 2.0 (Apache-2.0) and documentation is to be made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0).

These notices can be included using either the standard language from the license steward, and/or using an [SPDX short-form identifier](https://spdx.dev/ids). For example, for source code:

```
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
```

and/or:

```
# SPDX-License-Identifier: Apache-2.0
```

For documentation:

```
<!-- This work is licensed under a Creative Commons Attribution 4.0 International License. -->
```

and/or:

```
<!-- SPDX-License-Identifier: CC-BY-4.0 -->
```

Often, a file will include a copyright notice just before or after the license notice. See CNCF's [recommendations for copyright notices](./copyright-notices.md) for more details.

### Reusing a file from another project

When reusing a file from another project, you will typically want to:
1. retain any existing copyright notices in the file;
2. retain any existing license notices in the file; and
3. if there is no license notice in the file, add one.

Parts 1 and 2 are straightforward: Don't delete existing notices.

For part 3, if the file does not contain a notice stating the license it was used under, you will likely want to add one. This can be done with an [SPDX short-form identifier](https://spdx.dev/ids), using the applicable license ID from the [SPDX license list](https://spdx.org/licenses).

For example, if the file is provided under the MIT license, you could add to the file:

```
# SPDX-License-Identifier: MIT
```

Also see below for details about including the actual text of these additional licenses in the repo.

### Reusing content from part of a file from another project

Sometimes, a contribution may include a portion of code (sometimes called a "snippet") taken from another project, but without copying the entire file. For example, this might include copying a single function from another project, and adding it to a file that you otherwise wrote.

When reusing a _portion of a file_ from another project, you will typically want to:
1. include any existing copyright notices from the original file that applied to that portion;
2. include any existing license notices from the original file that applied to that portion; and
3. if there was no license notice from the original file, add one.

For each of these, it is typically helpful to include context explaining which part of the new file is covered by the applicable notices. For example:

```
# The foo() function was copied from Project XYZ, and is
# provided here subject to the following:
# [copyright notice]
# [license notice]
```

Additionally, if the copied content is under a different license from your own code, then you will likely want to update any SPDX short-form identifier to communicate that both licenses apply to the file. This is typically done using the `AND` operator in an [SPDX license expression](https://spdx.dev/ids). For example:
* if a file contains code written for CNCF which is under Apache-2.0,
* and it also contains a function copied from a third-party project licensed under MIT,
* then the identifier for the file would say: `SPDX-License-Identifier: Apache-2.0 AND MIT`

Also see below for details about including the actual text of these additional licenses in the repo.

## Including the text of additional licenses

Note that where other licenses are used, you will also want to include the corresponding license text itself somewhere in the repo. The LICENSE file will contain the project's main license text (e.g., Apache-2.0), but many other licenses require that the license text itself be reproduced in addition to a short notice or identifier.

This could be done in the file itself, or in a root-level file such as THIRD-PARTY.txt. We do not recommend using a file called NOTICE for this purpose, as that filename has a specific meaning under the [Apache-2.0 license](https://www.apache.org/licenses/LICENSE-2.0.txt).

The [REUSE Software Initiative](https://reuse.software/spec/) also contains recommendations for placing license texts within a `/LICENSES/` directory.

[CNCF Charter]: https://github.com/cncf/foundation/blob/main/charter.md
[CNCF attribution recommendations]: https://github.com/cncf/foundation/blob/main/policies-guidance/recommendations-for-attribution.md
