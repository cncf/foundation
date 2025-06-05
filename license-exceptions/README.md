<!-- SPDX-License-Identifier: CC-BY-4.0 -->

## License exceptions

The manifest files in this directory contain a list of license exceptions that have been approved by the CNCF Governing Board. The exceptions are provided in JSON and SPDX tag-value format for convenience.

These manifests will be updated from time to time as new exceptions are approved.

Please see the [CNCF charter] and the [Allowlist Policy] for more background information.

## Allowlisted components

For convenience, the manifests also contain a list of certain other dependencies for which individual license exceptions were not required. This is either because (a) they were automatically approved as license exceptions under CNCF's [Allowlist Policy]; or (b) they are under Apache-2.0 and therefore aligned with the IP policy in the [CNCF charter]. 

Dependencies that are not currently listed in the manifests, but which satisfy (a) or (b) in the preceding paragraph, are automatically approved and do not need separate license exceptions.

[Allowlist Policy]: https://github.com/cncf/foundation/blob/main/policies-guidance/allowed-third-party-license-policy.md#cncf-allowlist-license-policy
[CNCF charter]: https://github.com/cncf/foundation/blob/main/charter.md

## GPL exceptions for in-kernel eBPF programs

By email vote concluded on August 31 2023, the Governing Board approved a blanket exception for in-kernel eBPF programs licensed under either of the following licenses, either on its own or dual licensed in combination with any license already on the CNCF Licensing Allowlist Approved Licenses list (e.g., MIT License):

* GPL 2.0
* GPL 2.0 or later

This exception is not documented in the SPDX/JSON files because it applies only to in-kernel eBPF programs. Usage of GPL 2.0 (or later) for other code is not approved. There is more background explaining the rationale behind this exception in [this document](https://docs.google.com/document/d/10CY8V1w8aQ6CrJ_US_Gnz8cx2SoOtOBqpUKX4cWl_4w/edit#heading=h.oxrtx3xdj6dn). 
