import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Notifications from './Notifications';
import Messages from './Messages';
import SideDrawer from './SideDrawer';

import { authLogout } from '../../../../store/actions/auth';

import './Layout.scss';

class Layout extends Component {
    state = {
        selectedItem: '',
    }

    componentDidMount() {
        this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.content.cms) !== JSON.stringify(this.props.content.cms)) this.setState({ language: this.props.content.languages.find(l => l.abbr === localStorage.getItem('lang')) });
    }

    selectItem = item => this.setState({ selectedItem: item })

    logoutHandler = () => this.props.logout()

    sideDrawerToggle = () => {
        const left = $('.Backend.User .SideDrawer').css('left');
        if (left === "0px") {
            $('.Backend.User .SideDrawer').animate({ left: '-100%' });
            $('.Backend.User .SideDrawer .backdrop').hide();
        }
        else {
            $('.Backend.User .SideDrawer').animate({ left: 0 });
            $('.Backend.User .SideDrawer .backdrop').show();
        }
    }

    render() {
        let {
            content: {
                cms
            },
            auth: { data },
            children
        } = this.props;
        const { selectedItem } = this.state;
        const {
            pages: { backend: { header } }
        } = cms;

        return (
            <div className='Backend User'>
                <SideDrawer data={data} toggle={this.sideDrawerToggle} selectItem={this.selectItem} selectedItem={selectedItem} logoutHandler={this.logoutHandler} cms={cms} />

                <div className='main'>
                    <div className='sticky-top'>
                        <div className='d-flex flex-fill'>
                            <div className='d-md-none'>
                                <i className='cursor-pointer fas fa-bars text-39' onClick={this.sideDrawerToggle} />
                            </div>

                            <div className='ml-auto d-flex'>
                                <div className='pr-5'>
                                    <Notifications cms={{ header }} notifications={data.notifications} />
                                </div>

                                <div>
                                    <Messages cms={{ header }} messages={data.messages} />
                                </div>
                            </div>
                        </div>

                        <div className='user-info'>
                            <div>
                                <div className='name'>{data.name}</div>
                            </div>

                            <div>
                                <div className='profile-pic' style={{ backgroundImage: 'url("' + data.photo + '")' }} />
                            </div>
                        </div>
                    </div>

                    <main>{children}</main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authLogout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));