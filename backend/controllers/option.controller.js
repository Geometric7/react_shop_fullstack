const Option = require('../models/option.model');

exports.getAll = async (req, res) => {
  try {
    const result = await Option.find();
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
};
