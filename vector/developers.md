# Developer Guide – IXO Vector Protocol

*A workflow for Vector Claims, Vector-Claim Credentials, and Reference Vectors on the IXO Platform*

---

### **1 Definitions**

| **Token** | **Artefact** | **Description** |
| --- | --- | --- |
| VC | Vector Claim | Float array representing one evidence item or assertion. |
| VCC | Vector-Claim Credential | W3C Verifiable Credential wrapping one or more Vector Claims plus provenance proof. |
| RV | Reference Vector | Canonical vector stored on-chain or in a DAO-governed registry; used as similarity target. |

All vectors are L2-normalised float32 arrays unless otherwise noted.

---

### **2 Architecture snapshot**

1. Edge or server model encodes evidence → VC.
2. Issuer signs VC + metadata → VCC (JSON-LD).
3. VCC CID posted via MsgSubmitClaim to IXO Blockchain.
4. vector-eval smart contract pulls VCC, verifies signature + optional zk-proof.
5. Contract computes cosine(V, RV) → writes result to Claim state through msgEvaluateClaim.
6. If ≥ τ, downstream logic trigger (bond payout, alert, Impact Credit mint) executes.

---

### **3 Creating a Vector Claim**

```
import { encodeEvidence } from '@ixo/ivp-sdk';

// evidence: Buffer | string | structured object
const vector = await encodeEvidence({
  modelId: 'cook_v1.0.3',
  evidencePath: '/data/2025-05-20T00.csv'
});          // returns Float32Array length 256

// persist as base64url
const b64 = Buffer.from(new Float32Array(vector).buffer).toString('base64url');
```

Requirements

- Model hash in Protocol → DAO-governed.
- Post-normalisation L2 length ≈ 1.0 ± 1e-4.
- Deterministic output (same bytes → same vector).

---

### **4 Issuing a Vector-Claim Credential**

```
{
  "@context":[
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/ixo/vcc/v1"
  ],
  "id":"urn:uuid:a8f9…",
  "type":["VerifiableCredential","VectorClaimCredential"],
  "issuer":"did:ixo:5Gr…",
  "issuanceDate":"2025-05-20T08:30:11Z",
  "credentialSubject":{
    "id":"did:ixo:entity:QmX…",
    "vectorClaim":{
      "modelId":"cook_v1.0.3",
      "dataCommitment":"sha256:34ab…",     // Merkle root
      "vector":"<base64url>"
    }
  },
  "proof":{
    "type":"EcdsaSecp256k1Signature2020",
    "created":"2025-05-20T08:30:12Z",
    "verificationMethod":"did:ixo:5Gr#keys-1",
    "jws":"eyJ…"
  }
}
```

Optional fields

- zkProof – Halo 2 or Groth16 proof blob.
- coveragePct – for partial results, such as actual telemetry events per month vs expected.
- geo – geohash if spatial queries needed.

---

### **5 Posting to Impact Hub**

```
import { submitVectorClaim } from '@ixo/impacthub-js';

await submitVectorClaim({
  credentialCid: 'bafybeigd…',    // IPFS pin
  claimType: 'cookstove.monthlyUsage',
  claimant: 'did:ixo:5Gr…'
});
```

The transaction emits ClaimSubmitted event with claimId.

---

### **6 Registering a Reference Vector on a Protocol**

```
import { registerRV } from '@ixo/ivp-registry';

await registerRV({
  vector: base64RV,
  metric: 'cosine',
  purpose: 'cleanCooking256',
  version: '1.0.0'
});
```

DAO vote required for new RV or threshold updates.

---

### **7 Smart-contract verification (Rust pseudo-code)**

```
pub fn verify(claim: VCC, rv_id: Vec<u8>, tau: f32) -> Result<bool> {
    claim.verify_sig()?;
    if let Some(proof) = claim.zkproof {
        verify_zk(proof)?;
    }
    let v = claim.vector();
    let rv = load_rv(rv_id)?;
    let sim = cosine(&v, &rv)?;
    if sim >= tau {
        Ok(true)
    } else {
        Err(Error::SimilarityTooLow(sim))
    }
}
```

cosine must be deterministic and use 1e-6 epsilon guard.

---

### **8 Consuming results**

- **Bond module** – release tranche if verify = true.
- **Oracle indexer** – store similarity time-series for drift plots.
- **Alert service** – webhook on SimilarityTooLow events.

---

### **9 SDK snippets**

*Creating an RV from sample vectors*

```
import { meanVector } from '@ixo/ivp-sdk';

const rv = meanVector(sampleVectors);
await registerRV({vector: rvB64, purpose:'dengue.outbreak'});
```

*Quick verify off-chain*

```
import { verifyVCC } from '@ixo/ivp-sdk';

const ok = await verifyVCC(vccJson, 'cleanCooking256', 0.92);
```

---

### **10 Storage & stream guidance**

| **Vector length** | **Storage hint** | **Transfer** |
| --- | --- | --- |
| ≤ 512 | Inline base64 in VCC |  |
| >512, ≤ 4096 | CID pointing to encrypted blob |  |
| Streaming (IoT) | Batch 24h windows, compute VC on gateway |  |

---

### **11 Security checklist**

- Rotate issuer keys yearly; publish DID doc updates.
- Run outlier detector on on-chain indexer; auto-pause if Mahalanobis > 3 σ.
- Pin RV hashes; any tampering slashes proposer stake.
- Encrypt raw evidence with per-claim AES-GCM in IXO-Matrix; share via capability token.

---

### **12 Versioning rules**

- **Model** major bump ⇒ new modelId and DAO vote.
- **RV** minor bump (centroid shift) ⇒ update claim thresholds; historical claims re-eval optional.
- **Credential context** additions are backwards-compatible; never remove fields.

---

### **13 Minimal quick-start**

1. npm i @ixo/ivp-sdk @ixo/impacthub-js
2. Encode evidence → VC.
3. Wrap + sign → VCC.
4. Pin to IPFS, submit claim.
5. Watch SimilarityPassed events.

---

### **14 Resources**

- [IVP reference spec](https://github.com/ixofoundation/ixo-protocol/blob/5d235d2ace6dceff6fbe023423708f512204017a/vector/ivp-spec.md#L4)
- Example models and archetypes (TODO: Link to Reference Protocols)

Happy vectorising — and help build Earth's Digital Immune System.
