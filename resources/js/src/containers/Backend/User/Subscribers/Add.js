import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getSubscriber, patchSubscribers, postSubscribers, resetSubscribers } from '../../../../store/actions/backend/subscribers';

const initialState = {
    name: '',
    email: '',

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
        if (!prevProps.backend.subscribers.message && this.props.backend.subscribers.message && this.props.backend.subscribers.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/subscribers',
                state: {
                    message: this.props.backend.subscribers.message,
                },
            });
        }
        if (!prevProps.backend.subscribers.subscriber && this.props.backend.subscribers.subscriber) {
            const { backend: { subscribers: { subscriber } } } = this.props;
            this.setState({ ...subscriber });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { subscribers: { icon, title, add, edit, index, form } } } }
                }
            },
            backend: { subscribers: { loading, error, message } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { name, email } = this.state;

        const errors = <>
            <Error err={error} />
        </>;
        let content = <Col xs={12}>
            <CustomSpinner />
        </Col>;

        const feature = features.find(f => f.prefix === 'subscribers');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        if (!loading) content = <>
            <Feedback message={message} />

            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <Row>
                <div className="col-lg-9">
                    <Row>
                        <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={email} name="email" required label={form.email} />
                    </Row>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </Row>
        </>;

        return <div className='Subscribers'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/roles', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/subscribers" innerClassName="row justify-content-center">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getSubscriber(id)),
    post: data => dispatch(postSubscribers(data)),
    patch: (id, data) => dispatch(patchSubscribers(id, data)),
    reset: () => dispatch(resetSubscribers()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));