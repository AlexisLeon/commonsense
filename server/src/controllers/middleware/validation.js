const { validationResult } = require('express-validator/check');
const {
  ApiError,
  errorTypes,
  sendApiError,
} = require('../helpers/api');

/**
 * validate
 * @param req
 * @param res
 * @param next
 *
 * Each error returned by .array() and .mapped() methods have the following format by default:
 * {
 *   "msg": "The error message",
 *   "param": "param.name.with.index[0]",
 *   "value": "param value",
 *   // Location of the param that generated this error.
 *   // It's either body, query, params, cookies or headers.
 *   "location": "body",
 *
 *   // nestedErrors only exist when using the oneOf function
 *   "nestedErrors": [{ ... }]
 * }
 *
 */
module.exports.validate = (req, _, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const error = validationErrors.array()[0];

    throw new ApiError(error.msg, {
      type: errorTypes.VALIDATION_ERROR, // INVALID_REQUEST_ERROR, // 422
      param: error.param,
    });
  }

  next();
};
