import { ChakraProvider } from "@chakra-ui/provider";
import { Container } from "@chakra-ui/react";
import Layout from "./components/Layout";
import AccountList from "./components/web3/solana/AccountList";
import CreateButton from "./components/web3/solana/CreateButton";
import theme from "./theme";
import { AccountsProvider } from "./web3/solana/AccountsContext";
import SolanaContext from "./web3/solana/SolanaContext";

function App() {
  return (
    <SolanaContext>
      <ChakraProvider theme={theme}>
        <AccountsProvider>
          <Layout>
            <Container maxW="container.xl">
              <CreateButton my="2" />
              <AccountList />
            </Container>
          </Layout>
        </AccountsProvider>
      </ChakraProvider>
    </SolanaContext>
  );
}

export default App;
