import { FETCH_INGAMECATEGORIES_BEGIN, FETCH_INGAMECATEGORIES_SUCCESS, FETCH_INGAMECATEGORIES_FAILURE } from './actionTypes';

const initialState = {
  inGameCategories: [],
  isFailed: false,
  isLoading: false
};

const inGameCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_INGAMECATEGORIES_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_INGAMECATEGORIES_SUCCESS:
      return {
        ...state,
        inGameCategories: action.payload,
        isFailed: false,
        isLoading: false
      };

    case FETCH_INGAMECATEGORIES_FAILURE:
      return {
        ...state,
        isFailed: true,
        isLoading: false
      };

    default:
      return state;
  }
};

export default inGameCategoriesReducer;
