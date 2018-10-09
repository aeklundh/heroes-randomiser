import { FETCH_UNIVERSES } from './actionTypes';

export const fetchUniverses = () => dispatch => {
    fetch('https://localhost:5001/api/herodata/universes').then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_UNIVERSES,
                    payload: body
                })
            })
        }
    }).catch(error => {
        console.error(error);
    });
}
