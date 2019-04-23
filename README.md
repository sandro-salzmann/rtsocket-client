# rtsocket-client

> react client component for rtsocket, a socket.io wrapper that enables easy synchronization of a data source between multiple clients

## Features of [rtsocket-server](https://github.com/Sandro404/rtsocket-server) and rtsocket-client

- Synchronize a data source between groups of clients
- Customizable authentication system

## Usage

### Installation

Install via npm:

```sh
npm install rtsocket-client
```

### Initialization

Initialize the connection and set some defaults (see API for more settings)

```javascript
import io from "socket.io-client";
import { RTSocket } from "rtsocket-client";

RTSocket.initialize({socket: io("localhost:8080")});
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

### RTSocketClient

```javascript
<RTSocketClient
  // the name of the readdefinition
  name="name"
  // render method to display the responses: response is the result from the query, uuid is the component's uuid
  render={(response, uuid) => {
    return (<h1>{response}</h1>);
  }}
  // the read definiton executes it's query with these attributes
  queryAttributes={{type: "Food"}}
/>
```

### RTSocket

#### initialize(configuration)

```javascript
configuration = {
  // the socket connection to the node server with rtsocket-server
  socket: io("localhost:8080"),

  // what the RTSocketClient component should show at specific answers
  // (see the server documentation for information on how these answers get generated)
  readScreens: {    
    // no answer from server has been received
    loading: {
      // text (HTML markup) that rtsocketclient renders on this state
      text: "Loading...",
      // setting to show or hide (renders "") the text
      showAtDefault: true
    },
    // no permissions to view the request results
    noPermissionsToRead: {
      text: "No permissions to read that!",
      showAtDefault: true
    },
    // the requested data has been sent to the client earlier but is deleted now
    requestedElementOrListDeleted: {
      text: "The data has been deleted.",
      showAtDefault: true
    },
    // the requested data couln't be found
    requestedElementOrListNotFound: {
      text: "The data couldn't be found.",
      showAtDefault: true
    },
    // the requested data is an empty array
    requestedListEmpty: {
      text: "The list is empty.",
      showAtDefault: true
    },
    // user's request has undefined somewhere in the queryattributes, request hasn't been sent so the server
    queryIncomplete: {
      text: "The query seems incomplete.",
      showAtDefault: true
    }
  },
  // function that gets called when user modified the data source with the RTSocket.getRTSocket().change method
  handleModifyCallback: message => {
    // message can be:
    // NO_PERMISSIONS_TO_MODIFY user doesn't have permissions to modify the data source
    // SUCCESSFUL_MODIFIED modifying succeeded
    // FAILED_TO_MODIFY modifying failed
    // UNKNOWN_MODIFYING_ERROR an error occurred in the modifying function
    // (see the server documentation for information on how these message get generated)
  }
}
```

#### getRTSocket().change(name, queryAttributes)

```javascript
// name of the modify definition
let name = "changeSomething";
// the modify definiton executes it's query with these attributes
let queryAttributes = {{id: 5}}
```

#### getRTSocket().authenticate(authentication, callback)

```javascript
// authentication object you can use on the server to generate the socket's authentication status
let authentication = {login: "Peter", password: "123"}
let callback = response => {
  // function gets called when socket uses the authenticate function
  // the response can be genereated in the server authentication function
}
```

## License

MIT
