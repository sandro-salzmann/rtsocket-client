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

  _createClass(RTSocket, [{
    key: "completeReadScreens",
    value: function completeReadScreens(readScreens) {
      var _this = this;

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
