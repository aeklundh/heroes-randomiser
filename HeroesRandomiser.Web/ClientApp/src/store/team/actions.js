import { FETCH_TEAM_BEGIN, FETCH_TEAM_SUCCESS, FETCH_TEAM_FAILURE } from './actionTypes';

export const fetchRandomTeam = (teamSize = 5) => dispatch => {
    dispatch({
        type: FETCH_TEAM_BEGIN
    });

    fetch(`/api/randomiser/team?teamSize=${teamSize}`).then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_TEAM_SUCCESS,
                    payload: body
                });
            });
        } else {
            dispatch({
                type: FETCH_TEAM_FAILURE
            });
        }
    }).catch(error => {
        console.error(error);
        dispatch({
            type: FETCH_TEAM_FAILURE
        });
    });
}
