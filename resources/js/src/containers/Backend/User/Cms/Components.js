import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Col, FormGroup, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

// Components
import Error from '../../../../components/Error/Error';
import Form from '../../../../components/Backend/UI/Form/Form';
import Feedback from '../../../../components/Feedback/Feedback';
import PageTitle from '../../../../components/Backend/UI/PageTitle';
import Breadcrumb from '../../../../components/Backend/UI/Breadcrumb/Breadcrumb';
import CustomSpinner from '../../../../components/UI/CustomSpinner/CustomSpinner';

import { getCms, patchCms, resetCms } from '../../../../store/actions/backend/cms';
import { updateObject } from '../../../../shared/utility';
import * as utility from './utility';

import COMPONENTS from '../../../../components/Content/Components';

const SubNavLinks = ({ components, language }) => {
    const [activeTab, setActiveTab] = useState(language.abbr + '-form');
    const [value, setValue] = useState(components);

    const prefix = `${language.abbr}[components]`;
    const prefixId = `${language.abbr}-components`;

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const onChange = (e, ...deepness) => utility.onChange(value, setValue)(e, ...deepness);
    const resourceDeepness = (resource, paramPrepends = [], paramAppends = []) => utility.resourceDeepness(onChange)(COMPONENTS, prefix, prefixId, value)(resource, paramPrepends, paramAppends);
    
    const navItems = utility.navItems(components, language, activeTab, toggle);

    const keys = Object.keys(COMPONENTS);
    const resourceTabPanes = keys.map(item => {
        const current = resourceDeepness(item);

        return <TabPane key={Math.random() + `${prefix}[${item}]`} tabId={`${language.abbr}-${item}`} className="pt-4">
            <Row>{current}</Row>
        </TabPane>;
    });

    return <>
        <Nav tabs pills>{navItems}</Nav>

        <TabContent activeTab={activeTab}>
            {resourceTabPanes}
        </TabContent>
    </>;
};

class Components extends Component {
    state = {
        activeTab: process.env.MIX_DEFAULT_LANG
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.backend.cms.cms && prevState.app_name === '') {
            const { backend: { cms: { cms: { components } } } } = nextProps;
            return updateObject(prevState, { ...components });
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
                    pages: { components: { form: { save } }, backend: { pages: { cms: { icon, title, components } } } }
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
                <SubNavLinks components={cms.pages[language.abbr].components} language={language} />
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

        return <div className='Cms Components'>
            <PageTitle title={title} subtitle={components} icon={icon}>
                <Breadcrumb main={components} />
            </PageTitle>

            <div className='content'>
                {redirect}
                {errors}
                <Form onSubmit={this.submitHandler} icon={icon} title={components} link="/admin/cms" innerClassName="row">
                    {content}
                </Form>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getCms()),
    patch: data => dispatch(patchCms('components', data)),
    reset: () => dispatch(resetCms()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Components));