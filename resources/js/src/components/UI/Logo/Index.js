import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Logo.css';

class Logo extends Component {
    render() {
        const {
            type = 'default', style,
            content: {
                cms: {
                    global: { logo }
                }
            }
        } = this.props;
        const styles = {
            default: {},
            big: { height: 70 },
            sm: {},
            named: { height: 60 },
        };

        return <div className="UI Logo mb-0 text-white" >
            <img src={logo[type]} style={{ ...styles[type], ...style }} className="mw-100" />
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Logo);