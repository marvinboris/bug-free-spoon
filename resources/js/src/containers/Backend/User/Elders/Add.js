import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, FormGroup, Row, Input } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
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
    photo: null,

    translate: '',

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

    fileUpload = () => document.getElementById('photo').click()



    // Lifecycle methods
    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
        this.setState({ translate: process.env.MIX_DEFAULT_LANG });
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.elders.message && this.props.backend.elders.message && this.props.backend.elders.message.type === 'success' && !this.props.edit) {
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
            const { photo } = this.props.backend.elders.elder;
            this.setState({ photo });
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
            backend: { elders: { loading, error, message, elder } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { title: elder_title, name, photo, translate } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const feature = features.find(f => f.prefix === 'elders');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

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
                            <FormInput type="text" id={"title-" + l.abbr} className={"col-md-12" + (l.abbr === translate ? "" : " d-none")} icon={icon} onChange={this.inputChangeHandler} value={elder_title[l.abbr]} name={"title[" + l.abbr + "]"} required placeholder={form.title} />
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

                <div className="col-lg-9">
                    <Row>
                        <FormInput className="col-md-6" type="text" name="name" placeholder={form.name} onChange={this.inputChangeHandler} icon="user" required value={name} />
                    </Row>
                </div>

                <div className="col-lg-3">
                    <FormGroup>
                        <div id="embed-photo" className="embed-responsive embed-responsive-1by1 bg-soft rounded-8 d-flex justify-content-center align-items-center position-relative" style={{
                            cursor: 'pointer',
                            backgroundImage: photo && `url("${photo}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            overflow: 'visible',
                        }} onClick={this.fileUpload}>
                            {this.props.edit
                                ? photo && (photo !== elder.photo) && <div className="text-center text-green w-100">
                                    <div className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-50%)' }}><i className='fas fa-check-circle fa-fw fa-2x' /></div>

                                    <div className="position-absolute file-selected text-truncate w-100 pt-3" style={{ top: '100%', left: 0 }} />
                                </div>
                                : photo ? <div className="text-center text-green w-100">
                                    <div className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-50%)' }}><i className='fas fa-check-circle fa-fw fa-2x' /></div>

                                    <div className="position-absolute file-selected text-truncate w-100 pt-3" style={{ top: '100%', left: 0 }} />
                                </div> : <div className="text-center text-light w-100 overflow-hidden px-3">
                                    <div><i className='fas fa-file-image fa-fw fa-4x' /></div>

                                    <div className="mt-3 mb-1 text-center text-12 text-truncate">{form.upload}</div>

                                    <div className="text-center text-12 text-truncate">{form.size}</div>
                                </div>}
                        </div>
                    </FormGroup>
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