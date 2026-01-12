"use client";

import { useWallet } from "@/context/WalletContext";

export default function ConnectWallet() {
  const { address, connect } = useWallet();

  return (
    <button
      onClick={connect}
      className="px-3 py-1.5 rounded bg-primary text-white text-sm"
    >
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}
