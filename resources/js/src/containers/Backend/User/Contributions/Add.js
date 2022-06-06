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

import { getContribution, getContributionsInfo, postContributions, patchContributions, resetContributions } from '../../../../store/actions/backend/contributions';

const initialState = {
    elder_id: '',
    year: '',
    payment: null,
    paid: '1',

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
            backend: { contributions: { loading, error, message, elders = [], contribution } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { year, payment, paid, elder_id } = this.state;
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
                        <FormInput className="col-md-6" type="select" name="elder_id" label={form.elder} onChange={this.inputChangeHandler} required value={elder_id}>
                            <option>{form.select_elder}</option>
                            {eldersOptions}
                        </FormInput>
                        <FormInput className="col-md-6" type="number" onChange={this.inputChangeHandler} value={year} name="year" label={form.year} />
                        <FormInput className="col-md-6" type="select" name="paid" label={form.paid} onChange={this.inputChangeHandler} required value={paid}>
                            <option>{form.select_status}</option>
                            <option value={0}>{form.unpaid_status}</option>
                            <option value={1}>{form.paid_status}</option>
                        </FormInput>
                    </Row>
                </div>

                <div className="col-lg-3">
                    <FormGroup>
                        <div id="embed-payment" className="embed-responsive embed-responsive-1by1 bg-border-5 rounded-8 d-flex justify-content-center align-items-center position-relative" style={{
                            cursor: 'pointer',
                            backgroundImage: payment && `url("${payment}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            overflow: 'visible',
                        }} onClick={this.fileUpload}>
                            {this.props.edit
                                ? payment && (payment !== contribution.payment) && <div className="text-center text-green w-100">
                                    <div className="position-absolute" style={{ top: 0, right: 0, transform: 'translate(50%,-50%)' }}><i className='fas fa-check-circle fa-fw fa-2x' /></div>

                                    <div className="position-absolute file-selected text-truncate w-100 pt-3" style={{ top: '100%', left: 0 }} />
                                </div>
                                : payment ? <div className="text-center text-green w-100">
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