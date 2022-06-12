import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../../../../components/Frontend/UI/Title/PageTitle';

import { getActivity, resetActivities } from '../../../../store/actions/frontend/activities';

import './Show.scss';

class Activities extends Component {
    // Lifecycle methods
    componentDidMount() {
        this.props.get(this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { activities: cms } } }
            } },
            frontend: { activities: { loading, activity } }
        } = this.props;
        let content;
        const lang = localStorage.getItem('lang');

        if (loading) content = <>
            <PageTitle title={cms.title} subtitle={cms.loading} />
        </>;
        else if (activity) {
            const { title, author, body, photo } = activity;

            content = <>
                <PageTitle title={cms.title} subtitle={title[lang]} />

                <section className='activity'>
                    <div className='container'>
                        <div className="title">{title[lang]}</div>

                        <div className="embed-responsive embed-responsive-16by9 bg-img" style={{ backgroundImage: 'url("' + photo + '")' }} />

                        <div className='content' dangerouslySetInnerHTML={{ __html: body[lang] }} />
                    </div>
                </section>
            </>;
        }

        return <div className="Activities Show">
            {content}
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: slug => dispatch(getActivity(slug)),
    reset: () => dispatch(resetActivities()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activities));