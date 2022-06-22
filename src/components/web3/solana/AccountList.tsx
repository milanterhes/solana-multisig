import { Container, HStack, Text, VStack } from "@chakra-ui/react";
import {
  PersistedAccount,
  usePersistedAccounts,
} from "../../../web3/solana/AccountsContext";
import PubkeyComponent from "./PubkeyComponent";

const AccountListContainer = () => {
  const { accounts } = usePersistedAccounts();
  return <AccountList accounts={accounts} />;
};

const AccountList: React.FC<{ accounts: PersistedAccount[] }> = ({
  accounts,
}) => {
  return (
    <Container maxW="container.xl" as={VStack}>
      <Text>Your multisig accounts:</Text>
      {accounts.length > 0 &&
        accounts.map((acc) => (
          <HStack columnGap="4" justify="space-between" key={acc.name}>
            <Text key={acc.name}>{acc.name}:</Text>
            <PubkeyComponent pk={acc.pubkey} />
          </HStack>
        ))}
      {!(accounts.length > 0) && (
        <Text>No stored account found, create a new one</Text>
      )}
    </Container>
  );
};

export default AccountListContainer;
