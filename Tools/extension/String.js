String.prototype.hexToByteArray = function hexToByteArray() {
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


String.prototype.asciiToHex = function () {
    return this.split('')
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
};

String.prototype.hexToAscii = function() {
    const hex = this;
    let ascii = '';
    for (let i = 0; i < hex.length; i += 2) {
        const hexChar = hex.substr(i, 2);
        ascii += String.fromCharCode(parseInt(hexChar, 16));
    }
    return ascii;
};