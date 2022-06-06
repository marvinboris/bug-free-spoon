import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {};

const pages = [
    'home', 'alumni_call', 'committee', 'opportunities', 'contact', 'publications', 'activities', 'events',
];

pages.forEach(page => {
    initialState[page] = {
        loading: false,
        error: null
    }
});

const reset = (root, state) => updateObject(state, { [root]: initialState[root] });
const start = (root, state) => updateObject(state, { [root]: updateObject(state[root], { loading: true, message: null }) });
const success = (root, state, action) => updateObject(state, { [root]: updateObject(state[root], { loading: false, error: null, ...action }) });
const fail = (root, state, action) => updateObject(state, { [root]: updateObject(state[root], { loading: false, ...action }) });

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HOME_RESET: return reset('home', state);
        case actionTypes.HOME_START: return start('home', state);
        case actionTypes.HOME_SUCCESS: return success('home', state, action);
        case actionTypes.HOME_FAIL: return fail('home', state, action);

        case actionTypes.ALUMNI_CALL_RESET: return reset('alumni_call', state);
        case actionTypes.ALUMNI_CALL_START: return start('alumni_call', state);
        case actionTypes.ALUMNI_CALL_SUCCESS: return success('alumni_call', state, action);
        case actionTypes.ALUMNI_CALL_FAIL: return fail('alumni_call', state, action);

        case actionTypes.COMMITTEE_RESET: return reset('committee', state);
        case actionTypes.COMMITTEE_START: return start('committee', state);
        case actionTypes.COMMITTEE_SUCCESS: return success('committee', state, action);
        case actionTypes.COMMITTEE_FAIL: return fail('committee', state, action);

        case actionTypes.OPPORTUNITIES_RESET: return reset('opportunities', state);
        case actionTypes.OPPORTUNITIES_START: return start('opportunities', state);
        case actionTypes.OPPORTUNITIES_SUCCESS: return success('opportunities', state, action);
        case actionTypes.OPPORTUNITIES_FAIL: return fail('opportunities', state, action);

        case actionTypes.CONTACT_RESET: return reset('contact', state);
        case actionTypes.CONTACT_START: return start('contact', state);
        case actionTypes.CONTACT_SUCCESS: return success('contact', state, action);
        case actionTypes.CONTACT_FAIL: return fail('contact', state, action);

        case actionTypes.PUBLICATIONS_RESET: return reset('publications', state);
        case actionTypes.PUBLICATIONS_START: return start('publications', state);
        case actionTypes.PUBLICATIONS_SUCCESS: return success('publications', state, action);
        case actionTypes.PUBLICATIONS_FAIL: return fail('publications', state, action);

        case actionTypes.ACTIVITIES_RESET: return reset('activities', state);
        case actionTypes.ACTIVITIES_START: return start('activities', state);
        case actionTypes.ACTIVITIES_SUCCESS: return success('activities', state, action);
        case actionTypes.ACTIVITIES_FAIL: return fail('activities', state, action);

        case actionTypes.EVENTS_RESET: return reset('events', state);
        case actionTypes.EVENTS_START: return start('events', state);
        case actionTypes.EVENTS_SUCCESS: return success('events', state, action);
        case actionTypes.EVENTS_FAIL: return fail('events', state, action);

        default: return state;
    }
};