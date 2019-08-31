import { PureComponent } from "react";
import uuid from "uuid/v1";

export class RTSocketClient extends PureComponent {
  constructor(props) {
    super(props);
    this.uuid = uuid();
  }

  state = {
    result: undefined
  };

  componentDidMount() {
    const { name, queryAttributes } = this.props;
    const { uuid } = this;
    const socket = RTSocket.getRTSocket().socket;

    socket.on(uuid, result => {
      
      this.setState({ result });
    });
    // no need for a request when query attributes have undefined in them
    if (this.hasUndefinedChildren(queryAttributes, true)) {
      this.setState({ result: "QUERY_INCOMPLETE" });
      return;
    }
    socket.emit(name, uuid, queryAttributes);
  }

  componentWillUnmount() {
    RTSocket.getRTSocket().socket.emit("unsubscribe"+this.uuid);
  }

  componentDidUpdate(prevProps) {
    const { queryAttributes, name } = this.props;
    const socket = RTSocket.getRTSocket().socket;

    if (
      JSON.stringify(prevProps.queryAttributes) !==
      JSON.stringify(queryAttributes)
    ) {
      if (!this.hasUndefinedChildren(prevProps.queryAttributes, true)) {
        socket.emit("unsubscribe", this.uuid);
      }
      if (this.hasUndefinedChildren(queryAttributes, true)) {
        this.setState({ result: "QUERY_INCOMPLETE" });
      } else {
        socket.emit(name, this.uuid, queryAttributes);
      }
    }
  }

  hasUndefinedChildren(item, isRoot) {
    let hasUndefined = isRoot ? false : item === undefined;
    let type = Object.prototype.toString.call(item);
    if (type == "[object Object]") {
      for (var key in item) {
        let child = item[key];
        hasUndefined = hasUndefined || this.hasUndefinedChildren(child, false);
      }
    } else if (type == "[object Array]") {
      item.forEach(queryAttribute => {
        hasUndefined =
          hasUndefined || this.hasUndefinedChildren(queryAttribute, false);
      });
    }
    return hasUndefined;
  }

  render() {
    const { result } = this.state;
    const { showLoading, showQueryIncomplete } = this.props;
    const { loading, queryIncomplete } = RTSocket.getRTSocket().readScreens;

    if (result === undefined) {
      return this.getScreen(loading, showLoading);
    } else if (result === "QUERY_INCOMPLETE") {
      return this.getScreen(queryIncomplete, showQueryIncomplete);
    } else {
      return this.renderResult(result);
    }
  }

  renderResult(result) {
    const { uuid } = this;
    const {
      render,
      showNoPermissionsToRead,
      showRequestedElementDeleted,
      showRequestedElementOrListNotFound,
      showRequestedListEmpty
    } = this.props;
    const {
      noPermissionsToRead,
      requestedElementDeleted,
      requestedElementOrListNotFound,
      requestedListEmpty
    } = RTSocket.getRTSocket().readScreens;

    switch (result) {
      case "NO_PERMISSIONS_TO_READ":
        return this.getScreen(noPermissionsToRead, showNoPermissionsToRead);
      case "REQUESTED_ELEMENT_OR_LIST_DELETED":
        return this.getScreen(
          requestedElementDeleted,
          showRequestedElementDeleted
        );
      case "REQUESTED_ELEMENT_OR_LIST_NOT_FOUND":
        return this.getScreen(
          requestedElementOrListNotFound,
          showRequestedElementOrListNotFound
        );
      case "REQUESTED_LIST_EMPTY":
        return this.getScreen(requestedListEmpty, showRequestedListEmpty);
      default:
        return render(result, uuid) || "";
    }
  }

  getScreen(screen, explicitShowScreen) {
    return explicitShowScreen === true
      ? screen.text
      : explicitShowScreen === false
      ? ""
      : screen.showAtDefault
      ? screen.text
      : "";
  }
}
