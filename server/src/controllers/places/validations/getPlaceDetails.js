const { param } = require('express-validator/check');

/**
 * Get Place Details
 * @route GET /v1/places/:placeId
 *
 * @return {Response}
 */
module.exports = [
  param('placeId')
    .exists()
    .withMessage('place param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid query param: must not be empty.'),
];
