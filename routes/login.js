const router = require('express').Router(); //we need the express router
//because this is a route that we are creating
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const config = require('config'); //to not expose sensitive materials
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware'); //to constantly check
//if the current user is logged in. Also, JWT is apparently "stateless".
router.route('/').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //this email and password are the ones that are entered into the boxes in the
  //login page
  if(!email || !password) {
    return res.status(400).json("Please enter all fields!")
  }

  //each user get a token when they create and account and when they log in
  User.findOne({email})
    .then(user => {
      if(!user) return res.status(400).json("User does not exists!");

      //Validate the password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json("Invalid Credentials!");

          jwt.sign(
            { id: user.id }, //here, we are sending the token, we need to
            //very who it is and we are doing it by sending it with the id
            //token with it.
            //token includes the id of the user, so we can use that
            //to make let's say a profile page for each user
            config.get('jwtSecret'),
            { expiresIn: 3600},
            (err, token) => {
              if(err) throw err;
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
    }).catch(err => res.status(400).json('Error: '+err));
});

//This method basically just takes the token that is sent (and we can save the token
//in a cookie or something so that it is persisting and) and then returns what
//user that the token is made for. Basically DECODEs the token to get the user id.
//When you take auth as a parameter and then makes a request, it preprocesses
//the request with that parameter. In this case, auth adds the "user" in the req variable. 
router.route('/user').get(auth, (req,res) => {
  User.findById(req.user.id)
    .select('-password') //disregards the password
    .then(user => res.json(user));
});
module.exports = router;  //a standard thing for router file. We're just exporting the router.
