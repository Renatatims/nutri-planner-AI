const { Schema, model} = require('mongoose');

const nutriPlanSchema = new Schema({
  meals: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

const Nutri = model("Nutri", nutriPlanSchema);
module.exports = Nutri;
