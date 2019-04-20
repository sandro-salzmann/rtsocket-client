"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocket = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RTSocket =
/*#__PURE__*/
function () {
  /**
   * handle response from server to an modifying request
   * @name ModifyCallbackFunction
   * @function
   * @param {"NO_PERMISSIONS_TO_MODIFY"|"SUCCESSFUL_MODIFIED"|"FAILED_TO_MODIFY"} msg response sent by server
   */

  /**
   * configuration for the client
   * @typedef {Object} config configuration for the client
   * @property {socket} config.socket socket.io connection to server
   * @property {Object} config.readScreens what a rtsocketclient renders at which state
   * @property {Object} config.readScreens.loading loading state from component mount to first answer from server
   * @property {String} config.readScreens.loading.text html markup to render
   * @property {Boolean} config.readScreens.loading.showAtDefault true if it should render the text per default, false if not
   * @property {Object} config.readScreens.noPermissionsToRead noPermissionsToRead state when no permissions to read for that query
   * @property {String} config.readScreens.noPermissionsToRead.text html markup to render
   * @property {Boolean} config.readScreens.noPermissionsToRead.showAtDefault true if it should render the text per default, false if not
   * @property {Object} config.readScreens.requestedElementOrListDeleted requestedElementOrListDeleted state when element or list is deleted
   * @property {String} config.readScreens.requestedElementOrListDeleted.text html markup to render
   * @property {Boolean} config.readScreens.requestedElementOrListDeleted.showAtDefault true if it should render the text per default, false if not
   * @property {Object} config.readScreens.requestedElementOrListNotFound requestedElementOrListNotFound state element or list is not found
   * @property {String} config.readScreens.requestedElementOrListNotFound.text html markup to render
   * @property {Boolean} config.readScreens.requestedElementOrListNotFound.showAtDefault true if it should render the text per default, false if not
   * @property {Object} config.readScreens.requestedListEmpty requestedListEmpty state when list is empty
   * @property {String} config.readScreens.requestedListEmpty.text html markup to render
   * @property {Boolean} config.readScreens.requestedListEmpty.showAtDefault true if it should render the text per default, false if not
   * @property {ModifyCallbackFunction} config.handleModifyCallback function to handle callback from rtserver to modifying requests
   */

  /**
   * creates connection to a rtserver and defines some helper methods for change and authentication requests. also lets user define default handler for different states
   * @class RTSocket
   * @param {config} configuration configuration for connection and default handlers
   */
  function RTSocket(config) {
    _classCallCheck(this, RTSocket);

    var socket = config.socket,
        readScreens = config.readScreens,
        handleModifyCallback = config.handleModifyCallback;
    this.socket = socket;
    this.readScreens = readScreens; // || do defaults here

    this.defaultModifyCallback = handleModifyCallback; // || do defaults here
  }
  /**
   * creates a new rtsocket with a config if none has been created yet
   * @static
   * @param {config} config
   * @memberof RTSocket
   */


  _createClass(RTSocket, [{
    key: "change",

    /**
     * request a change in the datasource with a rtmodifydefinition
     * @param {String} name rtmodifydefinition's name
     * @param {Object} queryAttributes rtmodifydefinition needed query attributes
     * @param {String} uuid subscriber component's uuid that values shouldn't be updated by the server
     * @param {ModifyCallbackFunction} customCallback custom callback handler to overwrite the default one
     * @memberof RTSocket
     */
    value: function change(name, queryAttributes, uuid, customCallback) {
      var defaultModifyCallback = this.defaultModifyCallback;
      this.socket.emit(name, queryAttributes, uuid, customCallback || defaultModifyCallback);
    }
    /**
     * authenticates the user by credentials
     * @param {Object} credentials credentials the server has to create an authentication for
     * @param {Function} callback callback for when authentication is created
     * @memberof RTSocket
     */

  }, {
    key: "authenticate",
    value: function authenticate(credentials, callback) {
      this.socket.emit("authenticate", credentials, callback);
    }
  }], [{
    key: "initialize",
    value: function initialize(config) {
      if (this.rtsocket === undefined) {
        this.rtsocket = new RTSocket(config);
      }
    }
    /**
     * gets the created rtsocket or throws an error if none has been created
     * @static
     * @returns {socket} the created rtsocket
     * @memberof RTSocket
     */

  }, {
    key: "getRTSocket",
    value: function getRTSocket() {
      if (this.rtsocket === undefined) {
        throw new Error("rtsocket not initialized");
      } else {
        return this.rtsocket;
      }
    }
  }]);

  return RTSocket;
}();

