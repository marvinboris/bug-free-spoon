import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { init } from 'aos';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import AuthUserLayout from './containers/Auth/User/Layout';
import AuthAdminLayout from './containers/Auth/Admin/Layout';
import FrontendLayout from './containers/Frontend/Layout';
import BackendManagerLayout from './containers/Backend/Manager/Layout';

import Spinner from './components/UI/Preloaders/Spinner';

import { authCheckState } from './store/actions/auth';
import { getContent } from './store/actions/content';

import 'aos/dist/aos.css';

// Manager routes
const asyncManagerCmsGlobal = asyncComponent(() => import('./containers/Backend/Manager/Cms/Global'));
const asyncManagerCmsGeneral = asyncComponent(() => import('./containers/Backend/Manager/Cms/General'));
const asyncManagerCmsMessages = asyncComponent(() => import('./containers/Backend/Manager/Cms/Messages'));
const asyncManagerCmsComponents = asyncComponent(() => import('./containers/Backend/Manager/Cms/Components'));
const asyncManagerCmsAuth = asyncComponent(() => import('./containers/Backend/Manager/Cms/Auth'));
const asyncManagerCmsBackend = asyncComponent(() => import('./containers/Backend/Manager/Cms/Backend'));
const asyncManagerCmsFrontend = asyncComponent(() => import('./containers/Backend/Manager/Cms/Frontend'));

const asyncManagerDashboard = asyncComponent(() => import('./containers/Backend/Manager/Dashboard'));

const asyncManagerFeatures = asyncComponent(() => import('./containers/Backend/Manager/Features'));
const asyncManagerFeaturesAdd = asyncComponent(() => import('./containers/Backend/Manager/Features/Add'));
const asyncManagerFeaturesEdit = asyncComponent(() => import('./containers/Backend/Manager/Features/Edit'));

const asyncManagerLanguages = asyncComponent(() => import('./containers/Backend/Manager/Languages'));
const asyncManagerLanguagesAdd = asyncComponent(() => import('./containers/Backend/Manager/Languages/Add'));
const asyncManagerLanguagesEdit = asyncComponent(() => import('./containers/Backend/Manager/Languages/Edit'));

const asyncManagerRoles = asyncComponent(() => import('./containers/Backend/Manager/Roles'));
const asyncManagerRolesAdd = asyncComponent(() => import('./containers/Backend/Manager/Roles/Add'));
const asyncManagerRolesEdit = asyncComponent(() => import('./containers/Backend/Manager/Roles/Edit'));

const asyncManagerSettingsLanguage = asyncComponent(() => import('./containers/Backend/Manager/Settings/Language'));

const asyncManagerEvents = asyncComponent(() => import('./containers/Backend/Manager/Events'));
const asyncManagerEventsAdd = asyncComponent(() => import('./containers/Backend/Manager/Events/Add'));
const asyncManagerEventsEdit = asyncComponent(() => import('./containers/Backend/Manager/Events/Edit'));

const asyncManagerActivities = asyncComponent(() => import('./containers/Backend/Manager/Activities'));
const asyncManagerActivitiesAdd = asyncComponent(() => import('./containers/Backend/Manager/Activities/Add'));
const asyncManagerActivitiesEdit = asyncComponent(() => import('./containers/Backend/Manager/Activities/Edit'));

const asyncManagerElders = asyncComponent(() => import('./containers/Backend/Manager/Elders'));
const asyncManagerEldersAdd = asyncComponent(() => import('./containers/Backend/Manager/Elders/Add'));
const asyncManagerEldersEdit = asyncComponent(() => import('./containers/Backend/Manager/Elders/Edit'));

const asyncManagerPublications = asyncComponent(() => import('./containers/Backend/Manager/Publications'));
const asyncManagerPublicationsAdd = asyncComponent(() => import('./containers/Backend/Manager/Publications/Add'));
const asyncManagerPublicationsEdit = asyncComponent(() => import('./containers/Backend/Manager/Publications/Edit'));

const asyncManagerSubscribers = asyncComponent(() => import('./containers/Backend/Manager/Subscribers'));
const asyncManagerSubscribersAdd = asyncComponent(() => import('./containers/Backend/Manager/Subscribers/Add'));
const asyncManagerSubscribersEdit = asyncComponent(() => import('./containers/Backend/Manager/Subscribers/Edit'));

const asyncManagerContributions = asyncComponent(() => import('./containers/Backend/Manager/Contributions'));
const asyncManagerContributionsAdd = asyncComponent(() => import('./containers/Backend/Manager/Contributions/Add'));
const asyncManagerContributionsEdit = asyncComponent(() => import('./containers/Backend/Manager/Contributions/Edit'));

const asyncManagerSchools = asyncComponent(() => import('./containers/Backend/Manager/Schools'));
const asyncManagerSchoolsAdd = asyncComponent(() => import('./containers/Backend/Manager/Schools/Add'));
const asyncManagerSchoolsEdit = asyncComponent(() => import('./containers/Backend/Manager/Schools/Edit'));

const asyncManagerUsers = asyncComponent(() => import('./containers/Backend/Manager/Users'));
const asyncManagerUsersAdd = asyncComponent(() => import('./containers/Backend/Manager/Users/Add'));
const asyncManagerUsersEdit = asyncComponent(() => import('./containers/Backend/Manager/Users/Edit'));

