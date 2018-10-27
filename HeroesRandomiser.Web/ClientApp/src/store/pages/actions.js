import { FETCH_ABOUTPAGE_BEGIN, FETCH_ABOUTPAGE_SUCCESS, FETCH_ABOUTPAGE_FAILURE } from './actionTypes';

export const fetchAboutPage = () => dispatch => {
    dispatch({
        type: FETCH_ABOUTPAGE_BEGIN
    });

    fetch('/api/pages/about').then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_ABOUTPAGE_SUCCESS,
                    payload: body
                });
            });
        } else {
            dispatch({
                type: FETCH_ABOUTPAGE_FAILURE
            });
        }
    }).catch(error => {
        console.error(error);
        dispatch({
            type: FETCH_ABOUTPAGE_FAILURE
        });
    });
}
