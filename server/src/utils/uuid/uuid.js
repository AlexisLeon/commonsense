/* eslint-disable class-methods-use-this */
const crypto = require('crypto');

const ALPHA_NUM = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

class IdGenerator {
  constructor(prefixes) {
    if (Array.isArray(prefixes)) {
      this.prefixes = prefixes;
    }
    if (typeof prefixes === 'string') {
      this.prefixes = [prefixes];
    }
    this.prefixes = this.prefixes || [];
  }

  newUid(len) {
    const rnd = crypto.randomBytes(len);
    const value = new Array(len);
    const charsLength = ALPHA_NUM.length;

    for (let i = 0; i < len; i++) {
      value[i] = ALPHA_NUM[rnd[i] % charsLength];
    }

    return value.join('');
  }

  new(prefix, len = 16) {
    if (!prefix) {
      if (this.prefixes.length !== 1) {
        throw new Error('Missing prefix for id');
      }
      prefix = this.prefixes[0];
    }

    if (this.prefixes.length && !~this.prefixes.indexOf(prefix)) {
      throw new Error(`Invalid prefix ${prefix}, valid: ${this.prefixes}`);
    }

    return `${prefix}_${this.newUid(len)}`;
  }
}

module.exports = IdGenerator;
