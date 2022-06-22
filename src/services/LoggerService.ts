// here would be logic to post logs to somewhere like sentry
class Logger {
  static logEvent(eventName: string, data: Record<string, any>) {
    console.log(eventName, data);
  }
  static captureException(message: string, e: any) {
    console.log("exception:", message, e);
  }
}

export default Logger;
