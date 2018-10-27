import { FETCH_HEROES_BEGIN, FETCH_HEROES_SUCCESS, FETCH_HEROES_FAILURE } from './actionTypes';

const initialState = {
  heroes: [],
  isFailed: false,
  isLoading: false
};

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_HEROES_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.payload,
        isFailed: false,
        isLoading: false
      };

    case FETCH_HEROES_FAILURE:
      return {
        ...state,
        isFailed: true,
        isLoading: false
      };

    default:
      return state;
  }
};

export default heroesReducer;
