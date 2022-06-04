import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('roles', {
    start: () => ({ type: actionTypes.ROLES_START }),
    success: data => ({ type: actionTypes.ROLES_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.ROLES_FAIL, error })
}, type, ...params);

export const resetRoles = () => ({ type: actionTypes.ROLES_RESET });
export const getRoles = (page, show, search) => resource('index', page, show, search);
export const getRolesInfo = () => resource('info');
export const getRole = id => resource('show', id);
export const postRoles = data => resource('post', data);
export const patchRoles = (id, data) => resource('patch', id, data);
export const deleteRoles = id => resource('delete', id);
