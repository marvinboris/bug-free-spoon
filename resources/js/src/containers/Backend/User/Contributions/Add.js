import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

// Components
import Input from '../../../../components/UI/Input';
import Error from '../../../../components/Error/Error';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getContribution, getContributionsInfo, postContributions, patchContributions, resetContributions } from '../../../../store/actions/backend/contributions';

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

    fileUpload = () => document.getElementById('payment').click()



    // Lifecycle methods
    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
        else this.props.info();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.contributions.message && this.props.backend.contributions.message && this.props.backend.contributions.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/contributions',
                state: {
                    message: this.props.backend.contributions.message,
                },
            });
        }
        if (!prevProps.backend.contributions.contribution && this.props.backend.contributions.contribution) {
            const { backend: { contributions: { contribution } } } = this.props;
            this.setState({ ...contribution });
        }
        if (this.props.edit && !prevProps.backend.contributions.message && this.props.backend.contributions.message && this.props.backend.contributions.message.type === 'success') {
            const { payment } = this.props.backend.contributions.contribution;
            this.setState({ payment });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { contributions: { icon, title, add, edit, index, form } } } }
                }
            },
            backend: { contributions: { loading, error, message, elders = [], contribution = {} } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { year, payment, paid, elder_id, errors: form_errors } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const feature = features.find(f => f.prefix === 'contributions');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        const eldersOptions = elders.sort((a, b) => a.name.localeCompare(b.name)).map(elder => <option key={JSON.stringify(elder)} value={elder.id}>{elder.name}</option>);

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else content = <>
            <Feedback message={message} />

            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <Row>
                <div className="col-lg-9">
                    <Row>
                        <Input className="col-lg-6" type="select" name="elder_id" label={form.elder} onChange={this.inputChangeHandler} required value={elder_id}>
                            <option>{form.select_elder}</option>
                            {eldersOptions}
                        </Input>
                        <Input className="col-lg-6" type="number" onChange={this.inputChangeHandler} value={year} name="year" label={form.year} />
                        <Input type="image" className='col-lg-12' name="payment" label={form.payment} onClick={this.fileUpload} cms={form} defaultValue={contribution.payment} value={payment} dimensions='21by9' />
                        {this.props.edit && paid == 0 && <Input className="col-lg-12" type="textarea" name="errors" label={form.errors} onChange={this.inputChangeHandler} required value={form_errors} />}
                    </Row>
                </div>

                <div className='col-lg-3'>
                    <Input type="select" name="paid" label={form.paid} onChange={this.inputChangeHandler} required value={paid}>
                        <option>{form.select_status}</option>
                        <option value={0}>{form.unpaid_status}</option>
                        <option value={1}>{form.paid_status}</option>
                    </Input>
                </div>

                <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
            </Row>
        </>;


        return <div className='Contributions'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/contributions', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/contributions" innerClassName="row justify-content-center">
                    <input type="file" id="payment" name="payment" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getContribution(id)),
    info: () => dispatch(getContributionsInfo()),
    post: data => dispatch(postContributions(data)),
    patch: (id, data) => dispatch(patchContributions(id, data)),
    reset: () => dispatch(resetContributions()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));