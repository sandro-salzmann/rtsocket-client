export class RTSocket {
  constructor(config) {
    if (config === undefined)
      throw new Error("Missing configuration for RTSocket");

    let { socket, readScreens, handleModifyCallback } = config;

    if (socket === undefined || socket.connected === undefined) {
      throw new Error(
        "Missing or not properly initialized socket in configuration for RTSocket. Try to add 'socket: io(\"<<domain>>:<<port>>\")' to the configuration."
      );
    }
    this.socket = socket;
    this.readScreens = this.completeReadScreens(readScreens);
    this.defaultModifyCallback = handleModifyCallback || function() {};
  }

  completeReadScreens(readScreens = {}) {
    let readScreenKeys = [
      "loading",
      "noPermissionsToRead",
      "requestedElementOrListDeleted",
      "requestedElementOrListNotFound",
      "requestedListEmpty",
      "queryIncomplete"
    ];
    let completedReadScreens = {};
    readScreenKeys.forEach(readScreenKey => {
      completedReadScreens[readScreenKey] = this.completeReadScreen(
        readScreens[readScreenKey]
      );
    });
    return completedReadScreens;
  }

  completeReadScreen(readScreen = {}) {
    return {
      text: readScreen.text || "",
      showAtDefault: readScreen.showAtDefault || false
    };
  }

  static initialize(config) {
    if (this.rtsocket === undefined) {
      this.rtsocket = new RTSocket(config);
    }
  }

  static getRTSocket() {
    if (this.rtsocket === undefined) {
      throw new Error(
        "RTSocket not initialized. You need to call initialize(config) first"
      );
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
