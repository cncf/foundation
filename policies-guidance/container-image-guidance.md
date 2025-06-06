# CNCF Container Image Guidance

Version 1.0 (June 4, 2025\)

### Background

The “container” model for distributing software is central to CNCF projects. Most if not all projects make their code available not just as source code downloads, but also as pre-built containers—and/or with build tooling to enable downstream users to build their own containerized versions.

Inherent in the container model is the ability to use one or more “base” images as the starting point for the released container image. While many projects may build their containers “`FROM scratch`” (e.g., an empty base layer), many others rely on base images that contain pre-built third party software and other content.

While base images are similarly central and critically necessary for efficient development of containerized software, they can also present particular risks and challenges. These challenges arise from the fact that base images cause third-party software and other content to become an inherent dependency of the project. While similar considerations are also present in other distribution modes, the container context may cause these risks to be less visible to users and the project community.

In particular, software and other content incorporated into base images raise questions regarding:

* **Security**: Project maintainers may not be aware of which components (and which versions) are incorporated into base images, making it difficult to evaluate their provenance and presence of potential vulnerabilities.  
* **License compliance**: Similarly, components within base images may be subject to licenses (open source or otherwise) that are not clearly disclosed; that may affect the licensing of the project itself; or that may make compliance infeasible for the project or downstream users.

In light of these considerations, CNCF has adopted the following guidance regarding its projects’ use of base images and releases of binary containers.

### Container Image Guidance

(A) **Container base images**: 

CNCF projects should abide by the following guidelines when *selecting base images* (including any direct and indirect container base layers) for their project code:

1. **Minimization**: Projects should use the most minimal base image reasonably necessary, and that base image itself should have a publicly-visible Dockerfile or Containerfile.  
   * *Explanation: Minimizing the number of third-party components in base images can help with minimizing both the attack surface for security vulnerabilities, and the scope of license compliance required for redistribution by the project and end users.*  
   * *Example: Where possible, projects should use “FROM scratch” or a base image with a minimal number of components, rather than a larger distribution.*  
   * *Example: Using a multi-stage Dockerfile to containerize the build process and copying artifacts over to a minimal base image (see [here](https://docs.docker.com/build/building/multi-stage/) for further details)*

2. **Supports Compliance**: Projects should use base images that make available artifacts (e.g., license and copyright notices, source code, …) that enable and support license compliance.  
   * *Explanation: Enabling downstream users to comply with their licensing obligations requires that they are informed and aware of what those obligations are. Choosing a base image that is itself compliant, and makes available necessary information (e.g. license texts, copyright notices, and source code where applicable) helps facilitate compliance for downstream users.*  
   * *Example: Avoid using a base image where applicable license texts or notices have been omitted, because that would make compliance more difficult or impossible for all users.*

(B) **Binary Releases / Built Container Images**:

CNCF projects should abide by the following guidelines when releasing binary (or other) container images from their project code:

1. **Transparency**: Projects should only include software and other content which either (A) is contained in or directly compiled from the project’s own source code repositories; (B) consists of packages included via a standard package manager for the applicable ecosystems; and/or (C) is necessary to address exceptional circumstances. In the case of (C), the exceptional circumstances and resulting actions should be documented publicly when and as possible.   
   * *Explanation: In order to ensure that end users can understand what is included in binaries / container images, any software and other content should either originate directly from the source code repos; or else be clearly disclosed as a dependency obtained from a standard packaging source (e.g. PyPI for Python; NPM for JavaScript; ...).*  
   * *Example: Projects should avoid including steps in their container build processes which copy arbitrary executable files from third-party websites that are external to the project itself.*  
   * *Example: Exceptional circumstances described in (C) above might include, for example, if it is necessary to address an urgent security vulnerability by immediately incorporating a patch that does not satisfy (A) or (B).*  
       
2. **Compliance**: Projects should ensure that they make available all artifacts necessary for open source license compliance for their own container images and applicable base layers that the project distributes. If it is mandatory from a functional perspective for binary blobs with no corresponding source code to be included in a binary / container image, then at a minimum they must be provided under a license that permits free redistribution, and in all cases should be reviewed for approval by the CNCF Legal Committee & Governing Board.  
   * *Explanation: A project should ensure that it complies with, and enables its end users to easily comply with, all open source license requirements applicable to its code and dependencies. For example, depending on the applicable licenses, this may include reproducing license texts and copyright / attribution notices, and making available corresponding source code.*  
   * *Example: A project has a requirement on a container image with third-party GPU drivers, and is not published under the Apache 2.0 License. These binary “blobs” should not be included in a binary / container image unless the applicable open source licenses are also complied with, including without limitation making available corresponding source code where applicable; or if not possible, then subject to review and approval by the CNCF Legal Committee & Governing Board.*   
       
3. **Visibility**: Projects should clearly communicate details about the applicable base images to their end users, through mechanisms such as software bills of materials (SBOMs) or otherwise.  
   * *Explanation: Where feasible, information about the contents of the project’s binary or built container image(s) and its base images should be communicated in a machine-readable SBOM format, in order to facilitate ingestion and analysis of its contents by downstream tooling.*  
   * *Example: Together with any released binary and/or container image, an SBOM in a standardized format should be produced as an artifact to communicate the contents of the applicable container images, including metadata such as security and licensing details.*

