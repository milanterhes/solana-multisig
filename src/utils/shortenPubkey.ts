import { PublicKey } from "@solana/web3.js";

function shortenPubkey(pk: PublicKey) {
  return `${pk.toString().slice(0, 6)}...${pk.toString().slice(-6)}`;
}

export default shortenPubkey;
