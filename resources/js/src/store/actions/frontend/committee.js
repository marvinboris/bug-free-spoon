import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetCommittee = () => ({ type: actionTypes.COMMITTEE_RESET });
const committeeStart = () => ({ type: actionTypes.COMMITTEE_START });
const committeeSuccess = data => ({ type: actionTypes.COMMITTEE_SUCCESS, ...data });
const committeeFail = error => ({ type: actionTypes.COMMITTEE_FAIL, error });
export const getCommittee = () => async dispatch => {
    dispatch(committeeStart());

    try {
        const res = await fetch(`${prefix}committee`);
        const resData = await res.json();

        dispatch(committeeSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(committeeFail(error));
    }
}