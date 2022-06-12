import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('activities', {
    start: () => ({ type: actionTypes.ACTIVITIES_START }),
    success: data => ({ type: actionTypes.ACTIVITIES_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.ACTIVITIES_FAIL, error })
}, type, ...params);

export default {
    reset: () => ({ type: actionTypes.ACTIVITIES_RESET }),
    get: (page, show, search) => resource('index', page, show, search),
    info: () => resource('info'),
    show: id => resource('show', id),
    post: data => resource('post', data),
    patch: (id, data) => resource('patch', id, data),
    delete: id => resource('delete', id),
}
