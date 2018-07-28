import axios from 'axios';
import ApiError from './Error';
import {
  CommonSenseConnectionError,
  CommonSenseAuthenticationError,
  CommonSensePermissionError,
  CommonSenseRateLimitError,
} from '../ServiceError';
import config from '../../config/config';

const DEFAULT_BASE_PATH = config.api.version;
const DEFAULT_BASIC_AUTH = 'Basic Y29tbW9uc2Vuc2U6c2VjcmV0';
const DEFAULT_TIMEOUT = 120000;

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'account' or 'customers')
 * @param [spec.data={}] Data to be passed to the API.
 */
function ApiMethod(spec) {
  const resourcePath = spec.path;
  const requestMethod = (spec.method || 'GET').toUpperCase();
  const requestData = spec.data || {};
  const requestParams = spec.params || {};

  function responseHandler(callback) {
    return (res) => {
      let response = '';
      const headers = res.headers || {};

      try {
        response = res.data;

        if (response.error) {
          let err;

          response.error.headers = headers;
          response.error.status = res.status;

          if (res.status === 401) {
            err = new ApiError({ ...response.error, type: CommonSenseAuthenticationError });
          } else if (res.status === 403) {
            err = new ApiError({ ...response.error, type: CommonSensePermissionError  });
          } else if (res.status === 429) {
            err = new ApiError({ ...response.error, type: CommonSenseRateLimitError  });
          } else {
            err = ApiError.generate(response.error);
          }
          return callback(err, null);
        }
      } catch (e) {
        return callback(
          new ApiError({
            message: 'Invalid JSON received from the CommonSense API',
            response,
            exception: e,
          }),
          null,
        );
      }

      callback(null, response);
    };
  }

  function errorHandler(callback) {
    return (error) => {
      // if (error.code === 'ECONNABORTED') {
      //   return timeoutHandler(callback);
      // }

      callback(
        new ApiError({
          type: CommonSenseConnectionError,
          message: 'An error occurred with our connection to CommonSense',
          detail: error,
        }),
        null,
      );
    };
  }

  return new Promise((resolve, reject) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const requestPath = `${DEFAULT_BASE_PATH}/${resourcePath}`

    const timeout = DEFAULT_TIMEOUT;

    const isInsecureConnection = config.api.protocol === 'http';
    const protocol = isInsecureConnection ? 'http://' : 'https://';
    const host = `${protocol}${config.api.host}/`;

    axios({
      url: requestPath,
      method: requestMethod,
      baseURL: host,
      headers,
      data: requestData,
      params: requestParams,
      timeout,
      validateStatus: () => true,
    })
      .then(responseHandler((err, res) => (err ? reject(err) : resolve(res))))
      .catch(errorHandler(reject));
  });
}

export default ApiMethod;