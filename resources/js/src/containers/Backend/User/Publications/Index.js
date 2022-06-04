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

import { getPublications, deletePublications, resetPublications } from '../../../../store/actions/backend/publications';
import { updateObject, convertDate, htmlEntities, } from '../../../../shared/utility';

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
                    pages: { components: { list: { action, see } }, backend: { pages: { publications: { icon, title, add, index, form } } } }
                }
            },
            backend: { publications: { loading, error, message, publications = [], total } },
            auth: { data: { role: { features } } }
        } = this.props;
        const lang = localStorage.getItem('lang');

        const feature = features.find(f => f.prefix === 'publications');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = publications.map(publication => {
            const title = publication.title[lang];
            const formattedBody = htmlEntities(publication.body[lang]);

            return updateObject(publication, {
                created_at: convertDate(publication.created_at),
                title,
                body: formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody,
                photo: publication.photo && <div className="d-flex">
                    <span>{see}</span>

                    <span className="ml-auto">
                        <View title={`${form.publication_photo}: ${title}`} content={<img src={publication.photo} className="w-100" />}>
                            <i className="fas fa-eye text-green mr-2 fa-fw" />
                        </View>
                    </span>
                </div>,
                action: <div className="text-center">
                    <Link to={`/user/publications/${publication.id}`} className="mx-1">
                        <i className="fas fa-eye text-green fa-fw" />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/publications/${publication.id}/edit`} className="mx-1">
                        <i className="fas fa-edit text-brokenblue fa-fw" />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(publication.id)}><i className="fas fa-trash fa-fw text-red fa-fw" /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(publications)} get={this.props.get} total={total} bordered add={add} link="/user/publications/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.title, key: 'title' },
                { name: form.body, key: 'body' },
                { name: form.photo, key: 'photo' },
                { name: action, key: 'action', fixed: true }
            ]} />;

        return <div className='Publications'>
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
    get: (page, show, search) => dispatch(getPublications(page, show, search)),
    delete: id => dispatch(deletePublications(id)),
    reset: () => dispatch(resetPublications()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));