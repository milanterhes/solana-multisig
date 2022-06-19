import { useDisclosure } from "@chakra-ui/hooks";
import React, { PropsWithChildren } from "react";
import { SolanaWalletModalContext } from "../web3/solana/SolanaContext";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const solanaWalletModalDisc = useDisclosure();
  return (
    <SolanaWalletModalContext.Provider value={solanaWalletModalDisc}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SolanaWalletModalContext.Provider>
  );
};

export default Layout;
