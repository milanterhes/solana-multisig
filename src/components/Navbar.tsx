import { Image } from "@chakra-ui/image";
import { Box, Container, HStack } from "@chakra-ui/layout";
import logoURL from "../assets/logo.png";
import WalletSelector from "./web3/solana/ConnectWallet";

export const Navbar = () => {
  return (
    <Box borderBottom="1px solid #2a2c30">
      <Container
        as={HStack}
        maxW="container.xl"
        my="2"
        justifyContent="space-between"
      >
        <Image maxW="40px" src={logoURL} alt="Logo" />
        <WalletSelector />
      </Container>
    </Box>
  );
};
