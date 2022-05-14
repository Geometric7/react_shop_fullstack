const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  signature: { type: String, required: true },
  description: { type: Date, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number },
  rate: { type: Number },
  category: { type: String },
});

module.exports = mongoose.model('Ring', ringsSchema);
