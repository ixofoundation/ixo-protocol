# 🤖 `@ixo/ivp-conformance` — Agent Operating Manual

Welcome, Large‑Language‑Model (LLM) agent! This file tells you **how to interact with this repository safely and productively**.

> If you are a human contributor, you can skim this to see the conventions the repo expects; nothing here is secret.

---

## 1  Mission

Your job is to help developers **validate, extend, and refactor** the IXO Vector Protocol conformance suite.
Specifically you may be asked to:

* generate new Jest test‑cases,
* transform or add fixture data (Vector Claims, VCCs, RVs),
* refactor TypeScript utilities under `@ixo/ivp-sdk`,
* keep documentation in sync with code changes,
* propose code‑quality improvements.

You **must not** introduce breaking API changes unless explicitly instructed.

---

## 2  Repository Layout (recap)

```
.
├── src
│   ├── ivp-conformance.test.ts   ← core test suite
│   ├── fixtures/                 ← sample artefacts
│   └── …                         ← additional .test.ts files
├── README.md                     ← usage guide
├── AGENT.md                      ← this file
├── package.json                  ← scripts & deps (jest, ts-jest, ivp-sdk)
└── tsconfig.json                 ← compiler options
```

---

## 3  Environment Assumptions

| Tool       | Version | Notes                                                  |
| ---------- | ------- | ------------------------------------------------------ |
| Node       | ≥ 18.x  | `nvm use` chooses correct version if `.nvmrc` present. |
| npm        | ≥ 9.x   | `npm ci` used in CI.                                   |
| TypeScript | 5.x     | Strict mode enabled.                                   |
| Jest       | 29.x    | Via `ts-jest`.                                         |

*CI runs* `npm test` and fails the job on any warning or lint error.

---

## 4  Command Palette

```bash
# install deps
npm ci

# run all tests
npm test

# run a single test file
npx jest src/new-case.test.ts

# fix prettier + eslint issues
npm run lint:fix

# compile TS (no tests)
npm run build
```

>  **Agent tip 🧠** Use these commands in your reasoning to check that the repository stays green before proposing changes.

---

## 5  Coding Conventions

* **Language** – TypeScript ES2020, `strictNullChecks` on.
* **Formatting** – Prettier defaults (width = 80 chars). Run `npm run lint:fix`.
* **Tests** – Filename suffix `*.test.ts` or `*.spec.ts`. Each test should be deterministic and < 250 ms.
* **Imports** – Always use ESM syntax (`import { foo } from "@pkg"`). No `require`.
* **Error Handling** – Prefer `expect(asyncFn).rejects.toThrow()` for async error tests.
* **Commit Messages** – Conventional Commits style (`feat:`, `fix:`, `docs:` …).

---

## 6  Task Templates

### 6.1  Adding a new conformance test

1. Create `src/<feature>.test.ts`.
2. Import helpers from `@ixo/ivp-sdk`.
3. Add fixtures under `src/fixtures/`.
4. Ensure `npm test` passes.
5. Update `README.md` if the public interface expands.

### 6.2  Updating fixtures

* Keep raw vectors in **base64url** text files to avoid Git’s binary diff noise.
* Reflect fixture changes in existing tests; never silently break expectations.

### 6.3  Dependency bumps

* Modify `package.json` and run `npm update`.
* Re‑run tests; fix type errors caused by new major versions.

---

## 7  Security Rules

* **No secrets** – Never commit private keys, tokens, or raw personal data.
* **Determinism** – Avoid Math.random() in code paths unless seeded or mocked.
* **Supply‑chain** – Prefer audited packages; for new deps, document why.

---

## 8  Limits

\* **Single PR rule** – Each PR should focus on one logical change.
\* **10 kLoC ceiling** – Large refactors need human review approval in advance.
\* **No external network calls** in tests; use fixtures/mocks.

---

## 9  Meta

*License*: MIT © IXO World AG 2025
*Contact*: [dev@ixo.world](mailto:dev@ixo.world) or open an issue.

Happy coding – and keep the vectors ✅!
