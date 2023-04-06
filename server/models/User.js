const { Schema, model } = require('mongoose');
const nutriPlanSchema = require("./Nutri")

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nutriPlans: [nutriPlanSchema],
   
});

const User = model('User', userSchema);

module.exports = User;