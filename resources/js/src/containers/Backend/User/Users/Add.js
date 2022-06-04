import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, FormGroup, Row } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getUser, getUsersInfo, postUsers, patchUsers, resetUsers } from '../../../../store/actions/backend/users';

const initialState = {
    name: '',
    phone: '',
    photo: null,
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',

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
        else this.props.info();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.users.message && this.props.backend.users.message && this.props.backend.users.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/users',
                state: {
                    message: this.props.backend.users.message,
                },
            });
        }
        if (!prevProps.backend.users.user && this.props.backend.users.user) {
            const { backend: { users: { user } } } = this.props;
            this.setState({ ...user });
        }
        if (this.props.edit && !prevProps.backend.users.message && this.props.backend.users.message && this.props.backend.users.message.type === 'success') {
            const { photo } = this.props.backend.users.user;
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
                    pages: { backend: { pages: { users: { icon, title, add, edit, index, form } } } }
                }
            },
            backend: { users: { loading, error, message, roles = [], user } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { name, phone, photo, email, password, password_confirmation, role_id } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const feature = features.find(f => f.prefix === 'users');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        const rolesOptions = roles.sort((a, b) => a.name.localeCompare(b.name)).map(role => <option key={JSON.stringify(role)} value={role.id}>{role.name}</option>);

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else content = <>
            <Feedback message={message} />

            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <Row>
                <div className="col-lg-9">
                    <Row>
                        <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <FormInput type="tel" className="col-md-6" addon={<span className="text-secondary text-small">+237</span>} onChange={this.inputChangeHandler} value={phone} name="phone" required label={form.phone} />
                        <FormInput type="password" className="col-md-6" onChange={this.inputChangeHandler} value={password} name="password" label={form.password} />
                        <FormInput type="password" className="col-md-6" onChange={this.inputChangeHandler} value={password_confirmation} name="password_confirmation" label={form.password_confirmation} />
                        <FormInput type="email" className="col-md-6" onChange={this.inputChangeHandler} value={email} name="email" label={form.email} />
                        <FormInput className="col-lg-6" type="select" name="role_id" label={form.role} onChange={this.inputChangeHandler} required value={role_id}>
                            <option>{form.select_role}</option>
                            {rolesOptions}
                        </FormInput>
                    </Row>
                </div>

                <div className="col-lg-3">
                    <FormGroup>
                        <div id="embed-photo" className="embed-responsive embed-responsive-1by1 bg-border-5 rounded-8 d-flex justify-content-center align-items-center position-relative" style={{
                            cursor: 'pointer',
                            backgroundImage: photo && `url("${photo}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            overflow: 'visible',
                        }} onClick={this.fileUpload}>
                            {this.props.edit
                                ? photo && (photo !== user.photo) && <div className="text-center text-green w-100">
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

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </Row>
        </>;


        return <div className='Users'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/users', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/users" innerClassName="row justify-content-center">
                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getUser(id)),
    info: () => dispatch(getUsersInfo()),
    post: data => dispatch(postUsers(data)),
    patch: (id, data) => dispatch(patchUsers(id, data)),
    reset: () => dispatch(resetUsers()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));