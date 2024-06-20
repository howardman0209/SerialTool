const express = require('express')
const app = express()
const { SerialPort } = require('serialport');
const serialPort = new SerialPort({
    path: '/dev/tty.usbmodemSP000002153', baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});
const WebSocketServer = require('ws').Server;
const port = 8000
wss = new WebSocketServer({ port: port })

app.listen(3000, function () {
    console.log(`Running on port: ${port} \n- - - - - - - - - - - - - - - -`)
});

wss.on('connection', function (ws, req) {
    console.log(`req: ${req}`)
    // ws.send(`Hello World`);

    ws.on('error', console.error);

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.on('message', rawBytes => {
        console.log('Raw bytes received from WebSocket client:', rawBytes);
        serialPort.write(rawBytes, (err) => {
            if (err) {
                return console.error('Error on write: ', err.message);
            }
            console.log('Message written to serial port');
        });
    });

    // Log raw data received from the serial port and process it
    serialPort.on('data', (rawBytes) => {
        console.log('Raw bytes received from serial port:', rawBytes);
        ws.send(rawBytes)
    });
})


function hexToByteArray(str) {
    return Buffer.from(str, 'hex');
}

function utf8ToByteArray(str) {
    return Buffer.from(str, 'utf8');
}