import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetOpportunities = () => ({ type: actionTypes.OPPORTUNITIES_RESET });
const opportunitiesStart = () => ({ type: actionTypes.OPPORTUNITIES_START });
const opportunitiesSuccess = data => ({ type: actionTypes.OPPORTUNITIES_SUCCESS, ...data });
const opportunitiesFail = error => ({ type: actionTypes.OPPORTUNITIES_FAIL, error });
export const getOpportunities = () => async dispatch => {
    dispatch(opportunitiesStart());

    try {
        const res = await fetch(`${prefix}opportunities`);
        const resData = await res.json();

        dispatch(opportunitiesSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(opportunitiesFail(error));
    }
}