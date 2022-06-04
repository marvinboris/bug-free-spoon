import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

// Components
import Error from '../../../../components/Error/Error';
import List from '../../../../components/Backend/UI/List/List';
import View from '../../../../components/Backend/UI/View/View';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Delete from '../../../../components/Backend/UI/Delete/Delete';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';

import { getActivities, deleteActivities, resetActivities } from '../../../../store/actions/backend/activities';
import { updateObject, convertDate, htmlEntities, } from '../../../../shared/utility';

class Index extends Component {
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { activities: { icon, title, add, index, form } } } }
                }
            },
            backend: { activities: { loading, error, message, activities = [], total } },
            auth: { data: { role: { features } } }
        } = this.props;
        const lang = localStorage.getItem('lang');

        const feature = features.find(f => f.prefix === 'activities');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = activities.map(activity => {
            const title = activity.title[lang];
            const formattedBody = htmlEntities(activity.body[lang]);

            return updateObject(activity, {
                created_at: convertDate(activity.created_at),
                title,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                photo: activity.photo && <div className="d-flex">
                    <span>{see}</span>

                    <span className="ml-auto">
                        <View title={`${form.activity_photo}: ${title}`} content={<img src={activity.photo} className="w-100" />}>
                            <i className="fas fa-eye text-green mr-2 fa-fw" />
                        </View>
                    </span>
                </div>,
                action: <div className="text-center">
                    <Link to={`/user/activities/${activity.id}`} className="mx-1">
                        <i className="fas fa-eye text-green fa-fw" />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/activities/${activity.id}/edit`} className="mx-1">
                        <i className="fas fa-edit text-brokenblue fa-fw" />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(activity.id)}><i className="fas fa-trash fa-fw text-red fa-fw" /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(activities)} get={this.props.get} total={total} bordered add={add} link="/user/activities/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.title, key: 'title' },
                { name: form.body, key: 'body' },
                { name: form.photo, key: 'photo' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Activities'>
            <PageTitle title={title} subtitle={index}>
                <Breadcrumb main={index} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                {flash}
                {feedback}
                {content}
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(getActivities(page, show, search)),
    delete: id => dispatch(deleteActivities(id)),
    reset: () => dispatch(resetActivities()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));