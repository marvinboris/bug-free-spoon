import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

import Logo from '../../UI/Logo/Logo';

import Languages from './Languages';
import NavigationItems from '../NavigationItems/NavigationItems';

import { setLanguage } from '../../../store/actions/content';

import './Toolbar.css';

class Toolbar extends Component {
    state = {
        navbar: true,
        search: true,

        selectedItem: '',

        language: null,
    }



    // Component methods
    toggleNavbar = () => this.setState(state => ({ navbar: !state.navbar, search: true }))

    toggleSearch = () => this.setState(state => ({ search: !state.search, navbar: true }))

    selectItem = item => this.setState({ selectedItem: item })

    setLanguage = id => this.props.set(id)



    // Lifecycle methods
    componentDidMount() {
        this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.content.cms) !== JSON.stringify(this.props.content.cms)) this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    render() {
        const {
            content: {
                cms: {
                    pages: { frontend: { header: { menu } } }
                }, languages
            },
        } = this.props;
        const { language } = this.state;

        return <div className="Toolbar shadow">
            <div className="container d-flex justify-content-between align-items-center h-100">
                <div>
                    <Link to="/" className="text-decoration-none"><Logo /></Link>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-none d-lg-block">
                        <NavigationItems cms={{ menu }} font="border" toggleNavbar={this.toggleNavbar} />
                    </div>

                    <div className="mx-2 mx-md-3 d-lg-none">
                        <i onClick={this.toggleNavbar} className="fas fa-th-large text-30 text-md-40 cursor-pointer" />
                    </div>

                    <div className="pl-3 d-lg-block">
                        <Languages languages={languages} set={this.setLanguage} language={language} />
                    </div>
                </div>
            </div>

            <div className="d-lg-none">
                <Collapse isOpen={!this.state.navbar} navbar>
                    <div className="bg-white d-flex flex-column py-2">
                        <NavigationItems cms={{ menu }} font="border" toggleNavbar={this.toggleNavbar} />
                    </div>
                </Collapse>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    set: id => dispatch(setLanguage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);