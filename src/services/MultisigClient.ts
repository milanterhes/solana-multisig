import {
  AnchorProvider,
  BN,
  Idl,
  Program,
  Wallet,
} from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import idl_json from "../../multisig/target/idl/serum_multisig.json";
import CreateMultisigFailedError from "../errors/CreateMultisigFailed";
import InitMultisigFailed from "../errors/InitMultisigFailed";

class MultisigClient {
  program: Program;

  constructor(connection: Connection, anchorWallet: AnchorWallet) {
    const provider = new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "recent",
      commitment: "recent",
    });
    this.program = new Program(
      idl_json as Idl,
      // TODO: remove hardcoded address
      "CbnTipBdpTjtGH8vkCtTsZmqCVJZyWJeMY6QUwddJzed",
      provider
    );
  }

  private async initMultisigAccounts() {
    try {
      const newMultisigAccount = Keypair.generate();

      const [_multisigSigner, nonce] = await PublicKey.findProgramAddress(
        [newMultisigAccount.publicKey.toBuffer()],
        this.program.programId
      );

      const multisigSize = 200;

      return {
        newMultisigAccount,
        nonce,
        multisigSize,
      };
    } catch (error) {
      throw new InitMultisigFailed(error as Error);
    }
  }

  async create(
    owners: PublicKey[],
    threshold: BN,
    wallet: AnchorWallet,
    connection: Connection
  ) {
    const { multisigSize, newMultisigAccount, nonce } =
      await this.initMultisigAccounts();

    try {
      const txId = await this.program.rpc.createMultisig(
        owners,
        threshold,
        nonce,
        {
          accounts: {
            multisig: newMultisigAccount.publicKey,
          },
          instructions: [
            await this.program.account.multisig.createInstruction(
              newMultisigAccount,
              multisigSize
            ),
          ],
          signers: [newMultisigAccount],
        }
      );

      return { pubkey: newMultisigAccount.publicKey, txId };
    } catch (error) {
      throw new CreateMultisigFailedError(error as Error, {
        owners,
        threshold,
        nonce,
        extra: {
          accounts: {
            multisig: newMultisigAccount.publicKey,
          },
          instructions: [
            await this.program.account.multisig.createInstruction(
              newMultisigAccount,
              multisigSize
            ),
          ],
          signers: [newMultisigAccount],
        },
      });
    }
  }
}

export default MultisigClient;
