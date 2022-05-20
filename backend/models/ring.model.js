const mongoose = require('mongoose');

const ringsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  option: { type: String, required: true, ref: 'Option' },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rate: { type: Number },
  category: { type: String, required: true },
  categoryName: { type: String },
  categoryImg: { type: String },
  productSelect: { type: String },
});

module.exports = mongoose.model('Ring', ringsSchema);
