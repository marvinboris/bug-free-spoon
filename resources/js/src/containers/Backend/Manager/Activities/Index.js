import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/contributions';
import { updateObject, convertDate, htmlEntities } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { activities: { form } } } }
                }
            },
            backend: { activities: { activities = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = activities.map(activity => {
            const title = activity.title[lang];
            const formattedBody = htmlEntities(activity.body[lang]);

            return updateObject(activity, {
                created_at: convertDate(activity.created_at),
                title,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                photo: <Photo photo={activity.photo} see={see} title={`${form.activity_photo}: ${title}`} />,
                action: <Action props={this.props} resource='activities' item={activity} />,
            });
        });

        return <utility.index.lifecycle.render className='Activities' props={this.props} resource='activities' data={data} fields={[
            { name: form.title, key: 'title' },
            { name: form.body, key: 'body' },
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