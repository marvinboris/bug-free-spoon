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

import { deleteFeatures, getFeatures, resetFeatures } from '../../../../store/actions/backend/features';
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
                    pages: { components: { list: { action } }, backend: { pages: { features: { icon, title, add, index, form } } } }
                }
            },
            backend: { features: { loading, error, message, features = [], total } },
            auth: { data: { role: { features: features_ } } }
        } = this.props;

        const feature_ = features_.find(f => f.prefix === 'features');
        const redirect = !feature_ && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = features.map(feature => {
            return updateObject(feature, {
                created_at: convertDate(feature.created_at),
                action: <div className="text-center">
                    <Link to={`/user/features/${feature.id}`} className="mx-1">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    {JSON.parse(feature_.permissions).includes('u') && <Link to={`/user/features/${feature.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>}
                    {JSON.parse(feature_.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(feature.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(features)} get={this.props.get} total={total} bordered add={add} link="/user/features/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.name, key: 'name' },
                { name: form.prefix, key: 'prefix' },
                { name: form.created_at, key: 'created_at' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Features'>
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
    get: (page, show, search) => dispatch(getFeatures(page, show, search)),
    delete: id => dispatch(deleteFeatures(id)),
    reset: () => dispatch(resetFeatures()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));