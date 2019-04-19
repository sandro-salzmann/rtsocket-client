export class RTSocket {
  
  constructor(config) {
    let { socket, readScreens, handleModifyCallback } = config;

    this.socket = socket;
    this.readScreens = readScreens;
    this.defaultModifyCallback = handleModifyCallback;
  }

  static initialize(config) {
    if (this.rtsocket === undefined) {
      this.rtsocket = new RTSocket(config);
    }
  }

  static getRTSocket() {
    if (this.rtsocket === undefined) {
      throw new Error("rtsocket-client: rtsocket not initialized. see github readme for more information");
    } else {
      return this.rtsocket;
    }
  }

  change(name, queryAttributes, uuid, customCallback) {
    let { defaultModifyCallback } = this;

    this.socket.emit(
      name,
      queryAttributes,
      uuid,
      customCallback || defaultModifyCallback
    );
  }

  authenticate(credentials, callback) {
    this.socket.emit("authenticate", credentials, callback);
  }
}
