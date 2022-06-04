import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('publications', {
    start: () => ({ type: actionTypes.PUBLICATIONS_START }),
    success: data => ({ type: actionTypes.PUBLICATIONS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.PUBLICATIONS_FAIL, error })
}, type, ...params);

export const resetPublications = () => ({ type: actionTypes.PUBLICATIONS_RESET });
export const getPublications = (page, show, search) => resource('index', page, show, search);
export const getPublicationsInfo = () => resource('info');
export const getPublication = id => resource('show', id);
export const postPublications = data => resource('post', data);
export const patchPublications = (id, data) => resource('patch', id, data);
export const deletePublications = id => resource('delete', id);
