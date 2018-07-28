import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import app from './app';
import suggestions from './suggestions';
import places from './places';
import directions from './directions';

const rootReducer = combineReducers({
  form,
  app,
  suggestions,
  places,
  directions,
});

export default rootReducer;
