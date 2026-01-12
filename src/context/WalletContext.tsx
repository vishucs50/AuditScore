"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import { ethers } from "ethers";

type WalletContextType = {
  address: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [sdk, setSdk] = useState<MetaMaskSDK | null>(null);

  // ✅ Init MetaMask ONLY in browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    const instance = new MetaMaskSDK({
      dappMetadata: {
        name: "AuditScore",
        url: "https://auditscore.vercel.app",
      },
    });

    setSdk(instance);
  }, []);

  async function connect() {
    if (!sdk) return;

    const ethereum = sdk.getProvider();
    if (!ethereum) return;

    const accounts = (await ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    if (!accounts?.length) return;

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
  if (!ctx) {
    throw new Error("useWallet must be used inside WalletProvider");
  }
  return ctx;
}
