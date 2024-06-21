const ws = new WebSocket('ws://localhost:8000');

ws.onopen = () => {
    console.log('WebSocket connection opened');
};

ws.onmessage = (event) => {
    event.data.arrayBuffer().then(result => {
        const output = document.getElementById('output');
        output.textContent += `${getCurrentTime()} RX <= ${result.toHexString()}\n`;
    })
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

function sendMessage() {
    const message = document.getElementById('message').value;
    if (message.length > 0 && message.length % 2 == 0) {
        document.getElementById('message').value = "";
        ws.send(message.hexToByteArray());
        output.textContent += `${getCurrentTime()} TX => ${message}\n`;
    }
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

String.prototype.hexToByteArray = function () {
    if (this.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }

    // Initialize an array to hold the byte values
    const byteArray = new Uint8Array(this.length / 2);

    // Process each pair of hexadecimal characters
    for (let i = 0; i < this.length; i += 2) {
        let byte = this.substring(i, i + 2);
        byteArray[i / 2] = parseInt(byte, 16);
    }

    return byteArray;
}

ArrayBuffer.prototype.toHexString = function () {
    return [...new Uint8Array(this)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
};