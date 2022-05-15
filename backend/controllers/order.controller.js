const Order = require('../models/order.model');
const validateInputs = require('../utils/validateInputs.js');

exports.sendOrder = async (req, res) => {
  try {
    const { client, total, rings } = req.body;
    if (validateInputs(client) && rings.length && total) {
      const newOrder = new Order({
        rings: rings,
        client: { ...client },
        total: total,
      });
      await newOrder.save();
      res.json(newOrder);
    } else {
      throw new Error('Wrong input!');
    }

  } catch (err) {
    res.status(500).json(err);
  }
};
