August 13, 2017

Updated: July 9, 2025

CNCF encourages each project to manage its own website, but after consulting with the projects,
we are publishing a set of guidelines around dealing with potential commercial conflicts.

Many CNCF projects began life within a single company (called the “origin company” below) and
then transitioned to be community-managed before or after being accepted into the CNCF. This
document provides some guidelines on how the project’s website should evolve.

Note that many end users are interested in commercial support for CNCF projects, and project
websites are welcome to list and link to companies providing support. However, the key principle
is that the origin company should not be favored over any other companies offering the same
services.

The guidelines:

1. CNCF projects are strongly encouraged to host the source of their websites in an open
source repository (and under the same organization) so that requests to change can be done via
pull requests and the discussions are archived in a transparent manner.

2. It is OK to say that, e.g., “Prometheus was originally created by Soundcloud” or “Kubernetes
builds upon 15 years of experience of running production workloads at Google,” but the origin
company should not otherwise be referred to on the project homepage.

3. There should be no links or forms for capturing enterprise support leads. Instead, it is fine
to have an enterprise support, commercial partners or similar page. Companies must be listed on
that page in alphabetical order, or the order can be changed randomly on each page load. It’s OK
to have different categories of support offered. Simple vetting by the project is needed to ensure
that all companies listed really can provide the support promised. Projects are welcome to outsource
this vetting to CNCF staff if it becomes a burden.

4. Links to companies offering support are expected to go a page that at least mentions support of
the project. This can either be the company homepage or a project-specific landing page.

5. If there is a copyright notice at the bottom of the page, copyright should be to the project authors
or to CNCF, not the origin company. For details, see [Copyright notices](https://github.com/cncf/foundation/blob/main/copyright-notices.md).

6. CNCF requests that graduated and incubating projects include the sentence “We are a Cloud Native
Computing Foundation project.” and the CNCF logo near the bottom of their project homepage.
Sandbox-level projects should include the sentence “We are a Cloud Native Computing Foundation
sandbox project.” and the CNCF logo. We also appreciate a link to KubeCon + CloudNativeCon as the
events approach.

7. Website footers must include trademark guidelines and a copyright notice (where XYZ is the project's name).

   ```text
   Copyright © XYZ a Series of LF Projects, LLC
   For website terms of use, trademark policy and other project policies please see lfprojects.org/policies/.
   ```

8. If the project does not have a website, this copyright notice must be added in the README or similar location.

   ```text
   Copyright © contributors to XYZ, established as XYZ a Series of LF Projects, LLC.
   ```

Questions? Email us at <info@cncf.io>.
