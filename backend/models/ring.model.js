const mongoose = require('mongoose');

const ringsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: Date, required: true },
  price: { type: Number },
  rate: { type: Number },
  category: { type: String },
  productSelect: { type: String },
});

module.exports = mongoose.model('Ring', ringsSchema);
