const http = require('http')

const PORT = 7199

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/ping') {
    console.log(new Date(), 'Incoming ping request')
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('pong')
  } else {
    console.log(new Date(), 'Incoming unknown request:', req.method, req.url)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Started to listen a ping server on port ${PORT}`)
})
