import Logger from "../services/LoggerService";

class InitMultisigFailed extends Error {
  data: Record<string, any>; // extra details
  constructor(error: Error, data: Record<string, any> = {}) {
    super("Failed to initialize multisig accounts");
    this.data = data;
    Logger.captureException("InitMultisigFailed", error);
  }
}

export default InitMultisigFailed;
