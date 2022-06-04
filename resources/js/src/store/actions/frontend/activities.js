import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetActivities = () => ({ type: actionTypes.ACTIVITIES_RESET });
const activitiesStart = () => ({ type: actionTypes.ACTIVITIES_START });
const activitiesSuccess = data => ({ type: actionTypes.ACTIVITIES_SUCCESS, ...data });
const activitiesFail = error => ({ type: actionTypes.ACTIVITIES_FAIL, error });
export const getActivities = () => async dispatch => {
    dispatch(activitiesStart());

    try {
        const res = await fetch(`${prefix}activities`);
        const resData = await res.json();

        dispatch(activitiesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(activitiesFail(error));
    }
}

export const getActivity = slug => async dispatch => {
    dispatch(activitiesStart());

    try {
        const res = await fetch(`${prefix}activities/${slug}`);
        const resData = await res.json();

        dispatch(activitiesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(activitiesFail(error));
    }
}