# Guidance for Interactions between CNCF Project Code and Closed Source / Source-Available Products v1.0

## Background

Open source software developed by CNCF operates and interacts with a wide spectrum of other software and hosted services. These interactions are most effective when open source licenses also govern the software with which the project interacts. While open source licenses may range from permissive to copyleft, any of them enable the CNCF community to have the full spectrum of [rights reflected in the Open Source Definition](https://opensource.org/osd) in their development, debugging and use of the CNCF project software.

At the same time, many projects (including those hosted by CNCF) are able to remain fully open source while also building on top of, enhancing, or otherwise interacting in some manner with closed source and source-available software.

(For this present guidance, we’re treating software distributed under any license that does not qualify as an “open source” license under the [Open Source Definition](https://opensource.org/osd/) (including “source available” licenses) as part of the broader “proprietary” category. Please see our [separate guidance regarding source available dependencies](https://github.com/cncf/foundation/blob/main/policies-guidance/source-available-recommendations.md) for more specific details. “Proprietary” for purposes of this present guidance would of course also include any closed source software.)

Many case-by-case considerations come into play in determining whether a CNCF project can appropriately leverage, or otherwise interact with, proprietary software under the CNCF banner. While we cannot expect to address all possible situations here, the guidance below aims to provide a framework for maintainers to consider whether their situation is likely to be on-sides when their project seeks to interoperate with proprietary products.

## Proprietary dependencies and tools

In our [recommendations for attribution notices](https://github.com/cncf/foundation/blob/main/policies-guidance/recommendations-for-attribution.md#scope-and-nature-of-dependencies), we discussed six different categories of ways that open source projects may make use of dependencies. Those same categories are useful here, to think about a few (though certainly not all!) of the different ways that open source projects might leverage proprietary software—and to think about whether those uses align with [CNCF’s IP policy](https://github.com/cncf/foundation/blob/main/charter.md#11-ip-policy).

In the items below, “_Acceptable to use proprietary software?_” refers to whether proprietary software used in this configuration is likely to create an issue with CNCF’s IP policy. This is not intended to opine on other related matters, such as users’ personal preferences regarding the use of proprietary software—though projects may certainly elect to take such considerations into account as well.

1. **Incorporated code**:
  - _Description_: portions of code that are taken from a third-party software component and incorporated directly into a CNCF project’s own source code
  - _Acceptable to use proprietary software?_: No. Software that is under a proprietary license should not be included in CNCF source code files or repositories.
2. **Vendored component**:
  - _Description_: a component whose code is incorporated, _unmodified_, into a folder specifically intended for third-party dependencies, often with a name such as `vendor/`, `third_party/`, `node_modules/` (for NPM dependencies), etc.
  - _Acceptable to use proprietary software?_: No. As with 1 above, software under a proprietary license should not be included in CNCF source code files or repositories, even as a separate vendored component.
3. **Build-time dependency**:
  - _Description_: a component whose code is not incorporated into the CNCF project itself, but is instead obtained from an upstream source _at build time_ and incorporated into the built artifacts
  - _Acceptable to use proprietary software?_: Typically no, but may vary depending on the purpose of the project / repo. See details further below regarding project users’ reasonable expectations.
4. **Build and test tooling**:
  - _Description_: a component which is used in the course of building and testing the CNCF project code, but which is _not_ incorporated in any form into the built artifacts
  - _Acceptable to use proprietary software?_: Can be acceptable, but should be prominently disclosed and the third-party license should be reviewed for such use.
    - It is not uncommon for projects’ build, test, and CI/CD infrastructure to make use of proprietary software and commercial / SaaS services. Some projects store third-party binaries or blobs in, for example, a "third-party" repository for testing purposes (when this use is acceptable under the third-party license).
    - While this does not necessarily affect the licensing of the open source software itself, communities should consider whether this makes it harder for the downstream community to independently build and extend the project, separate from the shared project infrastructure.
5. **Install-time dependency**:
  - _Description_: a component whose code is not incorporated into the CNCF project itself, but is instead obtained from an upstream source _when the user installs the built artifacts, containers, etc._
  - _Acceptable to use proprietary software?_: Can be acceptable, but should be prominently disclosed. See details further below regarding project users’ reasonable expectations.
6. **Required upstream dependencies**:
  - _Description_: a component which is required to be present on the user’s system in order to run the built artifacts, but which is not itself distributed by CNCF
  - _Acceptable to use proprietary software?_: Can be acceptable, but should be prominently disclosed. See details further below regarding project users’ reasonable expectations.

## Special cases

In addition to the above, consider the following specific cases:

7. **Operating system and system libraries**:
  - _Description_: Services, interfaces and other similar components that are typically already installed on a target user’s computer, as part of the major components of their operating system and computing environment.
  - _Acceptable to use proprietary software?_: Generally yes, when avoiding digging into internals.
    - This is a _highly_ fact-specific question, but typically, open source projects can be built on top of—and make use of functionality provided by—proprietary operating systems and system libraries. (If this weren’t possible, then it would not be possible to write open source projects to run on Windows and MacOS operating systems, for instance.)
    - Some licenses reflect this explicitly, and even some copyleft licenses expressly permit interacting with such components. See for example the definition of “Standard Interfaces,” “System Libraries” and “Major Components” in [section 1 of GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). (See also the [FSF’s FAQ entry on this topic](https://www.gnu.org/licenses/gpl-faq.en.html#WindowsRuntimeAndGPL) for more details on their views of this language, and what can or cannot be redistributed.)
    - However, it is typically safest to utilize the public-facing interfaces made available by the operating system / libraries, rather than having a project use e.g. undocumented features or deep internal functionality.
8. **One of multiple optional components**:
  - _Description_: The project can utilize multiple different components (such as alternative databases), some of which are closed source or source-available.
  - _Acceptable to use proprietary software?_: Generally yes, but take caution about what to include in the project source code itself. The license for some closed source or source available enabling components may have terms that conflict with your project’s license or cause issues for your downstream users.
    - While also a fact-specific question, the fact that a project enables its users to select any of several different options for a particular need _may_ be helpful in showing a clearer distinction between the project and the optional components.
      - For example, it _may_ help with demonstrating that portions of the project are less likely to be considered “derivative works” of the various optional components (at least, in configurations where those optional components are omitted).
    - The project maintainers will likely want to pay particular attention to the _points of interaction_ between the core project and its optional dependencies.
      - For example, if a project enables configuring to use any of several different options for its database, the maintainers will likely want to look closely at the license terms for the database drivers that it includes in its source code.
9. **Where the vendor’s statements or terms deter usage**:
  - _Description_: Notwithstanding the above guidance, some vendors may utilize license terms or additional related statements which prohibit or deter open source projects from interfacing with them.
  - _Acceptable to use proprietary software?_: Not recommended.
    - It is possible that a vendor may attempt to prohibit uses that would actually be permissible under applicable law, or may attempt to impose copyleft-style terms that go beyond typical open source understandings. Out of respect for the vendor’s chosen license terms (as well as an abundance of caution), projects should likely avoid interfacing with such products. If they choose to do so anyway, they should be sure to be extremely transparent and make appropriate disclosures to the users of their projects.
    - For example, if the vendor’s terms or guidance prohibit actions such as (1) competing with the vendor or its products; (2) managing or invoking the products; or (3) reading data files or parsing inputs or outputs from the product, then the project may find it difficult to meaningfully interact with the vendor’s product in a compliant manner.

## Recommendations

The following are a few recommendations for specific actions to consider taking, in thinking about whether or not your project will interact with proprietary products in the ways described in this guidance.

1. Proprietary software should typically not be required to be installed, unless that fits with the user community’s **reasonable expectations**.
  - For example, consider thinking about the reasons why a CNCF project might only function if a  user has obtained the proprietary software:
    - a. Is it because the project is _enhancing_ or _improving_ the user’s experience with the proprietary software? If so, that’s more likely to be okay where that’s exactly what the user is seeking.
    - b. Would all target users of the software reasonably expect that the proprietary software is required? If so, that’s also more likely to be okay.
    - c. Or, would some target users be surprised to learn that use of this project involved or required the installation / use of proprietary software? If so, that’s likely going to cause problems due to misaligned expectations.
2. **Transparency** to the end user is key.
  - It is important for end users of your project (as well as contributors to it) to be aware of the way in which it utilizes proprietary software.
  - For example, a notice like the following could be prominently included in project documentation, with applicable changes for your project’s particular situation:
    - _Use of the Foo project software requires users to have installed the Bar dependency, which is provided by Baz under a non-open source license. If Bar is not already present on your system, the Foo installation process will download and install it. You are solely responsible for your own compliance with the Baz license, and you should consult your own legal counsel or your employer’s legal department if you have questions regarding it._
3. Ensure that proprietary software is not **incorporated into project artifacts**.
  - If a CNCF project must necessarily utilize proprietary software (such as during the build or test process), the project maintainers should:
    - a. clearly document which proprietary software and services are used, under which license terms and for which purposes; and
    - b. document its processes that it uses to ensure that the proprietary software is _not_ incorporated into project artifacts distributed by the project, such as container images and other release artifacts.
4. **Minimize use** of proprietary software and services where reasonable.
  - The choice of which tools to use is up to a project’s maintainers and contributor community. However, where reasonably possible, preferring the use of open source tools makes it easier for the broader community to participate on an even playing field.
  - For example, for project build and test tools, consider whether the use of proprietary tools and services may make it harder for the downstream community to independently build and extend the project. If participants must obtain (and/or pay for) their own licenses for proprietary software and services in order to build the project code, this may limit the ability of the project contributor community to grow in an effective manner.
