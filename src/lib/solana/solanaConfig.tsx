import "@solana/wallet-adapter-react-ui/styles.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";

export default function SolanaProviders({ children }: { children: React.ReactNode }) {
  // Tentukan jaringan Solana (Devnet, Testnet, atau Mainnet)
  const network = WalletAdapterNetwork.Devnet;

  // Buat endpoint berdasarkan jaringan
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Tambahkan Phantom Wallet ke dalam daftar dompet
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
