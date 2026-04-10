const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0'; // Bind to all interfaces

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'client', req.url === '/' ? 'display.html' : decodeURIComponent(req.url));
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mp3': 'audio/mpeg',
  };

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`[+] Client verbonden. Totaal: ${clients.size}`);
  broadcastStatus();

  ws.on('message', (message) => {
    let data;
    try { data = JSON.parse(message); } catch { return; }
    console.log(`[>] Commando:`, data);
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[-] Client weg. Totaal: ${clients.size}`);
    broadcastStatus();
  });
});

function broadcastStatus() {
  const msg = JSON.stringify({ type: 'status', controllers: clients.size });
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  }
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server draait op http://0.0.0.0:${PORT}`);
  console.log(`Controller: http://localhost:${PORT}/controller.html`);
});