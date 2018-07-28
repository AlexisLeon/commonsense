import {
  LIST_SUGGESTIONS_REQUEST,
  LIST_SUGGESTIONS_SUCCESS,
  LIST_SUGGESTIONS_FAILURE,
  CLEAR_SUGGESTIONS,
} from '../actions/types';

const INITIAL_STATE = {
  suggestions: [],
  suggestionsLoading: false,
  suggestionsError: null,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    /* List suggestions
    ============================================================ */
    case LIST_SUGGESTIONS_REQUEST: {
      return {
        ...state,
        suggestionsLoading: true,
        suggestionsError: INITIAL_STATE.suggestionsError,
        suggestions: INITIAL_STATE.suggestions,
      };
    }

    case LIST_SUGGESTIONS_SUCCESS: {
      return {
        ...state,
        suggestionsLoading: false,
        suggestions: payload,
      };
    }

    case LIST_SUGGESTIONS_FAILURE: {
      return {
        ...state,
        suggestionsLoading: false,
        suggestionsError: payload,
      };
    }

    case CLEAR_SUGGESTIONS: {
      return {
        ...state,
        suggestions: INITIAL_STATE.suggestions,
        suggestionsFor: INITIAL_STATE.suggestionsFor,
      }
    }

    default:
      return state;
  }
};
