import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageTitle from '../../../../components/Frontend/UI/Title/PageTitle';
import RemainingTime from '../../../../components/Frontend/UI/RemainingTime';

import { getEvent, resetEvents } from '../../../../store/actions/frontend/events';

import './Show.scss';

class Events extends Component {
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
                pages: { frontend: { pages: { events: cms } } }
            } },
            frontend: { events: { loading, event } }
        } = this.props;
        let content;
        const lang = localStorage.getItem('lang');

        if (loading) content = <>
            <PageTitle title={cms.title} subtitle={cms.loading} />
        </>;
        else if (event) {
            const { title, description, date, body, photo } = event;

            content = <>
                <PageTitle title={cms.title} subtitle={title[lang]} />

                <section className='event'>
                    <div className='container'>
                        <div className="title">{title[lang]}</div>

                        <div className="embed-responsive embed-responsive-16by9 bg-img" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, .45), rgba(0, 0, 0, .45)), url("' + photo + '")' }}>
                            <RemainingTime time={date} />
                        </div>

                        <div className='description' dangerouslySetInnerHTML={{ __html: description[lang] }} />
                        <div className='content' dangerouslySetInnerHTML={{ __html: body[lang] }} />
                    </div>
                </section>
            </>;
        }

        return <div className="Events Show">
            {content}
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: slug => dispatch(getEvent(slug)),
    reset: () => dispatch(resetEvents()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));