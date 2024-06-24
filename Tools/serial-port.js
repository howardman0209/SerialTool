class SerialPort {
    constructor(listener) {
        this.listener = listener;
    }

    start() {
        this.ws = new WebSocket('ws://localhost:8000');
        this.ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.ws.onmessage = (event) => {
            event.data.arrayBuffer().then(result => {
                this.listener.onDataArrived(result);
            })
        };

        this.ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    sendData(data) {
        this.ws.send(data);
    }

}

export default SerialPort;