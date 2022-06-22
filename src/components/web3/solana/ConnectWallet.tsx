import { Button } from "@chakra-ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect } from "react";
import idl_json from "../../../../multisig/target/idl/serum_multisig.json";
import { SolanaWalletModalContext } from "../../../web3/solana/SolanaContext";
import { AdapterIcon } from "./AdapterIcon";
import ConnectModal from "./ConnectModal";

type MultisigIdl = typeof idl_json; // this doesn't work with Program generic for some reason

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
  const { connected, connecting, wallet } = useWallet();
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
