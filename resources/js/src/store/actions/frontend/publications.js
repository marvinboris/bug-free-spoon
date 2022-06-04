import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetPublications = () => ({ type: actionTypes.PUBLICATIONS_RESET });
const publicationsStart = () => ({ type: actionTypes.PUBLICATIONS_START });
const publicationsSuccess = data => ({ type: actionTypes.PUBLICATIONS_SUCCESS, ...data });
const publicationsFail = error => ({ type: actionTypes.PUBLICATIONS_FAIL, error });
export const getPublications = () => async dispatch => {
    dispatch(publicationsStart());

    try {
        const res = await fetch(`${prefix}publications`);
        const resData = await res.json();

        dispatch(publicationsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(publicationsFail(error));
    }
}

export const getPublication = slug => async dispatch => {
    dispatch(publicationsStart());

    try {
        const res = await fetch(`${prefix}publications/${slug}`);
        const resData = await res.json();

        dispatch(publicationsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(publicationsFail(error));
    }
}