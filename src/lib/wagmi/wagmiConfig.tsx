import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, zkSync } from 'wagmi/chains'; // Impor chains dari wagmi

// Konfigurasi RainbowKit
export const config = getDefaultConfig({
  appName: 'LinkFinity',  // Nama aplikasi Anda
  projectId: '35be8466384b13dcef25a2ee9b7880dc',  // Ganti dengan Project ID Anda dari RainbowKit
  chains: [mainnet, polygon, optimism, arbitrum, base,zkSync],  // Daftar chains yang digunakan
  ssr: false,  // Aktifkan SSR jika aplikasi Anda menggunakan server-side rendering
});
