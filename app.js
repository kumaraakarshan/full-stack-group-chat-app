const express = require('express');
const UserRoute= require('./routers/userRouter')
const User = require('./models/user')
const app = express();
const bodyParser = require('body-parser');
const fs =require('fs')
var path = require('path');
require('dotenv').config();
const router = express.Router();
app.use(express.json());
app.use(bodyParser.json());
const sequelize = require('./utils/database')
const accessLogStream=fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {flags:'a'}

);
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  })
 
  app.use(express.static('views'));
  app.use('/',UserRoute)

  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});