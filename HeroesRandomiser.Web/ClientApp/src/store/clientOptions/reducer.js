import { SET_TEAMSIZE } from './actionTypes';

const initialState = {
  teamSize: 5,
};

const clientOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMSIZE:
      return {
        ...state,
        teamSize: action.payload
      };

    default:
      return state;
  }
};

export default clientOptionsReducer;
