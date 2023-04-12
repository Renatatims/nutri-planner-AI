const { Schema } = require('mongoose');

const nutriPlanSchema = new Schema({
  meals: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = nutriPlanSchema;
