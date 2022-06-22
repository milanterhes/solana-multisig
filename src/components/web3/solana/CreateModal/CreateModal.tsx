import {
  Button,
  Divider,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { useState } from "react";
import MultisigClient from "../../../../services/MultisigClient";
import { usePersistedAccounts } from "../../../../web3/solana/AccountsContext";
import { CustomModalProps } from "../ConnectModal";
import { AddOwner } from "./AddOwner";
import { AddressList } from "./AddressList";

const CreateModalContainer: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [owners, setOwners] = useState<PublicKey[]>([]);
  const [threshold, setThreshold] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const { save } = usePersistedAccounts();
  function handleRemove(addr: PublicKey) {
    setOwners((prev) => prev.filter((pk) => pk.toString() !== addr.toString()));
  }

  async function handleCreate() {
    if (wallet) {
      try {
        const msClient = new MultisigClient(connection, wallet);

        const { pubkey: multisigAccount } = await msClient.create(
          owners,
          new BN(threshold),
          wallet,
          connection
        );
        save(name, multisigAccount);
        onClose();
      } catch (error) {
        // show error message in toast
        alert((error as any).cause.message);
      }
    }
  }

  const canCreateMultisig =
    threshold > 0 &&
    threshold <= owners.length &&
    owners.length > 0 &&
    name.length > 0;

  return (
    <CreateModal
      canCreateMultisig={canCreateMultisig}
      handleRemove={handleRemove}
      isOpen={isOpen}
      onClose={onClose}
      owners={owners}
      setOwners={setOwners}
      setThreshold={setThreshold}
      threshold={threshold}
      name={name}
      setName={setName}
      handleCreate={handleCreate}
    />
  );
};

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOwners: React.Dispatch<React.SetStateAction<PublicKey[]>>;
  threshold: number;
  owners: PublicKey[];
  setThreshold: React.Dispatch<React.SetStateAction<number>>;
  handleRemove: (addr: PublicKey) => void;
  canCreateMultisig: boolean;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  handleCreate: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  canCreateMultisig,
  handleRemove,
  isOpen,
  onClose,
  owners,
  setOwners,
  setThreshold,
  threshold,
  name,
  setName,
  handleCreate,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Multisig Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="md" as="h3" mb="2">
            Name:
          </Heading>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={name.length === 0}
          />

          <Divider my="2" />

          <AddOwner
            onCreate={(acc) => {
              setOwners((prev) => [...prev, acc]);
            }}
          />

          <Divider my="2" />

          <Heading size="md" as="h3" mb="2">
            Threshold:
          </Heading>

          <NumberInput
            value={threshold}
            min={1}
            max={owners.length}
            onChange={(e) => {
              setThreshold(Number(e));
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Divider my="2" />

          <Heading size="md" as="h3" mb="2">
            Owner list:
          </Heading>

          <AddressList addrs={owners} onRemove={handleRemove} />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={!canCreateMultisig}
            onClick={handleCreate}
          >
            Create
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModalContainer;