exports.RTSocket = RTSocket;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocket = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RTSocket =
/*#__PURE__*/
function () {
  function RTSocket(config) {
    _classCallCheck(this, RTSocket);

    var socket = config.socket,
        readScreens = config.readScreens,
        handleModifyCallback = config.handleModifyCallback;
    this.socket = socket;
    this.readScreens = readScreens;
    this.defaultModifyCallback = handleModifyCallback;
  }

  _createClass(RTSocket, [{
    key: "change",
    value: function change(name, queryAttributes, uuid, customCallback) {
      var defaultModifyCallback = this.defaultModifyCallback;
      this.socket.emit(name, queryAttributes, uuid, customCallback || defaultModifyCallback);
    }
  }, {
    key: "authenticate",
    value: function authenticate(credentials, callback) {
      this.socket.emit("authenticate", credentials, callback);
    }
  }], [{
    key: "initialize",
    value: function initialize(config) {
      if (this.rtsocket === undefined) {
        this.rtsocket = new RTSocket(config);
      }
    }
  }, {
    key: "getRTSocket",
    value: function getRTSocket() {
      if (this.rtsocket === undefined) {
        throw new Error("rtsocket-client: rtsocket not initialized. see github readme for more information");
      } else {
        return this.rtsocket;
      }
    }
  }]);

  return RTSocket;
}();

exports.RTSocket = RTSocket;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocketClient = void 0;

var _react = require("react");

