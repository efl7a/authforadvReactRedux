import { combineReducers } from 'redux';

import auth from './auth';

export default combineReducers({
  // ES6 now lets us just say auth instead of auth: auth
  auth
});
