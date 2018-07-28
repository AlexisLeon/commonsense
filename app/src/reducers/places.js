import {
  RETRIEVE_PLACE_REQUEST,
  RETRIEVE_PLACE_SUCCESS,
  RETRIEVE_PLACE_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  place: [],
  placeLoading: false,
  placeError: null,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    /* Retrieve place
    ============================================================ */
    case RETRIEVE_PLACE_REQUEST: {
      return {
        ...state,
        placeLoading: true,
        placeError: INITIAL_STATE.placeError,
        place: INITIAL_STATE.place,
      };
    }

    case RETRIEVE_PLACE_SUCCESS: {
      return {
        ...state,
        placeLoading: false,
        place: payload,
      };
    }

    case RETRIEVE_PLACE_FAILURE: {
      return {
        ...state,
        placeLoading: false,
        placeError: payload,
      };
    }

    default:
      return state;
  }
};
