import { Image } from "@chakra-ui/image";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";

export const AdapterIcon: React.FC<{ icon: WalletAdapterProps["icon"] }> = ({
  icon,
}) => {
  return <Image maxW="40px" src={icon} />;
};
