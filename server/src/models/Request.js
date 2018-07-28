const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emptyObj = {
  type: Schema.Types.Mixed,
  default: {},
};

const Request = new Schema({
  ip: String,
  method: String,
  path: String,
  protocol: String,
  created: Date,
  request: {
    params: emptyObj,
    query: emptyObj,
    body: emptyObj,
  },
  response: {
    body: emptyObj,
  },
}, { minimize: false });

// Compile model from schema
module.exports = mongoose.model('Request', Request);
