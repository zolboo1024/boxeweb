const mongoose = require('mongoose');

//Mongoose Schema acts not only as a way to model the data
//but also as a way to connect to the database and get
//the collection with the same name.
const Schema = mongoose.Schema;

const spaceSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  areawidth: {
    type: Number,
    required: true
  },
  arealength: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imagename: {
    type: String,
    required: false
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  creatorid: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Space = mongoose.model('Space', spaceSchema);
//mongoose is already connected to our database so this object can
//be modeled and then saved in the database through mongoose.
module.exports = Space;
