import { NEW_USER } from './types';
import { combineReducers } from 'redux';

const initialState = {
  user: {},
}

const userRegistration = (state = initialState, action) => {
  switch(action.type) { 
    case NEW_USER:
      return {
        ...state,
        user: action.payload
      } 
    default:
      return state;
  }
};

export default combineReducers({
  userRegistration,
})
