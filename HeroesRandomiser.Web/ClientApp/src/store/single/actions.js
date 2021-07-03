import { FETCH_HERO_BEGIN, FETCH_HERO_FAILURE, FETCH_HERO_SUCCESS } from './actionTypes';

export const fetchRandomHero = () => dispatch => {
    dispatch({
        type: FETCH_HERO_BEGIN
    });

    fetch('/api/randomiser/single', {
        "method": "POST",
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "InGameCategoryIds": null,
            "UniverseIds": null,
            "HeroIds": null
        })
    }).then(response => {
        if (response.ok) {
            response.json().then(body => {
                dispatch({
                    type: FETCH_HERO_SUCCESS,
                    payload: body
                });
            });
        } else {
            dispatch({
                type: FETCH_HERO_FAILURE
            });
        }
    }).catch(error => {
        console.error(error);
        dispatch({
            type: FETCH_HERO_FAILURE
        });
    });
}
