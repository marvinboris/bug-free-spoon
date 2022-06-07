import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {};

const resources = [
    'admins', 'cms', 'notifications', 'dashboard', 'features', 'languages', 'roles', 'users', 'settings',
    'events', 'activities', 'elders', 'publications', 'subscribers', 'contributions', 'schools',
];

resources.forEach(resource => {
    initialState[resource] = {
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
        case actionTypes.ADMINS_RESET: return reset('admins', state);
        case actionTypes.ADMINS_START: return start('admins', state);
        case actionTypes.ADMINS_SUCCESS: return success('admins', state, action);
        case actionTypes.ADMINS_FAIL: return fail('admins', state, action);

        case actionTypes.CMS_RESET: return reset('cms', state);
        case actionTypes.CMS_START: return start('cms', state);
        case actionTypes.CMS_SUCCESS: return success('cms', state, action);
        case actionTypes.CMS_FAIL: return fail('cms', state, action);

        case actionTypes.NOTIFICATIONS_RESET: return reset('notifications', state);
        case actionTypes.NOTIFICATIONS_START: return start('notifications', state);
        case actionTypes.NOTIFICATIONS_SUCCESS: return success('notifications', state, action);
        case actionTypes.NOTIFICATIONS_FAIL: return fail('notifications', state, action);

        case actionTypes.DASHBOARD_RESET: return reset('dashboard', state);
        case actionTypes.DASHBOARD_START: return start('dashboard', state);
        case actionTypes.DASHBOARD_SUCCESS: return success('dashboard', state, action);
        case actionTypes.DASHBOARD_FAIL: return fail('dashboard', state, action);

        case actionTypes.FEATURES_RESET: return reset('features', state);
        case actionTypes.FEATURES_START: return start('features', state);
        case actionTypes.FEATURES_SUCCESS: return success('features', state, action);
        case actionTypes.FEATURES_FAIL: return fail('features', state, action);

        case actionTypes.LANGUAGES_RESET: return reset('languages', state);
        case actionTypes.LANGUAGES_START: return start('languages', state);
        case actionTypes.LANGUAGES_SUCCESS: return success('languages', state, action);
        case actionTypes.LANGUAGES_FAIL: return fail('languages', state, action);

        case actionTypes.ROLES_RESET: return reset('roles', state);
        case actionTypes.ROLES_START: return start('roles', state);
        case actionTypes.ROLES_SUCCESS: return success('roles', state, action);
        case actionTypes.ROLES_FAIL: return fail('roles', state, action);

        case actionTypes.USERS_RESET: return reset('users', state);
        case actionTypes.USERS_START: return start('users', state);
        case actionTypes.USERS_SUCCESS: return success('users', state, action);
        case actionTypes.USERS_FAIL: return fail('users', state, action);

        case actionTypes.SETTINGS_RESET: return reset('settings', state);
        case actionTypes.SETTINGS_START: return start('settings', state);
        case actionTypes.SETTINGS_SUCCESS: return success('settings', state, action);
        case actionTypes.SETTINGS_FAIL: return fail('settings', state, action);

        case actionTypes.EVENTS_RESET: return reset('events', state);
        case actionTypes.EVENTS_START: return start('events', state);
        case actionTypes.EVENTS_SUCCESS: return success('events', state, action);
        case actionTypes.EVENTS_FAIL: return fail('events', state, action);

        case actionTypes.ACTIVITIES_RESET: return reset('activities', state);
        case actionTypes.ACTIVITIES_START: return start('activities', state);
        case actionTypes.ACTIVITIES_SUCCESS: return success('activities', state, action);
        case actionTypes.ACTIVITIES_FAIL: return fail('activities', state, action);

        case actionTypes.ELDERS_RESET: return reset('elders', state);
        case actionTypes.ELDERS_START: return start('elders', state);
        case actionTypes.ELDERS_SUCCESS: return success('elders', state, action);
        case actionTypes.ELDERS_FAIL: return fail('elders', state, action);

        case actionTypes.PUBLICATIONS_RESET: return reset('publications', state);
        case actionTypes.PUBLICATIONS_START: return start('publications', state);
        case actionTypes.PUBLICATIONS_SUCCESS: return success('publications', state, action);
        case actionTypes.PUBLICATIONS_FAIL: return fail('publications', state, action);

        case actionTypes.SUBSCRIBERS_RESET: return reset('subscribers', state);
        case actionTypes.SUBSCRIBERS_START: return start('subscribers', state);
        case actionTypes.SUBSCRIBERS_SUCCESS: return success('subscribers', state, action);
        case actionTypes.SUBSCRIBERS_FAIL: return fail('subscribers', state, action);

        case actionTypes.CONTRIBUTIONS_RESET: return reset('contributions', state);
        case actionTypes.CONTRIBUTIONS_START: return start('contributions', state);
        case actionTypes.CONTRIBUTIONS_SUCCESS: return success('contributions', state, action);
        case actionTypes.CONTRIBUTIONS_FAIL: return fail('contributions', state, action);

        case actionTypes.SCHOOLS_RESET: return reset('schools', state);
        case actionTypes.SCHOOLS_START: return start('schools', state);
        case actionTypes.SCHOOLS_SUCCESS: return success('schools', state, action);
        case actionTypes.SCHOOLS_FAIL: return fail('schools', state, action);



        default: return state;
    }
};