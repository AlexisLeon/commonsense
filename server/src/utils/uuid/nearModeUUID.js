const crypto = require('crypto');

// For uuid length see http://developers.chirp.io/docs/ultrasonic#using-chirp-ultrasonic
// const ALPHA_NUM = '0123456789abcdef'; // Ultrasonic: [0-9a-f]
const ALPHA_NUM = '0123456789abcdefghijklmnopqrstuv'; // Ultrasonic: [0-9a-f]

module.exports = function (len = 10) {
  const rnd = crypto.randomBytes(len);
  const value = new Array(len);
  const charsLength = ALPHA_NUM.length;

  for (let i = 0; i < len; i ++) {
    value[i] = ALPHA_NUM[rnd[i] % charsLength];
  }

  return value.join('');
};
