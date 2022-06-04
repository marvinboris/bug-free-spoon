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

import { deleteLanguages, getLanguages, resetLanguages } from '../../../../store/actions/backend/languages';
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
                    pages: { components: { list: { action } }, backend: { pages: { languages: { icon, title, add, index, form } } } }
                }
            },
            backend: { languages: { loading, error, message, languages = [], total } },
            auth: { data: { role: { features } } }
        } = this.props;

        const feature = features.find(f => f.prefix === 'languages');
        const redirect = !feature && <Redirect to="/user/dashboard" />;

        const errors = <>
            <Error err={error} />
        </>;
        const flash = this.props.location.state ? <Feedback time={5000} message={this.props.location.state.message} /> : null;
        const feedback = <Feedback message={message} />;

        const data = languages.map(language => {
            return updateObject(language, {
                created_at: convertDate(language.created_at),
                flag: <div>
                    <span className={`flag-icon flag-icon-${language.flag.toLowerCase()} mr-1`} />{language.flag}
                </div>,
                action: <div className="text-center">
                    <Link to={`/user/languages/${language.id}`} className="mx-1">
                        <FontAwesomeIcon icon={faEye} className="text-green" fixedWidth />
                    </Link>
                    {JSON.parse(feature.permissions).includes('u') && <Link to={`/user/languages/${language.id}/edit`} className="mx-1">
                        <FontAwesomeIcon icon={faEdit} className="text-brokenblue" fixedWidth />
                    </Link>}
                    {JSON.parse(feature.permissions).includes('d') && <span className="mx-1"><Delete deleteAction={() => this.props.delete(language.id)}><FontAwesomeIcon icon={faTrash} className="text-red" fixedWidth /></Delete></span>}
                </div>,
            });
        });

        const content = <List array={data} loading={loading} data={JSON.stringify(languages)} get={this.props.get} total={total} bordered add={add} link="/user/languages/add" icon={icon} title={index} className="shadow-sm"
            fields={[
                { name: form.name, key: 'name' },
                { name: form.abbr, key: 'abbr' },
                { name: form.flag, key: 'flag' },
                { name: form.created_at, key: 'created_at' },
                { name: action, key: 'action' }
            ]} />;

        return <div className='Languages'>
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
    get: (page, show, search) => dispatch(getLanguages(page, show, search)),
    delete: id => dispatch(deleteLanguages(id)),
    reset: () => dispatch(resetLanguages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));