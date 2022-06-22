import { UseDisclosureProps } from "@chakra-ui/hooks";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  ExodusWalletAdapter,
  PhantomWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { PropsWithChildren, useMemo } from "react";

const SolanaContext: React.FC<PropsWithChildren> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolletWalletAdapter(),
      new ExodusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={"http://127.0.0.1:8899"}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

type RequiredDisclosure = Required<
  Pick<UseDisclosureProps, "isOpen" | "onClose" | "onOpen">
>;

export const SolanaWalletModalContext = React.createContext<RequiredDisclosure>(
  {
    isOpen: false,
    onClose: () => {},
    onOpen: () => {},
  }
);

export default SolanaContext;
