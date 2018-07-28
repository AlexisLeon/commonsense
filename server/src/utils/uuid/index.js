const IdGenerator = require('./uuid');

const prefixes = {
  customer: 'cus',
  transaction: 'txn',
  session: 'sess',
}; // TODO: Get prefixes from config
const generator = new IdGenerator(Object.values(prefixes));

// return prefix_uuidgenerated
exports.newId = (prefix, len) => {
  if (!len) {
    switch (prefix) {
      case prefixes.customer:
        len = 16;
        break;
      case prefixes.transaction:
        len = 28;
        break;
      default:
        len = 16;
        break;
    }
  }

  return generator.new(prefix, len);
};

// return uuidgenerated
// Only for req.header -> Authorization Token
exports.newToken = len => generator.newUid(len = 24);

exports.prefixes = prefixes;
