import { Button } from "@chakra-ui/button";
import { UseDisclosureProps } from "@chakra-ui/hooks";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Adapter, WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { AdapterIcon } from "./AdapterIcon";

export type CustomModalProps = Required<
  Pick<UseDisclosureProps, "isOpen" | "onClose">
>;

interface WalletButtonProps {
  adapter: Adapter;
}

const WalletRow: React.FC<WalletButtonProps> = ({ adapter }) => {
  const { select } = useWallet();
  return (
    <HStack cursor="pointer" onClick={() => select(adapter.name)}>
      <AdapterIcon icon={adapter.icon} />
      <Text>{adapter.name}</Text>
    </HStack>
  );
};

const ConnectModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const { wallets } = useWallet();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="flex-start" rowGap="4">
            {wallets
              .filter(
                (w) =>
                  w.readyState === WalletReadyState.Loadable ||
                  w.readyState === WalletReadyState.Installed
              )
              .map((w) => (
                <WalletRow adapter={w.adapter} key={w.adapter.name} />
              ))}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
