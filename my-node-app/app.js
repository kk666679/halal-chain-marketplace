const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Docker + PM2!');
});
server.listen(3000, () => console.log('App running on port 3000'));
