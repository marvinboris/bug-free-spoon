import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('contributions', {
    start: () => ({ type: actionTypes.CONTRIBUTIONS_START }),
    success: data => ({ type: actionTypes.CONTRIBUTIONS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.CONTRIBUTIONS_FAIL, error })
}, type, ...params);

export default {
    reset: () => ({ type: actionTypes.CONTRIBUTIONS_RESET }),
    get: (page, show, search) => resource('index', page, show, search),
    info: () => resource('info'),
    show: id => resource('show', id),
    post: data => resource('post', data),
    patch: (id, data) => resource('patch', id, data),
    delete: id => resource('delete', id),
}