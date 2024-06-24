import "../extension/String.js";
import "../extension/ArrayBuffer.js";

class SpectraSerialChannel {
    constructor(callback) {
        this.callback = callback;
        this.isWaitingACK = false;
        this.packetReceiveState = PacketReceiveState.WAIT_FOR_STX;
        this.currentPacket = "";
        this.sequenceCounter = 0;
    }

    receiveBytes(buffer) {
        let strValue = buffer.toHexString();
        if (this.isWaitingACK) {
            if (strValue == "06") {
                this.isWaitingACK = false;
            }
        } else {
            [...new Uint8Array(buffer)].forEach(element => {
                let byte = element.toString(16).padStart(2, '0');
                if (this.#constructPacket(byte)) {
                    console.log("full packet: ", this.currentPacket);
                    let c0 = this.currentPacket.substring(8, 10);
                    let c1 = this.currentPacket.substring(14, this.currentPacket.length - 4);
                    this.callback.onResponseReceived(c0, c1);
                    this.currentPacket = "";

                    this.#sendACK();
                }
            })
        }
    }

    #sendACK() {
        this.callback.onSendData("06");
    }

    #getTagLength(value) {
        let length = (value.length / 2).toString(16).padStart(2, '0');
        if (0 <= value.length && value.length < 127) {
            return length;
        } else if (127 <= value.length && value.length < 256) {
            return `81${length}`;
        } else {
            return `82${length}`;
        }
    }

    sendRequest(c0, requestBody) {
        let c1 = requestBody.asciiToHex();
        let seq = `${this.sequenceCounter}`.padStart(2, '0');
        let content = `C001${c0}` + `C1${this.#getTagLength(c1)}${c1}`;
        let tmp = seq + content + "03";

        let checksum = 0
        for (let i = 0; i < tmp.length; i += 2) {
            checksum = checksum ^ parseInt(tmp.substring(i, i + 2), 16);
        }
        let lrc = checksum.toString(16).padStart(2, '0');

        this.sequenceCounter = (this.sequenceCounter + 1) % 10;

        let packet = "02" + tmp + lrc;
        this.callback.onSendData(packet);
    }

    #constructPacket(byte) {
        let wholePktReceived = false;
        console.log(this.packetReceiveState);
        switch (this.packetReceiveState) {
            case PacketReceiveState.WAIT_FOR_STX:
                if (byte == "02") {
                    this.packetReceiveState = PacketReceiveState.WAIT_FOR_SEQ;
                    this.currentPacket += byte;
                }
                break;
            case PacketReceiveState.WAIT_FOR_SEQ:
                this.packetReceiveState = PacketReceiveState.WAIT_FOR_CONTENT;
                this.currentPacket += byte;
                break;
            case PacketReceiveState.WAIT_FOR_CONTENT:
                this.currentPacket += byte;
                if (byte == "03") {
                    this.packetReceiveState = PacketReceiveState.WAIT_FOR_LRC;
                }
                break;
            case PacketReceiveState.WAIT_FOR_LRC:
                this.packetReceiveState = PacketReceiveState.WAIT_FOR_STX;
                this.currentPacket += byte;
                wholePktReceived = true;
                break;
            default:
                break;
        }

        return wholePktReceived;
    }
}

const PacketReceiveState = Object.freeze({
    WAIT_FOR_STX: `WAIT_FOR_STX`,
    WAIT_FOR_SEQ: `WAIT_FOR_SEQ`,
    WAIT_FOR_CONTENT: `WAIT_FOR_CONTENT`,
    WAIT_FOR_LRC: `WAIT_FOR_LRC`
});

export default SpectraSerialChannel;