# ixo DID Method Specification

## About
This [DID method spec](https://w3c-ccg.github.io/did-spec/#specific-did-method-schemes)
conforms to the requirements in the DID specification currently published by
the W3C Credentials Community Group. For more information about DIDs and DID
method specifications, please see the [DID Primer](http://bit.ly/2RX0xm2) and
[DID Spec](https://w3c-ccg.github.io/did-spec/). 

## Abstract 

The ixo DID Method provides the specification for digital identifiers within the ixo namespace of the multi-chain Web3 Internet of Impact. This specification builds on the DID method specification for [Interchain Identifiers](***). Interchain Identifiers (IIDs) are a family of Decentralized Identifier methods which are purpose-designed to identify, refer to, and interact with digital assets within blockchain namespaces.

IIDs are fully conformant DIDs based on the Decentralized Identifier (DID) core specification from the World Wide Web Consortium (W3C) [1].
IID Documents are DID documents. Howevever, unlike generic DIDs, IIDs **only** refer to on-chain entities, such as as non-fungible tokens or namespace records.

The ixo DID Document includes additional properties for entities relevant to the Internet of Impact, including: Linked Resources, Chain Service Endpoints, Accorded Rights, Linked Entities, and Linked Claims.

The ixo DID method resolves a DID Document for each `did:ixo` identifier that is based on the current state of data recorded in the ixo blockchain registry (IID Module).


## Status of This Document
Implemented Specification.

## Introduction

The Internet of Impact is a digital communication and data hyperstructure implemented on the base infrastructure of many interconnected blockchain networks. This has specific characteristics that are necessary for coordinating, financing, and verifying social, environmanetal, economic, and climate Impacts at Internet-scale.

The Internet of Impact is:
1. **Stateful** holding a sequential data record of the changing state of the physical world to measure, ascribe, and attribute changes over time, as well as set targets for desired future states.
2. **Graph-based** establishing the semantic ontologies for Impact, recording the linkages and relationships between entities that fund, implement, verify, and receive the benefits of Impact actions. This knowledge graph holds state within the directed acycic graph of blockchains and related data storage services.  
3. **Programmable** to execute actions that fulfil promises between counter-parties, or automate actions through entrusted code execution. 
4. **Trusted** based on `Web of Trust` principles that establish cryptographically verifiable roots of trust in the physical world and elevate trust through the graphs of relationships between entities. 
5. **Permissionless** enabled by ungated, decentralised interfaces with the base network services and with the networks governed and secured by decentralised crypto-economic mechanisms that cannot be controlled by any one entity.

The ixo protocol enables observations about the state of the world to be identified and recorded as Verifiable Claims. 
Claims are made by and in relation to Entities, such as: Agents, Decentralised Autonomous Organisations (DAOs), Projects, Investments, Oracles, Assets, Protocols, or other entity types.
Entities are identified by decentralised identifiers (DIDs) recorded in the ixo blockchain registry (IID Module) that can be autonomously resolved and authenticated. Entities may have Verifiable Credentials relevant to their roles and functions.
The ixo blockchain provides services that Entities may use to finance their activities, coordinate and govern collective action and shared resources, make claims and have these claims evaluated, pay agents, or execute a growing range of smart contract based decentralised applications.
The services of almost any other public blockchain network may also be accessed by entities, using the ixo blockchain.
The DID Document for an Entity provides a decentralised record of the entity's ownership, control, services, linked resources, accorded rights, linked entities, and linked claims. This provides an extremely powerful framework for coordination, digital financing, and verification using the Internet of Impact.

## Terminology

### Decentralized Identifier (DID)

As described in the [Decentralized identifiers (DIDs)
specification](https://w3c-ccg.github.io/did-spec/), a DID is defined as
consisting of three parts:

1. The URL scheme identifier: `did`.
2. The DID method identifier.
3. The DID method-specific identifiers.

## ixo DID Method

The namestring that identifies this DID method is `ixo`.

A DID that uses this method MUST begin with the following prefix: `did:ixo`.
In accordance with the DID specification, this string MUST be in lowercase. The remainder of
the DID, after the prefix, is the ixo method-specific identifier, that has two parts:
1. The blockchain **module identifier**, such as `entity`
2. The cryptographic **key identifier**

### Key Identifier

The key Identifier is the [Base58](https://en.wikipedia.org/wiki/Base58)-encoded,
[SHA-256](https://en.wikipedia.org/wiki/SHA-2) digest of an entity's
public key, which is stored in their DID document on any ixo protocol blockchain ledger.

The ABNF of the key-id is as follows:

```
key-id = 44*(base58)
base58 = "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" / "A" / "B" /
         "C" / "D" / "E" / "F" / "G" / "H" / "J" / "K" / "L" / "M" / "N" /
         "P" / "Q" / "R" / "S" / "T" / "U" / "V" / "W" / "X" / "Y" / "Z" /
         "a" / "b" / "c" / "d" / "e" / "f" / "g" / "h" / "i" / "j" / "k" /
         "m" / "n" / "o" / "p" / "q" / "r" / "s" / "t" / "u" / "v" / "w" /
         "x" / "y" / "z"
```


## DID and IID Documents

A DID in the ixo namespace has the syntax:
```
did:ixo:entity:abc123
```
The DID resolves to a **DID Document** that describes how to securely interact with the controller of the DID using cryptographic verification methods and relationships, and service endpoints.

**Verification Methods** including cryptographic public keys and blockchain accounts are used to establish verification relationships for the purpose of authentication, assertion, capability delegation, or capability invocation.

A standard format DID Document object defines these **verification relationships**, together with the specific cryptographic method associated with each verification purpose.

DID-URLs extend the base DID syntax to support ```/path```, ```?query```, and ```#fragment``` parts. 
IIDs use the ```/path``` and ```#fragment``` parts of URLs for IID References and IID Resources.

## ixo Entities
Entities recorded in the ixo DID registry are identified with the prefix `did:ixo:entity:` 
These entities are:
1. Unique within the ixo namespace.
2. May be of any `Entity Type` that is recorded in the Entity Metadata. Types are defined by users.
3. May provide a range of Service Endpoints for routing to both on-chain and off-chain services, such as the entity's CellNode data store.
4. May link to verifiable on-chain and off-chain resources of any media type.
5. May have rights accorded to the entity or its owner/s and controller/s. This may include machine-executable rights that are executed with the verification methods associated with the entity, using mechanisms such as Authorization Capabilities (zCaps)to access, invoke and transact with both on-chain and off-chain services.
6. May be linked to other entities, to establish explicit and verifiable relatonships between entities.
7. May be linked to Verifiable Claims that are made about the entity, or by the entity.
8. May record verifiable metadata about they entity's validity period, credentials, status, or other public information.
9. May have one or more Entity Account/s that hold digital assets owned by the entity, which get carried with the entity if the entity is transferred to a new owner.
10. May be transferred to a new owner, with verifiable provenance and chain-of-custody, including across registry systems. 

## JSON-LD Context Definition
{To Do}

## Core Data Model
{To Do}

## Linked Resources

The `linkedResource` property provides a privacy-enabled way to attach
digital resources to entities. This is an optional property which
may contain one or more resource descriptors in array.
This property provides the metadata required for
accessing and using the specified resource, such as: the type of resource, a proof to
verify the resource, and a service endpoint for requesting and retrieving the
resource.

## Basic Concepts
{To Do}

## Privacy Considerations

Since DIDs can be resolved by anyone, care should be taken to ensure the DID Document does not contain any sensitive personal information. No personal information must be stored inin the DID document.

{To Do}

## Reference Implementations
{To Do}

## Implementation Notes
{To Do}



Syntax 
=======

Follows the DID Core Syntax [[1]](#ref1)

```abnf
 iid = did                                           
                                                     
 did = "did:" method-name ":" method-specific-id 
                                                     
 method-name = 1*method-char                        
                                                     
 method-char = %x61-7A / DIGIT                       
                                                     
 method-specific-id = *( *idchar ":" ) 1*idchar 
                                                     
 idchar = ALPHA / DIGIT / "." / "-" / "_"     
```

IID References and IID Resources are DID-URLs (or equivalently, IID-URLs), with
additional detail from RFC3986 [[2]](#ref2):
```abnf
iid-url = did-url

did-url = did path-abempty [ "?" query ] [ "#" fragment ]

path-abempty  = *( "/" segment )   ; begins with "/" or is empty

query       = *( pchar / "/" / "?" )

fragment    = *( pchar / "/" / "?" )

pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
```

Verification Methods may be any cryptographic algorithm, including
ed25519, secp256k, and blockchain accounts.

Terminology
===========

1. **DIDs** -- [[Decentralized Identifers]](#ref1). Cryptographically secured global 
identifiers defined by the DID Core specification developed by the W3C.

2. **DID-URLs** -- An extended form of a DID with additional components such as **/path**,
**?query**, and **#fragments** appended to a base DID.

3. **DID document** -- A representation of the meta-data needed to securly interact with a
 DID. Retreived by [[DID resolution]](#Resolution), DID Documents contain verification
 relationship and methods, as well as service endpoints and other method-specific properties.

4. **Resolution** -- The process by which one retrieves or generates a DID Document for a
given DID. Resolution and other DID operations are method-specific and may vary considerably
depending on the design decisions of each particular method.

5. **Dereference**
The process of retreiving a resource, given a URL. Once the DID for a DID-URL is resolved, the returned DID Document provides the information needed to retrieve the resource (if any) represented by the DID-URL.

References
==========

<a name="ref1">[1]</a> Decentralized Identifiers (DIDs) v1.0. World Wide Web Consortium.
Online at
[[https://www.w3.org/TR/did-core/]](https://www.w3.org/TR/did-core/).
Accessed February 15, 2021.

<a id="ref2">[2]</a>  RFC 3986 Uniforn Resource Identifier (URI) : Generic Syntax. IETF. Online at [[https://tools.ietf.org/html/rfc3986]](https://tools.ietf.org/html/rfc3986). Accessed March 31, 2021

<a id="ref3">[3]</a>  Multihash. Multiformats.io. Online at [[https://multiformats.io/multihash/]](https://multiformats.io/multihash/). Access March 31, 2021

<a id="ref4">[4]</a>  NFT-RFC-002 Use Cases and Requirements. InterNFT.org. Online at [[https://github.com/interNFT/nft-rfc/blob/main/nft-rfc-002.md]](https://github.com/interNFT/nft-rfc/blob/main/nft-rfc-002.md)

<a id="ref5">[5]</a>  NFT-RFC-008 Assertions. InterNFT.org. Online at [[https://github.com/interNFT/nft-rfc/blob/main/nft-rfc-008.md]](https://github.com/interNFT/nft-rfc/blob/main/nft-rfc-008.md)

<a id="ref6">[6]</a>  HTTP Range-14. Wikipedia. Online at [[https://en.wikipedia.org/wiki/HTTPRange-14]](https://en.wikipedia.org/wiki/HTTPRange-14)

<a id="ref7">[7]</a>  Token Taxonomy Framework. Interwork Alliance. Online at [[https://github.com/InterWorkAlliance/TokenTaxonomyFramework/blob/main/token-taxonomy.md]](https://github.com/InterWorkAlliance/TokenTaxonomyFramework/blob/main/token-taxonomy.md)

