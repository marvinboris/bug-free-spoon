import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/contributions';
import { updateObject, convertDate } from '../../../../shared/utility';
import * as utility from '../utility';

class Index extends Component {
    componentDidMount() { this.props.get() }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { list: { action, see } }, backend: { pages: { contributions: { form } } } }
                }
            },
            backend: { contributions: { contributions = [] } },
        } = this.props;

        const data = contributions.map(contribution => {
            return updateObject(contribution, {
                created_at: convertDate(contribution.created_at),
                payment: <Photo photo={contribution.payment} see={see} title={`${form.payment}: ${contribution.name}`} />,
                action: <Action props={this.props} resource='contributions' item={contribution} />,
            });
        });

        return <utility.index.lifecycle.render className='Contributions' props={this.props} resource='contributions' data={data} fields={[
            { name: form.elder, key: 'elder' },
            { name: form.year, key: 'year' },
            { name: form.payment, key: 'payment' },
            { name: form.paid, key: 'paid' },
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