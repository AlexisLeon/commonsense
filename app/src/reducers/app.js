import { HANDLE_WINDOW_DIMENSIONS, TOGGLE_MENU } from '../actions/types';

const INITIAL_STATE = {
  windowWidth: 0,
  windowHeight: 0
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case HANDLE_WINDOW_DIMENSIONS:
      return {
        ...state,
        windowWidth: action.windowWidth,
        windowHeight: action.windowHeight,
      };
    case TOGGLE_MENU:
      return { ...state, menuOpen: !state.menuOpen };
  }

  return state;
}
