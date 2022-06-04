import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';

// Components
import Error from '../../../../components/Error/Error';
import List from '../../../../components/Backend/UI/List/List';
import View from '../../../../components/Backend/UI/View/View';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Delete from '../../../../components/Backend/UI/Delete/Delete';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';

import { getElders, deleteElders, resetElders } from '../../../../store/actions/backend/elders';
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
                    pages: { components: { list: { action, see } }, backend: { pages: { elders: { icon, title, add, index, form } } } }
                }
            },
            backend: { elders: { loading, error, message, elders = [], total } },
            auth: { data: { role: { features } } }
        } = this.props;
        const lang = localStorage.getItem('lang');

        const feature = features.find(f => f.prefix === 'elders');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = elders.map(elder => {
            const title = elder.title[lang];

            return updateObject(elder, {
                created_at: convertDate(elder.created_at),
                title,
                photo: elder.photo && <div className="d-flex">
                    <span>{see}</span>

                    <span className="ml-auto">
                        <View title={`${form.elder_photo}: ${elder.name}`} content={<img src={elder.photo} className="w-100" />}>
                            <i className="fas fa-eye text-green mr-2 fa-fw" />
                        </View>
                    </span>
                </div>,
                action: <div className="text-center">
                    <Link to={`/user/elders/${elder.id}`} className="mx-1">
                        <i className="fas fa-eye text-green fa-fw" />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/elders/${elder.id}/edit`} className="mx-1">
                        <i className="fas fa-edit text-brokenblue fa-fw" />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(elder.id)}><i className="fas fa-trash fa-fw text-red fa-fw" /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(elders)} get={this.props.get} total={total} bordered add={add} link="/user/elders/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.name, key: 'name' },
                { name: form.title, key: 'title' },
                { name: form.photo, key: 'photo' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Elders'>
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
    get: (page, show, search) => dispatch(getElders(page, show, search)),
    delete: id => dispatch(deleteElders(id)),
    reset: () => dispatch(resetElders()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));