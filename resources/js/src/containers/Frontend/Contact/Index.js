import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Error from '../../../components/Messages/Error';
import Feedback from '../../../components/Messages/Feedback';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';

import Input from '../../../components/UI/Input';

import { postContact, resetContact } from '../../../store/actions/frontend/contact';

import './Contact.scss';

const initialState = {
    name: '',
    email: '',
    message: '',
}

class Contact extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.contact.loading) this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.contact.message && this.props.frontend.contact.message && this.props.frontend.contact.message.type === 'success') this.setState({ ...initialState });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { contact: cms } } }
            } },
            frontend: { contact: { loading, error, message: backend_message } }
        } = this.props;
        const { name, email, message } = this.state;

        console.log({ backend_message })

        return <div className="Contact">
            <PageTitle {...cms} />

            <section className='contact'>
                <div className='container'>
                    <SectionTitle {...cms.contact} centered />

                    <div className='row justify-content-center'>
                        <div className='col-lg-7'>
                            <p>{cms.contact.description}</p>

                            <Error err={error} />
                            <Feedback message={backend_message} />

                            <form onSubmit={this.saveHandler}>
                                <Input type='text' name='name' onChange={this.inputChangeHandler} value={name} placeholder={cms.contact.name} required disabled={loading} />
                                <Input type='email' name='email' onChange={this.inputChangeHandler} value={email} placeholder={cms.contact.email} required disabled={loading} />
                                <Input type='textarea' name='message' onChange={this.inputChangeHandler} value={message} placeholder={cms.contact.message} required disabled={loading} />

                                <div className='submit'>
                                    <button className={'btn btn-blue' + (loading ? ' btn-disabled' : '')}>{cms.contact.submit}<i className='fas fa-paper-plane' /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    post: data => dispatch(postContact(data)),
    reset: () => dispatch(resetContact()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contact));