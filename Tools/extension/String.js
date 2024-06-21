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