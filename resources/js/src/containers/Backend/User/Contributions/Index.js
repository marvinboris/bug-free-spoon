import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Components
import Error from '../../../../components/Error/Error';
import List from '../../../../components/Backend/UI/List/List';
import View from '../../../../components/Backend/UI/View/View';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Delete from '../../../../components/Backend/UI/Delete/Delete';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';

import { getContributions, deleteContributions, resetContributions } from '../../../../store/actions/backend/contributions';
import { updateObject, convertDate, } from '../../../../shared/utility';

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
                    pages: { components: { list: { action, see } }, backend: { pages: { contributions: { icon, title, add, index, form } } } }
                }
            },
            backend: { contributions: { loading, error, message, contributions = [], total } },
            auth: { data: { role: { features } } }
        } = this.props;

        const feature = features.find(f => f.prefix === 'contributions');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = contributions.map(contribution => {
            return updateObject(contribution, {
                created_at: convertDate(contribution.created_at),
                payment: contribution.payment && <div className="d-flex">
                    <span>{see}</span>

                    <span className="ml-auto">
                        <View title={`${form.payment}: ${contribution.name}`} content={<img src={contribution.payment} className="w-100" />}>
                            <FontAwesomeIcon icon={faEye} className="text-green mr-2" fixedWidth />
                        </View>
                    </span>
                </div>,
                action: <div className="text-center">
                    <Link to={`/user/contributions/${contribution.id}`} className="mx-1">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/contributions/${contribution.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(contribution.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(contributions)} get={this.props.get} total={total} bordered add={add} link="/user/contributions/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.elder, key: 'elder' },
                { name: form.year, key: 'year' },
                { name: form.payment, key: 'payment' },
                { name: form.paid, key: 'paid' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Contributions'>
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
    get: (page, show, search) => dispatch(getContributions(page, show, search)),
    delete: id => dispatch(deleteContributions(id)),
    reset: () => dispatch(resetContributions()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));