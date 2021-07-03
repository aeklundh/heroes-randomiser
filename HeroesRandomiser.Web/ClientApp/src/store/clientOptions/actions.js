import { SET_TEAMSIZE, SET_RANDOMISER_MODE } from './actionTypes';
import { TEAM_MODE, SINGLE_MODE } from './optionStates';

export const setTeamSize = (teamSize) => dispatch => {
    dispatch({
        type: SET_TEAMSIZE,
        payload: teamSize
    });
}

export const toggleRandomiserMode = (currentMode) => dispatch => {
    dispatch({
        type: SET_RANDOMISER_MODE,
        payload: currentMode === TEAM_MODE ? SINGLE_MODE : TEAM_MODE
    });
}
