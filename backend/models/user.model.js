//Zolboo Erdenebaatar 12/11/2019

const mongoose = require('mongoose');

const Schema = mongoose.Schema; //Mongoose already has a way to create schemas with templates
//Schema is how the data is organized to be able to put into the DB.
//REST (Get Post Delete) is just a way how the database is managed
//through operations such as website.com/users/add or website.com/users/delete
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlenght: 3
  },//username variable in the userSchema
}, {
  timestamps: true//flags for the schema as the second argument to the Schema variable creation.
});

const User = mongoose.model('User',userSchema); //the name of the DB schema is 'User' and the second argument as userSchema

module.exports = User; //deciding what to export when the js file is imported from somewhere else.
