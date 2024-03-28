const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(method, url);

  if (method == 'GET' && url.endsWith('.css') || url.endsWith('.jpg')) {
    let asset = fs.readFileSync(`./assets${url.split('/static')[1]}`);
    res.statusCode = 200;

    if (url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (url.endsWith('.jpg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
    
    return res.end(asset);
  }

  const html = fs.readFileSync('./index.html', 'utf-8');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  return res.end(html);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));