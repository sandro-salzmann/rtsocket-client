import { PureComponent } from "react";

export class RTSocketClient extends PureComponent {
  constructor(props) {
    super(props);
    this.RTSocketSync = new RTSocketSync();
    this.RTSocketSync.init(this, this.updateResult);
  }

  state = { result: undefined };

  updateResult = result => {
    const { uuid } = this;
    const { onChange = () => {} } = this.props;

    this.setState({ result });
    onChange(result, uuid);
  };

  componentDidMount() {
    this.RTSocketSync.open(this);
  }

  componentWillUnmount() {
    this.RTSocketSync.close(this);
  }

  componentDidUpdate(prevProps) {
    this.RTSocketSync.update(this, prevProps);
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
      render = () => {},
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
