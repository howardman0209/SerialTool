# How to use
## 1. Install required dependencies
```
npm install express serialport ws -save
```

## 2. List all the connected devices
```
ls /dev/tty.*
```

## 3. Config the Serial Port path and baud rate in server.js at line 4 - 10
```js
const serialPort = new SerialPort({
    path: '/dev/tty.usbmodemSP000002153', baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});
```

## 4. Start the WebSocket server
```
npm run start 
```

## 5. Go to `Tools` (Directory) and start the WebServer for the application
```
cd Tools
```

```
http-server
```
> [!WARNING]
> Make sure `http-server` is already installed. If not just install it by following command.
```
npm install -g http-server
```

## 5. Open the application in your browser (eg. Chrome)
Open chrome and type `http://localhost:8080/` as a URL
> [!TIP]
> Type raw bytes in the text input and press <button>Send</button> to send to the serial channel
![SerialHelper](https://i.imgur.com/tQ8Cb9q.png)
