import {
  Button,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

interface AddOwnerProps {
  onCreate: (acc: PublicKey) => void;
}

export const AddOwner: React.FC<AddOwnerProps> = ({ onCreate }) => {
  const [addr, setAddr] = useState<string>("");
  // const toast = useToast(); this doesn't work (probably due to vite) so I'll just show a text
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (addr) {
      setError(null);
    }
  }, [addr]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      onCreate(new PublicKey(addr));
      setAddr("");
    } catch (error) {
      setError("invalid address");
    }
  }

  return (
    <AddOwnerForm
      addr={addr}
      error={error}
      handleSubmit={handleSubmit}
      onCreate={onCreate}
      setAddr={setAddr}
    />
  );
};

interface AddOwnerFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  addr: string;
  setAddr: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  onCreate: (acc: PublicKey) => void;
}

const AddOwnerForm: React.FC<AddOwnerFormProps> = ({
  addr,
  error,
  handleSubmit,
  onCreate,
  setAddr,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <VStack alignItems="flex-start">
        <FormLabel htmlFor="address">Add new owner address</FormLabel>
        <Input
          id="address"
          placeholder="Address"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          isInvalid={error !== null}
        />
        {error && <Text color="red">{error}</Text>}
        <HStack>
          <Button type="submit">Add</Button>
          <Button
            onClick={() => {
              // add random pubkey to make testing easier
              onCreate(Keypair.generate().publicKey);
            }}
          >
            Add random
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};
