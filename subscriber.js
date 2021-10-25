require('dotenv').config();
const mqtt = require('mqtt');
const username = process.env.B_USERNAME;
const password = process.env.B_PASSWORD;
const client = mqtt.connect('http://localhost:1883', {
    clientId: 'laadpaal' + Math.random().toString(16).substr(2, 8),
    reconnectPeriod: 0,
    clean: true,
});

client.on('connect', (err) => {
    client.subscribe('subscribe', (err) => {
        if (!err) {
            console.log('Subscribed!');
        } else {
            console.log(err);
            client.end();
        }
    });
});

client.on('message', function (topic, payload, packet) {
    // Payload is Buffer
    console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`);
});

client.on('error', function (error) {
    console.log(error);
    client.end();
});

client.on('disconnect', function (packet) {
    console.log(packet);
});

client.on('offline', function () {
    console.log('offline');
});
