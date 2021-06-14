<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Conformance Programs for CNCF Projects

## Background and Context

A core strength of CNCF projects, like any other open source project, is that
anyone can use and modify them for any purpose. The Apache-2.0 license used by
CNCF projects permits anyone to reuse and modify the code however they want
(subject to complying with the applicable open source licenses). This ability to
modify, extend and improve upon the project enables the code to evolve beyond
the contributors' expectations for use cases and functionality.

At the same time, there is benefit to the broader community in seeing downstream
products and offerings remaining generally aligned and minimizing divergence.
Doing so improves compatibility and interoperability among solutions that are
built upon CNCF projects. This benefits end users and consumers because it helps
ensure that their expectations are met about the functionality provided by a
solution that leverages a CNCF project. It can also help ensure compatibility of
plugins, or consistency in interfaces when customers move from one community or
vendor offering to another.

Rather than prohibiting divergence by limiting license rights to the code, CNCF
projects can instead put in place a **conformance program**. This document
discusses conformance programs and provides some guidelines and recommendations
for CNCF projects that are considering adopting one.

## Active CNCF Conformance Programs

Project | Program repo | Program website
------- | ------------ | ---------------
Kubernetes | https://github.com/cncf/k8s-conformance/ | https://www.cncf.io/certification/software-conformance/
Prometheus | TBD | TBD

## Purpose

With a **conformance program**, a project defines what it means for a downstream
community project or vendor solution to be "conformant", in the particular
context of their project's technology and ecosystem.

Depending on the nature of the project's technology and use, "conformant"
solutions could include one or more of the following categories:
* distributions derived from the project code that, even if modified, remain
  compatible with some or all of its APIs;
* solutions that meet defined technical requirements for interfacing with the
  project, such as plugins;
* compliance with a checklist of technical criteria such as performance or
  security requirements;
* or, other categories of technical solutions that relate to compatibility and
  interoperability with the project

The conformance program will include a **conformance badge** design. The badge
typically incorporates the project name and logo design, together with a phrase
such as "Conformant" or "Certified".

A downstream community or vendor can participate in a conformance program by
demonstrating that their solution meets the project's defined requirements to be
"conformant". In exchange for demonstrating this, the community or vendor
solution can use the conformance badge and phrase to describe their solution as
conformant. In some cases, they may also be able to include the project's name
as part of their own solution's name.

## Structure

A conformance program typically consists of several related components:
* conformance technical definition
* tool for evaluating conformance (e.g., self-testing suite)
* conformance badge collateral:
  * conformance phrase (e.g., "Certified Kubernetes")
  * badge design (e.g., [Certified Kubernetes badge])
  * visual branding guidelines (e.g., [Certified Kubernetes Brand Guidelines])
* conformance program legal documents:
  * Terms and Conditions (e.g., [Certified Kubernetes T&Cs])
  * Participation Form (e.g., [Certified Kubernetes Participation Form])
* public repo where conformant (e.g., [Certified Kubernetes repo])
* public website where conformant offerings are displayed (e.g., [Certified Kubernetes offerings])

## Roles

* **CNCF Governing Board**:
  * authorizes the launching and operation of any project conformance program,
    as part of its oversight of CNCF assets (i.e., the project trademarks)
  * see [CNCF Charter], sections 5(b)(iv), 5(d)(viii)
* **Project technical community**:
  * defines scope and specifics of conformance definition
  * develops self-testing / conformance evaluation tools alongside the project's
    open source codebases
* **CNCF and Linux Foundation staff**:
  * LF legal team defines the terms and conditions / participation form in
    coordination with project team and Governing Board
  * LF Creative Services team can assist with preparing the conformance badge
    design and brand guidelines
  * CNCF staff coordinate the receipt of participant submissions and updating of
    conformant offerings websites, etc.

## Guidelines and Recommendations

As noted above, the CNCF Governing Board has authority to determine whether to
launch and maintain a conformance program.

Accordingly, the following comments are recommendations for some considerations
that the Governing Board might take into account when evaluating a project's
proposed conformance program. Keep in mind though that the Governing Board is
not bound by just these considerations.

