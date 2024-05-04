import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("[INFO] Keypair loaded successfully!");
console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
