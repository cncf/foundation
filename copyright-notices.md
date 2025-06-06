<!-- SPDX-License-Identifier: CC-BY-4.0 -->

## Ownership of Copyrights in CNCF Project Contributions

When source code, documentation and other content is contributed to a CNCF
project, the copyrights in those contributions remain owned by the original
copyright holders.

The copyrights are not _assigned_ to CNCF. Instead, they are _licensed_ for
distribution as part of the project. Whether a project uses the DCO or a CLA,
the original copyright holders retain their copyrights.

## Copyright Notices

CNCF does not require or recommend that every contributor include their
copyright notice in contributed files. [See below for more details on why
not.](#why-not-list-every-copyright-holder)

Instead, CNCF recommends using a more general statement in a form similar to the
following (where XYZ is the project's name):

- **Copyright The XYZ Authors.**
- **Copyright The XYZ Contributors.**
- **Copyright Contributors to the XYZ project.**

These statements are intended to communicate the following:
- the work is copyrighted;
- the contributors of the code licensed it, but retain ownership of their copyrights; and
- it was licensed for distribution as part of the named project.

By using a common format, the project avoids having to deal with names of
copyright holders, years or ranges of years, and variations on the (c) symbol.
This aims to minimize the burden on developers and maintainers as well as
redistributors of the code.

## What if I want my copyright notice included?

Please note that it is _not wrong_, and it is acceptable, if a contributor
wishes to keep their own copyright notices on their contributions. The above is
a recommended format for ease of use, but is not mandated by CNCF.

If you are contributing on behalf of your employer, you may wish to discuss with
your legal department about whether they will require you to include a copyright
notice identifying them as the copyright holder in contributions.

## What about Third Party Code?

If a file only contains code that originates from a third party source who
didn't contribute it themselves, then you would _not_ want to add the notices
above. (In a similar vein, you wouldn't add a notice identifying you as the
copyright holder either, if you didn't own it.) Just preserve the existing
copyright and license notices as they are.

If, however, you add copyrightable content to a pre-existing file from another
project, then at that point you could _add_ a copyright notice similar to the
one above.

## Don't Change Someone Else's Notice without their Permission

You _should not_ change or remove someone else's copyright notice unless they
have expressly permitted you to do so. This includes third parties' notices in
pre-existing code.

For additional details regarding attribution notices for third party code used
in CNCF projects, see the [CNCF attribution recommendations] document.

## Why not list every copyright holder?

There are several reasons why CNCF doesn't require or recommend trying to list
every copyright holder for contributions to every file:

- Copyright notices are not mandatory in order for the contributor to retain
  ownership of their copyright.
- Copyright notices are rarely kept up to date as a file evolves, resulting in
  inaccurate statements.
- Trying to keep notices up to date, or to correct notices that have become
  inaccurate, increases the burden on developers without tangible benefit.
- Developers and maintainers often do not want to have to worry about e.g.
  whether a minor contribution (such as a typo fix) means that a new copyright
  notice should be added.
- Adding many different copyright notices may increase the burden on downstream
  distributors, if their license compliance processes involve reproducing
  notices.
- The specific individual or legal entity that owns the copyright might not be
  known to the contributor; it could be you, your employer, or some other entity.

[CNCF attribution recommendations]: https://github.com/cncf/foundation/blob/main/policies-guidance/recommendations-for-attribution.md
