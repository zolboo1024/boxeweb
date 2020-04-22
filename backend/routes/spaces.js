const router = require("express").Router();
let Space = require("../models/space.model");
const auth = require("../middleware/auth.middleware");
const crypto = require("crypto");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");
//mongoose exists as part of the server so whenever you call it in,
//it already knows where the database is, for example
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
var gfs;
connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});
var storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
//Create a multer instance and set the destination folder.
//when you say require, it's basically just bringing in Whatever
//got exported from the specified directory or file.
//Where do we specify if it's a get request or post request?
//--After the router function call, we say get post or delete
router.route("/").get((req, res) => {
  //auth is the authorization middleware that we
  //created in the middleware folder. It checks if the user is valid.
  Space.find() //find function is basically connected to the database (it pulls
    //whatever is specified in front of the method call and then finds it
    // in the database.)
    //classes can be actually used as a constructor and as an object at the same time.
    .then((spaces) => res.json(spaces))
    .catch((err) => res.status(400).json("Error: " + err));
});
//the Space variable is used in 2 ways here. First, as a way to actually create
//space and then to just straight up connect to the database and then "find"
//method to be called on it.

//they are not really methods that we are creating. Rather, we are taking the Router
//object and then modifying it using the router method that is built in and then exporting
//it so it is saved.
//whatever is added after : is saved under the name specified. IN this case, the  ID
// will be saved as id in the req params
//This.functionThatReturnsThat().then(that => saveDate()) or something is how then works
router.route("/:id").get((req, res) => {
  console.log("Made it here");
  Space.findById(req.params.id)
    .then((space) => {
      res.json(space);
      console.log(space);
    }) //but if it actually returns something useful,
    //it can be saved. Especially if it is a GET call, like it is specified here,
    //(we are saying it's a get call by specifying get after the route call) it has to
    //return something.
    .catch((err) => res.status(400).json("Error: " + err));
});

//if the id is specified within the URL, then it is stored within the params
//part of the req. If it is in the JSON, then it is in the body.
//Json file: {{body}{params}}
router.route("/:id").delete(auth, (req, res) => {
  Space.findByIdAndDelete(req.params.id)
    .then(() => res.json("Space deleted!")) //res is what is returned. If it returns a message, we
    //don't really care
    .catch((err) => res.status(400).json("Error: " + err));
});

//Upload.single('file') acts as a middleware, look for a file name "file"
//in the form and then run the upload function on it. Being middleware also
//means that it can modify the request before you can access it in the
//main method
router.route("/upload").post(auth, upload.single("file"), (req, res) => {
  //we specify whether we are posting or getting
  //after specifying which route to take.
  const imagename = req.file.filename;
  const username = req.body.username;
  const location = req.body.location;
  const description = req.body.description;
  const areawidth = req.body.areawidth;
  const arealength = req.body.arealength;
  const price = req.body.price;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const creatorid = req.body.creatorid;
  //if the type is anything other than string, we have to parse them.
  //add function needs all of the variables in the form of JSON format
  //req is basically just a JSON object that is specified when the add function is called.
  const newSpace = new Space({
    username,
    location,
    description,
    areawidth,
    arealength,
    price,
    imagename,
    latitude,
    longitude,
    creatorid,
  });
  newSpace
    .save()
    .then((spaces) => res.status(200).json("Space Saved"))
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
  //res.redirect('/') ---redirects the user back to the homepage
});
router.route("/update/:id").post(auth, (req, res) => {
  Space.findById(req.params.id)
    .then((spaceToUpdate) => {
      spaceToUpdate.username = req.body.username;
      spaceToUpdate.location = req.body.location;
      spaceToUpdate.description = req.body.description;
      //if you create a new space, then it will not really update the old information,
      // so we need to get the old file and then update its information
      spaceToUpdate
        .save()
        .then(() => res.json("Space saved!"))
        .catch((err) => res.status(400).json("Error: " + err));
      //if the save function is called on something that already has
      //the ID, then it just updates it I guess.
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/images/:imagename").get((req, res) => {
  //req.params.imagename is how you would get the filename
  //from the url ('/:imagename') at the end.
  gfs.files.findOne(
    {
      filename: req.params.imagename,
    },
    (err, file) => {
      //Check if the file exists
      if (!file || file.length == 0) {
        res.status(404).json({ err: "File does not exist" });
      }

      //Check if the file is images
      if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
        //read output to the browser
        //basically gfs creates a stream and then pipes it out as a response.
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({ err: "Not an image" });
      }
    }
  );
});

const distance = (lat1, lon1, lat2, lon2, unit) => {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
};
/*
- Find all spaces
- Get input from the search 
- Get place in the reducer
- Pass the json of the place with the reducer
- Take lat and lon of the place and call distance function
- Check this code to find all marks that are close enough
- https://stackoverflow.com/questions/51819224/how-to-find-nearest-location-using-latitude-and-longitude-from-a-json-data
- res.send all boxes
- return all boxes on the page.
*/
router.route("/search").post((req, res) => {
  Space.find()
    .then((spaces) => res.json(spaces))
    .catch((err) => res.status(400).json("Error: " + err));
    
});
module.exports = router;
