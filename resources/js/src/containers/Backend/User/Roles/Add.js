import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, Row, FormGroup, CustomInput } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import FormInput from '../../../../components/UI/Input';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Save from '../../../../components/Backend/UI/Food/Form/Save';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getRole, getRolesInfo, patchRoles, postRoles, resetRoles } from '../../../../store/actions/backend/roles';

const initialState = {
    name: '',
    description: '',
    features: [],

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
        const { id, name, value, checked, files } = e.target;
        if (name.includes('features')) {
            let features = [...this.state.features];

            if (name.includes('id')) {
                const [, feature_id] = id.split('-');
                const feature = features.find(f => +f.id === +feature_id);

                if (checked && !feature) features.push({ id: feature_id, permissions: [] });
                else features = features.filter(f => +f.id !== +feature_id);
            } else if (name.includes('permissions')) {
                const [, feature_id, abbr] = id.split('-');
                const featureIndex = features.findIndex(f => +f.id === +feature_id);
                const feature = features[featureIndex];
                let permissions = [...feature.permissions];
                const found = permissions.includes(abbr);

                if (checked && !found) permissions.push(abbr);
                else permissions = permissions.filter(p => p !== abbr);

                feature.permissions = permissions;
                features[featureIndex] = feature;
            }

            return this.setState({ features });
        }
        this.setState({ [name]: files ? files[0] : value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.reset();
        if (this.props.edit) this.props.get(this.props.match.params.id);
        else this.props.info();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.backend.roles.message && this.props.backend.roles.message && this.props.backend.roles.message.type === 'success' && !this.props.edit) {
            if (this.state.add) this.setState({ ...initialState });
            else this.props.history.push({
                pathname: '/user/roles',
                state: {
                    message: this.props.backend.roles.message,
                },
            });
        }
        if (!prevProps.backend.roles.role && this.props.backend.roles.role) {
            const { backend: { roles: { role } } } = this.props;
            this.setState({ ...role });
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { backend: { pages: { roles: { icon, title, add, edit, index, form } } } }
                }
            },
            backend: { roles: { loading, error, message, features = [] } },
            auth: { data: { role: { features: features_ } } }
        } = this.props;
        const { name, description, features: f } = this.state;
        let content;

        const errors = <>
            <Error err={error} />
        </>;

        const feature = features_.find(f => f.prefix === 'roles');
        const redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && <Redirect to="/user/dashboard" />;

        const featuresItems = features.sort((a, b) => a.name.localeCompare(b.name)).map(feature => {
            const element = f.find(i => +i.id === +feature.id);

            const permissions = [{ abbr: 'c', name: form.create }, { abbr: 'u', name: form.update }, { abbr: 'd', name: form.delete }].map(p => {
                const checked = element && element.permissions.includes(p.abbr);

                return <Col key={JSON.stringify(p)} lg={4}>
                    <FormGroup>
                        <CustomInput type="checkbox" id={`feature-${feature.id}-${p.abbr}`} checked={checked} name={`features[${feature.id}][permissions][${p.abbr}]`} onChange={this.inputChangeHandler} label={p.name} />
                    </FormGroup>
                </Col>
            });

            const checked = element !== undefined;

            return <div key={JSON.stringify(feature)}>
                <CustomInput type="switch" id={`feature-${feature.id}`} className="col-12 pb-2" checked={checked} name={`features[${feature.id}][id]`} onChange={this.inputChangeHandler} label={<span className="text-500">{feature.name}</span>} />

                {checked && <Row>{permissions}</Row>}
            </div>
        });

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else {
            content = <>
                <Feedback message={message} />

                {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

                <Row>
                    <div className="col-lg-9">
                        <Row>
                            <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={name} name="name" required label={form.name} />
                            <FormInput type="text" className="col-md-6" onChange={this.inputChangeHandler} value={description} name="description" required label={form.description} />

                            <Col xs={12} className="pb-2 text-large text-700">{form.features}</Col>
                            <FormGroup className="col-12">
                                {featuresItems}
                            </FormGroup>
                        </Row>
                    </div>

                    <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
                </Row>
            </>;
        }

        return <div className='Roles'>
            <PageTitle title={title} subtitle={this.props.edit ? edit : add} icon={icon}>
                <Breadcrumb items={this.props.edit && [{ to: '/user/roles', content: index }]} main={this.props.edit ? edit : add} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.saveHandler} icon={icon} title={this.props.edit ? edit : add} list={index} link="/user/roles" innerClassName="row justify-content-center">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(getRole(id)),
    info: () => dispatch(getRolesInfo()),
    post: data => dispatch(postRoles(data)),
    patch: (id, data) => dispatch(patchRoles(id, data)),
    reset: () => dispatch(resetRoles()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));