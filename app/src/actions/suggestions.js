import Api from '../services/Api';
import handleErrors from './handleErrors';
import {
  LIST_SUGGESTIONS_REQUEST,
  LIST_SUGGESTIONS_SUCCESS,
  LIST_SUGGESTIONS_FAILURE,
  CLEAR_SUGGESTIONS,
} from './types';

/*
 * List suggestions - List all suggestions.
 */
export function listSuggestions(query) {
  return async (dispatch) => {
    if (!query) return dispatch({ type: CLEAR_SUGGESTIONS });

    dispatch({ type: LIST_SUGGESTIONS_REQUEST });

    try {
      const suggestions = await Api.suggestions.list(query);

      dispatch({ type: LIST_SUGGESTIONS_SUCCESS, payload: suggestions });

      return suggestions;
    } catch (e) {
      return handleErrors(dispatch, LIST_SUGGESTIONS_FAILURE)(e);
    }
  };
}

/*
 * Clear suggestions - Clear all suggestions.
 */
export function clearSuggestions() {
  return dispatch => dispatch({ type: CLEAR_SUGGESTIONS });
}
