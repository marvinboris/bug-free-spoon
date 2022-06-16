import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import actions from '../../../../store/actions/backend/contributions';
import * as utility from '../utility';

const initialState = {
    elder_id: '',
    year: '',
    payment: null,
    paid: '1',
    errors: '',

    add: false,
}

class Add extends Component {
    state = { ...initialState }

    // Component methods
    resetState = () => this.setState({ ...initialState })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState.bind(this))(e)
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('contributions', 'contribution')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { contributions: { form } } } }
                }
            },
            backend: { contributions: { loading, elders = [], contribution = {} } },
        } = this.props;
        const { year, payment, paid, elder_id, errors } = this.state;
        let content;

        const eldersOptions = elders.sort((a, b) => a.name.localeCompare(b.name)).map(elder => <option key={JSON.stringify(elder)} value={elder.id}>{elder.name}</option>);

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className='row'>
                        <Input className="col-lg-6" type="select" name="elder_id" label={form.elder} onChange={this.inputChangeHandler} required value={elder_id}>
                            <option>{form.select_elder}</option>
                            {eldersOptions}
                        </Input>
                        <Input className="col-lg-6" type="number" onChange={this.inputChangeHandler} value={year} name="year" label={form.year} />
                        <Input type="image" className='col-lg-12' name="payment" label={form.payment} onClick={() => this.fileUpload('payment')} cms={form} defaultValue={contribution.payment} value={payment} dimensions='21by9' />
                        {this.props.edit && paid == 0 && <Input className="col-lg-12" type="textarea" name="errors" label={form.errors} onChange={this.inputChangeHandler} required value={errors} />}
                    </div>
                </div>

                <div className='col-lg-3'>
                    <Input type="select" name="paid" label={form.paid} onChange={this.inputChangeHandler} required value={paid}>
                        <option>{form.select_status}</option>
                        <option value={0}>{form.unpaid_status}</option>
                        <option value={1}>{form.paid_status}</option>
                    </Input>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </div>
        </>;

        return <utility.add.lifecycle.render className='Contributions' props={this.props} resource={'contributions'}>
            <input type="file" id="payment" name="payment" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
            {content}
        </utility.add.lifecycle.render>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.show(id)),
    info: () => dispatch(actions.info()),
    post: data => dispatch(actions.post(data)),
    patch: (id, data) => dispatch(actions.patch(id, data)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));