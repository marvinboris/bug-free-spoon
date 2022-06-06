import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Toolbar from '../../components/Navigation/Toolbar';

import './Frontend.scss';

class Layout extends Component {
    render() {
        const {
            children,
            content: {
                cms: {
                    pages: { frontend: { footer } }
                }
            }
        } = this.props;

        return <div className="Frontend">
            <Toolbar />

            <div className='main'>{children}</div>

            <footer>
                <div className='container'>
                    <div className='left'>
                        © {(new Date()).getFullYear()} <Link to='/'>{footer.fiducac}</Link>
                    </div>

                    <div className='right'>
                        <a href='' target='_blank' className='fab fa-facebook-square' />
                        <a href='' target='_blank' className='fab fa-linkedin' />
                        <a href='' target='_blank' className='fab fa-twitter-square' />
                    </div>
                </div>
            </footer>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default withRouter(connect(mapStateToProps)(Layout));