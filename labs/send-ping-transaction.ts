import "dotenv/config";
import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

const pingProgramId = new PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const pingProgramDataId = new PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

const payer = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

const newBalance = airdropIfRequired(
  connection,
  payer.publicKey,
  1 * LAMPORTS_PER_SOL,
  0.5 * LAMPORTS_PER_SOL
);

const tx = new Transaction();

const ix = new TransactionInstruction({
  programId: pingProgramId,
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
});

tx.add(ix);

const signature = await sendAndConfirmTransaction(connection, tx, [payer]);

console.log(`Transaction Complete. Signature: ${signature}`);
