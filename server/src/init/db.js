const mongoose = require('mongoose');
const conf = require('../config');

const db = mongoose.connect(
  conf.get('mongo:uri'),
  {
    // useNewUrlParser: true,
  }
);
module.exports = db;
