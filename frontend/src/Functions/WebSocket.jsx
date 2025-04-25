import { io } from 'socket.io-client';

let socket; // Singleton instance

const WebSocket = () => {
    if (!socket) {  // Prevent multiple connections
         // socket = io('http://localhost:3000/rides', {
         //    path: '/rides/socket.io',
         //    transports: ['websocket'],
         //  });   // with Micro-services
          socket = io(import.meta.env.VITE_BASE_URL) // for without Micro-services
          

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
