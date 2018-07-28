/**
 * Event naming convention
 *
 * Format: VERB_SUBJECT_STATUS:
 *
 * FETCH  _ USER    _ REQUEST
 * UPDATE _ PLACE   _ SUCCESS
 * REMOVE _ ACCOUNT _ FAILURE
 **/

/* Suggestions
============================================================================= */
export const LIST_SUGGESTIONS_REQUEST = 'list_suggestions_request';
export const LIST_SUGGESTIONS_SUCCESS = 'list_suggestions_success';
export const LIST_SUGGESTIONS_FAILURE = 'list_suggestions_failure';
export const CLEAR_SUGGESTIONS = 'clear_suggestions';

/* Places
============================================================================= */
export const RETRIEVE_PLACE_REQUEST = 'retrieve_place_request';
export const RETRIEVE_PLACE_SUCCESS = 'retrieve_place_success';
export const RETRIEVE_PLACE_FAILURE = 'retrieve_place_failure';

/* Directions
============================================================================= */
export const RETRIEVE_DIRECTIONS_REQUEST = 'retrieve_directions_request';
export const RETRIEVE_DIRECTIONS_SUCCESS = 'retrieve_directions_success';
export const RETRIEVE_DIRECTIONS_FAILURE = 'retrieve_directions_failure';
