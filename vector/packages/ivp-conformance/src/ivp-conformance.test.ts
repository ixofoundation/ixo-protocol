/*
 * @ixo/ivp-conformance
 * Reference conformance tests for IXO Vector Protocol (IVP) v1.0
 * Run with: `npm test` (using jest)
 */

import { cosine, verifySignature, verifyZkProof, loadRv } from "@ixo/ivp-sdk";
import { VCC, Vector, RV } from "@ixo/ivp-types";

/** Helper: generate a random L2‑normalised vector */
const randVector = (n: number): Vector => {
  const tmp = Array.from({ length: n }, () => Math.random() - 0.5);
  const norm = Math.sqrt(tmp.reduce((s, v) => s + v * v, 0));
  return Float32Array.from(tmp.map((v) => v / norm));
};

/** 1. Vector‑precision test */
export const vectorPrecision = () => {
  const v = randVector(256);
  const w = randVector(256);
  const ref = v.reduce((s, x, i) => s + x * w[i], 0);
  const sim = cosine(v, w);
  expect(Math.abs(ref - sim)).toBeLessThanOrEqual(1e-4);
};

/** 2. Threshold calibration – given a validation set, false‑positive rate ≤ 2.5 %  */
export const thresholdCalibration = async (
  validationSet: Array<{ vc: Vector; label: "pos" | "neg" }>,
  rv: RV,
  tau: number
) => {
  let falsePos = 0,
    negTotal = 0;
  validationSet.forEach(({ vc, label }) => {
    const passed = cosine(vc, rv.vector) >= tau;
    if (label === "neg") {
      negTotal += 1;
      if (passed) falsePos += 1;
    }
  });
  const fpRate = negTotal ? falsePos / negTotal : 0;
  expect(fpRate).toBeLessThanOrEqual(0.025);
};

/** 3. Credential‑integrity test – any byte flip must break signature */
export const credentialIntegrity = async (vcc: VCC) => {
  // Clone & flip one byte in vector payload
  const tampered = JSON.parse(JSON.stringify(vcc));
  const b = Buffer.from(tampered.credentialSubject.vectorClaim.vector, "base64url");
  b[0] ^= 0xff; // flip bits
  tampered.credentialSubject.vectorClaim.vector = b.toString("base64url");
  expect(await verifySignature(vcc)).toBe(true);
  expect(await verifySignature(tampered)).toBe(false);
};

/** 4. Registry guard – un authorised RV registration must revert */
export const registryGuard = async (candidate: RV, sender: string) => {
  const authorised = await loadRv(candidate.rvId).catch(() => null);
  expect(authorised).toBeNull();
  await expect(async () => {
    /* simulate MsgRegisterRV with unauthorised sender */
    await loadRv.register(candidate, sender);
  }).rejects.toThrow();
};

// Jest entry point

describe("IVP Conformance suite", () => {
  it("Vector precision", vectorPrecision);
  it("Credential integrity", async () => {
    const demo: VCC = require("./fixtures/demo-vcc.json");
    await credentialIntegrity(demo);
  });
  it("Registry guard", async () => {
    const fakeRv: RV = {
      rvId: "rv:fake:v0",
      vector: randVector(128),
      metric: "cosine",
      dimension: 128,
      creator: "did:ixo:badguy",
      version: "0.0.1",
      threshold: 0.0,
      description: "malicious"
    } as any;
    await registryGuard(fakeRv, fakeRv.creator);
  });
});
