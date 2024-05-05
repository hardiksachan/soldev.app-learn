"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { FC } from "react";

interface PingButtonProps {}

const PingButton: FC<PingButtonProps> = ({}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  return (
    <button
      onClick={async () => {
        if (!connection || !publicKey) {
          console.log("No wallet connected...");
          return;
        }

        const programId = new PublicKey(
          "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
        );
        const programDataId = new PublicKey(
          "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
        );

        const tx = new Transaction();

        const ix = new TransactionInstruction({
          programId,
          keys: [{ pubkey: programDataId, isSigner: false, isWritable: true }],
        });

        tx.add(ix);

        const signature = await sendTransaction(tx, connection);
        console.log(signature);
      }}
      className="bg-slate-800  hover:bg-slate-900 text-white font-semibold py-2 px-6 rounded-full"
    >
      Ping
    </button>
  );
};

export default PingButton;
