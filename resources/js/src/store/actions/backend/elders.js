import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('elders', {
    start: () => ({ type: actionTypes.ELDERS_START }),
    success: data => ({ type: actionTypes.ELDERS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.ELDERS_FAIL, error })
}, type, ...params);

export const resetElders = () => ({ type: actionTypes.ELDERS_RESET });
export const getElders = (page, show, search) => resource('index', page, show, search);
export const getEldersInfo = () => resource('info');
export const getElder = id => resource('show', id);
export const postElders = data => resource('post', data);
export const patchElders = (id, data) => resource('patch', id, data);
export const deleteElders = id => resource('delete', id);