// Admin routes
const asyncAdminAdmins = asyncComponent(() => import('./containers/Backend/Admin/Admins'));
const asyncAdminAdminsAdd = asyncComponent(() => import('./containers/Backend/Admin/Admins/Add'));
const asyncAdminAdminsEdit = asyncComponent(() => import('./containers/Backend/Admin/Admins/Edit'));

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

const asyncEventsShow = asyncComponent(() => import('./containers/Frontend/Events/Show'));

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
                    <Route path="/events/:slug" component={asyncEventsShow} />

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

        let routes = <Switch>
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
        </Switch>;

        if (isAuthenticated) {
            routes = <Switch>
                <Route path={['/user', '/admin']}>
                    <BackendManagerLayout>
                        <Switch>
                            <Route path="/admin/admins/:id/edit" component={asyncAdminAdminsEdit} />
                            <Route path="/admin/admins/add" component={asyncAdminAdminsAdd} />
                            <Route path="/admin/admins" component={asyncAdminAdmins} />

                            <Route path="/:manager/schools/:id/edit" component={asyncManagerSchoolsEdit} />
                            <Route path="/:manager/schools/add" component={asyncManagerSchoolsAdd} />
                            <Route path="/:manager/schools" component={asyncManagerSchools} />

                            <Route path="/:manager/contributions/:id/edit" component={asyncManagerContributionsEdit} />
                            <Route path="/:manager/contributions/add" component={asyncManagerContributionsAdd} />
                            <Route path="/:manager/contributions" component={asyncManagerContributions} />

                            <Route path="/:manager/subscribers/:id/edit" component={asyncManagerSubscribersEdit} />
                            <Route path="/:manager/subscribers/add" component={asyncManagerSubscribersAdd} />
                            <Route path="/:manager/subscribers" component={asyncManagerSubscribers} />

                            <Route path="/:manager/publications/:id/edit" component={asyncManagerPublicationsEdit} />
                            <Route path="/:manager/publications/add" component={asyncManagerPublicationsAdd} />
                            <Route path="/:manager/publications" component={asyncManagerPublications} />

                            <Route path="/:manager/elders/:id/edit" component={asyncManagerEldersEdit} />
                            <Route path="/:manager/elders/add" component={asyncManagerEldersAdd} />
                            <Route path="/:manager/elders" component={asyncManagerElders} />

                            <Route path="/:manager/activities/:id/edit" component={asyncManagerActivitiesEdit} />
                            <Route path="/:manager/activities/add" component={asyncManagerActivitiesAdd} />
                            <Route path="/:manager/activities" component={asyncManagerActivities} />

                            <Route path="/:manager/events/:id/edit" component={asyncManagerEventsEdit} />
                            <Route path="/:manager/events/add" component={asyncManagerEventsAdd} />
                            <Route path="/:manager/events" component={asyncManagerEvents} />

                            <Route path="/:manager/cms/global" component={asyncManagerCmsGlobal} />
                            <Route path="/:manager/cms/general" component={asyncManagerCmsGeneral} />
                            <Route path="/:manager/cms/messages" component={asyncManagerCmsMessages} />
                            <Route path="/:manager/cms/components" component={asyncManagerCmsComponents} />
                            <Route path="/:manager/cms/auth" component={asyncManagerCmsAuth} />
                            <Route path="/:manager/cms/backend" component={asyncManagerCmsBackend} />
                            <Route path="/:manager/cms/frontend" component={asyncManagerCmsFrontend} />

                            <Route path="/:manager/dashboard" component={asyncManagerDashboard} />

                            <Route path="/:manager/features/:id/edit" component={asyncManagerFeaturesEdit} />
                            <Route path="/:manager/features/add" component={asyncManagerFeaturesAdd} />
                            <Route path="/:manager/features" component={asyncManagerFeatures} />

                            <Route path="/:manager/languages/:id/edit" component={asyncManagerLanguagesEdit} />
                            <Route path="/:manager/languages/add" component={asyncManagerLanguagesAdd} />
                            <Route path="/:manager/languages" component={asyncManagerLanguages} />

                            <Route path="/:manager/roles/:id/edit" component={asyncManagerRolesEdit} />
                            <Route path="/:manager/roles/add" component={asyncManagerRolesAdd} />
                            <Route path="/:manager/roles" component={asyncManagerRoles} />

                            <Route path="/:manager/settings/language" component={asyncManagerSettingsLanguage} />

                            <Route path="/:manager/users/:id/edit" component={asyncManagerUsersEdit} />
                            <Route path="/:manager/users/add" component={asyncManagerUsersAdd} />
                            <Route path="/:manager/users" component={asyncManagerUsers} />

                            <Redirect path="/admin" to={`/admin/dashboard`} />
                            <Redirect path="/user" to={`/user/dashboard`} />
                        </Switch>
                    </BackendManagerLayout>
                </Route>

                <Redirect path="/dashboard" to={`/${role}/dashboard`} />
                <Redirect path="/login" to={`/${role}/dashboard`} />
                <Redirect path="/start" to={`/${role}/dashboard`} />
                <Redirect path="/auth" to={`/${role}/dashboard`} />

                {frontendRoutes}
            </Switch>;
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
