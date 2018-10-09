import { FETCH_UNIVERSES } from './actionTypes';

const initialState = {
  universes: []
};

const heroDataReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_UNIVERSES:
      return {...state, universes: action.payload};

    default:
      return state;
  }
};

export default heroDataReducer;
