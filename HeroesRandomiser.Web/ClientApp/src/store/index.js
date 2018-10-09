import { combineReducers } from 'redux';

import heroData from './hero-data/reducer';

const rootReducer = combineReducers({
    heroData: heroData
});

export default rootReducer;
