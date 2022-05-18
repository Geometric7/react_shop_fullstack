const Ring = require('../models/ring.model');

exports.getAll = async (req, res) => {
  try {
    const result = await Ring.find();
    if(!result) res.status(404).json({ ring: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await Ring
      .find({ id: req.params.id});
    if(!result) res.status(404).json({ ring: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};
