# CNCF Dependency Licensing Glossary

This Glossary defines commonly used terms and categories that are relevant to CNCF projects’ use of upstream dependencies.

The definitions in this Glossary are intended to facilitate review of exceptions to the  [CNCF IP Policy](https://github.com/cncf/foundation/blob/main/charter.md#11-ip-policy). While many of these terms are commonly used when discussing license compliance, please note that each open source license may have its own interpretation and meanings for these and other similar terms. CNCF cannot control the meanings of those licenses, so you should consult your own legal counsel regarding any questions about license compliance.


[TOC]



## Distribution & Integration Models {#distribution-&-integration-models}


### CNCF-Distributed  {#cncf-distributed}

**CNCF-Distributed:** The CNCF project will distribute the dependency or the resulting combined artifacts to users.


### User-Fetched Dependency  {#user-fetched-dependency}

**User-Fetched Dependency:** The CNCF project code will cause the user’s system to automatically retrieve the dependency from an upstream source at build, install, or runtime.


### System Component:  {#system-component}

**System Component:** The CNCF project expects that the dependency will either already be present on the user’s system or will be installed independently by the user.


### Not Distributed + Not Needed by End User (Internal Project Tooling)  {#not-distributed-not-needed-by-end-user-internal-project-tooling}

**Not Distributed + Not Needed by End User (Internal Project Tooling):** ALL of the following are true:



1. The dependency will be used ***only*** in the course of building and testing. 
2. The dependency will ***not ***be incorporated in any form into the built artifacts, and it will*** not*** inject any code or libraries into the final artifact. 
3. The CNCF project will ***not*** cause the user’s system to retrieve the dependency from an upstream source.
4. Users of the CNCF project will ***not*** need the dependency in order to install or run the CNCF project’s code or its distributed artifacts.


## Structural Segmentation {#structural-segmentation}


### Separated Component  {#separated-component}

**Separated Component:** The dependency’s code will either be (a) kept in a distinct directory or module clearly separated from CNCF project code, or (b) retrieved at build/installation time from a third-party repository and never stored in the CNCF project repository.


### Intermingled Code  {#intermingled-code}

**Intermingled Code:** The dependency's code will be "mixed in" with CNCF source files, copied into existing project files, or will otherwise lose its distinct directory/module boundary. 


## Communication Mechanisms {#communication-mechanisms}


### Static Linking {#static-linking}

**Static Linking:** The dependency and the CNCF project code will be combined into a single binary or similar type of artifact during the build process.


### Dynamic Linking {#dynamic-linking}

**Dynamic Linking: **The CNCF project code will interact with the dependency by loading it into the shared address space (memory) at run-time. This includes traditional shared objects compiled into a separate binary, as well as runtime module loading in interpreted or JIT-compiled languages.


### Separate Process {#separate-process}

**Separate Process:** The dependency and the CNCF project code will run as distinct executables and communicate via Inter-Process Communication (e.g., pipes, sockets, or shared files).


### Network Interaction {#network-interaction}

**Network Interaction:** The dependency and the CNCF project code will be logically and physically separated by a network boundary, with the CNCF project’s code acting as a client or consumer of the remote service and interacting with the dependency exclusively via standardized network protocols.


## Data Exchange {#data-exchange}


### Tightly Coupled {#tightly-coupled}

**Tightly Coupled:** The upstream dependency and CNCF project code will exchange  complex internal data structures such as shared pointers, class instances, or private memory offsets that require extensive knowledge of the other component's internal memory layout.


### Arms-Length Only  {#arms-length-only}

**Arms-Length Only:** The communication between the dependency and the CNCF project code will be limited to standard serialized data (e.g., JSON, XML, or Protobuf) where data is "flattened" for transport and neither component accesses the other's internal memory structures.
