import { manageResource } from '../../../shared/utility';
import * as actionTypes from '../actionTypes';

const resource = (type, ...params) => manageResource('events', {
    start: () => ({ type: actionTypes.EVENTS_START }),
    success: data => ({ type: actionTypes.EVENTS_SUCCESS, ...data }),
    fail: error => ({ type: actionTypes.EVENTS_FAIL, error })
}, type, ...params);

export const resetEvents = () => ({ type: actionTypes.EVENTS_RESET });
export const getEvents = (page, show, search) => resource('index', page, show, search);
export const getEventsInfo = () => resource('info');
export const getEvent = id => resource('show', id);
export const postEvents = data => resource('post', data);
export const patchEvents = (id, data) => resource('patch', id, data);
export const deleteEvents = id => resource('delete', id);
