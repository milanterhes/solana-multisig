import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { SolanaWalletModalContext } from "../web3/solana/SolanaContext";
import { Navbar } from "./Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const solanaWalletModalDisc = useDisclosure();
  return (
    <SolanaWalletModalContext.Provider value={solanaWalletModalDisc}>
      <Navbar />
      <Box as="main" flex="1">
        {children}
      </Box>
    </SolanaWalletModalContext.Provider>
  );
};

export default Layout;
