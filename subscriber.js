const mqtt = require('mqtt');
const username = 'matteo';
const password = 'test';
const client = mqtt.connect('http://localhost:1883', { username: username, password: password });

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

client.on('reconnect', function () {
    console.log('Reconnecting...');
});

client.on('message', function (topic, payload, packet) {
    // Payload is Buffer
    console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`);
});

client.on('error', function (error) {
    console.log(error);
});

client.on('disconnect', function (packet) {
    console.log(packet);
});

client.on('offline', function () {
    console.log('offline');
});
