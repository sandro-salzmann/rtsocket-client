# rtsocket-client

> react client component for rtsocket, a socket.io wrapper for real time communication between multiple endpoints

## Usage

### Installation

Install via npm:

```sh
npm install rtsocket-client
```

### Initialization

Initialize the connection and set some defaults (see API for detailed explanation)

```javascript
import io from "socket.io-client";
import { RTSocket } from "rtsocket-client";

RTSocket.initialize({
  socket: io("localhost:8080"),
  readScreens: {
    loading: {
      text: "Loading...",
      showAtDefault: true
    },
    noPermissionsToRead: {
      text: "No permissions to read that!",
      showAtDefault: true
    },
    requestedElementOrListDeleted: {
      text: "The data has been deleted.",
      showAtDefault: true
    },
    requestedElementOrListNotFound: {
      text: "The data couldn't be found.",
      showAtDefault: true
    },
    requestedListEmpty: {
      text: "The list is empty.",
      showAtDefault: true
    },
    queryIncomplete: {
      text: "The query seems incomplete.",
      showAtDefault: true
    }
  },
  handleModifyCallback: message => {
    switch (message) {
      case "NO_PERMISSIONS_TO_MODIFY":
        alert("No permissions to do that.")
        break;
      case "SUCCESSFUL_MODIFIED":
        alert("Successfully modified the data.")
        break;
      case "FAILED_TO_MODIFY":
        alert("Failed to modify the data.")
        break;
      default:
        alert("Unknown error.")
        break;
    }
  }
});
```

### Usage: Read, Modify and Authenticate

Example: Read data

```javascript
import { RTSocketClient } from "rtsocket-client";
<RTSocketClient
  name="internetFavouriteByType"
  render={internetFavourite => {
    return (<h1>{internetFavourite.title}</h1>);
  }}
  queryAttributes={{type: "Food"}}
/>
```

Example: Modify data

```javascript
import { RTSocket } from "rtsocket-client";
RTSocket.getRTSocket().change(
  "changeInternetFavourite",
  { type: "Food", value: "Pizza" }
);
```

Example: Authenticate user

```javascript
RTSocket.getRTSocket().authenticate(
    {
      type: "login",
      username: "johnsmith",
      password: "12345678"
    },
    response => {
      alert(response.msg);
    }
  )
```

## API

WIP

## License

MIT
