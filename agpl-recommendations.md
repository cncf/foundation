# Third Party Dependencies that have been Relicensed to AGPL

## Background

CNCF's IP policy is set forth in the [CNCF charter], section 11.

Under the IP policy, CNCF projects use Apache-2.0 for their code. The CNCF
Governing Board reviews and approves other non-Apache-2.0 licenses, for
code in the repos or dependencies of CNCF projects, on an exception basis.

The CNCF Governing Board has previously adopted an [Allowlist License Policy]
that permits most permissively-licensed components to be automatically
approved as exceptions, when used in an unmodified manner.

However, components under other licenses -- particularly under copyleft-style
licenses -- remain subject to approval by the CNCF Governing Board. This is
not because such licenses are inherently problematic, but rather because
they may add obligations that would not be expected by, or acceptable to,
users of CNCF's projects under Apache-2.0.

## Recent changes to dependencies' licenses

Recently (in early 2021), CNCF projects have discovered that some existing
dependencies they use have been relicensed by their licensors from
Apache-2.0 to the GNU Affero General Public License v3.0, [AGPL-3.0].

The AGPL-3.0 license is a free and open source software license. However,
it is a strong copyleft license, which means that when used or distributed
in certain ways, it imposes copyleft obligations that go beyond the more
permissive requirements of Apache-2.0.

In addition, portions of AGPL-3.0's copyleft obligations apply to contexts
where the AGPL-3.0 software is interacted with through a computer network.
In the context of cloud-native software, this means that copyleft
obligations may come into play under AGPL-3.0 where they would not for
other GPL licenses, where distribution is the primary relevant trigger.

This can present a problem for CNCF projects, where the license of the
component they depend on was previously aligned with the CNCF project's
own license, but is no longer aligned.

## Recommendations

There are a few approaches that CNCF projects should consider taking, for
dependencies that fall into this category.

### Switch to an alternative component

The project will likely want to evaluate alternative components with
similar functionality, and switch to one that is Apache-2.0 or that has
a permissive license under the [Allowlist License Policy].

### Freeze the component at the version prior to the license change

As a short-term solution, the project might consider freezing the version
of the component so that it is fixed at the last release prior to the
license change.

This is unlikely to be tenable as a long-term solution, particularly as
the prior release is presumably unlikely to continue receiving maintenance
updates, security fixes, etc.

### Seek an exception from the Governing Board

If the project requires the now-AGPL-3.0 component as a mandatory
dependency, it can request that the Governing Board grant an exception
to the license policy.

Please be aware that this is **highly** unlikely to be granted, and that
the Governing Board has (at the time of this writing) not previously
granted any exceptions for components that are under AGPL-3.0.

If you do seek an exception, you will want to provide information about
the specific component(s) and how they are being used. In particular,
provide details about the boundaries and interactions between the project
code and the third-party component, and whether the component
is mandatory or optional for use with the project.

The Governing Board may refuse to grant exceptions at its discretion;
however, some of the considerations that the Governing Board might take
into account are as follows:
* if AGPL-3.0 code would be included directly in the source code repo,
this is extremely unlikely to be approved as an exception.
* if use of an AGPL-3.0 component is mandatory to use the CNCF project,
it is highly unlikely to be approved as an exception.
* if the component is an _optional_ run-time dependency, and is not
enabled or incorporated by default, it may be more acceptable as an
exception.
  * additionally, if the optional AGPL-3.0 component's licensor has made
  available interface tools (such as client libraries) that are under
  Apache-2.0 or a similar permissive license, that may also make it more
  acceptable as an exception.

[CNCF Charter]: https://github.com/cncf/foundation/blob/master/charter.md
[Allowlist License Policy]: https://github.com/cncf/foundation/blob/master/allowed-third-party-license-policy.md
[AGPL-3.0]: https://www.gnu.org/licenses/agpl-3.0.en.html
