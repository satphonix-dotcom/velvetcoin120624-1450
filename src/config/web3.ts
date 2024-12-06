import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi';

export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('Missing VITE_WALLET_CONNECT_PROJECT_ID');
}

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export const web3modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: [mainnet],
  themeMode: 'dark',
  themeVariables: {
    '--w3m-font-family': 'Avenir, sans-serif',
    '--w3m-accent-color': '#000000',
  },
});