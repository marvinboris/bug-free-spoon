import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Input from '../../../components/UI/Input';
import PageTitle from '../../../components/UI/PageTitle';
import Feedback from '../../../components/Feedback/Feedback';
import SectionTitle from '../../../components/UI/SectionTitle';

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
        this.props.post(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.contact.message && this.props.frontend.contact.message && this.props.frontend.contact.message.type === 'success' && !this.props.edit) {
            this.setState({ ...initialState });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { contact: cms } } }
            } },
            frontend: { contact: { loading, message: backend_message } }
        } = this.props;
        const { name, email, message } = this.state;

        return <div className="Contact">
            <PageTitle {...cms} />

            <section className='contact'>
                <div className='container'>
                    <SectionTitle {...cms.contact} centered />

                    <form className='row' onSubmit={this.saveHandler}>
                        <div className='col-lg-7'><p>{cms.contact.description}</p></div>

                        <div className='col-lg-7'>
                            <Feedback message={backend_message} time={5000} />
                        </div>

                        <Input type='text' name='name' className='col-lg-7' onChange={this.inputChangeHandler} value={name} placeholder={cms.contact.name} required validation={{ required: true }} />
                        <Input type='email' name='email' className='col-lg-7' onChange={this.inputChangeHandler} value={email} placeholder={cms.contact.email} required validation={{ required: true }} />
                        <Input type='textarea' name='message' className='col-lg-7' onChange={this.inputChangeHandler} value={message} placeholder={cms.contact.message} required validation={{ required: true }} />

                        <div className='submit col-12'>
                            <button className='btn btn-blue'>{cms.contact.submit}<i className='fas fa-paper-plane' /></button>
                        </div>
                    </form>
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