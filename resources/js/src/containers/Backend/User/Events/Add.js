import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, FormGroup, Row, Input } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
import Editor from '../../../../components/Backend/UI/Editor';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getEvent, getEventsInfo, postEvents, patchEvents, resetEvents } from '../../../../store/actions/backend/events';

const initialState = {
    title: {},
    description: {},
    body: {},
    date: new Date(),
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
        if (!prevProps.backend.events.message && this.props.backend.events.message && this.props.backend.events.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/events',
                state: {
                    message: this.props.backend.events.message,
                },
            });
        }
        if (!prevProps.backend.events.event && this.props.backend.events.event) {
            const { backend: { events: { event } } } = this.props;
            this.setState({ ...event });
        }
        if (this.props.edit && !prevProps.backend.events.message && this.props.backend.events.message && this.props.backend.events.message.type === 'success') {
            const { photo } = this.props.backend.events.event;
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
                    pages: { backend: { pages: { events: { icon, title, add, edit, index, form } } } }
                }, languages
            },
            backend: { events: { loading, error, message, event } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { title: event_title, description, body, date, photo, translate } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const feature = features.find(f => f.prefix === 'events');
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
                            <FormInput type="text" id={"title-" + l.abbr} className={"col-md-12" + (l.abbr === translate ? "" : " d-none")} icon={icon} onChange={this.inputChangeHandler} value={event_title[l.abbr]} name={"title[" + l.abbr + "]"} required label={form.title} />
                            <FormGroup id={"description-" + l.abbr} className={"col-md-12" + (l.abbr === translate ? "" : " d-none")}>
                                {this.props.edit && event && event.description[l.abbr] === description[l.abbr] && <Editor defaultValue={event.description[l.abbr]} name={"description[" + l.abbr + "]"} placeholder={form.description} />}
                                {!this.props.edit && <Editor name={"description[" + l.abbr + "]"} placeholder={form.description} />}
                            </FormGroup>
                            <FormGroup id={"body-" + l.abbr} className={"col-md-12" + (l.abbr === translate ? "" : " d-none")}>
                                {this.props.edit && event && event.body[l.abbr] === body[l.abbr] && <Editor defaultValue={event.body[l.abbr]} name={"body[" + l.abbr + "]"} placeholder={form.body} />}
                                {!this.props.edit && <Editor name={"body[" + l.abbr + "]"} placeholder={form.body} />}
                            </FormGroup>
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
                    <FormGroup>
                        <div id="embed-photo" className="embed-responsive embed-responsive-21by9 bg-border-10 rounded-15 d-flex justify-content-center align-items-center position-relative" style={{
                            cursor: 'pointer',
                            backgroundImage: photo && `url("${photo}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            overflow: 'visible',
                        }} onClick={this.fileUpload}>
                            {this.props.edit
                                ? photo && (photo !== event.photo) && <div className="text-center text-green w-100">
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

                <div className="col-lg-9">
                    <Row>
                        <FormInput className="col-md-6" type="date" name="date" label={form.date} onChange={this.inputChangeHandler} icon="clock" required value={date} />
                    </Row>
                </div>
            </div>


            <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
        </>;


        return <div className='Events'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/events', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/events" innerClassName="row justify-content-center">
                    <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getEvent(id)),
    info: () => dispatch(getEventsInfo()),
    post: data => dispatch(postEvents(data)),
    patch: (id, data) => dispatch(patchEvents(id, data)),
    reset: () => dispatch(resetEvents()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));