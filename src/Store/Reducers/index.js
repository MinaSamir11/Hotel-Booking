import {combineReducers} from 'redux';

import Auth from './Auth';

import Profile from './Profile';

import Places from './Places';

export default combineReducers({
  Auth,
  Profile,
  Places,
});
