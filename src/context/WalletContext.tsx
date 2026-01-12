"use client";

import { createContext, useContext, useState } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import { ethers } from "ethers";

type WalletContextType = {
  address: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "AuditScore",
    url: "https://localhost:3000",
  },
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  async function connect() {
    const ethereum = MMSDK.getProvider();
    if (!ethereum) throw new Error("MetaMask not found");

    const accounts = (await ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts returned");
    }

    setAddress(accounts[0]);

    const provider = new ethers.BrowserProvider(ethereum);
    const network = await provider.getNetwork();
    setChainId(Number(network.chainId));
  }

  return (
    <WalletContext.Provider value={{ address, chainId, connect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}
