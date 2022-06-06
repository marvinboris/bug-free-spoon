import * as actionTypes from '../actionTypes';

const prefix = '/api/';

export const resetEvents = () => ({ type: actionTypes.EVENTS_RESET });
const eventsStart = () => ({ type: actionTypes.EVENTS_START });
const eventsSuccess = data => ({ type: actionTypes.EVENTS_SUCCESS, ...data });
const eventsFail = error => ({ type: actionTypes.EVENTS_FAIL, error });
export const getEvents = () => async dispatch => {
    dispatch(eventsStart());

    try {
        const res = await fetch(`${prefix}events`);
        const resData = await res.json();

        dispatch(eventsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(eventsFail(error));
    }
}

export const getEvent = slug => async dispatch => {
    dispatch(eventsStart());

    try {
        const res = await fetch(`${prefix}events/${slug}`);
        const resData = await res.json();

        dispatch(eventsSuccess(resData));
    } catch (error) {
        console.log(error);
        dispatch(eventsFail(error));
    }
}