import { SET_TEAMSIZE } from './actionTypes';

export const setTeamSize = (teamSize) => dispatch => {
    dispatch({
        type: SET_TEAMSIZE,
        payload: teamSize
    });
}
