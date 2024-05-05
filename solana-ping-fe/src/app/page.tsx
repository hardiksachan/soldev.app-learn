import { FC } from "react";
import BalanceDisplay from "./_components/balance-display";
import PingButton from "./_components/ping-button";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="flex flex-col h-[90vh] justify-center gap-y-3 items-center p-2">
      <PingButton />
      <BalanceDisplay />
    </main>
  );
};

export default page;
