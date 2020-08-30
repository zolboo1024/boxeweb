const router = require('express').Router(); //we need the express router
//because this is a route that we are creating
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config'); //to not expose sensitive materials
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware');
router.route('/').get(auth, (req, res) => { //if the route is called on its own with no
  //other specifier, we "get"
  User.find(). // we find it from the database. It searches the database according to the model.
  then(users => res.json(users)) //res is what is returned.
  //req is what is requested. Whatever needs to returned
  //to whoever requested the method, that needs to go onto the res file.
  //res.json(users) saves things in json format.
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(400).json("Please enter all fields!!!!")
  }
  //We find the user with the specified email and if it already exists,
  //then we return an error but if not, we just return the user
  //*How does it know which variable in each of the data object to look for?
  //* in this case, how does it know to look for a user with the specified USERNAME?
  User.findOne({username}).then(user => {
    if (user) 
      return res.status(400).json('Username taken!')
  })
  User.findOne({email}).then(user => {
    if (user) 
      return res.status(400).json("User already exists!");
    else { //here, we create the new user and then save it\
        const newUser = new User({username,email,password});

      //Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => { //hash the password
          //and the hash object saves the hashed version of the password.
          if (err) 
            throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            //basically, we are creating a token for any new user that creates/
            //an account
            jwt.sign({
              id: user.id
            }, //here, we are sending the token, we need to
            //very who it is and we are doing it by sending it with the id
            //token with it.
            config.get('jwtSecret'), {
              expiresIn: 3600
            }, (err, token) => { //jwt signs the user which creates the Token
              //and then it saves the token in the header. see
              //how it says res.json({TOKEN, user}).
              if (err) 
                throw err;
              res.json({
                token,
                user: {
                  //everytime something is saved in the database, mongo adds
                  //id variable at the end. if we access it back after saving it,
                  //you can just get the id from the object that you are accessing.
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              })
            })
          })
        })
      })
    }
  }).catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get(auth, (req, res) => {
  User.findById(req.params.id). // we find it from the database. It searches the database according to the model.
  then(user => res.json(user)) //res is what is returned.
  //req is what is requested. Whatever needs to returned
  //to whoever requested the method, that needs to go onto the res file.
  //res.json(users) saves things in json format.
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router; //a standard thing for router file. We're just exporting the router.