* **Compatibility** and **interoperability**:
  * The conformance definition should focus on technical criteria that improve
    compatibility and interoperability across the ecosystem as a whole.
  * Non-technical considerations, such as business goals or licensing structures
    for downstream solutions, should not be taken into account in the
    conformance definition.
  * Like all other project activities, the conformance program and its
    development is subject to the [Linux Foundation Antitrust Policy].
* **Openness** and **transparency**:
  * A conformance definition and self-testing tools should be developed openly.
  * A project should consider establishing a working group or similar subgroup
    to focus on developing the conformance definition and tools.
  * The repo where it is developed should be open and recurring meetings where
    it is discussed should be publicized.
  * Participants in discussions should have the opportunity to share, discuss
    and advocate for the merit of their views. However, not all views will
    necessarily be followed or implemented.
  * Decisions of the working group should be discussed openly in meetings,
    mailing list discussions, and/or publicly-visible issue threads.
* **Neutrality** with **multiple participants**:
  * A conformance program should reflect involvement from multiple vendors,
    users and stakeholders, and not just a single person or company.
  * The project should be able to demonstrate that the conformance definition
    and self-testing tools were developed with input from multiple participants.
  * The conformance program should ideally have multiple participating solutions
    ready to announce conformance upon launch. CNCF staff can work with early
    participants to enable validation of conformance prior to launch to assist
    with this.
* **Objectivity**:
  * To the extent possible, conformance definition elements should be based on
    objectively-measurable criteria, rather than subjective considerations
    requiring personal evaluation and determination.
  * Decisions on what is included in, or excluded from, the conformance
    definition and test suite should be based on technical merit, in light of
    the goals of aligning with the project codebase and fitting with reasonable
    expectations of end users of the project.
* **Appropriate for project's maturity stage**:
  * Conformance programs are more likely to be appropriate for CNCF projects
    that are at the Graduated or Incubating stage.
  * Sandbox projects may be too early in their maturity stage to have the broad
    adoption, and alignment of multiple participants, that make a conformance
    program relevant and appropriate.
* **Evolving over time**:
  * Conformance definitions are frequently aligned with a particular version or
    release of the project software.
  * A project that adopts a conformance program should be prepared to maintain
    it on an ongoing basis, so that it continues to remain relevant and
    up-to-date as the project itself evolves.

## Starting a conformance program

If your project is interested in initiating a conformance program, we'd recommend starting by reviewing the materials linked from this document, and considering whether your project is at a stage where it would be a good fit.

If your project wants to proceed, you can open up a GitHub issue in this repo or contact CNCF staff at info@cncf.io

We can set up a conversation with LF staff to discuss the conformance program goals, begin drafting T&Cs and more. CNCF staff can also start the process of socializing the program with the CNCF GB, in preparation for a later GB vote on approving the program.

Note that developing the conformance definition and self-testing tools can be the most time-consuming part of rolling out a conformance program. These will need to be ready with community consensus before the program can be considered by the GB for launch. You will likely want to discuss this with multiple participants from your community to see if there is alignment on moving forward.

## Additional resources

An [LF blog post] from July 2020 provides more details about conformance
programs generally, as well as some other Linux Foundation projects that have
implemented a conformance program.

[LF blog post]: https://www.linuxfoundation.org/en/blog/driving-compatibility-with-code-and-specifications-through-conformance-trademark-programs/
[Certified Kubernetes badge]: https://github.com/cncf/artwork/blob/master/projects/kubernetes/certified-kubernetes/versionless/color/certified-kubernetes-color.png
[Certified Kubernetes Brand Guidelines]: https://github.com/cncf/artwork/blob/master/projects/kubernetes/certified-kubernetes/certified-kubernetes-brand-guide.pdf
[Certified Kubernetes T&Cs]: https://github.com/cncf/k8s-conformance/blob/master/terms-conditions/Certified_Kubernetes_Terms.md
[Certified Kubernetes Participation Form]: https://github.com/cncf/k8s-conformance/blob/master/participation-form/Certified_Kubernetes_Form.pdf
[Certified Kubernetes repo]: https://github.com/cncf/k8s-conformance/
[Certified Kubernetes offerings]: https://www.cncf.io/certification/software-conformance/
[CNCF Charter]: https://github.com/cncf/foundation/blob/master/charter.md
[Linux Foundation Antitrust Policy]: https://www.linuxfoundation.org/antitrust-policy/
