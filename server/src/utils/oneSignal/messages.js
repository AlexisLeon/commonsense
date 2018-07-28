const dateTime = require('../dateTime');

const tls = dateTime.ToLocaleString;

/**
 * {function} payment - Payment Push Notification
 * @param {object} data
 * @param {string} data.currency - Transaction currency
 * @param {object} data.amount - Transaction amount
 * @param {string} data.receiver - Receiver name
 * @param {timestamp} data.timestamp - Transaction date and time formatted by locale
 * @param {string} data.playerLocale - Player locale to format timestamp. e.g 'es-MX'
 * @return {object} messageContent - Notification heading & message
 */
exports.payment = ({ currency, amount, receiver, timestamp }) => ({
  headings: null,
  contents: {
    en: `Your payment of ${currency}${amount} to ${receiver} was successfully processed at ${tls(timestamp)}`,
    es: `Tu pago de ${currency}${amount} a ${receiver} fue procesado con exito el ${tls(timestamp)}`,
  },
});

/**
 * {function} withdrawal - Withdrawal Push Notification
 * @param {object} data
 * @param {string} data.currency - Transaction currency
 * @param {object} data.amount - Transaction amount
 * @param {string} data.bankBranch - Bank Branch name (ATM)
 * @param {timestamp} data.timestamp - Transaction date and time formatted by locale
 * @param {string} data.playerLocale - Player locale to format timestamp. e.g 'es-MX'
 * @return {object} messageContent - Notification heading & message
 */
exports.withdrawal = ({ currency, amount, bankBranch, timestamp, playerLocale }) => ({
  headings: null,
  contents: {
    en: `Your withdrawal of ${currency}${amount} at ${bankBranch} was successfully processed at ${tls(timestamp, playerLocale)}`,
    es: `Tu retiro de ${currency}${amount} en ${bankBranch} fue procesado con exito el ${tls(timestamp, playerLocale)}`,
  },
});

/**
 * {function} payout - Payout transfer Push Notification. Person sent money.
 * @param {object} data
 * @param {string} data.currency - Transaction currency
 * @param {object} data.amount - Transaction amount
 * @param {string, array} data.receiver - Device(s) ID(s)
 * @param {timestamp} data.timestamp - Transaction date and time formatted by locale
 * @param {string} data.playerLocale - Player locale to format timestamp. e.g 'es-MX'
 * @return {object} messageContent - Notification heading & message
 */
exports.payout = ({ currency, amount, receiver, timestamp, playerLocale }) => ({
  headings: null,
  contents: {
    en: `Your transfer of ${currency}${amount} to ${receiver} was successfully sent at ${tls(timestamp, playerLocale)}`,
    es: `Tu transferencia de ${currency}${amount} para ${receiver} fue enviada con exito el ${tls(timestamp, playerLocale)}`,
  },
});

/**
 * {function} deposit - Deposit transfer Push Notification. Person received money.
 * @param {object} data
 * @param {string} data.currency - Transaction currency
 * @param {object} data.amount - Transaction amount
 * @param {string, array} data.emitter - Device(s) ID(s)
 * @param {timestamp} data.timestamp - Transaction date and time formatted by locale
 * @param {string} data.playerLocale - Player locale to format timestamp. e.g 'es-MX'
 * @return {object} messageContent - Notification heading & message
 */
exports.deposit = ({ currency, amount, emitter, timestamp, playerLocale }) => ({
  headings: null,
  contents: {
    en: `You received a deposit of ${currency}${amount} from ${emitter} at ${tls(timestamp, playerLocale)}`,
    es: `Recibiste un deposito de ${currency}${amount} de ${emitter} el ${tls(timestamp, playerLocale)}`,
  },
});

exports.types = [
  'payment',
  'withdrawal',
  'payout',
  'deposit',
];
