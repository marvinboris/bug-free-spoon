import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Toolbar from '../../components/Navigation/Toolbar';
import Logo from '../../components/UI/Logo/Logo';

import './Frontend.scss';

class Layout extends Component {
    render() {
        const {
            children,
            content: {
                cms: {
                    pages: { frontend: { footer } }
                }, schools
            }
        } = this.props;

        return <div className="Frontend">
            <Toolbar />

            <div className='main'>{children}</div>

            <footer>
                <div className='top'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4 col-xl-3'>
                                <Logo type='big' />
                            </div>

                            <div className='col-md-4 col-xl-3 social-networks'>
                                <div className='title'>{footer.social_networks.title}</div>

                                <div>{footer.social_networks.list.map(social_network => <a key={JSON.stringify(social_network)} href={social_network.link} target='_blank'><i className={'fab fa-' + social_network.icon} /></a>)}</div>
                            </div>

                            <div className='col-md-4 col-xl-3 schools'>
                                <div className='title'>{footer.schools.title}</div>

                                <div className='row'>{schools.map(school => <div key={JSON.stringify(school)} className='col-6'><i className='fas fa-angle-double-right' /><a href={school.link} target="_blank">{school.abbr}</a></div>)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bottom'>
                    <div className='container'>
                        © {(new Date()).getFullYear()} <Link to='/'>{footer.fiducac}</Link>
                    </div>
                </div>
            </footer>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps)(Layout));