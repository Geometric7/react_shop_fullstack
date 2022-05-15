const mongoose = require('mongoose');

const variantsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  variant: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('variant', variantsSchema);
