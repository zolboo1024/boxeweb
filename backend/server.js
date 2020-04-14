//Zolboo Erdenebaatar
//12/7/2019
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Grid = require('gridfs-stream');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('dotenv').config(); //configures so that we can have our environment
//variables in our dotenv files. In this case, this connects with our .env file in the
//same folder.

//Init app
const app = express(); //create our express server. Express is a server framework for Node.js
const port = process.env.PORT || 3000;

//EJS
app.set('view engine', 'ejs');

//Public folder
app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(cors()); // our "middleware".
app.use(express.json()); //allows us to parse json that our server receives and sends

const uri = process.env.ATLAS_URI; //uri is where our database is stored.
//this is where we connect with our database. Get it from our .env file in this
//same folder.

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection; //save it in a different variable
//mongoose is how the database is connected to our application.
connection.on('error', err => {
  console.log("Failed to connect to the database!");
})
connection.once('open', () => {
  var gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log("MongoDB database has been connected") //log it if it's successful
});

const spacesRouter = require('./routes/spaces'); //basically import the spaces file.
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const uploadRouter = require('./routes/upload');
//We don't really have a global route variable, we just specify it for each cases. As in this one.
app.use('/spaces', spacesRouter); //.use function so that the app can use it. Whenever
//a user goes to the website slash /spaces, it will load everything in the router
//that is specified. i.e. /routes/spaces.js
app.use('/users', usersRouter);
app.use('/login', loginRouter);
//app is basically just a one big server. .use lets you add all the dependencies
//to run the app.
//When you call use, it runs the required files and adds them to the routers.
//app.use('/upload', uploadRouter);
//nodemon allows us to start a server and it also has hot-reload
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
//in terminal, "nodemon server" to start our server once we're in the same directory

var firebaseConfig = {
  apiKey: "AIzaSyAsdNhcJt9MW7ChPW-wrSNQmSSMb4d4dS4",
  authDomain: "genuine-compass-273722.firebaseapp.com",
  databaseURL: "https://genuine-compass-273722.firebaseio.com",
  projectId: "genuine-compass-273722",
  storageBucket: "genuine-compass-273722.appspot.com",
  messagingSenderId: "387695792869",
  appId: "1:387695792869:web:2d370993a376c154b37a0c",
  measurementId: "G-332FTWNFMH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
