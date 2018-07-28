const config = require('../config');

/**
 * ToLocaleString - Format given timestamp by locale
 * @param {timestamp} timestamp
 * @param {string} [null] locale
 * @return {string} locale string - timestamp converted
 */
exports.ToLocaleString = (timestamp, locale = config.app.locale) => {
  const date = new Date(timestamp);
  return date.toLocaleString(locale);
};
