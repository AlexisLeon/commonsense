import Api from '../services/Api';
import handleErrors from './handleErrors';
import {
  RETRIEVE_DIRECTIONS_REQUEST,
  RETRIEVE_DIRECTIONS_SUCCESS,
  RETRIEVE_DIRECTIONS_FAILURE,
} from './types';

/*
 * Retrieve directions - Get directions from A to B.
 */
export function retrieveDirections(origin, destination) {
  return async (dispatch) => {
    dispatch({ type: RETRIEVE_DIRECTIONS_REQUEST });

    try {
      const directions = await Api.directions.retrieve({ origin, destination });

      dispatch({ type: RETRIEVE_DIRECTIONS_SUCCESS, payload: directions });

      return directions;
    } catch (e) {
      return handleErrors(dispatch, RETRIEVE_DIRECTIONS_FAILURE)(e);
    }
  };
}
