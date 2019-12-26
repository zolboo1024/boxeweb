const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spaceSchema = new Schema({
  username: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true},
  //date: {type: Date, required: true} //make it required later
}, {
  timestamps: true
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
