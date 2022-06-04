import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetAlumniCall = () => ({ type: actionTypes.ALUMNI_CALL_RESET });
const alumniCallStart = () => ({ type: actionTypes.ALUMNI_CALL_START });
const alumniCallSuccess = data => ({ type: actionTypes.ALUMNI_CALL_SUCCESS, ...data });
const alumniCallFail = error => ({ type: actionTypes.ALUMNI_CALL_FAIL, error });
export const getAlumniCall = () => async dispatch => {
    dispatch(alumniCallStart());

    try {
        const res = await fetch(`${prefix}alumni-call`);
        const resData = await res.json();

        dispatch(alumniCallSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(alumniCallFail(error));
    }
}