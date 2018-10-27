import { FETCH_UNIVERSES_BEGIN, FETCH_UNIVERSES_SUCCESS, FETCH_UNIVERSES_FAILURE } from './actionTypes';

export const fetchUniverses = () => dispatch => {
    dispatch({
        type: FETCH_UNIVERSES_BEGIN
    });

    fetch('/api/herodata/universes').then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_UNIVERSES_SUCCESS,
                    payload: body
                });
            });
        } else {
            dispatch({
                type: FETCH_UNIVERSES_FAILURE
            });
        }
    }).catch(error => {
        console.error(error);
        dispatch({
            type: FETCH_UNIVERSES_FAILURE
        });
    });
}
