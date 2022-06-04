import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Components
import Error from '../../../../components/Error/Error';
import List from '../../../../components/Backend/UI/List/List';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Delete from '../../../../components/Backend/UI/Delete/Delete';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';

import { deleteSubscribers, getSubscribers, resetSubscribers } from '../../../../store/actions/backend/subscribers';
import { updateObject, convertDate } from '../../../../shared/utility';

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
                    pages: { components: { list: { action } }, backend: { pages: { subscribers: { icon, title, add, index, form } } } }
                }
            },
            backend: { subscribers: { loading, error, message, subscribers = [], total } },
            auth: { data: { role: { features } } }
        } = this.props;

        const feature = features.find(f => f.prefix === 'subscribers');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = subscribers.map(subscriber => {
            return updateObject(subscriber, {
                created_at: convertDate(subscriber.created_at),
                action: <div className="text-center">
                    <Link to={`/user/subscribers/${subscriber.id}`} className="mx-1">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/subscribers/${subscriber.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(subscriber.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(subscribers)} get={this.props.get} total={total} bordered add={add} link="/user/subscribers/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.name, key: 'name' },
                { name: form.email, key: 'email' },
                { name: form.created_at, key: 'created_at' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Subscribers'>
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
    get: (page, show, search) => dispatch(getSubscribers(page, show, search)),
    delete: id => dispatch(deleteSubscribers(id)),
    reset: () => dispatch(resetSubscribers()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));