import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, Row } from 'reactstrap';

import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
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

    translate: '',
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

    fileUpload = name => document.getElementById(name).click()



    // Lifecycle methods
    componentDidMount() {
        this.setState({ translate: process.env.MIX_DEFAULT_LANG });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { pages: { home: { about: { join: cms } } } } }
                }, languages
            },
            frontend: { home: { loading, error, message } },
        } = this.props;
        const { title, name, email, photo, payment, translate } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);

        if (loading) content = <div className='col-12'>
            <CustomSpinner />
        </div>;
        else content = <div className='col-12'>
            <Feedback message={message} />

            <div className='row justify-content-center'>
                <div className='col-12'>
                    <div className='subtitle'>{cms.subtitle}</div>
                    <label>{cms.form.all_languages}</label>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        {languages.map(l => <Fragment key={'language-' + l.abbr}>
                            <FormInput type="text" id={"title-" + l.abbr} className={"col-md-12" + (l.abbr === translate ? "" : " d-none")} icon="user-tie" onChange={this.inputChangeHandler} value={title[l.abbr]} name={"title[" + l.abbr + "]"} required placeholder={cms.form.title} />
                        </Fragment>)}
                    </div>
                </div>

                <div className="col-lg-3">
                    <FormGroup>
                        <Input type="select" name="translate" onChange={this.inputChangeHandler} value={translate}>
                            {languagesOptions}
                        </Input>
                    </FormGroup>
                </div>

                <div className="col-12 mb-3">
                    <hr />
                </div>

                <div className="col-12">
                    <Row>
                        <FormInput className="col-md-6" type="text" name="name" placeholder={cms.form.name} onChange={this.inputChangeHandler} icon="user" required value={name} />
                        <FormInput className="col-md-6" type="email" name="email" placeholder={cms.form.email} onChange={this.inputChangeHandler} icon="envelope" required value={email} />
                        <FormGroup className='col-md-6'>
                            <label>{cms.form.photo}</label>
                            <div id="embed-photo" className="embed-responsive embed-responsive-1by1 bg-img" style={{ backgroundImage: photo && `url("${photo}")` }} onClick={() => this.fileUpload('photo')}>
                                {photo ? <div className="text-center text-green w-100">
                                    <div className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-50%)' }}><i className='fas fa-check-circle fa-fw fa-2x' /></div>

                                    <div className="position-absolute file-selected text-truncate w-100 pt-3" style={{ top: '100%', left: 0 }} />
                                </div> : <div className="text-center text-light w-100 overflow-hidden px-3">
                                    <div><i className='fas fa-file-image fa-fw fa-4x' /></div>

                                    <div className="mt-3 mb-1 text-center text-12 text-truncate">{cms.form.upload}</div>

                                    <div className="text-center text-12 text-truncate">{cms.form.size}</div>
                                </div>}
                            </div>
                        </FormGroup>
                        <FormGroup className='col-md-6'>
                            <label>{cms.form.payment}</label>
                            <p>{cms.form.payment_details}</p>
                            <div id="embed-payment" className="embed-responsive embed-responsive-16by9 bg-img" style={{ backgroundImage: payment && `url("${payment}")` }} onClick={() => this.fileUpload('payment')}>
                                {payment ? <div className="text-center text-green w-100">
                                    <div className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-50%)' }}><i className='fas fa-check-circle fa-fw fa-2x' /></div>

                                    <div className="position-absolute file-selected text-truncate w-100 pt-3" style={{ top: '100%', left: 0 }} />
                                </div> : <div className="text-center text-light w-100 overflow-hidden px-3">
                                    <div><i className='fas fa-file-image fa-fw fa-4x' /></div>

                                    <div className="mt-3 mb-1 text-center text-12 text-truncate">{cms.form.upload}</div>

                                    <div className="text-center text-12 text-truncate">{cms.form.size}</div>
                                </div>}
                            </div>
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