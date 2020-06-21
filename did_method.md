# ixo DID Method Specification

*Contributors in alphabetical order:*
* 

*Participate:*
* [File a bug]
* [Commit history]
* [Pull requests]
* [Discussion list]

## About
This [DID method spec](https://w3c-ccg.github.io/did-spec/#specific-did-method-schemes)
conforms to the requirements in the DID specification currently published by
the W3C Credentials Community Group. For more information about DIDs and DID
method specifications, please see the [DID Primer](http://bit.ly/2RX0xm2) and
[DID Spec](https://w3c-ccg.github.io/did-spec/).

## Abstract 


## Status of This Document
Early Draft.



## Introduction

The ixo protocol enables observations about the state of the world to be identified and recorded as verifiable claims. 
These claims are stored in a stateful graph data format. 

Every entity in the Internet of Impact is identified by a decentralised identifier which can be resolved and authenticated.

## Motivation

### Recording verifiable claims about the state of the world

### Resolving data across multiple systems

### Chains of attribution


## Terminology

### Decentralize Identifier (DID)

As described in the [Decentralized identifiers (DIDs)
specification](https://w3c-ccg.github.io/did-spec/), a DID is defined as
consisting of three parts:

1. The URL scheme identifier: "did".
2. The DID method identifier. In this case "ixo".
3. The DID method-specific identifiers.

### Content ID


### Key ID

A key ID is the [Base58](https://en.wikipedia.org/wiki/Base58)-encoded,
[SHA-256](https://en.wikipedia.org/wiki/SHA-2) digest of an entity's
public key, which is stored in their DID document on an ixo blockchain ledger.

## ixo DID Method

The namestring that identifies this DID method is `:ixo`.

A DID that uses this method MUST begin with the following prefix: `did:ixo`.
In accordance with the DID specification, this string MUST be in lowercase. The remainder of
the DID, after the prefix, is the entity identifier specified below.

### Entity Identifier


### JSON-LD Context Definition

### Core Data Model

### Basic Concepts

## Privacy Considerations

Since DIDs can be resolved by anyone, care should be taken to ensure the DID
Document does not contain any sensitive personal information. No personal information must be stored inin the DID document.

## Reference Implementations

## Implementation Notes


#### Key-ID

A key-id is the shorthand version of a public key that is calculated from the
public key bytes itself. A key-id is the Base58 encoding of the SHA-256 digest
of the public key. This allows for a uniform size naming scheme for DID
documents that may have public keys of different sizes and of different
algorithms.

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

#### Aliases



#### Permissions



### Implementation Details

## Resources

The [Peer DID Method
Spec](https://dhh1128.github.io/peer-did-method-spec/index.html) is very similar in nature and can be used as a reference point.
