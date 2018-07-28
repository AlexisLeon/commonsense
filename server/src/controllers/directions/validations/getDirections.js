const { body } = require('express-validator/check');

/**
 * Get Directions
 * @route POST /v1/directions
 *
 * @return {Response}
 */
module.exports = [
  body('origin')
    .exists()
    .withMessage('origin param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid origin param: must not be empty.')
    .isString()
    .withMessage('Invalid origin param: must be a valid place id.'),

  body('destination')
    .exists()
    .withMessage('destination param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid destination param: must not be empty.')
    .isString()
    .withMessage('Invalid destination param: must be a valid place id.'),

  body('mode')
    .exists()
    .withMessage('mode param is required.')
    .not()
    .isEmpty()
    .withMessage('Invalid mode param: must not be empty.')
    .matches(/^(driving|walking|bicycling|transit)$/)
    .withMessage('Invalid mode param: must be a valid mode. Valid modes are driving, walking, bicycling and transit')
];
