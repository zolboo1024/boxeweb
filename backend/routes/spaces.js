const router = require('express').Router();
let Space = require('../models/space.model');
const auth = require('../middleware/auth.middleware');

//when you say require, it's basically just bringing in Whatever
//got exported from the specified directory or file.
//Where do we specify if it's a get request or post request?
//--After the router function call, we say get post or delete
router.route('/').get((req,res)=> { //auth is the authorization middleware that we
  //created in the middleware folder. It checks if the user is valid.
  Space.find() //find function is basically connected to the database (it pulls
  //whatever is specified in front of the method call and then finds it
// in the database.)
//classes can be actually used as a constructor and as an object at the same time.
    .then(spaces => res.json(spaces))
    .catch(err => res.status(400).json('Error: '+err));
});
//the Space variable is used in 2 ways here. First, as a way to actually create
//space and then to just straight up connect to the database and then "find"
//method to be called on it.
router.route('/add').post(auth, (req,res)=> { //we specify whether we are posting or getting
  //after specifying which route to take.
  const username = req.body.username;
  const location = req.body.location;
  const description = req.body.description;
  //if the type is anything other than string, we have to parse them.
  //add function needs all of the variables in the form of JSON format
  //req is basically just a JSON object that is specified when the add function is called.
  const newSpace = new Space({username,location,description});

  newSpace.save()
    .then(spaces => res.json("Space Saved!"))
    .catch(err=>res.status(400).json('Error: '+err));
    //Here, it never existed, so it creates a new one when you call save()
});
//they are not really methods that we are creating. Rather, we are taking the Router
//object and then modifying it using the router method that is built in and then exporting
//it so it is saved.
//whatever is added after : is saved under the name specified. IN this case, the // ID
// will be saved as id in the req params
//This.functionThatReturnsThat().then(that => saveDate()) or something is how then works
router.route('/:id').get((req,res)=> {
  Space.findById(req.params.id)
  .then(space => res.json(space)) //but if it actually returns something useful,
  //it can be saved. Especially if it is a GET call, like it is specified here,
  //(we are saying it's a get call by specifying get after the route call) it has to
  //return something.
  .catch(err => res.status(400).json('Error: ' + err));
});

//if the id is specified within the URL, then it is stored within the params
//part of the req. If it is in the JSON, then it is in the body.
//Json file: {{body}{params}}
router.route('/:id').delete(auth, (req,res)=> {
  Space.findByIdAndDelete(req.params.id)
  .then(()=> res.json("Space deleted!")) //res is what is returned. If it returns a message, we
  //don't really care
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req,res)=> {
  Space.findById(req.params.id)
    .then(spaceToUpdate => {
      spaceToUpdate.username= req.body.username;
      spaceToUpdate.location = req.body.location;
      spaceToUpdate.description = req.body.description;
      //if you create a new space, then it will not really update the old information,
      // so we need to get the old file and then update its information
      spaceToUpdate.save()
        .then(()=> res.json("Space saved!"))
        .catch(err => res.status(400).json('Error: '+err));
      //if the save function is called on something that already has
      //the ID, then it just updates it I guess.
    })
    .catch(err => res.status(400).json('Error: '+err));
});
module.exports = router;
