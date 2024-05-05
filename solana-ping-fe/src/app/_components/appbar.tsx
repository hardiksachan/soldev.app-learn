"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";

interface AppBarProps {}

const AppBar: FC<AppBarProps> = ({}) => {
  return (
    <div className="w-full py-4 px-6 items-center bg-slate-800 text-white flex justify-between">
      <span className="text-xl">Ping SOL</span>
      <WalletMultiButton />
    </div>
  );
};

export default AppBar;
