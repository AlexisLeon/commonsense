/* eslint-disable no-console */
const request = require('request');

const config = require('../../config');

/**
 * CreateNotification - Create notification
 * @param {object} data
 * @param {string} data.type - Message type
 * @param {object} data.data - Message data
 * @param {string, array} data.playerIDs - OneSignal player ID(s)
 * @param {function} cb - Callback
 * @return {function} cb - Callback
 */
exports.CreateNotification = function CreateNotification({ type, data, playerIDs }, cb) {
  const { headings, contents } = require('./messages')[type](data);

  request(
    {
      method: 'POST',
      uri: 'https://onesignal.com/api/v1/notifications',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${config.get('onesignal:restKey')}`,
      },
      json: true,
      body: {
        app_id: config.get('onesignal:appID'),
        headings,
        contents,
        include_player_ids: Array.isArray(playerIDs) ? playerIDs : [playerIDs],
      },
    },
    (err, response, body) => {
      // TODO: Handle error: Logger, Sentry
      if (err || body.errors) console.error('Error:', body.errors);

      // Success
      return cb(err, body);
    },
  );
};

/**
 * Create Tag Update Notification - Update device tags ONLY iOS
 * @param {string} playerID - OneSignal ID
 * @param {object} data  - Custom tags to update
 * @param {function} cb - Callback
 * @return {function} cb - Callback
 */
exports.CreateTagNotification = (playerID, data, cb) => {
  request(
    {
      method: 'POST',
      uri: 'https://onesignal.com/api/v1/notifications',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${config.get('onesignal:restKey')}`,
      },
      json: true,
      body: {
        app_id: config.get('onesignal:appID'),
        content_available: true, // Tell OneSignal this is not a visible notification
        include_player_ids: [playerID],
        data,
      },
    },
    (err, response, body) => {
      // TODO: Handle error: Logger, Sentry
      if (err || body.errors) console.error('Error:', body.errors);

      // Success
      return cb(err, response, body);
    },
  );
}
