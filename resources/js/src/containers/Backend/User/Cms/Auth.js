import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, FormGroup, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

// Components
import Input from '../../../../components/UI/Input';
import Error from '../../../../components/Error/Error';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getCms, patchCms, resetCms } from '../../../../store/actions/backend/cms';
import { updateObject } from '../../../../shared/utility';
import AUTH from '../../../../components/Content/Auth';

const SubNavLinks = ({ auth, language }) => {
    const [activeTab, setActiveTab] = useState(language.abbr + '-footer');
    const [value, setValue] = useState(auth);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onChange = (e, ...deepness) => {
        const valueCopy = { ...value };

        if (deepness.length === 1) {
            valueCopy[deepness[0]] = e.target.value;
            return setValue(valueCopy);
        }

        const subValues = [];
        let subValue = { ...value };
        for (let i = 0; i < deepness.length - 1; i++) {
            const element = deepness[i];
            subValue = subValue[element];
            subValues.push(subValue);
        }
        subValues[subValues.length - 1][deepness[deepness.length - 1]] = e.target.value;
        for (let i = 1; i < deepness.length - 1; i++) {
            const element = deepness[deepness.length - 1 - i];
            const index = subValues.length - 1 - i;
            subValues[index][element] = subValues[index + 1];
        }
        valueCopy[deepness[0]] = subValues[0];

        setValue(valueCopy);
    }

    const recursiveDeepness = (paramItem, paramName, paramId, paramValue, paramDeepness, paramPrepends = [], paramAppends = []) => Object.keys(paramItem).map(item => {
        const mainItem = paramItem[item];
        const mainName = `${paramName}[${item}]`;
        const mainId = `${paramId}-${item}`;
        const mainValue = paramValue[item];
        const mainDeepness = paramDeepness.concat(item);

        let prepend;
        const findPrepend = paramPrepends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
        prepend = !findPrepend ? null : findPrepend.action(mainItem);

        let append;
        const findAppend = paramAppends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
        append = !findAppend ? null : findAppend.action(mainItem);

        return typeof mainItem === 'string' ? <>
            {prepend}
            <FormGroup className="col-md-6 col-lg-4 align-self-end">
                <Label className="text-small text-500">{mainItem}</Label>
                <Input type="text" name={mainName} id={mainId} placeholder={mainItem} onChange={e => onChange(e, ...mainDeepness)} value={mainValue} />
            </FormGroup>
            {append}
        </> : recursiveDeepness(mainItem, mainName, mainId, mainValue, mainDeepness, paramPrepends, paramAppends);
    });



    const navItems = Object.keys(auth).map(key => {
        const id = `${language.abbr}-${key}`;

        return <NavItem key={id}>
            <NavLink className={(activeTab === id) ? 'active' : ""} onClick={() => toggle(id)}>
                <span className="text-capitalize">{key.split('_').join(' ')}</span>
            </NavLink>
        </NavItem>
    });

    const prefix = `${language.abbr}[auth]`;
    const prefixId = `${language.abbr}-auth`;

    const adminItem = AUTH['admin'];
    const adminName = `${prefix}[admin]`;
    const adminId = `${prefixId}-admin`;
    const adminValue = value['admin'];
    const adminDeepness = ['admin'];
    const admin = recursiveDeepness(adminItem, adminName, adminId, adminValue, adminDeepness, [
        { regex: `${prefix}[admin][login][sign_in_to]`, action: () => <Col xs={12}><h4>Login</h4></Col> },
        { regex: `${prefix}[admin][verify][enter]`, action: () => <Col xs={12}><h4>Verify</h4></Col> },
    ]);

    const keys = Object.keys(AUTH).filter(key => !['admin'].includes(key));
    const resourceTabPanes = keys.map(item => {
        const currentItem = AUTH[item];
        const currentName = `${prefix}[${item}]`;
        const currentId = `${prefixId}-${item}`;
        const currentValue = value[item];
        const currentDeepness = [item];
        const current = recursiveDeepness(currentItem, currentName, currentId, currentValue, currentDeepness);

        return <TabPane key={Math.random() + currentName} tabId={`${language.abbr}-${item}`} className="pt-4">
            <Row>{current}</Row>
        </TabPane>;
    });

    return <>
        <Nav tabs pills>{navItems}</Nav>

        <TabContent activeTab={activeTab}>
            {resourceTabPanes}

            <TabPane tabId={language.abbr + '-admin'} className="pt-4">
                <Row>{admin}</Row>
            </TabPane>
        </TabContent>
    </>;
};

class Auth extends Component {
    state = {
        activeTab: process.env.MIX_DEFAULT_LANG
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.cms.cms && prevState.app_name === '') {
            const { backend: { cms: { cms: { auth } } } } = nextProps;
            return updateObject(prevState, { ...auth });
        }
        return prevState;
    }

    async componentDidMount() {
        this.props.reset();
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    submitHandler = async e => {
        e.preventDefault();
        await this.props.patch(e.target);
    }

    inputChangeHandler = e => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    fileUpload = () => document.getElementById('logo').click()

    toggle = tab => {
        if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { components: { form: { save } }, backend: { pages: { cms: { icon, title, auth } } } }
                }
            },
            backend: { cms: { loading, error, message, cms, languages = [] } },
            auth: { data: { role: { features } } }
        } = this.props;
        const { activeTab } = this.state;
        let content = null;
        let errors = null;

        const feature = features.find(f => f.prefix === 'cms');
        const redirect = !(feature && JSON.parse(feature.permissions).includes('u')) && <Redirect to="/user/dashboard" />;

        if (loading) content = <Col xs={12}>
            <CustomSpinner />
        </Col>;
        else {
            errors = <>
                <Error err={error} />
            </>;

            const nav = languages.map(language => <NavItem key={Math.random()}>
                <NavLink className={(activeTab === language.abbr) ? 'active' : ''} onClick={() => this.toggle(language.abbr)}>
                    {language.name}
                </NavLink>
            </NavItem>);

            const tabContent = languages.map(language => <TabPane key={Math.random()} tabId={language.abbr}>
                <SubNavLinks auth={cms.pages[language.abbr].auth} language={language} />
            </TabPane>);

            content = <Col lg={12}>
                <Feedback message={message} />
                <Row>
                    <input type="hidden" name="_method" defaultValue="PATCH" />

                    <Col lg={2}>
                        <Nav tabs vertical pills>{nav}</Nav>
                    </Col>

                    <Col lg={10}>
                        <TabContent activeTab={activeTab}>{tabContent}</TabContent>
                    </Col>

                    <div className="col-12" style={{ marginTop: 40 }}>
                        <button className='btn btn-green'>{save}<i className='fas fa-save' /></button>
                    </div>
                </Row>
            </Col>;
        }


        return <div className='Cms Auth'>
            <PageTitle title={title} subtitle={auth} icon={icon}>
                <Breadcrumb main={auth} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.submitHandler} icon={icon} title={auth} link="/admin/cms" innerClassName="row">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getCms()),
    patch: data => dispatch(patchCms('auth', data)),
    reset: () => dispatch(resetCms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));