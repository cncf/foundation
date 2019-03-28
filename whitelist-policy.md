CNCF's IP policy is set forth in the [CNCF charter], section 11.

CNCF project dependencies that are licensed under Apache-2.0 do not require
further license review or approval, since they are under the same license as
the CNCF project itself.

The IP policy in the [CNCF charter] allows the CNCF Governing Board to review
and approve other non-Apache-2.0 licenses on an exception basis.

To streamline this process, licenses for some components are whitelisted as per
the CNCF Whitelist Policy (adopted by the CNCF Governing Board on 2018-05-01).
This whitelisting policy is described below.

Components that are not under Apache-2.0, and that do not satisfy the Whitelist
Policy, remain subject to review and exception approval by the Governing Board.

## CNCF Whitelist Policy

A third-party component under a non-Apache 2.0 license is deemed automatically
approved by the Governing Board for inclusion in a CNCF codebase as an
exception to the CNCF Intellectual Property Policy, if **all** of the following
apply:

1. It is fully licensable under the approved licenses set forth below under
[Approved Licenses] (including combinations with Apache-2.0); AND

2. It is stored unmodified in a designated third-party folder; AND

3. It has indications of substantial use outside CNCF by satisfying one of the
following:

    1. the component is part of the applicable programming language’s standard
    library; or

    2. the component was created on Github at least 12 months ago and has at
    least 10 stars or 10 forks.

### Approved Licenses for Whitelist

To be approved as “whitelisted,” a third-party component must be fully
licenseable under one or more of the following licenses, and must meet the
other whitelist criteria set forth in the [Whitelist Policy] above.

License IDs refer to the SPDX License List at https://spdx.org/licenses, except
where a URL is specified below for licenses that are not on the SPDX License
List.

- BSD-2-Clause
- BSD-2-Clause-FreeBSD
- BSD-3-Clause
- MIT
- ISC
- Python-2.0
- PostgreSQL
- X11
- Zlib
- Google patent license for Golang (https://golang.org/PATENTS)

[Whitelist Policy]: #cncf-whitelist-policy
[Approved Licenses]: #approved-licenses-for-whitelist
[CNCF Charter]: https://github.com/cncf/foundation/blob/master/charter.md
