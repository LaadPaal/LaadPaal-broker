require('dotenv').config();
const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const port = 1883;
const wsPort = 8883;

server.listen(port, function () {
    console.log('server started and listening on port ', port);
});

ws.createServer(
    {
        server: httpServer,
    },
    aedes.handle,
);

httpServer.listen(wsPort, function () {
    console.log('websocket server listening on port ', wsPort);
});

aedes.authenticate = function (client, username, password, callback) {
    callback(null, username === 'matteo' && password.toString() === 'test');
};

aedes.on('clientError', (client, err) => {
    console.log('client error', client.id, err.message, err.stack);
});

aedes.on('connectionError', (client, err) => {
    console.log('client error', client, err.message, err.stack);
});

aedes.on('publish', (packet, client) => {
    if (client) {
        console.log('message from client', client.id, packet.payload.toString());
    }
});

aedes.on('subscribe', (subscriptions, client) => {
    if (client) {
        console.log('subscribe from client', subscriptions, client.id);
    }
});

aedes.on('client', (client) => {
    console.log('new client', client.id);
});
