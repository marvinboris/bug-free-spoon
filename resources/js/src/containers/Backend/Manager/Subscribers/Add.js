import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import actions from '../../../../store/actions/backend/subscribers';
import * as utility from '../utility';

const initialState = {
    name: '',
    email: '',

    add: false,
}

class Add extends Component {
    state = { ...initialState }

    // Component methods
    resetState = () => this.setState({ ...initialState })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState, this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState)(e)
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('subscribers', 'subscriber')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { subscribers: { form } } } }
                }
            },
            backend: { subscribers: { loading } },
        } = this.props;
        const { name, email } = this.state;
        let content;

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className='row'>
                        <Input type="text" className="col-md-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                        <Input type="text" className="col-md-6" onChange={this.inputChangeHandler} value={email} name="email" required label={form.email} />
                    </div>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='Subscribers' props={this.props} resource={'subscribers'}>
            {content}
        </utility.add.lifecycle.render>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.show(id)),
    post: data => dispatch(actions.post(data)),
    patch: (id, data) => dispatch(actions.patch(id, data)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));