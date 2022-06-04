import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from 'aos';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import AuthUserLayout from './containers/Auth/User/Layout';
import AuthAdminLayout from './containers/Auth/Admin/Layout';
import FrontendLayout from './containers/Frontend/Layout';
import BackendLayout from './containers/Backend/Layout';
import BackendUserLayout from './containers/Backend/User/Layout';

import Spinner from './components/UI/Spinner';

import { authCheckState } from './store/actions/auth';
import { getContent } from './store/actions/content';

import 'aos/dist/aos.css';

// User routes
const asyncUserCmsGlobal = asyncComponent(() => import('./containers/Backend/User/Cms/Global'));
const asyncUserCmsGeneral = asyncComponent(() => import('./containers/Backend/User/Cms/General'));
const asyncUserCmsMessages = asyncComponent(() => import('./containers/Backend/User/Cms/Messages'));
const asyncUserCmsComponents = asyncComponent(() => import('./containers/Backend/User/Cms/Components'));
const asyncUserCmsAuth = asyncComponent(() => import('./containers/Backend/User/Cms/Auth'));
const asyncUserCmsBackend = asyncComponent(() => import('./containers/Backend/User/Cms/Backend'));
const asyncUserCmsFrontend = asyncComponent(() => import('./containers/Backend/User/Cms/Frontend'));


const asyncUserDashboard = asyncComponent(() => import('./containers/Backend/User/Dashboard'));


const asyncUserFeatures = asyncComponent(() => import('./containers/Backend/User/Features'));
const asyncUserFeaturesAdd = asyncComponent(() => import('./containers/Backend/User/Features/Add'));
const asyncUserFeaturesEdit = asyncComponent(() => import('./containers/Backend/User/Features/Edit'));


const asyncUserLanguages = asyncComponent(() => import('./containers/Backend/User/Languages'));
const asyncUserLanguagesAdd = asyncComponent(() => import('./containers/Backend/User/Languages/Add'));
const asyncUserLanguagesEdit = asyncComponent(() => import('./containers/Backend/User/Languages/Edit'));


const asyncUserRoles = asyncComponent(() => import('./containers/Backend/User/Roles'));
const asyncUserRolesAdd = asyncComponent(() => import('./containers/Backend/User/Roles/Add'));
const asyncUserRolesEdit = asyncComponent(() => import('./containers/Backend/User/Roles/Edit'));


const asyncUserSettingsLanguage = asyncComponent(() => import('./containers/Backend/User/Settings/Language'));


const asyncUserEvents = asyncComponent(() => import('./containers/Backend/User/Events'));
const asyncUserEventsAdd = asyncComponent(() => import('./containers/Backend/User/Events/Add'));
const asyncUserEventsEdit = asyncComponent(() => import('./containers/Backend/User/Events/Edit'));


const asyncUserActivities = asyncComponent(() => import('./containers/Backend/User/Activities'));
const asyncUserActivitiesAdd = asyncComponent(() => import('./containers/Backend/User/Activities/Add'));
const asyncUserActivitiesEdit = asyncComponent(() => import('./containers/Backend/User/Activities/Edit'));


const asyncUserElders = asyncComponent(() => import('./containers/Backend/User/Elders'));
const asyncUserEldersAdd = asyncComponent(() => import('./containers/Backend/User/Elders/Add'));
const asyncUserEldersEdit = asyncComponent(() => import('./containers/Backend/User/Elders/Edit'));


const asyncUserPublications = asyncComponent(() => import('./containers/Backend/User/Publications'));
const asyncUserPublicationsAdd = asyncComponent(() => import('./containers/Backend/User/Publications/Add'));
const asyncUserPublicationsEdit = asyncComponent(() => import('./containers/Backend/User/Publications/Edit'));


const asyncUserSubscribers = asyncComponent(() => import('./containers/Backend/User/Subscribers'));
const asyncUserSubscribersAdd = asyncComponent(() => import('./containers/Backend/User/Subscribers/Add'));
const asyncUserSubscribersEdit = asyncComponent(() => import('./containers/Backend/User/Subscribers/Edit'));


