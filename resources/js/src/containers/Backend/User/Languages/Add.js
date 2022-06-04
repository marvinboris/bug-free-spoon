import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getLanguage, patchLanguages, postLanguages, resetLanguages } from '../../../../store/actions/backend/languages';

const initialState = {
    name: '',
    abbr: '',
    flag: '',

    add: false,
}

class Add extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        if (this.props.edit) this.props.patch(this.props.match.params.id, e.target);
        else this.props.post(e.target);
    }

    saveAddHandler = () => this.setState({ add: true }, () => this.props.post(document.querySelector('form')))

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.languages.message && this.props.backend.languages.message && this.props.backend.languages.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/languages',
                state: {
                    message: this.props.backend.languages.message,
                },
            });
        }
        if (!prevProps.backend.languages.language && this.props.backend.languages.language) {
            const { backend: { languages: { language } } } = this.props;
            this.setState({ ...language });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { languages: { icon, title, add, edit, index, form } } } }
                },
                countries,
            },
            backend: { languages: { loading, error, message } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { name, abbr, flag } = this.state;

        const errors = <>
            <Error err={error} />
        </>;
        let content = <Col xs={12}>
            <CustomSpinner />
        </Col>;

        const feature = features.find(f => f.prefix === 'languages');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        const countriesOptions = countries.map(({ country, code, name }) => <option key={country} value={country} code={code}>{name}</option>);

        if (!loading) content = <>
            <Feedback message={message} />

            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <Row>
                <div className="col-lg-9">
                    <Row>
                        <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={abbr} name="abbr" required label={form.abbr} />
                        <FormInput className="col-md-6" type="select" addon={<span className="text-secondary text-small d-inline-flex">
                            <div className="rounded-circle overflow-hidden position-relative d-flex justify-content-center align-items-center" style={{ width: 30, height: 30 }}>
                                <span className={`flag-icon text-xx-large position-absolute flag-icon-${flag.toLowerCase()}`} />
                            </div>
                        </span>} onChange={this.inputChangeHandler} value={flag} validation={{ required: true }} name="flag" required label={form.select_flag}>
                            <option>{form.select_flag}</option>
                            {countriesOptions}
                        </FormInput>
                    </Row>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </Row>
        </>;

        return <div className='Languages'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/roles', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/languages" innerClassName="row justify-content-center">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getLanguage(id)),
    post: data => dispatch(postLanguages(data)),
    patch: (id, data) => dispatch(patchLanguages(id, data)),
    reset: () => dispatch(resetLanguages()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));