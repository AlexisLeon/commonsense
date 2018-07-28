import {
  CommonSenseValidationError,
  CommonSenseInvalidRequestError,
  CommonSenseAPIError,
} from '../ServiceError';

export default class CommonSenseError extends Error {
  constructor(args) {
    super();

    // Error.captureStackTrace(this, CommonSenseError);

    this.type = 'CommonSenseError';
    if (args.message != null) this.message = args.message;
    if (args.status != null) this.status = args.status;
    if (args.type != null) this.type = args.type;
    if (args.message != null) this.message = args.message;
    if (args.code != null) this.code = args.code;
    if (args.decline_code != null) this.decline_code = args.decline_code;
    if (args.failure_code != null) this.failure_code = args.failure_code;
    if (args.param != null) this.param = args.param;
    if (args.detail != null) this.detail = args.detail;
    if (args.exception != null) this.exception = args.exception;
  }
}

/**
 * Helper factory which takes raw CommonSense errors and outputs wrapping instances
 */
CommonSenseError.generate = function(rawCommonSenseError) {
  switch (rawCommonSenseError.type) {
    case 'validation_error':
      return new CommonSenseError({ ...rawCommonSenseError, type: CommonSenseValidationError });
    case 'invalid_request_error':
      return new CommonSenseError({ ...rawCommonSenseError, type: CommonSenseInvalidRequestError });
    case 'api_error':
      return new CommonSenseError({ ...rawCommonSenseError, type: CommonSenseAPIError });
  }
  return new CommonSenseError({ type: 'Generic', message: 'Unknown Error' });
};
