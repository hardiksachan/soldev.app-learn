import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

const LAMPORTS_TO_SEND = 5000;

const suppliedReceiverPublicKey = process.argv[2];
if (!suppliedReceiverPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}
console.log(`Receiver Public Key: ${suppliedReceiverPublicKey}`);

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const receiverPublicKey = new PublicKey(suppliedReceiverPublicKey);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
  "Loaded our own keypair, the destination public key, and connected to Solana."
);

const sendSolIx = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey: receiverPublicKey,
  lamports: LAMPORTS_TO_SEND,
});

const tx = new Transaction();
tx.add(sendSolIx);

const signature = await sendAndConfirmTransaction(connection, tx, [
  senderKeypair,
]);

console.log(`Sent ${LAMPORTS_TO_SEND} to ${receiverPublicKey}`);
console.log(`Transaction signature: ${signature}`);
