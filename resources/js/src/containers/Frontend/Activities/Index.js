import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../../../components/UI/PageTitle';
import SectionTitle from '../../../components/UI/SectionTitle';
import ActivityBlock from '../../../components/UI/ActivityBlock';

import { getActivities, resetActivities } from '../../../store/actions/frontend/activities';

import './Activities.scss';

class Activities extends Component {
    // Lifecycle methods
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { activities: cms } } }
            } },
            frontend: { activities: { loading, activities = [] } }
        } = this.props;

        const activitiesContent = activities.map(activity => <div className='col-lg-4' key={JSON.stringify(activity)}><ActivityBlock {...activity} /></div>);

        return <div className="Activities">
            <PageTitle {...cms} />

            <section className='activities'>
                <div className='container'>
                    <SectionTitle {...cms.activities} />

                    <p>{cms.activities.description}</p>

                    <div className='row'>{activitiesContent}</div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getActivities()),
    reset: () => dispatch(resetActivities()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activities));