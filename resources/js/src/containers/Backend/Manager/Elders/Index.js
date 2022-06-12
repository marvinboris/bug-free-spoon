import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Photo from '../../../../components/Backend/UI/List/Photo';
import Action from '../../../../components/Backend/UI/List/Action';

import actions from '../../../../store/actions/backend/elders';
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
                    pages: { components: { list: { action, see } }, backend: { pages: { elders: { form } } } }
                }
            },
            backend: { elders: { elders = [] } },
        } = this.props;
        const lang = localStorage.getItem('lang');

        const data = elders.map(elder => {
            const title = elder.title[lang];

            return updateObject(elder, {
                created_at: convertDate(elder.created_at),
                title,
                photo: <Photo photo={elder.photo} see={see} title={`${form.elder_photo}: ${elder.name}`} />,
                payment: <Photo photo={elder.payment} see={see} title={`${form.payment}: ${elder.name}`} />,
                action: <Action props={this.props} resource='elders' item={elder} />,
            });
        });

        return <utility.index.lifecycle.render className='Elders' props={this.props} resource='elders' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.email, key: 'email' },
            { name: form.school, key: 'school' },
            { name: form.promotion, key: 'promotion' },
            { name: form.title, key: 'title' },
            { name: form.photo, key: 'photo' },
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