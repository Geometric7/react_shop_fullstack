const Variant = require('../models/variant.model');

exports.getAll = async (req, res) => {
  try {
    const result = await Variant.find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};
