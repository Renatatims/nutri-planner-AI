const { Schema } = require('mongoose');

const nutriPlanSchema = new Schema({
  meals: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = nutriPlanSchema;
