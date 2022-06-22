import Logger from "../services/LoggerService";

class CreateMultisigFailedError extends Error {
  data: Record<string, any>; // extra details
  constructor(error: Error, data: Record<string, any> = {}) {
    super("Failed to create multisig account");
    this.data = data;
    this.cause = error;
    Logger.captureException("CreateMultisigFailedError", error);
  }
}

export default CreateMultisigFailedError;
