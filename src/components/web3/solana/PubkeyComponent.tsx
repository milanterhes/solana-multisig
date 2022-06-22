import { Box, Text, Tooltip } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import shortenPubkey from "../../../utils/shortenPubkey";

const PubkeyComponent: React.FC<{ pk: PublicKey }> = ({ pk }) => {
  // const toast = useToast();
  function handleCopy() {
    // show notification, but toast doesn't work
    // toast({
    //   title: "test",
    //   status: "success",
    //   position: "top",
    // });
    alert("Copied pubkey to clipboard");
    navigator.clipboard.writeText(pk.toString());
  }
  return (
    <Tooltip label={pk.toString()}>
      <Box p="1" bgColor="gray.500" borderRadius="md">
        <Text cursor="pointer" onClick={handleCopy}>
          {shortenPubkey(pk)}
        </Text>
      </Box>
    </Tooltip>
  );
};

export default PubkeyComponent;
