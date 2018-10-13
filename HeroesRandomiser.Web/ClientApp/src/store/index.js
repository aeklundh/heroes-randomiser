import { combineReducers } from 'redux';

import heroes from './heroes/reducer';
import inGameCategories from './inGameCategories/reducer';
import universes from './universes/reducer';

const rootReducer = combineReducers({
    heroes: heroes,
    inGameCategories: inGameCategories,
    universes: universes
});

export default rootReducer;
