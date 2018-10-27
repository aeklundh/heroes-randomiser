import { FETCH_UNIVERSES_BEGIN, FETCH_UNIVERSES_SUCCESS, FETCH_UNIVERSES_FAILURE } from './actionTypes';

const initialState = {
  universes: [],
  isFailed: false,
  isLoading: false
};

const universesReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_UNIVERSES_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_UNIVERSES_SUCCESS:
      return {
        ...state,
        universes: action.payload,
        isFailed: false,
        isLoading: false
      };

    case FETCH_UNIVERSES_FAILURE:
      return {
        ...state,
        isFailed: true,
        isLoading: false
      };

    default:
      return state;
  }
};

export default universesReducer;
