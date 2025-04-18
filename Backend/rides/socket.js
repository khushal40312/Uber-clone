const socketIo = require('socket.io');
const socketUpdate = require('./services/socketupdate');


let io;
const lastUpdate = {};
function initializeSocket(server) {
    io = socketIo(server, {
        
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                await socketUpdate(userId,socket.id)
               
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })
            }




        })
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lng || !location.ltd || !userId) {
                return socket.emit('error', { message: "userId and Location are required" });
            }

            const currentTime = Date.now();
            const lastUpdatedTime = lastUpdate[userId] || 0;

            // Check if 4-5 minutes have passed since the last update
            const delay = 1 * 60 * 1000; // 4 minutes in milliseconds
            if (currentTime - lastUpdatedTime < delay) {
                const remainingTime = delay - (currentTime - lastUpdatedTime);
                return socket.emit('error', { message: `Please wait ${Math.ceil(remainingTime / 1000)} seconds before updating the location again` });
            }

            // Update the location in the database
             await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
           
            // Update the last update time for the user
            lastUpdate[userId] = currentTime;
        });



        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        })
    });
}

function setMessageToSocketId(socketId, messageObject) {

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log("Socket.io is not initialized");
    }
}

module.exports = { initializeSocket, setMessageToSocketId };
