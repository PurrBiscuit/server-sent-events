const root = document.getElementById("root")

// instantiate an EventSource object to receive event messages
// from the server from the /events endpoint
const eventSource = new EventSource('/events')

// add a listener to handle incoming 'event: timestamp'
// messages from the backend server
eventSource.addEventListener('timestamp', e => {
  const p = document.createElement('p')
  p.appendChild(document.createTextNode(`The timestamp event data is - ${e.data}`))
  root.appendChild(p)
})

// add a listener for any "generic" (missing the event: field)
// messages from the backend server
eventSource.addEventListener('message', e => {
  console.log(e.data)
})
