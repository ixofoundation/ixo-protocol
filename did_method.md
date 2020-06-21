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

Interracting with a Git repo using the CRUD operations on a Git DID is done
using a new Git porcelain command called `git did`. The porcelain command is
called using the following syntax:

```
$ git did <crud-command> <did> [options]
```

The crud-command is one of the following: `create`, `read`, `update`, and
`delete`. The operations do different things depending on the DID that is
passed as the first parameter. There is one special case when the repo DID
regime is being established that the DID is unknown and therefore omitted. To
establish the DID regime over a repo run the following command either inside of
the repository or with the `--repo` option:

```
$ git did create
$ git did create --repo=/foo/bar/baz
```

## CRUD Operations

### Create 

#### Repository DID


#### Contributor DID
