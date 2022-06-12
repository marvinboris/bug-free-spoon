import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/schools';
import { updateObject, convertDate } from '../../../../shared/utility';
import * as utility from '../utility';

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
                    pages: { components: { list: { action } }, backend: { pages: { schools: { form } } } }
                }
            },
            backend: { schools: { schools = [] } },
        } = this.props;

        const data = schools.map(school => {
            return updateObject(school, {
                created_at: convertDate(school.created_at),
                action: <Action props={this.props} resource='schools' item={school} />,
            });
        });

        return <utility.index.lifecycle.render className='Schools' props={this.props} resource='schools' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.abbr, key: 'abbr' },
            { name: form.link, key: 'link' },
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