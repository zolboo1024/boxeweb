const router = require('express').Router(); //we need the express router
//because this is a route that we are creating
const auth = require('../middleware/auth.middleware');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init upload
const upload = multer({storage: storage}).single('myImage');
router.route('/').post((req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("Can't upload");
      return res.status(401).json('Unable to upload');
    } else {
      console.log(req.file);
      res.send('test');
    }

  });
});
module.exports = router;
