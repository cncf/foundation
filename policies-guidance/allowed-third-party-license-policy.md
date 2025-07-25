CNCF's IP policy is set forth in the [CNCF charter], section 11.

CNCF project dependencies that are licensed under Apache-2.0 do not require
further license review or approval, since they are under the same license as
the CNCF project itself.

The IP policy in the [CNCF charter] allows the CNCF Governing Board to review
and approve other non-Apache-2.0 licenses on an exception basis.

To streamline this process, licenses for some components are allowed as per
the CNCF Allowlist License Policy (adopted by the CNCF Governing Board on 2018-05-01).

Components that are not under Apache-2.0, and that do not satisfy the Allowlist License Policy, remain subject to review and exception approval by the Governing Board.

## CNCF Allowlist License Policy

A third-party component under a non-Apache 2.0 license is deemed automatically
approved by the Governing Board for inclusion in a CNCF codebase as an
exception to the CNCF Intellectual Property Policy, if **all** of the following
apply:

1. It is fully licensable under the approved licenses set forth below under
[Approved Licenses] (including combinations with Apache-2.0); AND

2. It is either (A) stored unmodified in a designated third-party folder, or (B)
not stored in the CNCF project repository and instead retrieved at installation
or build time from the upstream third party repository or package repository; AND

3. It has indications of substantial use outside CNCF by satisfying one of the
following:

    1. the component is part of the applicable programming language’s standard
    library; or

    2. the component was created on Github at least 12 months ago and has at
    least 10 stars or 10 forks.

### Approved Licenses for Allowlist

To be approved as “allowlisted,” a third-party component must be fully
licenseable under one or more of the following licenses, and must meet the
other allowlist criteria set forth in the [Allowlist License Policy] above.

License IDs refer to the SPDX License List at <https://spdx.org/licenses>, except
where a URL is specified below for licenses that are not on the SPDX License
List.

- 0BSD
- BSD-2-Clause
- BSD-2-Clause-FreeBSD
- BSD-3-Clause
- MIT
- MIT-0
- ISC
- OpenSSL
- OpenSSL-standalone
- PSF-2.0
- Python-2.0
- Python-2.0.1
- PostgreSQL
- SSLeay-standalone
- UPL-1.0
- X11
- Zlib
- Google patent license for Golang (<https://golang.org/PATENTS>)

[Allowlist License Policy]: #cncf-allowlist-license-policy
[Approved Licenses]: #approved-licenses-for-allowlist
[CNCF Charter]: https://github.com/cncf/foundation/blob/main/charter.md

### Process for applying for an exception

This outlines the process for applying for an exception to the Intellectual Property policy referenced above.

- A CNCF project maintainer can file a request for an exception using the issue template.

Exceptions should be filed by the project using the component - the exception applies to how the component is being used.

- A staff member will review and add to the [Licensing Exception Board](https://github.com/orgs/cncf/projects/44)
- Staff will work with Legal to create an agenda for the Legal Committee to review and present a recommendation to the Governing Board.
- A vote is called according to the [CNCF Charter](https://github.com/cncf/foundation/blob/main/charter.md).
- If the vote is approved and the resolution passes, Staff will post in the issue, linking to the PR where this has been approved.
- If the vote is not approved, the issue will be closed.
