import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('contributions', {
    start: () => ({ type: actionTypes.CONTRIBUTIONS_START }),
    success: data => ({ type: actionTypes.CONTRIBUTIONS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.CONTRIBUTIONS_FAIL, error })
}, type, ...params);

export const resetContributions = () => ({ type: actionTypes.CONTRIBUTIONS_RESET });
export const getContributions = (page, show, search) => resource('index', page, show, search);
export const getContributionsInfo = () => resource('info');
export const getContribution = id => resource('show', id);
export const postContributions = data => resource('post', data);
export const patchContributions = (id, data) => resource('patch', id, data);
export const deleteContributions = id => resource('delete', id);
