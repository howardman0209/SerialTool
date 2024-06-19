# How to use
## 1. Install required dependencies
```
npm install express serialport ws -save
```

## 2. List all the connected devices
```
ls /dev/tty.*
```

## 3. Config the Serial Port path and baud rate in server.js at line 4
```js
const serialPort = new SerialPort({ path: '/dev/tty.usbmodemSP000002153', baudRate: 115200 });
```

## 4. Start the WebSocket server
```
npm run start 
```

## 5. open tool.html in Chrome 
> [!TIP]
> Type raw bytes in the text input and press *Send* to send to the serial channel

