1. List all the connected devices
>ls /dev/tty.*

2. Config the Serial Port path and baud rate in server.js at line 4
- const serialPort = new SerialPort({ path: '/dev/tty.usbmodemSP000002153', baudRate: 115200 });

3. Start the WebSocket server
>npm run start 

4. open tool.html in Chrome (must be Chrome)

