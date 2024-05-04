import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

const publicKey = new PublicKey("CxTVsL2UksaJrixM9iiXGpJQFaWbcaVF2ZPz9mFrHNcK");
const connection = new Connection(clusterApiUrl("devnet"));
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`Balance for wallet address ${publicKey} is: ${balanceInSOL} SOL`);
