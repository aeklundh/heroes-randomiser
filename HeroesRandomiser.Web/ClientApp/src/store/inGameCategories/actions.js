import { FETCH_INGAMECATEGORIES_BEGIN, FETCH_INGAMECATEGORIES_SUCCESS, FETCH_INGAMECATEGORIES_FAILURE } from './actionTypes';

export const fetchInGameCategories = () => dispatch => {
    dispatch({
        type: FETCH_INGAMECATEGORIES_BEGIN
    });

    fetch('/api/herodata/ingamecategories').then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_INGAMECATEGORIES_SUCCESS,
                    payload: body
                });
            });
        } else {
            dispatch({
                type: FETCH_INGAMECATEGORIES_FAILURE
            });
        }
    }).catch(error => {
        console.error(error);
        dispatch({
            type: FETCH_INGAMECATEGORIES_FAILURE
        });
    });
}
