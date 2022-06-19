import { Button } from "@chakra-ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect } from "react";
import { SolanaWalletModalContext } from "../../../web3/solana/SolanaContext";
import ConnectModal from "./ConnectModal";
import { AdapterIcon } from "./AdapterIcon";

const ConnectButton = () => {
  const { onOpen } = useContext(SolanaWalletModalContext);
  return <Button onClick={onOpen}>Connect Wallet</Button>;
};

const DisconnectButton = () => {
  const { disconnect, wallet } = useWallet();
  return (
    <Button
      onClick={disconnect}
      leftIcon={<AdapterIcon icon={wallet?.adapter.icon || ""} />}
    >
      Disconnect
    </Button>
  );
};

const WalletSelector = () => {
  const { connected, connecting } = useWallet();
  const { isOpen, onClose } = useContext(SolanaWalletModalContext);

  useEffect(() => {
    // after wallet connection, close the modal
    if (connected) {
      onClose();
    }
  }, [connected]);

  function getButton() {
    if (connected) {
      return <DisconnectButton />;
    }
    if (connecting) {
      return <Button>Connecting...</Button>;
    }
    return <ConnectButton />;
  }

  return (
    <>
      {getButton()}
      <ConnectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default WalletSelector;
