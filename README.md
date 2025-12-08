# IXO Protocol

IXO Protocol is the specification layer for the IXO Spatial Web and Impact Hub blockchain. It defines the data models, semantics, and coordination rules that let people, organisations, AI agents, and devices cooperate intelligently over shared state.

This repository contains the technical specifications, semantic definitions, and sample artifacts for creating decentralised digital domains and Cognitive Digital Twins on the IXO stack.

---

## Table of contents

- [Overview](#overview)
- [Design goals](#design-goals)
- [What this repository contains](#what-this-repository-contains)
- [Getting started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

IXO Protocol sits at the core of the Spatial Web: a network of digital domains where every relevant entity has a verifiable, programmable representation.

Using the Impact Hub blockchain and IXO’s data layer, the protocol describes how to:

- Identify entities (people, organisations, devices, assets, agents, domains).
- Represent them as digital twins and namespaces with clear semantics.
- Express rights, claims, and state transitions as verifiable records.
- Coordinate workflows and governance across on-chain and off-chain systems.

Entities can represent anything from physical infrastructure (for example a solar array), to logical systems (for example a data pipeline), to Cognitive Digital Twins that encapsulate models, policies, and AI behaviour.

The result is a unified framework for building applications where interactions are:

- Verifiable: backed by immutable, cryptographically secured records.
- Accountable: linked to explicit authorisation and intent.
- Interoperable: based on open web and blockchain standards.

---

## Design goals

IXO Protocol is designed to support intelligent cooperation at internet scale. Key goals:

- **Digital domains as first-class citizens**  
  Model domains (projects, pods, registries, marketplaces, platforms) as typed namespaces that can hold entities, rights, and rules.

- **Cognitive Digital Twins**  
  Represent real-world systems and AI-powered twins with the same abstraction, so that models, policies, and data are governed together.

- **Verifiable interactions**  
  Encode actions as claims, transactions, and events that can be independently verified, audited, and replayed.

- **Interoperable semantics**  
  Build on existing standards (for example W3C DIDs and VCs, JSON-LD, IETF identifiers, IBC and Cosmos-SDK conventions) to integrate with other Web3 and Web 2.0 systems.

- **Programmable workflows**  
  Align with smart contracts and flow engines (for example IXO Flows / Qi) to turn protocol definitions into executable, testable workflows.

---

## What this repository contains

This repository is the canonical reference for the IXO Protocol. Typical contents include:

- **Core specifications**  
  Formal definitions of entities, domains, identifiers, claims, tokens, and smart accounts in the IXO ecosystem.

- **Semantic models**  
  Ontologies, JSON-LD contexts, and type definitions for common Spatial Web entities and relationships.

- **Interaction patterns**  
  Reference flows for onboarding, issuing and evaluating claims, managing digital rights, and coordinating agent actions.

- **Sample artifacts**  
  Example domain definitions, entity schemas, and configuration files that can be used as starting points for new deployments.

- **Implementation notes**  
  Guidance on how the protocol maps to concrete implementations in:
  - Impact Hub (Cosmos SDK modules and CosmWasm contracts)
  - IXO SDKs and services
  - Off-chain data and messaging layers (for example Matrix, CRDT documents)

Exact structure and filenames may evolve over time; refer to the repository root and subdirectories for the most up-to-date layout.

---

## Getting started

This repository is specification-first. To use IXO Protocol in an application or deployment, you will typically:

1. **Read the core specs**  
   Start with the high-level documents that define domains, entities, claims, and tokens. These describe the building blocks you compose.

2. **Pick your implementation layer**  
   - For blockchain and contract work, see the Impact Hub / `ixo-blockchain` and `ixo-contracts` repositories.  
   - For application development, use the TypeScript SDKs (for example `@ixo/impactxclient-sdk`, `@ixo/matrixclient-sdk`, `@ixo/signx-sdk`).

3. **Model your domain**  
   Define the digital domains, entities, and workflows your application needs, using the patterns and example schemas in this repository.

4. **Link to execution**  
   Implement the corresponding smart contracts, flows, or services that realise your protocol definitions on Impact Hub and your data layer.

5. **Test and iterate**  
   Use testnets and devnets to verify that your protocol definitions behave as expected in real flows with real agents (human and AI).

For concrete implementation examples, refer to the documentation and example projects linked from the main IXO organisation README and docs site.

---

## Contributing

Contributions that improve clarity, correctness, and coverage of the protocol are welcome.

To contribute:

1. Fork this repository.
2. Create a new branch:  
   `git checkout -b feature/your-feature-name`
3. Make and document your changes.
4. Ensure any referenced diagrams, schemas, and examples stay consistent.
5. Commit:  
   `git commit -m "Describe your change"`
6. Push:  
   `git push origin feature/your-feature-name`
7. Open a Pull Request explaining:
   - The problem or gap you are addressing.
   - The scope and impact of your changes.
   - Any migration or compatibility considerations.

For more details, see `CONTRIBUTING.md` if present in this repository, or follow the contribution practices used across the IXO organisation.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file in this repository for the full text.

If you are using IXO Protocol in production, especially in regulated or safety-critical environments, ensure your legal and compliance teams review how the specifications and any derived code are applied in your context.