const asyncUserUsers = asyncComponent(() => import('./containers/Backend/User/Users'));
const asyncUserUsersAdd = asyncComponent(() => import('./containers/Backend/User/Users/Add'));
const asyncUserUsersEdit = asyncComponent(() => import('./containers/Backend/User/Users/Edit'));


// Admin routes
const asyncAdminAdmins = asyncComponent(() => import('./containers/Backend/Admin/Admins'));
const asyncAdminAdminsAdd = asyncComponent(() => import('./containers/Backend/Admin/Admins/Add'));
const asyncAdminAdminsEdit = asyncComponent(() => import('./containers/Backend/Admin/Admins/Edit'));


const asyncAdminCmsGlobal = asyncComponent(() => import('./containers/Backend/Admin/Cms/Global'));
const asyncAdminCmsGeneral = asyncComponent(() => import('./containers/Backend/Admin/Cms/General'));
const asyncAdminCmsMessages = asyncComponent(() => import('./containers/Backend/Admin/Cms/Messages'));
const asyncAdminCmsComponents = asyncComponent(() => import('./containers/Backend/Admin/Cms/Components'));
const asyncAdminCmsAuth = asyncComponent(() => import('./containers/Backend/Admin/Cms/Auth'));
const asyncAdminCmsBackend = asyncComponent(() => import('./containers/Backend/Admin/Cms/Backend'));


const asyncAdminDashboard = asyncComponent(() => import('./containers/Backend/Admin/Dashboard'));


const asyncAdminFeatures = asyncComponent(() => import('./containers/Backend/Admin/Features'));
const asyncAdminFeaturesAdd = asyncComponent(() => import('./containers/Backend/Admin/Features/Add'));
const asyncAdminFeaturesEdit = asyncComponent(() => import('./containers/Backend/Admin/Features/Edit'));


const asyncAdminLanguages = asyncComponent(() => import('./containers/Backend/Admin/Languages'));
const asyncAdminLanguagesAdd = asyncComponent(() => import('./containers/Backend/Admin/Languages/Add'));
const asyncAdminLanguagesEdit = asyncComponent(() => import('./containers/Backend/Admin/Languages/Edit'));


const asyncAdminRoles = asyncComponent(() => import('./containers/Backend/Admin/Roles'));
const asyncAdminRolesAdd = asyncComponent(() => import('./containers/Backend/Admin/Roles/Add'));
const asyncAdminRolesEdit = asyncComponent(() => import('./containers/Backend/Admin/Roles/Edit'));


const asyncAdminSettingsLanguage = asyncComponent(() => import('./containers/Backend/Admin/Settings/Language'));


const asyncAdminUsers = asyncComponent(() => import('./containers/Backend/Admin/Users'));
const asyncAdminUsersAdd = asyncComponent(() => import('./containers/Backend/Admin/Users/Add'));
const asyncAdminUsersEdit = asyncComponent(() => import('./containers/Backend/Admin/Users/Edit'));


// Auth routes
const asyncAuthUserLogin = asyncComponent(() => import('./containers/Auth/User/Login'));


const asyncAuthAdminLogin = asyncComponent(() => import('./containers/Auth/Admin/Login'));
const asyncAuthAdminVerify = asyncComponent(() => import('./containers/Auth/Admin/Verify'));


// Frontend routes
const asyncHome = asyncComponent(() => import('./containers/Frontend/Home'));
const asyncAlumniCall = asyncComponent(() => import('./containers/Frontend/AlumniCall'));
const asyncCommittee = asyncComponent(() => import('./containers/Frontend/Committee'));
const asyncOpportunities = asyncComponent(() => import('./containers/Frontend/Opportunities'));
const asyncContact = asyncComponent(() => import('./containers/Frontend/Contact'));

const asyncPublications = asyncComponent(() => import('./containers/Frontend/Publications'));
const asyncPublicationsShow = asyncComponent(() => import('./containers/Frontend/Publications/Show'));

