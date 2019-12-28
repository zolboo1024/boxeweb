const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spaceSchema = new Schema({
  username: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true}
}, {
  timestamps: true
});

const Space = mongoose.model('Space', spaceSchema);
//mongoose is already connected to our database so this object can
//be modeled and then saved in the database through mongoose.
module.exports = Space;
