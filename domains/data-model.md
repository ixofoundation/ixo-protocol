# Domain Entity Data Model
This is a technical specification of the data model for entity Domains in the IXO Spatial Web. It builds on the ]Interchain Identifiers](https://github.com/ixofoundation/ixo-protocol/blob/da94628b497879092d20133d9b8594dae22cff9a/interchain-identifiers/v1.md) Specification, a consensus standard that was pioneered by IXO and developed with support from the Interchain Foundation.

In the context of the IXO Spatial Web, **Domains** refer to decentralized digital twin entities that represent both virtual and physical real-world assets. These domains are registered autonomously within blockchain digital registries and are identified by Interchain Identifiers (IIDs), a specific class of Decentralized Digital Identifiers (DIDs) designed for on-chain entities. Each domain is defined by its properties outlined in Domain (IID) Documents, which can be resolved using the IXO DID Method.

The concept of Domains allows for the seamless integration of real-world objects into a digital framework, enabling dynamic interactions and governance through smart contracts and decentralized identities. This structure ensures that each domain can autonomously control its operations, permissions, and data, thereby enhancing trust, transparency and accountability in a wide variety of applications – from environmental monitoring to managing real-world assets, autonomus AI agent services, and decentralized physical infrastructure.

## Overview

This specification defines the data model for Entity Domains within the IXO Spatial Web Protocol. The model builds upon the Interchain Identifier (IID) specification and the Decentralized Identifier (DID) methodology, extending the W3C DID Core specification for DID Documents encoded in JSON-LD. The data model facilitates hierarchical inheritance of properties through class inclusion via the `@context` property, enabling entities to inherit and override properties across multiple levels.

---

## Table of Contents

1. [Terminology](#terminology)
2. [Entity Domain Structure](#entity-domain-structure)
   - [DID Document](#did-document)
   - [Class Inheritance via ](#class-inheritance-via-context)[`@context`](#class-inheritance-via-context)
   - [Property Overwriting](#property-overwriting)
3. [Property Definitions](#property-definitions)
   - [Controller Properties](#1-controller-properties)
   - [Verification Method Properties](#2-verification-method-properties)
   - [Verification Relationship Properties](#3-verification-relationship-properties)
   - [Service Properties](#4-service-properties)
   - [LinkedResource Properties](#5-linkedresource-properties)
   - [AccordedRight Properties](#6-accordedright-properties)
   - [LinkedClaim Properties](#7-linkedclaim-properties)
   - [LinkedEntity Properties](#8-linkedentity-properties)
   - [Blockchain Account Properties](#9-blockchain-account-properties)
4. [Inheritance Mechanism](#inheritance-mechanism)
   - [Resolving Inheritance](#resolving-inheritance)
   - [Multi-Level Inheritance](#multi-level-inheritance)
5. [Example Usage](#example-usage)
6. [Security Considerations](#security-considerations)
7. [Compliance](#compliance)
8. [Conclusion](#conclusion)

---

## Terminology

- **Entity Domain**: A unique domain represented by an Interchain Identifier (IID) form of DID Document within the IXO Spatial Web Protocol.
- **IID**: An [Interchain Identifier](https://github.com/ixofoundation/ixo-protocol/blob/da94628b497879092d20133d9b8594dae22cff9a/interchain-identifiers/v1.md) that is a DID-Core conformant identifier implemented by the IXO DID Method.
- **DID**: Decentralized Identifier as per the W3C DID Core specification.
- **Class**: A DID Document included in the `@context` property for inheritance purposes.
- **Inheritance**: Mechanism by which properties from Classes are inherited by the Entity Domain.
- **Property Overwriting**: Lower-level properties in the Entity Domain overwrite inherited properties when types and IDs match.

---

## Entity Domain Structure

### DID Document

Each Entity Domain is represented as a DID Document in JSON-LD format, adhering to the W3C DID Core specification with IXO-specific extensions.

#### Example

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    {
      "class": "did:ixo:entity:abc123..."
    }
  ],
  "id": "did:ixo:entity:123456789abcdefghi",
  "controller": ["did:example:controller1", "did:example:controller2"],
  "verificationMethod": [...],
  "authentication": [...],
  "service": [...],
  "linkedResource": [...],
  "accordedRight": [...],
  "linkedClaim": [...],
  "linkedEntity": [...],
  "account": [...]
}
```

### Class Inheritance via `@context`

- The `@context` property **MUST** be a URI or an array of URIs.
- Including a DID as a Class in the `@context` allows the Entity Domain to inherit properties from that Class.
- Classes can themselves include `@context` properties, enabling multi-level inheritance.

### Property Overwriting

- Lower-level properties in the Entity Domain **overwrite** inherited properties when they have the same `type` and `id`. 
- This ensures that specific configurations at the Entity Domain level take precedence over inherited defaults. It also applies when the Context has the setting `"protected": True`

---

## Property Definitions

### 1. Controller Properties

- **Purpose**: Specifies the controllers of the Entity Domain DID.
- **Property**: `controller`
- **Type**: String or Array of DIDs
- **Example**:
  ```json
  "controller": "did:ixo:entity:xyz123..."
  // or
  "controller": ["did:example:controller1", "did:example:controller2"]
  ```

### 2. Verification Method Properties

- **Purpose**: Defines cryptographic keys and methods for verification.
- **Property**: `verificationMethod`
- **Type**: Array of Verification Method Objects
- **Example**:
  ```json
  "verificationMethod": [
    {
      "id": "did:ixo:entity:123456789abcdefghi#keys-1",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:ixo:entity:123456789abcdefghi",
      "publicKeyBase58": "Base58EncodedPublicKey"
    }
  ]
  ```

### 3. Verification Relationship Properties

- **Purpose**: Associates verification methods with specific purposes (e.g., authentication).
- **Properties**: `authentication`, `assertionMethod`, `keyAgreement`, etc.
- **Type**: Array of Verification Method references or objects
- **Example**:
  ```json
  "authentication": [
    "did:ixo:entity:123456789abcdefghi#keys-1",
    {
      "id": "did:ixo:entity:123456789abcdefghi#keys-2",
      "type": "EcdsaSecp256k1VerificationKey2019",
      "controller": "did:ixo:entity:123456789abcdefghi",
      "publicKeyHex": "04c1..."
    }
  ]
  ```

### 4. Service Properties

- **Purpose**: Defines endpoints for interacting with the Entity Domain.
- **Property**: `service`
- **Type**: Array of Service Objects
- **Example**:
  ```json
  "service": [
    {
      "id": "did:ixo:entity:123456789abcdefghi#service-1",
      "type": "MessagingService",
      "serviceEndpoint": "https://example.com/messages/123"
    }
  ]
  ```

### 5. LinkedResource Properties

- **Purpose**: Links to external resources related to the Entity Domain.
- **Property**: `linkedResource`
- **Type**: Array of LinkedResource Objects
- **Example**:
  ```json
  "linkedResource": [
    {
      "id": "{id}#resource1",
      "type": "Image",
      "description": "Entity logo",
      "format": "image/png",
      "resource": "https://example.com/logo.png"
    }
  ]
  ```

### 6. AccordedRight Properties

- **Purpose**: Specifies rights accorded to the DID subject.
- **Property**: `accordedRight`
- **Type**: Array of AccordedRight Objects
- **Example**:
  ```json
  "accordedRight": [
    {
      "id": "{id}#right1",
      "type": "License",
      "description": "Use under CC-BY-4.0",
      "right": "https://creativecommons.org/licenses/by/4.0/"
    }
  ]
  ```

### 7. LinkedClaim Properties

- **Purpose**: Represents claims made about the Entity Domain.
- **Property**: `linkedClaim`
- **Type**: Array of LinkedClaim Objects
- **Example**:
  ```json
  "linkedClaim": [
    {
      "id": "{id}#credential1",
      "type": "VerifiableCredential",
      "description": "Certification of compliance",
      "claim": "https://example.com/credentials/123"
    }
  ]
  ```

### 8. LinkedEntity Properties

- **Purpose**: Establishes relationships with other entities in the spatial web.

- **Property**: `linkedEntity`

- **Type**: Array of LinkedEntity Objects

- **Structure**:

  Each `linkedEntity` object **MUST** include:

  - `id`: The DID of the linked entity.
  - `type`: The type of entity.
  - `relationship`: Nature of the link (e.g., "owns", "memberOf").
  - `description` (optional): Additional details.

- **Example**:

  ```json
  "linkedEntity": [
    {
      "id": "did:ixo:entity:987654321abcdefghi",
      "type": "DAO",
      "relationship": "owns",
      "description": "Subsidiary entity"
    }
  ]
  ```

### 9. Blockchain Account Properties

- **Purpose**: Associates blockchain accounts with the Entity Domain.
- **Property**: `blockchainAccount`
- **Type**: Array of BlockchainAccount Objects
- **Example**:
  ```json
  "blockchainAccount": [
    {
      "id": "blockchainAccount1",
      "type": "ComsosAccount",
      "address": "ixo123456789abcdef",
      "chain": "ixo-5"
    }
  ]
  ```

---

## Inheritance Mechanism

### Resolving Inheritance

1. **Retrieve Class**: Extract the DID of the Class in the `@context` property.
2. **Resolve DIDs**: For any DID URIs in the `@context`, resolve them to obtain the corresponding DID Documents (Inherited Class Properties).
3. **Merge Properties**: Inherit properties from Classes, merging them into the Entity Domain's properties.
4. **Apply Overwriting Rules**: Overwrite inherited properties with those defined in the Entity Domain when types and IDs match.

### Multi-Level Inheritance

- Classes included via `@context` may themselves include other Classes in their own `@context`.
- Inheritance proceeds recursively, allowing for complex hierarchies.


1. **Asset Class DID Document**

   - Defines common properties for all Assets.
   - Properties might include standard verification methods and services.

2. **Protocol-Specific Asset Class**

   - Includes the Asset Class DID in its `@context`.
   - Adds digital asset-specific properties.

3. **Specific Asset Entity Domain**

   - Includes the Protocol-Specific Asset/Protocol Class in its `@context`.
   - Overrides properties as needed for this specific asset.

---

## Security Considerations

- **Trust in Inheritance**: Ensure that inherited Classes are from trusted sources to prevent injection of malicious properties.
- **Property Overwriting**: Be cautious when overwriting security-related properties (e.g., verification methods) to avoid weakening security.
- **Resolution of DIDs**: Secure resolution mechanisms should be in place to prevent man-in-the-middle attacks during DID resolution.

---

## Compliance

- All Entity Domain DID Documents **MUST** conform to the W3C DID Core specification.
- Extensions **SHOULD** use standard JSON-LD practices to maintain interoperability.
- Implementations **MUST** support the inheritance and overwriting mechanisms as defined in this specification.

---

## Conclusion

This data model enables flexible and hierarchical representation of Entity Domains in the IXO Spatial Web Protocol. By leveraging the `@context` property for class inheritance and defining clear rules for property overwriting, entities can share common structures while allowing for specialization and customization at lower levels.

---


In the context of the IXO Spatial Web, **Domains** refer to decentralized digital twin entities that represent both virtual and physical real-world assets. These domains are registered autonomously within blockchain digital registries and are identified by Interchain Identifiers (IIDs), a specific class of Decentralized Digital Identifiers (DIDs) designed for on-chain entities. Each domain is defined by its properties outlined in Domain (IID) Documents, which can be resolved using the IXO DID Method.

The concept of Domains allows for the seamless integration of real-world objects into a digital framework, enabling dynamic interactions and governance through smart contracts and decentralized identities. This structure ensures that each domain can autonomously manage its operations, permissions, and data, thereby enhancing transparency and accountability in various applications, from environmental monitoring to asset management.
