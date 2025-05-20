# IXO Vector Protocol – Conformance Suite

> **Package:** `@ixo/ivp-conformance`
>
> Automated tests that validate implementations of IVP v1.0 (Vector Claims, Vector-Claim Credentials, Reference Vectors).

---

## 📦 What’s in this repo?

| Path                          | Purpose                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/ivp-conformance.test.ts` | Jest test-cases (vector precision, credential integrity, registry guard, threshold calibration). |
| `src/fixtures/`               | Sample Vector-Claim Credentials, reference vectors and validation datasets.                      |
| `package.json`                | Dependencies (`ts-jest`, `@ixo/ivp-sdk`), npm scripts.                                           |
| `tsconfig.json`               | TypeScript build config.                                                                         |

---

## 🔧 Getting started

```bash
# 1 Clone repo
$ git clone https://github.com/ixo-world/ivp-conformance.git
$ cd ivp-conformance

# 2 Install deps
$ npm install   # or pnpm install / yarn install

# 3 Run the test suite
$ npm test      # runs jest with ts-jest
```

### Output

```
 PASS  src/ivp-conformance.test.ts
  ✓ Vector precision (6 ms)
  ✓ Credential integrity (18 ms)
  ✓ Registry guard (3 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

---

## 🗂 Repository layout

```
.
├── src
│   ├── ivp-conformance.test.ts   # Main tests
│   └── fixtures
│       ├── demo-vcc.json         # Example VCC
│       └── ...
├── package.json
└── tsconfig.json
```

---

## ✍️ Writing additional tests

1. **Add sample artefacts** to `src/fixtures/` (e.g. new VCC JSON, RV base64 strings).
2. **Import helper functions** from `@ixo/ivp-sdk` in fresh `.test.ts` files.
3. Register the new tests with Jest—any file that matches `*.test.ts` is auto-discovered.

---

## 🤝 Contributing

Pull requests welcome! Please follow conventional commits and run `npm test` before pushing.

---

## ⚖️ Licence

MIT © IXO World AG 2025
