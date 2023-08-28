const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/sequelize');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const chatRoute = require('./routes/chat');
const joinGroupRoute = require('./routes/joinGroup');
const createGroupRoute = require('./routes/createGroup');
const liveChatRoute = require('./routes/liveMessage');
const adminRoute = require('./routes/admin');
const uploadRoute = require('./routes/upload');

const cronjob = require('./controller/cronjob');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use(cors({
    origin: ['http://localhost:4000'], // Replace with your client's address
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(signupRoute);
app.use(loginRoute);
app.use(chatRoute);
app.use(joinGroupRoute);
app.use(createGroupRoute);
//app.use(liveChatRoute);
app.use(adminRoute);
app.use(uploadRoute);

cronjob.midNightWork();

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('send-msg', (msg, room) => {
//         // Handle the 'send-msg' event here
//         // You can access 'msg' and 'room' parameters
//         // and perform actions such as broadcasting the message to other clients.
//         io.to(room).emit('receive-msg', { msg: msg, g: room });
//     });

//     // Add other WebSocket event handlers as needed

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });

server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${server.address().port}`);
});
