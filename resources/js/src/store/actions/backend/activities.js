import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('activities', {
    start: () => ({ type: actionTypes.ACTIVITIES_START }),
    success: data => ({ type: actionTypes.ACTIVITIES_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.ACTIVITIES_FAIL, error })
}, type, ...params);

export const resetActivities = () => ({ type: actionTypes.ACTIVITIES_RESET });
export const getActivities = (page, show, search) => resource('index', page, show, search);
export const getActivitiesInfo = () => resource('info');
export const getActivity = id => resource('show', id);
export const postActivities = data => resource('post', data);
export const patchActivities = (id, data) => resource('patch', id, data);
export const deleteActivities = id => resource('delete', id);
