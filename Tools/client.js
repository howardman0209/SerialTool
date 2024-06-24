import "./extension/String.js";
import "./extension/ArrayBuffer.js";
import SerialPort from "./serial-port.js";

document.body.innerHTML += `<pre id="output"></pre>`;
const output = document.getElementById('output');
const sendBtn = document.getElementById(`sendBtn`)
sendBtn.onclick = () => {
    let data = document.getElementById('input').value
    if (data.length > 0 && data.length % 2 == 0 && /^([0-9a-fA-F]+)$/.test(data)) {
        serialPort.sendData(data.hexToByteArray());
        output.textContent += `${getCurrentTime()} TX => ${data}\n`;
        document.getElementById('input').value = ""
    }
}

const serialPortListener = {
    onDataArrived: function (data) {
        output.textContent += `${getCurrentTime()} RX <= ${data.toHexString()}\n`;
    }
};
const serialPort = new SerialPort(serialPortListener)
serialPort.start();

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}