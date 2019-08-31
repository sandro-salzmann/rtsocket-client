import uuid from "uuid/v1";

export class RTSocketSync {
  init = (namespace, updateResult) => {
    this.namespace = namespace;
    this.updateResult = updateResult;
    this.socket = RTSocket.getRTSocket().socket;
    namespace.uuid = uuid();
  };
  open = () => {
    const { namespace, socket, updateResult, containsUndefined } = this;
    const { uuid } = namespace;
    const { name, queryAttributes } = namespace.props;

    // define handler to get results
    socket.on(uuid, result => updateResult(result));

    // no need for a request when query attributes have undefined in them
    if (containsUndefined(queryAttributes, true))
      updateResult("QUERY_INCOMPLETE");
    else socket.emit(name, { uuid, queryAttributes });
  };
  update = (namespace, prevProps) => {
    const { socket, containsUndefined, updateResult } = this;
    const { uuid } = namespace;
    const { queryAttributes, name } = namespace.props;
    const prevQueryAttributes = prevProps.queryAttributes;
    const haveQueryAttributesChanged =
      JSON.stringify(prevQueryAttributes) !== JSON.stringify(queryAttributes);

    if (haveQueryAttributesChanged) {
      // unsubscribe from previous query attributes
      if (!containsUndefined(prevQueryAttributes, true))
        socket.emit("unsubscribe" + uuid);

      // subscribe with new query attributes
      if (containsUndefined(queryAttributes, true))
        updateResult("QUERY_INCOMPLETE");
      else socket.emit(name, { uuid, queryAttributes });
    }
  };
  close = () => {
    this.socket.emit("unsubscribe" + this.namespace.uuid);
  };
  containsUndefined = (item, isRoot) => {
    let hasUndefined = isRoot ? false : item === undefined;
    let type = Object.prototype.toString.call(item);
    if (type == "[object Object]") {
      for (var key in item) {
        let child = item[key];
        hasUndefined = hasUndefined || this.containsUndefined(child, false);
      }
    } else if (type == "[object Array]") {
      item.forEach(item => {
        hasUndefined = hasUndefined || this.containsUndefined(item, false);
      });
    }
    return hasUndefined;
  };
}
