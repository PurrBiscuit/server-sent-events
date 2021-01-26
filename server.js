const http = require('http')
const fs = require('fs')

const constructSSE = (res, id, data, event) => {
  res.write('id: ' + id + '\n')
  if (event) res.write('event: ' + 'timestamp' + '\n')
  res.write("data: " + data + '\n\n')
}

const sendSSE = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const id = (new Date()).toLocaleTimeString()

  // Sends a generic message (no event field) SSE every 10 seconds on a single connection.
  setInterval(function() {
    constructSSE(res, id, 'hello from your friendly, localhost...')
  }, 5000)

  // Sends a timestamp message SSE every 5 seconds on a single connection.
  setInterval(function() {
    constructSSE(res, id, (new Date()).toLocaleTimeString(), 'timestamp')
  }, 5000)
}

const debugHeaders = req => {
  console.log(`URL: ${req.url}`)
  for (const key in req.headers) {
    console.log(`${key}: ${req.headers[key]}`)
  }
  console.log('\n\n')
}

console.log('Starting the HTTP server...')

http.createServer((req, res) => {
  debugHeaders(req)

  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    if (req.url === '/events') {
      sendSSE(req, res)
    } else {
      res.writeHead(404)
      res.end()
    }
  } else {
    if (req.url === '/app.js') {
      res.writeHead(200, {'Content-Type': 'text/javascript'})
      res.write(fs.readFileSync(__dirname + '/app.js'))
      res.end()
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(fs.readFileSync(__dirname + '/index.html'))
      res.end()
    }
  }
}).listen(8000)
