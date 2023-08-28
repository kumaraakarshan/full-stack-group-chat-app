const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

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


app.use(express.static('public'));

app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

app.use(cors({
    origin: ['http://localhost:3000/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(signupRoute);
app.use(loginRoute);
app.use(chatRoute);
app.use(joinGroupRoute);
app.use(createGroupRoute);
app.use(liveChatRoute);
app.use(adminRoute);
app.use(uploadRoute);

cronjob.midNightWork();


app.listen(process.env.PORT || 3000);