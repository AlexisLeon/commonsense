import {
  RETRIEVE_DIRECTIONS_REQUEST,
  RETRIEVE_DIRECTIONS_SUCCESS,
  RETRIEVE_DIRECTIONS_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  origin: {
    placeId: null,
    address: null,
  },
  destination: {
    placeId: null,
    address: null,
  },
  directions: {
    steps: []
  },
  directionsLoading: false,
  directionsError: null,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    /* Retrieve directions
    ============================================================ */
    case RETRIEVE_DIRECTIONS_REQUEST: {
      return {
        ...state,
        directionsLoading: true,
        directionsError: INITIAL_STATE.directionsError,
        directions: INITIAL_STATE.directions,
      };
    }

    case RETRIEVE_DIRECTIONS_SUCCESS: {
      return {
        ...state,
        directionsLoading: false,
        directions: payload,
      };
    }

    case RETRIEVE_DIRECTIONS_FAILURE: {
      return {
        ...state,
        directionsLoading: false,
        directionsError: payload,
      };
    }

    default:
      return state;
  }
};