var _v = _interopRequireDefault(require("uuid/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RTSocketClient =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RTSocketClient, _PureComponent);

  /**
   * react component that subscribes to a rtreaddefiniton and renders the synchronized data in the render props function
   * @class RTSocketClient
   * @extends {PureComponent}
   * @param {*} props query information
   * @param {String} props.name the name of the rtreaddefinition to request data from
   * @param {*} props.queryAttributes attributes to the specific query
   * @param {renderFunction} props.render function to create html out of the results
   */
  function RTSocketClient(props) {
    var _this;

    _classCallCheck(this, RTSocketClient);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RTSocketClient).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      result: undefined
    });

    _this.uuid = (0, _v["default"])();
    return _this;
  }

  _createClass(RTSocketClient, [{
    key: "componentDidMount",

    /**
     * creates handler for updating component's state from server and subscribes to rtreaddefinition
     * @memberof RTSocketClient
     */
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          name = _this$props.name,
          queryAttributes = _this$props.queryAttributes;
      var uuid = this.uuid;
      RTSocket.getRTSocket().socket.on(uuid, function (result) {
        _this2.setState({
          result: result
        });
      }); // no need for a request when query attributes have undefined in them

      if (this.hasUndefinedChildren(queryAttributes, true)) {
        this.setState({
          type: "QUERY_INCOMPLETE"
        });
        return;
      }

      RTSocket.getRTSocket().socket.emit(name, uuid, queryAttributes);
    }
    /**
     * unsubscribes from rtreaddefinition
     * @memberof RTSocketClient
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      RTSocket.getRTSocket().socket.emit("unsubscribe", this.uuid);
    }
    /**
     * cancels the old subscriptions and create a new one if query attributes have changed
     * @param {*} prevProps
     * @memberof RTSocketClient
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          queryAttributes = _this$props2.queryAttributes,
          name = _this$props2.name;
      var socket = RTSocket.getRTSocket().socket;

      if (JSON.stringify(prevProps.queryAttributes) !== JSON.stringify(queryAttributes)) {
        if (!this.hasUndefinedChildren(prevProps.queryAttributes, true)) {
          socket.emit("unsubscribe", this.uuid);
        }

        if (this.hasUndefinedChildren(queryAttributes, true)) {
          this.setState({
            type: "QUERY_INCOMPLETE"
          });
        } else {
          socket.emit(name, this.uuid, queryAttributes);
        }
      }
    }
    /**
     * checks if variable is undefined, is object with undefined is or array with undefined somewhere nested in it
     * @param {*} item
     * @param {Boolean} isRoot true if it is root element, false if not
     * @returns true if undefined has been found, false if not
     * @memberof RTSocketClient
     */

  }, {
    key: "hasUndefinedChildren",
    value: function hasUndefinedChildren(item, isRoot) {
      var _this3 = this;

      var hasUndefined = isRoot ? false : item === undefined;
      var type = Object.prototype.toString.call(item);

      if (type == "[object Object]") {
        for (var key in item) {
          var child = item[key];
          hasUndefined = hasUndefined || this.hasUndefinedChildren(child, false);
        }
      } else if (type == "[object Array]") {
        item.forEach(function (queryAttribute) {
          hasUndefined = hasUndefined || _this3.hasUndefinedChildren(queryAttribute, false);
        });
      }

      return hasUndefined;
    }
    /**
     * render the appropriate screen to the results from the server
     * @returns {String} HTML Markup
     * @memberof RTSocketClient
     */

  }, {
    key: "render",
    value: function render() {
      var result = this.state.result;
      var showLoading = this.props.showLoading;
      var loading = RTSocket.getRTSocket().readScreens.loading;

      if (result === undefined) {
        return this.getScreen(loading, showLoading);
      } else {
        this.renderResult();
      }
    }
    /**
     * renders a result that isn't undefined. if result isn't any of the string types the props render function gets called
     * @param {"NO_PERMISSIONS_TO_READ"|"REQUESTED_ELEMENT_OR_LIST_DELETED"|"REQUESTED_ELEMENT_OR_LIST_NOT_FOUND"|"REQUESTED_LIST_EMPTY"|*} result result to render
     * @memberof RTSocketClient
     */

  }, {
    key: "renderResult",
    value: function renderResult(result) {
      var uuid = this.uuid;
      var _this$props3 = this.props,
          render = _this$props3.render,
          showNoPermissionsToRead = _this$props3.showNoPermissionsToRead,
          showRequestedElementDeleted = _this$props3.showRequestedElementDeleted,
          showRequestedElementOrListNotFound = _this$props3.showRequestedElementOrListNotFound,
          showRequestedListEmpty = _this$props3.showRequestedListEmpty;
      var _RTSocket$getRTSocket = RTSocket.getRTSocket().readScreens,
          noPermissionsToRead = _RTSocket$getRTSocket.noPermissionsToRead,
          requestedElementDeleted = _RTSocket$getRTSocket.requestedElementDeleted,
          requestedElementOrListNotFound = _RTSocket$getRTSocket.requestedElementOrListNotFound,
          requestedListEmpty = _RTSocket$getRTSocket.requestedListEmpty;

      switch (result) {
        case "NO_PERMISSIONS_TO_READ":
          return this.getScreen(noPermissionsToRead, showNoPermissionsToRead);

        case "REQUESTED_ELEMENT_OR_LIST_DELETED":
          return this.getScreen(requestedElementDeleted, showRequestedElementDeleted);

        case "REQUESTED_ELEMENT_OR_LIST_NOT_FOUND":
          return this.getScreen(requestedElementOrListNotFound, showRequestedElementOrListNotFound);

        case "REQUESTED_LIST_EMPTY":
          return this.getScreen(requestedListEmpty, showRequestedListEmpty);

        default:
          return render(result, uuid);
      }
    }
    /**
     * get the screen by the default screen and the explicit in this component set screen
     * @param {Object} screen screen informations
     * @param {Text} screen.text screen text
     * @param {Boolean} screen.showAtDefault true if screen should be shown at default, false if not
     * @param {Boolean} explicitShowScreen true if it's set in component's props to show screen, false if not
     * @returns {Text} screen text
     * @memberof RTSocketClient
     */

  }, {
    key: "getScreen",
    value: function getScreen(screen, explicitShowScreen) {
      return explicitShowScreen === true ? screen.text : explicitShowScreen === false ? "" : screen.showAtDefault ? screen.text : "";
    }
  }]);

  return RTSocketClient;
}(_react.PureComponent);

exports.RTSocketClient = RTSocketClient;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocketClient = void 0;

var _react = require("react");

