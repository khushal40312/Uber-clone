import { io } from 'socket.io-client';

let socket; // Singleton instance

const WebSocket = () => {
    if (!socket) {  // Prevent multiple connections
        socket = io(`${import.meta.env.VITE_BASE_URL}`);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }
    return socket;
}

export default WebSocket;
