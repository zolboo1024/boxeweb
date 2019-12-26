const router = require('express').Router();
let Space = require('../models/space.model');

//when you say require, it's basically just bringing in Whatever
//got exported from the specified directory or file.
//Where do we specify if it's a get request or post request?
//I guess if it doesn't save anything, it's not a post request
router.route('/').get((req,res)=> {
  Space.find() //find function is basically connected to the database (it pulls
  //whatever is specified in front of the method call and then finds it
// in the database.)
    .then(spaces => res.json(spaces))
    .catch(err => res.status(400).json('Error: '+err));
});
//the Space variable is used in 2 ways here. First, as a way to actually create
//space and then to just straight up connect to the database and then "find"
//method to be called on it.
router.route('/add').get((req,res)=> {
  const username = req.body.username;
  const location = req.body.location;
  const description = req.body.description;
  //const date = Date.parse(req.body.date);
  //if the type is anything other than string, we have to parse them.
  //add function needs all of the variables in the form of JSON format
  //req is basically just a JSON object that is specified when the add function is called.
  const newSpace = new Space({username,location,description});

  newSpace.save()
    .then(spaces => res.json("Space Saved!"))
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;
