import { SET_TEAMSIZE, SET_RANDOMISER_MODE } from './actionTypes';
import { TEAM_MODE } from './optionStates';

const initialState = {
  teamSize: 5,
  randomiserMode: TEAM_MODE
};

const clientOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEAMSIZE:
      return {
        ...state,
        teamSize: action.payload
      };

      case SET_RANDOMISER_MODE:
        return {
          ...state,
          randomiserMode: action.payload
        };

    default:
      return state;
  }
};

export default clientOptionsReducer;
