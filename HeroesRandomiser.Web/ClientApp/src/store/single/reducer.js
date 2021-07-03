import { FETCH_HERO_BEGIN, FETCH_HERO_SUCCESS, FETCH_HERO_FAILURE } from './actionTypes';

const initialState = {
  single: null,
  isFailed: false,
  isLoading: false
};

const singleReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_HERO_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_HERO_SUCCESS:
      return {
        ...state,
        single: action.payload,
        isFailed: false,
        isLoading: false
      };

    case FETCH_HERO_FAILURE:
      return {
        ...state,
        isFailed: true,
        isLoading: false
      };

    default:
      return state;
  }
};

export default singleReducer;
