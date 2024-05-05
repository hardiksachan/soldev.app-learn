"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

interface BalanceDisplayProps {}

const BalanceDisplay: FC<BalanceDisplayProps> = ({}) => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) return;

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection
      .getAccountInfo(publicKey)
      .then((info) => setBalance((info?.lamports || 0) / LAMPORTS_PER_SOL));
  }, [connection, publicKey]);

  return (
    <div className="px-6 py-4 flex w-fit rounded bg-slate-200 hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-200">
      <p className="uppercase">{publicKey ? `Balance: ${balance} SOL` : ""}</p>
    </div>
  );
};

export default BalanceDisplay;
