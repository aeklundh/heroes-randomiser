import { FETCH_HEROES_BEGIN, FETCH_HEROES_SUCCESS, FETCH_HEROES_FAILURE } from './actionTypes';

export const fetchHeroes = () => dispatch => {
    dispatch({
        type: FETCH_HEROES_BEGIN
    });

    fetch('/api/herodata/heroes').then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_HEROES_SUCCESS,
                    payload: body
                });
            });
        } else {
            dispatch({
                type: FETCH_HEROES_FAILURE
            });
        }
    }).catch(error => {
        console.error(error);
        dispatch({
            type: FETCH_HEROES_FAILURE
        });
    });
}
