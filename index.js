"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocket = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RTSocket =
/*#__PURE__*/
function () {
  function RTSocket(config) {
    (0, _classCallCheck2["default"])(this, RTSocket);
    if (config === undefined) throw new Error("Missing configuration for RTSocket");
    var socket = config.socket,
        readScreens = config.readScreens,
        handleModifyCallback = config.handleModifyCallback;

    if (socket === undefined || socket.connected === undefined) {
      throw new Error("Missing or not properly initialized socket in configuration for RTSocket. Try to add 'socket: io(\"<<domain>>:<<port>>\")' to the configuration.");
    }

    this.socket = socket;
    this.readScreens = this.completeReadScreens(readScreens);

    this.defaultModifyCallback = handleModifyCallback || function () {};
  }

  (0, _createClass2["default"])(RTSocket, [{
    key: "completeReadScreens",
    value: function completeReadScreens() {
      var _this = this;

      var readScreens = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var readScreenKeys = ["loading", "noPermissionsToRead", "requestedElementOrListDeleted", "requestedElementOrListNotFound", "requestedListEmpty", "queryIncomplete"];
      var completedReadScreens = {};
      readScreenKeys.forEach(function (readScreenKey) {
        completedReadScreens[readScreenKey] = _this.completeReadScreen(readScreens[readScreenKey]);
      });
      return completedReadScreens;
    }
  }, {
    key: "completeReadScreen",
    value: function completeReadScreen() {
      var readScreen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        text: readScreen.text || "",
        showAtDefault: readScreen.showAtDefault || false
      };
    }
  }, {
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
        throw new Error("RTSocket not initialized. You need to call initialize(config) first");
      } else {
        return this.rtsocket;
      }
    }
  }]);
  return RTSocket;
}();

exports.RTSocket = RTSocket;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocketClient = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var RTSocketClient =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(RTSocketClient, _PureComponent);

  function RTSocketClient(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, RTSocketClient);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RTSocketClient).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      result: undefined
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateResult", function (result) {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          uuid = _assertThisInitialize.uuid;

      var _this$props$onChange = _this.props.onChange,
          onChange = _this$props$onChange === void 0 ? function () {} : _this$props$onChange;

      _this.setState({
        result: result
      });

      onChange(result, uuid);
    });
    _this.RTSocketSync = new RTSocketSync();

    _this.RTSocketSync.init((0, _assertThisInitialized2["default"])(_this), _this.updateResult);

    return _this;
  }

  (0, _createClass2["default"])(RTSocketClient, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.RTSocketSync.open(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.RTSocketSync.close(this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.RTSocketSync.update(this, prevProps);
    }
  }, {
    key: "render",
    value: function render() {
      var result = this.state.result;
      var _this$props = this.props,
          showLoading = _this$props.showLoading,
          showQueryIncomplete = _this$props.showQueryIncomplete;
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
      var _this$props2 = this.props,
          _this$props2$render = _this$props2.render,
          render = _this$props2$render === void 0 ? function () {} : _this$props2$render,
          showNoPermissionsToRead = _this$props2.showNoPermissionsToRead,
          showRequestedElementDeleted = _this$props2.showRequestedElementDeleted,
          showRequestedElementOrListNotFound = _this$props2.showRequestedElementOrListNotFound,
          showRequestedListEmpty = _this$props2.showRequestedListEmpty;
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
          return render(result, uuid) || "";
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RTSocketSync = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _v = _interopRequireDefault(require("uuid/v1"));

var RTSocketSync = function RTSocketSync() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, RTSocketSync);
  (0, _defineProperty2["default"])(this, "init", function (namespace, updateResult) {
    _this.namespace = namespace;
    _this.updateResult = updateResult;
    _this.socket = RTSocket.getRTSocket().socket;
    namespace.uuid = (0, _v["default"])();
  });
  (0, _defineProperty2["default"])(this, "open", function () {
    var namespace = _this.namespace,
        socket = _this.socket,
        updateResult = _this.updateResult,
        containsUndefined = _this.containsUndefined;
    var uuid = namespace.uuid;
    var _namespace$props = namespace.props,
        name = _namespace$props.name,
        queryAttributes = _namespace$props.queryAttributes; // define handler to get results

    socket.on(uuid, function (result) {
      return updateResult(result);
    }); // no need for a request when query attributes have undefined in them

    if (containsUndefined(queryAttributes, true)) updateResult("QUERY_INCOMPLETE");else socket.emit(name, {
      uuid: uuid,
      queryAttributes: queryAttributes
    });
  });
  (0, _defineProperty2["default"])(this, "update", function (namespace, prevProps) {
    var socket = _this.socket,
        containsUndefined = _this.containsUndefined,
        updateResult = _this.updateResult;
    var uuid = namespace.uuid;
    var _namespace$props2 = namespace.props,
        queryAttributes = _namespace$props2.queryAttributes,
        name = _namespace$props2.name;
    var prevQueryAttributes = prevProps.queryAttributes;
    var haveQueryAttributesChanged = JSON.stringify(prevQueryAttributes) !== JSON.stringify(queryAttributes);

    if (haveQueryAttributesChanged) {
      // unsubscribe from previous query attributes
      if (!containsUndefined(prevQueryAttributes, true)) socket.emit("unsubscribe" + uuid); // subscribe with new query attributes

      if (containsUndefined(queryAttributes, true)) updateResult("QUERY_INCOMPLETE");else socket.emit(name, {
        uuid: uuid,
        queryAttributes: queryAttributes
      });
    }
  });
  (0, _defineProperty2["default"])(this, "close", function () {
    _this.socket.emit("unsubscribe" + _this.namespace.uuid);
  });
  (0, _defineProperty2["default"])(this, "containsUndefined", function (item, isRoot) {
    var hasUndefined = isRoot ? false : item === undefined;
    var type = Object.prototype.toString.call(item);

    if (type == "[object Object]") {
      for (var key in item) {
        var child = item[key];
        hasUndefined = hasUndefined || _this.containsUndefined(child, false);
      }
    } else if (type == "[object Array]") {
      item.forEach(function (item) {
        hasUndefined = hasUndefined || _this.containsUndefined(item, false);
      });
    }

    return hasUndefined;
  });
};

exports.RTSocketSync = RTSocketSync;
