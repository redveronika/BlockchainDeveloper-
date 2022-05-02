import { createHash, Hash } from "crypto";

export const convertStringToDigest = (
    string: string,
    algorithm: string = "sha256"
): Buffer => createHash(algorithm).update(string).digest();
