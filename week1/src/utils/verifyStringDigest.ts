import secp256k1 from "secp256k1";

export const verifyStringDigest = (
    digest: Buffer,
    signature: Uint8Array,
    publicKey: Uint8Array
): boolean => secp256k1.ecdsaVerify(signature, digest, publicKey);
