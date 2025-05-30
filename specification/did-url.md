# **IXO DID Method — Formal Specification for DID URL Handling**

### Status

This document is NORMATIVE for all software that implements the did:ixo method and is intended to be registered in the DID Specification Registries.

## **1 Scope**

This specification defines the precise rules that resolvers, SDKs, and client applications MUST follow when parsing and dereferencing DID URLs whose identifier scheme is did:ixo.

It profiles and extends the generic DID URL Dereferencing algorithm defined by W3C DID-Resolution v0.3 § 5.3  .

## **2 Normative references**

- Decentralized Identifier Resolution v0.3 (W3C WD 29-May-2025)
- Decentralized Identifiers v1.1 (W3C REC)
- RFC 3986 (URI Syntax)

## **3 Terminology**

The keywords MUST, MUST NOT, SHOULD, MAY are to be interpreted as in RFC 2119.

DID, DID URL, DID Document, Resource, and other capitalised terms inherit their meaning from the W3C specifications.

## **4 DID URL syntax for did:ixo**

```
did-url        = "did:ixo:" method-id [ "/" path ] [ "?" query ] [ "#" fragment ]

method-id      = 32HEXDIG ; 128-bit entity identifier stored on-chain
path           = "resources/" cid / other-segment
cid            = 46HEXDIG ; multibase CID v1 of an external resource
query          = param *("&" param)
param          = service-param / serviceType-param / relativeRef-param / hl-param
fragment       = 1*pchar
```

## **5 Normative processing rules**

### **5.1 Resolution pre-requisite**

Implementations MUST first obtain the DID Document using the did:ixo resolution algorithm defined in the companion method specification. All dereferencing options and DID parameters MUST be forwarded unchanged, per DID-Resolution § 5.3 step 2 .

### **5.2 Fragment handling (“#”)**

- If a fragment component is present, the resolver MUST apply DID-Resolution § 5.3.2 Dereferencing the Fragment without modification.
- The fragment MUST select the object in the resolved DID Document whose id property equals "#" + fragment.
- If no such object exists, the resolver MUST return error = NOT_FOUND.

This behaviour is identical to the generic algorithm and guarantees interoperability with off-method clients.

### **5.3 Path handling (”/”)**

- A path beginning with resources/ is an **external, content-addressed linked resource**.
    - The segment immediately following resources/ MUST be a valid multibase CID.
    - The resolver MUST retrieve the resource bytes via the IXO Resources Registry:
        1. Look up the cid → {protocol, location} mapping stored on-chain for the subject DID.
        2. Fetch the bytes using the indicated protocol (e.g., IPFS, Matrix mxc, HTTPS gateway).
        3. Verify that the fetched bytes hash to the CID. If verification fails, return ERROR = INTEGRITY_CHECK_FAILED.
    - contentStream MUST contain the validated resource; contentMetadata.contentType SHOULD be inferred from the resource’s declared media type or file signature.
- Any other path segment MAY be defined by future IXO extensions. If the resolver does not recognise the segment, it MUST return ERROR = NOT_FOUND.

The did:ixo method MUST NOT overload the path mechanism to reference service endpoints or internal Document nodes. This single-purpose mapping aligns with the community guidance recorded in W3C issue #150 comments .

### **5.4 Query handling ( “?” parameters )**

The method supports the service, serviceType, and relativeRef parameters exactly as defined in DID-Resolution § 5.3.1 step 8 . Behaviour is therefore method-independent:

- service=serviceID → dereference the matching Service object or its endpoint.
- serviceType=TYPE → filter Service objects whose type matches TYPE.
- relativeRef → resolve relative URLs against each selected serviceEndpoint.
- If both path and service parameters are present, the resolver MUST treat this as a parameter-error and return ERROR = INVALID_DID_URL.

The optional hl parameter (hashlink) is reserved. Implementations SHOULD defer to any future generic specification for its processing.

### **5.5 Combined processing order**

The resolver MUST apply the three-step algorithm defined in DID-Resolution § 5.3 with the following did:ixo-specific refinements:

1. **Dereference Resource**
    - If service or serviceType present → follow § 5.3.1 step 8.
    - Else if path present → apply § 5.3 of this document.
    - Else return the DID Document.
2. **Dereference Fragment** (if any) — per § 5.2 above.
3. Return {dereferencingMetadata, contentStream, contentMetadata} as specified by the W3C algorithm.

## **6 Security and integrity considerations**

- All linked resources are content-addressed; integrity verification MUST pass before bytes are released to the caller.
- Service invocations are unconstrained, dynamic operations; clients SHOULD apply their own security policies (authentication, rate-limiting, etc.).
- Caching resolvers SHOULD cache positive results for CID-based resources but MUST respect Cache-Control: no-store headers embedded in those resources, per DID-Resolution § 12.2.

## **7 Conformance requirements**

A did:ixo resolver is conformant if and only if it:

- Implements all MUST-level rules in sections 5.2–5.5.
- Generates error codes exactly as enumerated in DID-Resolution § 10.
- Passes the IXO test-suite (to be published) that exercises fragment selection, path dereferencing, service parameter handling, and negative cases.

## **8 Illustrative examples (non-normative)**

| **Use-case** | **DID URL** | **Expected Content** |
| --- | --- | --- |
| Internal verification method | did:ixo:0123456789abcdef0123456789abcdef#authentication | JSON object describing the authentication VM |
| External licence PDF | did:ixo:0123456789abcdef0123456789abcdef/resources/bafybeihdwd... | application/pdf bytes, CID-verified |
| Matrix messaging service | did:ixo:0123456789abcdef0123456789abcdef?service=messaging | Matrix room URL or full Service object |
| Unsupported path | did:ixo:.../whois | ERROR = NOT_FOUND |

## **9 Change log**

v1.0 (30-May-2025) — Initial formalisation, aligned with W3C DID-Resolution WD 29-May-2025 and community consensus documented in issue #150.
