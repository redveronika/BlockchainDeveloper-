import secp256k1 from "secp256k1";

export const signStringDigest = (
    digest: Buffer,
    privateKey: Uint8Array
): Uint8Array => {
    const { signature } = secp256k1.ecdsaSign(digest, privateKey);
    return signature;
};
