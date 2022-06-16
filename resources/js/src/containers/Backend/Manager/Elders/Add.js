import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import actions from '../../../../store/actions/backend/elders';
import * as utility from '../utility';

const initialState = {
    title: {},
    name: '',
    email: '',
    photo: null,
    payment: null,
    paid: '1',
    errors: '',
    school_id: '',
    promotion: '',

    translate: process.env.MIX_DEFAULT_LANG,

    add: false,
}

class Add extends Component {
    state = { ...initialState }

    // Component methods
    resetState = () => this.setState({ ...initialState, title: {} })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState.bind(this))(e)
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('elders', 'elder')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { elders: { form } } } }
                }, languages
            },
            backend: { elders: { loading, schools = [], elder = {} } },
        } = this.props;
        const { title, name, email, photo, payment, paid, errors, school_id, promotion, translate } = this.state;
        let content;

        const schoolsOptions = schools.sort((a, b) => a.name.localeCompare(b.name)).map(school => <option key={JSON.stringify(school)} value={school.id}>{school.name}</option>);
        const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className="row">
                        {languages.map(l => <Fragment key={'language-' + l.abbr}>
                            <Input type="text" id={"title-" + l.abbr} className={"col-lg-12" + (l.abbr === translate ? "" : " d-none")} onChange={this.inputChangeHandler} value={title[l.abbr]} name={"title[" + l.abbr + "]"} required label={form.title} />
                        </Fragment>)}
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="translate" label={form.language} onChange={this.inputChangeHandler} value={translate}>
                        {languagesOptions}
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <hr />
                </div>

                <div className="col-lg-9">
                    <div className='row'>
                        <Input className="col-lg-6" type="text" name="name" label={form.name} onChange={this.inputChangeHandler} required value={name} />
                        <Input className="col-lg-6" type="email" name="email" label={form.email} onChange={this.inputChangeHandler} required value={email} />
                        <Input className="col-lg-6" type="select" name="school_id" label={form.school} onChange={this.inputChangeHandler} required value={school_id}>
                            <option>{form.select_school}</option>
                            {schoolsOptions}
                        </Input>
                        <Input className="col-lg-6" type="number" name="promotion" label={form.promotion} onChange={this.inputChangeHandler} required value={promotion} />
                        <Input className="col-lg-12" type="image" name="payment" label={form.payment} onClick={() => this.fileUpload('payment')} cms={form} defaultValue={elder.payment} value={payment} dimensions='21by9' />
                        {this.props.edit && paid == 0 && <Input className="col-lg-12" type="textarea" name="errors" label={form.errors} onChange={this.inputChangeHandler} required value={errors} />}

                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="paid" label={form.paid} onChange={this.inputChangeHandler} required value={paid}>
                        <option>{form.select_status}</option>
                        <option value={0}>{form.unpaid_status}</option>
                        <option value={1}>{form.paid_status}</option>
                    </Input>
                    <Input type="image" name="photo" label={form.photo} onClick={() => this.fileUpload('photo')} cms={form} defaultValue={elder.photo} value={photo} />
                </div>
            </div>


            <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
        </>;

        return <utility.add.lifecycle.render className='Elders' props={this.props} resource={'elders'}>
            <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
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