import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Row } from 'reactstrap';

import Input from '../../../../components/UI/Input';
import Error from '../../../../components/Error/Error';
import Feedback from '../../../../components/Feedback/Feedback';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { postJoin } from '../../../../store/actions/frontend/home';

import './Join.scss';

const initialState = {
    title: {},
    name: '',
    email: '',
    photo: null,
    payment: null,
    school_id: '',
    promotion: '',

    translate: process.env.MIX_DEFAULT_LANG,
}

class Join extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        this.props.post(e.target);
    }

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
    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.home.message && this.props.frontend.home.message && this.props.frontend.home.message.type === 'success' && !this.props.edit) {
            this.setState({ ...initialState });
        }
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { home: { about: { join: cms } } } } }
                }, languages, schools
            },
            frontend: { home: { loading, error, message } },
        } = this.props;
        const { title, name, email, photo, payment, school_id, promotion, translate } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const schoolsOptions = schools.sort((a, b) => a.name.localeCompare(b.name)).map(school => <option key={JSON.stringify(school)} value={school.id}>{school.name}</option>);
        const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);

        if (loading) content = <div className='col-12'>
            <CustomSpinner />
        </div>;
        else content = <div className='col-12'>
            <Feedback message={message} time={5000} />

            <div className='row justify-content-center'>
                <div className='col-12'>
                    <div className='subtitle'>{cms.subtitle}</div>
                    <label>{cms.form.all_languages}</label>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        {languages.map(l => <Fragment key={'language-' + l.abbr}>
                            <Input type="text" id={"title-" + l.abbr} className={"col-lg-12" + (l.abbr === translate ? "" : " d-none")} onChange={this.inputChangeHandler} value={title[l.abbr]} name={"title[" + l.abbr + "]"} required label={cms.form.title} />
                        </Fragment>)}
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="translate" label={cms.form.language} onChange={this.inputChangeHandler} value={translate}>
                        {languagesOptions}
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <hr />
                </div>

                <div className="col-12">
                    <Row>
                        <Input className="col-lg-6" type="text" name="name" label={cms.form.name} onChange={this.inputChangeHandler} required value={name} />
                        <Input className="col-lg-6" type="email" name="email" label={cms.form.email} onChange={this.inputChangeHandler} required value={email} />
                        <Input className="col-lg-6" type="select" name="school_id" label={cms.form.school} onChange={this.inputChangeHandler} required value={school_id}>
                            <option>{cms.form.select_school}</option>
                            {schoolsOptions}
                        </Input>
                        <Input className="col-lg-6" type="number" name="promotion" label={cms.form.promotion} onChange={this.inputChangeHandler} required value={promotion} />
                        <Input className="col-lg-5" type="image" name="photo" label={cms.form.photo} onClick={() => this.fileUpload('photo')} cms={cms.form} value={photo} />
                        <FormGroup className='col-lg-7'>
                            <Input type="image" name="payment" label={cms.form.payment} onClick={() => this.fileUpload('payment')} cms={cms.form} value={payment} dimensions='21by9' />
                            <p>{cms.form.payment_details}</p>
                        </FormGroup>
                    </Row>
                </div>
            </div>

            <div className='submit'>
                <button className='btn btn-blue'>{cms.form.submit}<i className='fas fa-paper-plane' /></button>
            </div>
        </div>;


        return <div className='Join'>
            {errors}
            <form onSubmit={this.saveHandler} encType="multipart/form-data" className="row justify-content-center">
                <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                <input type="file" id="payment" name="payment" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                {content}
            </form>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(postJoin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Join);