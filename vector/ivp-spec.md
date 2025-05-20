# IXO Vector Protocol (IVP) Specification  
*Version 1.0 — Draft for community review*  

---

## 1  Purpose  

IVP defines a standard way to:

1. **Represent evidence as vectors** (**Vector Claims**, *VC*).  
2. **Wrap those vectors in W3C-compatible, tamper-evident credentials** (**Vector-Claim Credentials**, *VCC*).  
3. **Register canonical comparison vectors** (**Reference Vectors**, *RV*) and evaluate similarity on- or off-chain.  
4. **Automate trust decisions** (payouts, alerts, governance triggers) on IXO’s **Impact Hub** blockchain.  

The goal is **interoperable, gas-efficient, and privacy-preserving** proof of real-world outcomes—energy usage, pathogen detection, youth employment, etc.

---

## 2  Terminology  

| Abbrev. | Term | Definition |
|---------|------|------------|
| VC | **Vector Claim** | L2-normalised float array embodying one piece of evidence. |
| VCC | **Vector-Claim Credential** | W3C Verifiable Credential whose `credentialSubject` contains one or more VCs plus provenance proof. |
| RV | **Reference Vector** | Canonical vector (aka archetype or truth vector) stored in the RV Registry and referenced by ID. |
| τ | **Similarity Threshold** | Application-specific cut-off; a VC passes if `cosine(VC,RV) ≥ τ`. |
| IVP | **IXO Vector Protocol** | The complete workflow and data model described herein. |

---

## 3  Data Types  

### 3.1 Vector  

```typescript
type Vector = Float32Array   // L2 norm in [0.999,1.001]

Dimensions (N): 128 ≤ N ≤ 4096.
Encoding: base64url of raw little-endian floats; optionally quantised int8 for storage.
```
### 3.2 Vector Claim (VC) JSON
```json
{
  "modelId": "cook_v1.0.3",
  "vector": "<base64url>",
  "dataCommitment": "sha256:a3b5…",   // Merkle root of raw evidence
  "geo": { "geohash": "k203xy", "timestamp": "2025-05-20T00:00:00Z" },
  "coveragePct": 0.92,                // optional
  "zkProof": "<base64>"               // optional Halo2/Groth16
}
```
### 3.3 Vector-Claim Credential (VCC)

A W3C VC with type = ["VectorClaimCredential"].
Proof must follow EcdsaSecp256k1Signature2020 or Ed25519Signature2020.
The VCC MAY omit the raw vector and instead point to vectorCid.

### 3.4 Reference Vector (RV) Protocol Registry Entry
```json
{
  "rvId": "rv:cleanCooking256:v1",
  "vector": "<base64url>",
  "metric": "cosine",
  "dimension": 256,
  "creator": "did:ixo:entity:abc…",
  "version": "1.0.0",
  "threshold": 0.92,
  "description": "Archetype usage pattern for pellet cookstoves"
}
```
---

## 4  Algorithms

### 4.1 Cosine Similarity (normative)
```
Input : u, v  // float32[N] L2-normalised
Output: s     // float32 in [-1, 1]

s = Σ_i (u[i] * v[i])      // accumulate in float32 or higher
s = clamp(s, -1.0, 1.0)
return round(s, 4)         // 4 decimals
```
Implementation error must not exceed 5×10⁻⁶.

### 4.2 Pass/Fail Rule

pass := ( similarity >= τ )

Where τ is the current threshold in the RV Registry.

---

## 5  On-Chain Modules (Impact Hub)

`Msg` / Query	Purpose
`MsgSubmitClaim{cid, claimType, claimant}`	Stores IPFS CID; emits ClaimSubmitted(claimId)
`MsgRegisterRV{vector, metric, threshold}`	DAO-gated; writes RV entry; emits RVRegistered(rvId)
`QuerySim{claimId, rvId}`	Returns similarity score
`MsgEvaluateClaim{claimId, rvId}`	Verifies VCC sig, optional zkProof, computes cosine; emits `status` code: `8`=VectorSimilarityPassed or `9`=VectorSimilarityFailed

---

## 6  Lifecycle
	1.	Encode evidence → VC (encodeEvidence SDK).
	2.	Issue VCC with issuer DID signature.
	3.	Store VCC in IXO-Matrix -> encrypted room, optional upload to IPFS / Filecoin storage.
	4.	Submit claim via MsgSubmitClaim.
	5.	Automated verifier contract pulls VCC, checks similarity to RV.
	6.	Downstream logic (approve claim payment, mint Impact Token, update alphabond ⍺, alert, DAO vote, etc) uses event outcome.

---

## 7  Security & Privacy

	•	VC vectors may leak sensitive patterns → store vectors encrypted and reveal only similarity proofs if required.
	•	Every model version hash is allow-listed via its Protocol domain entity; unrecognised models are rejected.
	•	zkProof prevents dishonest re-embedding.
	•	Outlier detector on indexer flags Mahalanobis distance > 3σ.

---

## 8  Versioning

Artefact	SemVer bump triggers
Model	Any weight change → new modelId.
RV	Changing vector or threshold bumps minor; changing metric bumps major.
Protocol	Incompatible JSON fields → major; additive fields → minor.

Deprecated versions live at least 12 months; on-chain module maintains compatibility matrix.

---

## 9  Conformance Tests

	1.	Vector Precision – Dot-product deviation ≤ 1×10⁻⁴.
	2.	Threshold Calibration – False positives ≤ 2.5 % on public validation set.
	3.	Credential Integrity – Signature verification must fail on any byte flip.
	4.	Registry Guard – Unauthorised RV registration must revert.

Reference test suite: @ixo/ivp-conformance.

---

## 10  Examples

### 10.1 Cookstove Usage Claim
```
Input: 30 daily sensor slices.
Model: cook_v1.0.3 (256-D CNN).
Vector length: 256.
RV: rv:cleanCooking256:v1, τ = 0.92.
Outcome: Similarity 0.947 → passes → bond pays 1 carbon credit.
```
### 10.2 Genomic Lineage Claim
```
Input: SARS-CoV-2 FASTA.
Model: pango_t5_large (1024-D transformer).
RV: rv:BA2.86:v1, τ = 0.88.
Outcome: Similarity 0.90 → alert contract emits VariantDetected.
```
---

## 11  Change Log

1.0 – Initial draft: data types, on-chain spec, security considerations.


