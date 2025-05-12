const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegisterSchema = new Schema({
  empid: {
    type:String
  },
  name: {
    type: String
  },
  age: {
    type: Number
  },
  jobrole: {
    type: String
  },
  mobileno: {
    type: String
  },
  email: {
    type: String
  },
}, {
    collection: 'Registers'
  })

module.exports = mongoose.model('Register', RegisterSchema)