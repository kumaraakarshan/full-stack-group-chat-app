require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan')

//database
const sequelize = require('./util/database');
const cors = require('cors');
const { serialize } = require('v8');

//routes
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const chatRoutes = require('./routes/chat');
const forgotPassRoutes = require('./routes/forgotPassword');
//models
const User = require('./models/user')
const Chat = require('./models/chats')
const Group = require('./models/group');
const userGroup = require('./models/userGroup');
const ForgotPassword = require('./models/forgotPassword');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    origin:'*',
    credentials:true
}));
app.use(helmet());

app.use('/user',userRoutes);
app.use(groupRoutes);
app.use(chatRoutes);
app.use('/password',forgotPassRoutes)

//associations
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(Chat);
Chat.belongsTo(User);

Group.belongsToMany(User, {through:userGroup});
User.belongsToMany(Group, {through: userGroup});

Group.hasMany(Chat);
Chat.belongsTo(Group);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });