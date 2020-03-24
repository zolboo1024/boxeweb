//Zolboo Erdenebaatar
//12/7/2019
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); //configures so that we can have our environment
//variables in our dotenv files. In this case, this connects with our .env file in the
//same folder.

const app = express(); //create our express server. Express is a server framework for Node.js
const port = process.env.PORT || 3000;

app.use(cors()); // our "middleware".
app.use(express.json()); //allows us to parse json that our server receives and sends

const uri = process.env.ATLAS_URI; //uri is where our database is stored.
//this is where we connect with our database. Get it from our .env file in this
//same folder.

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
const connection = mongoose.connection; //save it in a different variable
//mongoose is how the database is connected to our application.
connection.on('error', err=> {
  console.log("Failed to connect to the database!");
})
connection.once('open', ()=> {
  console.log("MongoDB database has been connected") //log it if it's successful
});


const spacesRouter = require('./routes/spaces'); //basically import the spaces file.
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
//We don't really have a global route variable, we just specify it for each cases. As in this one.
app.use('/spaces',spacesRouter);//.use function so that the app can use it. Whenever
//a user goes to the website slash /spaces, it will load everything in the router
//that is specified. i.e. /routes/spaces.js
app.use('/users',usersRouter);
app.use('/login',loginRouter);
//nodemon allows us to start a server and it also has hot-reload
app.listen(port, ()=> {
  console.log('Server is running on port: '+port);
});

//in terminal, "nodemon server" to start our server once we're in the same directory
