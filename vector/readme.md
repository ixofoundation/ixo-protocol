# IXO Vector Protocol (IVP)

A trust layer that turns raw evidence into machine-verifiable vectors, wrapped in W3C Verifiable Credentials and enforced by smart contracts on Impact Hub.

**Mission**: Make outcome verification scalable, gas-efficient, and privacy-preserving for every climate, health, and social-impact use-case.

---

## ✨ Why IVP?
	•	Vector ⇄ Credential bridge – Combine the expressiveness of ML embeddings with the auditability of Verifiable Credentials.
	•	Cryptographic provenance – Zero-knowledge proofs show each vector was produced by an authorised model on authorised data.
	•	On-chain automation – Smart contracts evaluate cosine similarity and trigger payouts, alerts, or DAO votes.
	•	Edge-first design – Embedding models run on cookstoves, phones, or gateways to minimise cloud emissions.

---

## 🗂 Monorepo layout
```
ivp/
├── packages/
│   ├── ivp-spec/            # Markdown spec + diagrams
│   ├── ivp-sdk/             # TypeScript helpers (encode, sign, verify)
│   ├── ivp-conformance/     # Jest test-suite for reference implementations
│   └── examples/            # Sample cookstove & pathogen workflows
├── docs/                    # Rendered spec site (Docusaurus)
└── .github/                 # CI (pnpm, lint, build, test)
```
Package naming rule: runtime libs start with @ixo/ivp-…, specs & docs plain folder names.

---

## 🚀 Quick start

### 1 Clone + install (pnpm workspace)
$ git clone https://github.com/ixo-world/ivp.git
$ cd ivp && pnpm install

#### 2 Run full build + tests
$ pnpm build && pnpm test

#### 3 Encode an evidence file to a Vector Claim
$ pnpm --filter ivp-sdk exec ts-node scripts/encode.ts data/sample.csv

Minimum Node ≥ 18, pnpm ≥ 8.

CI uses Ubuntu 22.04, TypeScript 5, Jest 29.

---

## 📦 Core packages

Package	Version	Purpose
`@ixo/ivp-spec`	1.0	Markdown & draw.io source of the IVP specification.
`@ixo/ivp-sdk`	0.x	Encode evidence ➜ vectors, wrap VCCs, verify on/off-chain.
`@ixo/ivp-conformance`	0.x	Reference Jest tests: precision, integrity, registry guard.

Install a lib:

# example consumer project
`yarn add @ixo/ivp-sdk`


---

## 🛠 Development scripts

Script	What it does
`pnpm build`	Runs tsc -b across all packages.
`pnpm test`	Jest across workspace.
`pnpm lint`	ESLint + Prettier check.
`spec:drawio`	Opens spec diagrams in draw.io desktop.


---

## 🤝 Contributing
	1.	Fork & branch from dev.
	2.	Follow Conventional Commits (feat:, fix:, docs:…).
	3.	pnpm test must pass; add/adjust conformance tests if protocol-affecting.
	4.	Open a PR → maintainer review → squash-merge.

See `packages/ivp-conformance/AGENT.md` for LLM-assistant coding guidelines.

---

## 🗺 Roadmap (2025)
	•	v1.0 GA – Finalise spec, DAO ratification, main-net contracts.
	•	Edge model registry & encrypted vector relay.
	•	Cross-domain archetype library (energy, health, biodiversity).
	•	P-2-P inference market PoC.

---

## ⚖️ Licence

MIT © IXO World AG 2025 – see LICENSE.

---

## 🔗 Links
	•	Protocol site – https://ixo.world/ivp
	•	Impact Hub explorer – https://explorer.impacthub.ixo.world
	•	Discord – https://discord.gg/ixoworld
	•	Twitter – https://twitter.com/ixoworld

---

Vectors for meaning, block space for trust.  Welcome to the Agentic Web.
