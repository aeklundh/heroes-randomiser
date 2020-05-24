import { combineReducers } from 'redux';

import clientOptions from './clientOptions/reducer';
import heroes from './heroes/reducer';
import inGameCategories from './inGameCategories/reducer';
import pages from './pages/reducer';
import single from './single/reducer';
import team from './team/reducer';
import universes from './universes/reducer';

const rootReducer = combineReducers({
    clientOptions: clientOptions,
    heroes: heroes,
    inGameCategories: inGameCategories,
    pages: pages,
    single: single,
    team: team,
    universes: universes
});

export default rootReducer;
