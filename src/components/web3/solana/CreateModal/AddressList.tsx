import { CloseIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import PubkeyComponent from "../PubkeyComponent";

interface AddressListProps {
  onRemove?: (acc: PublicKey) => void;
  addrs: PublicKey[];
}
export const AddressList: React.FC<AddressListProps> = ({
  addrs,
  onRemove,
}) => (
  <Box>
    {addrs.map((addrs) => (
      <HStack key={addrs.toString()} justify="space-between">
        <PubkeyComponent pk={addrs} />
        {onRemove && (
          <CloseIcon cursor="pointer" onClick={() => onRemove(addrs)} />
        )}
      </HStack>
    ))}
  </Box>
);
