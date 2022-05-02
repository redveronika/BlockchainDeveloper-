import crypto from "crypto";
import secp256k1 from "secp256k1";

type KeyPair = {
    privateKey: Uint8Array;
    publicKey: Uint8Array;
};

export const generateKeypair = (): KeyPair => {
    let privateKey;
    do {
        privateKey = crypto.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKey));
    const publicKey = secp256k1.publicKeyCreate(privateKey);

    return {
        privateKey,
        publicKey,
    };
};
