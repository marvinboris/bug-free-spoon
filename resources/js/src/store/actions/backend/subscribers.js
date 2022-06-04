import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('subscribers', {
    start: () => ({ type: actionTypes.SUBSCRIBERS_START }),
    success: data => ({ type: actionTypes.SUBSCRIBERS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.SUBSCRIBERS_FAIL, error })
}, type, ...params);

export const resetSubscribers = () => ({ type: actionTypes.SUBSCRIBERS_RESET });
export const getSubscribers = (page, show, search) => resource('index', page, show, search);
export const getSubscribersInfo = () => resource('info');
export const getSubscriber = id => resource('show', id);
export const postSubscribers = data => resource('post', data);
export const patchSubscribers = (id, data) => resource('patch', id, data);
export const deleteSubscribers = id => resource('delete', id);
