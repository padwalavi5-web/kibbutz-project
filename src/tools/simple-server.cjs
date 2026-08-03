const http = require('http');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;
const root = path.join(__dirname, '../../dist');

const mime = {
  '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json', '.woff2':'font/woff2', '.woff':'font/woff', '.jpg':'image/jpeg', '.jpeg':'image/jpeg'
};

const server = http.createServer((req,res)=>{
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' ) reqPath = '/index.html';
  const filePath = path.join(root, decodeURIComponent(reqPath));
  fs.stat(filePath, (err,stat)=>{
    if (err) { res.statusCode = 404; res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { res.statusCode = 500; res.end('Server error'); });
    stream.pipe(res);
  });
});

server.listen(port, ()=>console.log(`Serving ${root} on http://127.0.0.1:${port}`));

// keep process alive
process.on('SIGINT', ()=> process.exit(0));