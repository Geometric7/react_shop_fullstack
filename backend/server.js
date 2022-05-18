const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
//const MongoStore = require('connect-mongo')(session);
const session = require('express-session');


const ringsRoutes = require('./routes/rings.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const optionRoutes = require('./routes/option.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '../build')));

/* API ENDPOINTS */
app.use('/api', ringsRoutes);
app.use('/api', optionRoutes);
app.use('/api', orderRoutes);
app.use('/api', cartRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
process.env.NODE_ENV === 'production' ?
mongoose.connect('mongodb+srv://', { useNewUrlParser: true, useUnifiedTopology: true }) :
mongoose.connect('mongodb://localhost:27017/EnchantedRings', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//app.use(session({
  //secret: 'shhh!',
  //store: new MongoStore({ mongooseConnection: db }),
  //}));

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+ port);
});