const asyncActivities = asyncComponent(() => import('./containers/Frontend/Activities'));
const asyncActivitiesShow = asyncComponent(() => import('./containers/Frontend/Activities/Show'));

class App extends Component {
    componentDidMount() {
        const { onTryAuthSignup, onGetContent } = this.props;
        onTryAuthSignup();
        onGetContent();
        init();
    }

    render() {
        const { content: { cms, countries }, auth: { role } } = this.props;
        const isAuthenticated = localStorage.getItem('token') !== null;

        const frontendRoutes = <Route path="/">
            <FrontendLayout>
                <Switch>
                    <Route path="/activities/:slug" component={asyncActivitiesShow} />
                    <Route path="/activities" component={asyncActivities} />

                    <Route path="/publications/:slug" component={asyncPublicationsShow} />
                    <Route path="/publications" component={asyncPublications} />

                    <Route path="/contact" component={asyncContact} />
                    <Route path="/opportunities" component={asyncOpportunities} />
                    <Route path="/committee" component={asyncCommittee} />
                    <Route path="/alumni-call" component={asyncAlumniCall} />
                    <Route path="/" component={asyncHome} />
                </Switch>
            </FrontendLayout>
        </Route>;

        let routes = (
            <Switch>
                <Route path="/auth/admin">
                    <AuthAdminLayout>
                        <Switch>
                            <Route path="/auth/admin/verify" component={asyncAuthAdminVerify} />
                            <Route path="/auth/admin/login" component={asyncAuthAdminLogin} />
                        </Switch>
                    </AuthAdminLayout>
                </Route>
                <Redirect path="/admin" to="/auth/admin/login" />

                <Route path="/auth/user">
                    <AuthUserLayout>
                        <Switch>
                            <Route path="/auth/user/login" component={asyncAuthUserLogin} />
                        </Switch>
                    </AuthUserLayout>
                </Route>
                <Redirect path="/user" to="/auth/user/login" />

                {frontendRoutes}
            </Switch>
        );

        if (isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/user">
                        <BackendUserLayout>
                            <Switch>
                                <Route path="/user/subscribers/:id/edit" component={asyncUserSubscribersEdit} />
                                <Route path="/user/subscribers/add" component={asyncUserSubscribersAdd} />
                                <Route path="/user/subscribers" component={asyncUserSubscribers} />

                                <Route path="/user/publications/:id/edit" component={asyncUserPublicationsEdit} />
                                <Route path="/user/publications/add" component={asyncUserPublicationsAdd} />
                                <Route path="/user/publications" component={asyncUserPublications} />

                                <Route path="/user/elders/:id/edit" component={asyncUserEldersEdit} />
                                <Route path="/user/elders/add" component={asyncUserEldersAdd} />
                                <Route path="/user/elders" component={asyncUserElders} />

                                <Route path="/user/activities/:id/edit" component={asyncUserActivitiesEdit} />
                                <Route path="/user/activities/add" component={asyncUserActivitiesAdd} />
                                <Route path="/user/activities" component={asyncUserActivities} />

                                <Route path="/user/events/:id/edit" component={asyncUserEventsEdit} />
                                <Route path="/user/events/add" component={asyncUserEventsAdd} />
                                <Route path="/user/events" component={asyncUserEvents} />

                                <Route path="/user/cms/global" component={asyncUserCmsGlobal} />
                                <Route path="/user/cms/general" component={asyncUserCmsGeneral} />
                                <Route path="/user/cms/messages" component={asyncUserCmsMessages} />
                                <Route path="/user/cms/components" component={asyncUserCmsComponents} />
                                <Route path="/user/cms/auth" component={asyncUserCmsAuth} />
                                <Route path="/user/cms/backend" component={asyncUserCmsBackend} />
                                <Route path="/user/cms/frontend" component={asyncUserCmsFrontend} />

                                <Route path="/user/dashboard" component={asyncUserDashboard} />

                                <Route path="/user/features/:id/edit" component={asyncUserFeaturesEdit} />
                                <Route path="/user/features/add" component={asyncUserFeaturesAdd} />
                                <Route path="/user/features" component={asyncUserFeatures} />

                                <Route path="/user/languages/:id/edit" component={asyncUserLanguagesEdit} />
                                <Route path="/user/languages/add" component={asyncUserLanguagesAdd} />
                                <Route path="/user/languages" component={asyncUserLanguages} />

                                <Route path="/user/roles/:id/edit" component={asyncUserRolesEdit} />
                                <Route path="/user/roles/add" component={asyncUserRolesAdd} />
                                <Route path="/user/roles" component={asyncUserRoles} />

                                <Route path="/user/settings/language" component={asyncUserSettingsLanguage} />

                                <Route path="/user/users/:id/edit" component={asyncUserUsersEdit} />
                                <Route path="/user/users/add" component={asyncUserUsersAdd} />
                                <Route path="/user/users" component={asyncUserUsers} />

                                <Redirect path="/user" to={`/user/dashboard`} />
                            </Switch>
                        </BackendUserLayout>
                    </Route>



                    <Route path="/admin">
                        <BackendLayout>
                            <Switch>
                                <Route path="/admin/admins/:id/edit" component={asyncAdminAdminsEdit} />
                                <Route path="/admin/admins/add" component={asyncAdminAdminsAdd} />
                                <Route path="/admin/admins" component={asyncAdminAdmins} />

                                <Route path="/admin/cms/global" component={asyncAdminCmsGlobal} />
                                <Route path="/admin/cms/general" component={asyncAdminCmsGeneral} />
                                <Route path="/admin/cms/messages" component={asyncAdminCmsMessages} />
                                <Route path="/admin/cms/components" component={asyncAdminCmsComponents} />
                                <Route path="/admin/cms/auth" component={asyncAdminCmsAuth} />
                                <Route path="/admin/cms/backend" component={asyncAdminCmsBackend} />

                                <Route path="/admin/dashboard" component={asyncAdminDashboard} />

                                <Route path="/admin/features/:id/edit" component={asyncAdminFeaturesEdit} />
                                <Route path="/admin/features/add" component={asyncAdminFeaturesAdd} />
                                <Route path="/admin/features" component={asyncAdminFeatures} />

                                <Route path="/admin/languages/:id/edit" component={asyncAdminLanguagesEdit} />
                                <Route path="/admin/languages/add" component={asyncAdminLanguagesAdd} />
                                <Route path="/admin/languages" component={asyncAdminLanguages} />

                                <Route path="/admin/roles/:id/edit" component={asyncAdminRolesEdit} />
                                <Route path="/admin/roles/add" component={asyncAdminRolesAdd} />
                                <Route path="/admin/roles" component={asyncAdminRoles} />

                                <Route path="/admin/settings/language" component={asyncAdminSettingsLanguage} />

                                <Route path="/admin/users/:id/edit" component={asyncAdminUsersEdit} />
                                <Route path="/admin/users/add" component={asyncAdminUsersAdd} />
                                <Route path="/admin/users" component={asyncAdminUsers} />

                                <Redirect path="/admin" to={`/admin/dashboard`} />
                            </Switch>
                        </BackendLayout>
                    </Route>



                    <Redirect path="/dashboard" to={`/${role}/dashboard`} />
                    <Redirect path="/login" to={`/${role}/dashboard`} />
                    <Redirect path="/start" to={`/${role}/dashboard`} />
                    <Redirect path="/auth" to={`/${role}/dashboard`} />

                    {frontendRoutes}
                </Switch>
            );
        }

        const dataReady = cms !== undefined && countries !== undefined && ((isAuthenticated && role !== undefined) || !isAuthenticated);

        return <div className='App'>{dataReady ? routes : <Spinner />}</div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    onTryAuthSignup: () => dispatch(authCheckState()),
    onGetContent: () => dispatch(getContent()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
