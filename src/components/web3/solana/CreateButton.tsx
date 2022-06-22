import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CreateModal from "./CreateModal/CreateModal";

const CreateButton: React.FC<ButtonProps> = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} {...props}>
        Create Multisig Wallet
      </Button>
      <CreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CreateButton;
