# Server-Sent Events (SSE)

## Overview

Demo of Server-Sent Events (SSE) using the `EventSource` Javascript API with client side Javascript and a simple node `http` server for the backend.

Reference the [Mozilla documentation around the EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) for more information on what's happening under the hood here.

## Starting the Server

1. `docker build -t server-sent-events .`
1. `docker run --rm -p 8000:8000 -v $(pwd):/service server-sent-events`
1. In your browser visit http://localhost:8000
1. Wait for the events to come in and get displayed in the DOM.
