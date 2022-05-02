import chalk from "chalk";
import { generateKeypair } from "./utils/generateKeypair";
import { convertStringToDigest } from "./utils/convertStringToDigest";
import { signStringDigest } from "./utils/signStringDigest";
import { verifyStringDigest } from "./utils/verifyStringDigest";

const checkChatEncryption = (message?: string) => {
    if (!message) {
        console.log(
            chalk.redBright("Please, pass the message as the second argument")
        );
        return;
    }

    // Convert message to hash
    const digest = convertStringToDigest(message);
    console.log(
        chalk.cyanBright(`0. Alice's message:
    - message: ${message}
    - message digest: ${digest.toString("hex")}`)
    );

    // Generate keypair
    const { privateKey, publicKey } = generateKeypair();
    console.log(
        chalk.yellowBright(`
1. Alice aquired new keypair:
    - publicKey: ${Buffer.from(publicKey).toString("hex")}
    - privateKey: ${Buffer.from(privateKey).toString("hex")}`)
    );

    // Sign digest message with private key
    const signature = signStringDigest(digest, privateKey);
    console.log(
        chalk.greenBright(`
2. Alice signed her message digest with her privateKey to get its signature:
    - signature: ${Buffer.from(signature).toString("hex")}`)
    );

    // Verify digest message with signature and public key
    const isVerified = verifyStringDigest(digest, signature, publicKey);
    console.log(
        chalk.magentaBright(`
3. Bob verifyed by 3 elements ("message digest", "signature", and Alice's "publicKey"):
    - is verified: ${isVerified}`)
    );
};

const message = process.argv[2];
checkChatEncryption(message);
