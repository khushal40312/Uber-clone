const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const httpProxy = require('http-proxy');
const http = require('http');
const app = express();

const server = http.createServer(app);

// For normal REST routes
app.use('/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/captain', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/rides', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true, ws: true })); // Note ws: true

// For WebSocket manually
const proxy = httpProxy.createProxyServer({ ws: true });

server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/rides/socket.io')) {
        console.log('🧠 Proxying WebSocket connection to rides...');
        proxy.ws(req, socket, head, { target: 'http://localhost:3003' });
    }
});

app.get('/', (req, res) => {
    res.send("Gateway up and running.");
});

server.listen(3000, () => {
    console.log('🚀 Gateway server running on http://localhost:3000');
});
