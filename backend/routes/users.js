const router = require('express').Router(); //we need the express router
//because this is a route that we are creating
let User = require('../models/user.model');

router.route('/').get((req, res) => { //if the route is called on its own with no
  //other specifier, we "get"
  User.find()// we find it from the database. It searches the database according to the model. 
    .then(users=> res.json(users)) //res is what is returned.
    //req is what is requested. Whatever needs to returned
    //to whoever requested the method, that needs to go onto the res file.
    //res.json(users) saves things in json format.
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() =>res.json('User added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;  //a standard thing for router file. We're just exporting the router.
