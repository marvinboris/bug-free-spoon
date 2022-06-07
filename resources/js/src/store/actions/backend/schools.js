import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('schools', {
    start: () => ({ type: actionTypes.SCHOOLS_START }),
    success: data => ({ type: actionTypes.SCHOOLS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.SCHOOLS_FAIL, error })
}, type, ...params);

export const resetSchools = () => ({ type: actionTypes.SCHOOLS_RESET });
export const getSchools = (page, show, search) => resource('index', page, show, search);
export const getSchoolsInfo = () => resource('info');
export const getSchool = id => resource('show', id);
export const postSchools = data => resource('post', data);
export const patchSchools = (id, data) => resource('patch', id, data);
export const deleteSchools = id => resource('delete', id);
