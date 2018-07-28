const { query } = require('express-validator/check');

/**
 * Get Suggestions - auto complete place
 * @route GET /v1/suggestions
 *
 * @return {Response}
 */
module.exports = [
  query('query')
    .exists()
    .withMessage('query param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid query param: must not be empty.'),
];
