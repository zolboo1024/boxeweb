const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next) {
  const token = req.header('x-auth-token');
  //here we are checking for the current token
  //and the saving it in the token variable
  //there is a header called "x-auth-token" in the header of req.
  // Check for token i.e. if the token is valid
  if(!token) return res.status(401).json("No token, authorization denied");

  try {

    //Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //Add user from payload
    req.user = decoded; //here, we add the user part to every request (req).
    //the user is actually just a user object in the database.
    next();
  } catch(e) {
    res.status(401).json("Token is not valid");
  }
}

module.exports = auth;
