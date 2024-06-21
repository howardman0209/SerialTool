ArrayBuffer.prototype.toHexString = function toHexString() {
    return [...new Uint8Array(this)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
};