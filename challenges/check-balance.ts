import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

try {
  const suppliedPublicKey = process.argv[2];
  if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
  }

  const publicKey = new PublicKey(suppliedPublicKey);
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `Balance for wallet address ${publicKey} is: ${balanceInSOL} SOL`
  );
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log("Failed to fetch balance.");
    console.log(`[DEBUG] ${e.name} - ${e.message}`);
  } else {
    console.log("Failed to fetch balance.");
  }
}