var _v = _interopRequireDefault(require("uuid/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RTSocketClient =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RTSocketClient, _PureComponent);

  function RTSocketClient(props) {
    var _this;

    _classCallCheck(this, RTSocketClient);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RTSocketClient).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      result: undefined
    });

    _this.uuid = (0, _v["default"])();
    return _this;
  }

  _createClass(RTSocketClient, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          name = _this$props.name,
          queryAttributes = _this$props.queryAttributes;
      var uuid = this.uuid;
      var socket = RTSocket.getRTSocket().socket;
      socket.on(uuid, function (result) {
        _this2.setState({
          result: result
        });
      }); // no need for a request when query attributes have undefined in them

      if (this.hasUndefinedChildren(queryAttributes, true)) {
        this.setState({
          result: "QUERY_INCOMPLETE"
        });
        return;
      }

      socket.emit(name, uuid, queryAttributes);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      RTSocket.getRTSocket().socket.emit("unsubscribe" + this.uuid);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          queryAttributes = _this$props2.queryAttributes,
          name = _this$props2.name;
      var socket = RTSocket.getRTSocket().socket;

      if (JSON.stringify(prevProps.queryAttributes) !== JSON.stringify(queryAttributes)) {
        if (!this.hasUndefinedChildren(prevProps.queryAttributes, true)) {
          socket.emit("unsubscribe", this.uuid);
        }

        if (this.hasUndefinedChildren(queryAttributes, true)) {
          this.setState({
            result: "QUERY_INCOMPLETE"
          });
        } else {
          socket.emit(name, this.uuid, queryAttributes);
        }
      }
    }
  }, {
    key: "hasUndefinedChildren",
    value: function hasUndefinedChildren(item, isRoot) {
      var _this3 = this;

      var hasUndefined = isRoot ? false : item === undefined;
      var type = Object.prototype.toString.call(item);

      if (type == "[object Object]") {
        for (var key in item) {
          var child = item[key];
          hasUndefined = hasUndefined || this.hasUndefinedChildren(child, false);
        }
      } else if (type == "[object Array]") {
        item.forEach(function (queryAttribute) {
          hasUndefined = hasUndefined || _this3.hasUndefinedChildren(queryAttribute, false);
        });
      }

      return hasUndefined;
    }
  }, {
    key: "render",
    value: function render() {
      var result = this.state.result;
      var _this$props3 = this.props,
          showLoading = _this$props3.showLoading,
          showQueryIncomplete = _this$props3.showQueryIncomplete;
      var _RTSocket$getRTSocket = RTSocket.getRTSocket().readScreens,
          loading = _RTSocket$getRTSocket.loading,
          queryIncomplete = _RTSocket$getRTSocket.queryIncomplete;

      if (result === undefined) {
        return this.getScreen(loading, showLoading);
      } else if (result === "QUERY_INCOMPLETE") {
        return this.getScreen(queryIncomplete, showQueryIncomplete);
      } else {
        return this.renderResult(result);
      }
    }
  }, {
    key: "renderResult",
    value: function renderResult(result) {
      var uuid = this.uuid;
      var _this$props4 = this.props,
          render = _this$props4.render,
          showNoPermissionsToRead = _this$props4.showNoPermissionsToRead,
          showRequestedElementDeleted = _this$props4.showRequestedElementDeleted,
          showRequestedElementOrListNotFound = _this$props4.showRequestedElementOrListNotFound,
          showRequestedListEmpty = _this$props4.showRequestedListEmpty;
      var _RTSocket$getRTSocket2 = RTSocket.getRTSocket().readScreens,
          noPermissionsToRead = _RTSocket$getRTSocket2.noPermissionsToRead,
          requestedElementDeleted = _RTSocket$getRTSocket2.requestedElementDeleted,
          requestedElementOrListNotFound = _RTSocket$getRTSocket2.requestedElementOrListNotFound,
          requestedListEmpty = _RTSocket$getRTSocket2.requestedListEmpty;

      switch (result) {
        case "NO_PERMISSIONS_TO_READ":
          return this.getScreen(noPermissionsToRead, showNoPermissionsToRead);

        case "REQUESTED_ELEMENT_OR_LIST_DELETED":
          return this.getScreen(requestedElementDeleted, showRequestedElementDeleted);

        case "REQUESTED_ELEMENT_OR_LIST_NOT_FOUND":
          return this.getScreen(requestedElementOrListNotFound, showRequestedElementOrListNotFound);

        case "REQUESTED_LIST_EMPTY":
          return this.getScreen(requestedListEmpty, showRequestedListEmpty);

        default:
          return render(result, uuid);
      }
    }
  }, {
    key: "getScreen",
    value: function getScreen(screen, explicitShowScreen) {
      return explicitShowScreen === true ? screen.text : explicitShowScreen === false ? "" : screen.showAtDefault ? screen.text : "";
    }
  }]);

  return RTSocketClient;
}(_react.PureComponent);

exports.RTSocketClient = RTSocketClient;
