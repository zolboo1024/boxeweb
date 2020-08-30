//Zolboo Erdenebaatar
//12/7/2019
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Grid = require('gridfs-stream');
const socketio = require('socket.io');
const http = require('http');
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
const io = socketio(3002);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
  socket.on('join', ({username}, callback) => {
    console.log(username);
    // if(error) {
    //   callback(error);
    // }
  })
});
const spacesRouter = require('./routes/spaces'); //basically import the spaces file.
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');
//We don't really have a global route variable, we just specify it for each cases. As in this one.
app.use('/spaces', spacesRouter); //.use function so that the app can use it. Whenever
//a user goes to the website slash /spaces, it will load everything in the router
//that is specified. i.e. /routes/spaces.js
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/chat', chatRouter);

//app is basically just a one big server. .use lets you add all the dependencies
//to run the app.
//When you call use, it runs the required files and adds them to the routers.
//app.use('/upload', uploadRouter);
//nodemon allows us to start a server and it also has hot-reload
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
