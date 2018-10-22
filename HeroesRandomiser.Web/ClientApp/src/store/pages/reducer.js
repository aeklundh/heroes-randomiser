import { FETCH_ABOUTPAGE_BEGIN, FETCH_ABOUTPAGE_SUCCESS, FETCH_ABOUTPAGE_FAILURE } from './actionTypes';

const initialState = {
  about: {
    isLoading: false,
    isFailed: false,
    page: {}
  }
};

const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABOUTPAGE_BEGIN:
      return {
        ...state,
        about: {
          ...state.about,
          isLoading: true
        }
      };

    case FETCH_ABOUTPAGE_SUCCESS:
      return {
        ...state,
        about: {
          ...state.about,
          isLoading: false,
          isFailed: false,
          page: action.payload
        }
      };

    case FETCH_ABOUTPAGE_FAILURE:
      return {
        ...state,
        about: {
          ...state.about,
          isLoading: false,
          isFailed: true
        }
      };

    default:
      return state;
  }
};

export default pagesReducer;
