import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Components
import Input from '../../../../components/UI/Input';
import Error from '../../../../components/Error/Error';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getElder, getEldersInfo, postElders, patchElders, resetElders } from '../../../../store/actions/backend/elders';

const initialState = {
    title: {},
    name: '',
    email: '',
    photo: null,
    payment: null,
    paid: '1',
    errors: '',
    school_id: '',
    promotion: '',

    translate: process.env.MIX_DEFAULT_LANG,

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
        if (files) this.readURL(e.target);
        if (name.includes('[')) {
            const { translate } = this.state;
            const stateName = name.split('[')[0];
            const element = this.state[stateName];
            element[translate] = value;
            return this.setState({ [stateName]: element });
        }
        this.setState({ [name]: files ? files[0] : value });
    }

    readURL = input => {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById(`embed-${input.name}`).style.backgroundImage = `url('${e.target.result}')`;
                document.getElementById(`embed-${input.name}`).style.backgroundSize = "cover";
                document.getElementById(`embed-${input.name}`).querySelector(".file-selected").innerHTML = file.name;
            }

            reader.readAsDataURL(file); // convert to base64 string
        }
    }

    fileUpload = id => document.getElementById(id).click()



    // Lifecycle methods
    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
        else this.props.info();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.elders.message && this.props.backend.elders.message && this.props.backend.elders.message.type === 'success' && (!this.props.edit || (this.props.edit && this.props.backend.elders.elder.paid == 0))) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/elders',
                state: {
                    message: this.props.backend.elders.message,
                },
            });
        }
        if (!prevProps.backend.elders.elder && this.props.backend.elders.elder) {
            const { backend: { elders: { elder } } } = this.props;
            this.setState({ ...elder });
        }
        if (this.props.edit && !prevProps.backend.elders.message && this.props.backend.elders.message && this.props.backend.elders.message.type === 'success') {
            const { photo, payment } = this.props.backend.elders.elder;
            this.setState({ photo, payment });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { elders: { icon, title, add, edit, index, form } } } }
                }, languages
            },
            backend: { elders: { loading, error, message, schools = [], elder = {} } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { title: elder_title, name, email, photo, payment, paid, errors: form_errors, school_id, promotion, translate } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const feature = features.find(f => f.prefix === 'elders');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        const schoolsOptions = schools.sort((a, b) => a.name.localeCompare(b.name)).map(school => <option key={JSON.stringify(school)} value={school.id}>{school.name}</option>);
        const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else content = <>
            <Feedback message={message} />

            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className="row">
                        {languages.map(l => <Fragment key={'language-' + l.abbr}>
                            <Input type="text" id={"title-" + l.abbr} className={"col-lg-12" + (l.abbr === translate ? "" : " d-none")} onChange={this.inputChangeHandler} value={elder_title[l.abbr]} name={"title[" + l.abbr + "]"} required label={form.title} />
                        </Fragment>)}
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="translate" label={form.language} onChange={this.inputChangeHandler} value={translate}>
                        {languagesOptions}
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <hr />
                </div>

                <div className="col-lg-9">
                    <Row>
                        <Input className="col-lg-6" type="text" name="name" label={form.name} onChange={this.inputChangeHandler} required value={name} />
                        <Input className="col-lg-6" type="email" name="email" label={form.email} onChange={this.inputChangeHandler} required value={email} />
                        <Input className="col-lg-6" type="select" name="school_id" label={form.school} onChange={this.inputChangeHandler} required value={school_id}>
                            <option>{form.select_school}</option>
                            {schoolsOptions}
                        </Input>
                        <Input className="col-lg-6" type="number" name="promotion" label={form.promotion} onChange={this.inputChangeHandler} required value={promotion} />
                        <Input className="col-lg-12" type="image" name="payment" label={form.payment} onClick={() => this.fileUpload('payment')} cms={form} defaultValue={elder.payment} value={payment} dimensions='21by9' />
                        {this.props.edit && paid == 0 && <Input className="col-lg-12" type="textarea" name="errors" label={form.errors} onChange={this.inputChangeHandler} required value={form_errors} />}

                    </Row>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="paid" label={form.paid} onChange={this.inputChangeHandler} required value={paid}>
                        <option>{form.select_status}</option>
                        <option value={0}>{form.unpaid_status}</option>
                        <option value={1}>{form.paid_status}</option>
                    </Input>
                    <Input type="image" name="photo" label={form.photo} onClick={() => this.fileUpload('photo')} cms={form} defaultValue={elder.photo} value={photo} />
                </div>
            </div>


            <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
        </>;


        return <div className='Elders'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/elders', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/elders" innerClassName="row justify-content-center">
                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    <input type="file" id="payment" name="payment" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getElder(id)),
    info: () => dispatch(getEldersInfo()),
    post: data => dispatch(postElders(data)),
    patch: (id, data) => dispatch(patchElders(id, data)),
    reset: () => dispatch(resetElders()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));