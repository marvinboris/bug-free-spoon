import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/events';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { events: { form } } } }
                }
            },
            backend: { events: { events = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = events.map(event => {
            const title = event.title[lang];
            const formattedDescription = htmlEntities(event.description[lang]);
            const formattedBody = htmlEntities(event.body[lang]);

            return updateObject(event, {
                created_at: convertDate(event.created_at),
                date: convertDate(event.date),
                title,
                description: formattedDescription.length > 90 ? formattedDescription.substr(0, 90) + '...' : formattedDescription,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                photo: <Photo photo={event.photo} see={see} title={`${form.event_photo}: ${title}`} />,
                action: <Action props={this.props} resource='events' item={event} />,
            });
        });

        return <utility.index.lifecycle.render className='Events' props={this.props} resource='events' data={data} fields={[
            { name: form.title, key: 'title' },
            { name: form.description, key: 'description' },
            { name: form.body, key: 'body' },
            { name: form.date, key: 'date' },
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: (page, show, search) => dispatch(actions.get(page, show, search)),
    delete: id => dispatch(actions.delete(id)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));