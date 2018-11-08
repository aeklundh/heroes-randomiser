import { FETCH_TEAM_BEGIN, FETCH_TEAM_SUCCESS, FETCH_TEAM_FAILURE } from './actionTypes';

const initialState = {
  team: [],
  isFailed: false,
  isLoading: false
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_TEAM_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_TEAM_SUCCESS:
      return {
        ...state,
        team: action.payload,
        isFailed: false,
        isLoading: false
      };

    case FETCH_TEAM_FAILURE:
      return {
        ...state,
        isFailed: true,
        isLoading: false
      };

    default:
      return state;
  }
};

export default teamReducer;
