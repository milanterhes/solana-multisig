import { ChakraProvider } from "@chakra-ui/provider";
import Layout from "./components/Layout";
import theme from "./theme";
import SolanaContext from "./web3/solana/SolanaContext";

function App() {
  return (
    <SolanaContext>
      <ChakraProvider theme={theme}>
        <Layout />
      </ChakraProvider>
    </SolanaContext>
  );
}

export default App;
