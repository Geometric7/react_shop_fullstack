exports.getCart = async (req, res) => {
  try {
    if (!req.session || !req.session.cart || !req.session.cart.rings) res.json([]);
    else if (!req.session.cart.rings.length) res.json([]);
    else res.json(req.session.cart.rings);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.saveCart = async (req, res) => {
  try {
    const { rings } = req.body;
    req.session.cart = {
      rings: rings,
    };
    req.session.save();
    res.json(rings);
  } catch (err) {
    res.status(500).json(err);
  }
};
