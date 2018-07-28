// @flow
import {
  SomeServiceError,
  CommonSenseInvalidRequestError,
  CommonSenseAPIError,
  CommonSenseConnectionError,
  CommonSenseAuthenticationError,
  CommonSenseRateLimitError,
} from '../services/ServiceError';
import { CREATE_APP_NOTIFICATION, LOGOUT_USER } from './types';
// import type ServiceError from '../services/ServiceError';
// import Navigation from '../services/Navigation';

// type ErrorType = String | Function<Object<{type: String}>>;

// TODO: Import errorTypes from error handler module
// TODO: Handle OneSignal errors
// TODO: Handle Realm errors
export default function handleErrors(dispatch/*: any*/, errorType/*: ErrorType */) {
  return (error /*: ServiceError */) => {
    let errorData = null;

    console.log('Handle Service Error', error.type);
    console.log('Error details:', JSON.stringify(error, null , 2));

    switch (error.type) {
      /* Some Service Errors
      ======================================================================= */
      case SomeServiceError: {
        console.log('SomeServiceError');
        break;
      }

      /* API
      ======================================================================= */
      case CommonSenseInvalidRequestError: {
        // Invalid parameters were supplied to CommonSense's API
        dispatch({
          type: CREATE_APP_NOTIFICATION,
          payload: {
            title: 'Error',
            message: error.message,
            type: 'error',
          },
        });
        break;
      }
      case CommonSenseAPIError: {
        // An error occurred internally with CommonSense's API
        dispatch({
          type: CREATE_APP_NOTIFICATION,
          payload: {
            title: 'Error',
            message: error.message,
            type: 'error',
          },
        });
        break;
      }
      case CommonSenseConnectionError: {
        // Some kind of error occurred during the HTTPS communication
        dispatch({
          type: CREATE_APP_NOTIFICATION,
          payload: {
            title: 'Error',
            message: error.message,
            type: 'error',
          },
        });
        break;
      }
      case CommonSenseAuthenticationError: {
        // You probably used an incorrect API key
        // Navigation.navigate('Login');
        dispatch({ type: LOGOUT_USER });
        break;
      }
      case CommonSenseRateLimitError: {
        // Too many requests hit the API too quickly
        dispatch({
          type: CREATE_APP_NOTIFICATION,
          payload: {
            title: 'Error',
            message: error.message,
            type: 'error',
          },
        });
        break;
      }

      default: {
        break;
      }
    }

    // if (errorData) {
    //   if (typeof errorType === 'function') dispatch(errorType(errorData));
    //   else dispatch({ type: errorType, payload: errorData.message });
    // }

    if (typeof errorType === 'function') dispatch(errorType(error));
    else dispatch({ type: errorType, payload: error.message });

    return Promise.reject(error);
  };
}