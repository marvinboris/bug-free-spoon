import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('users', {
    start: () => ({ type: actionTypes.USERS_START }),
    success: data => ({ type: actionTypes.USERS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.USERS_FAIL, error })
}, type, ...params);

export const resetUsers = () => ({ type: actionTypes.USERS_RESET });
export const getUsers = (page, show, search) => resource('index', page, show, search);
export const getUsersInfo = () => resource('info');
export const getUser = id => resource('show', id);
export const postUsers = data => resource('post', data);
export const patchUsers = (id, data) => resource('patch', id, data);
export const deleteUsers = id => resource('delete', id);
