const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  option: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('option', optionsSchema);
