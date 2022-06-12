import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { htmlEntities } from '../../../../../shared/utility';

import './ActivityBlock.scss';

class ActivityBlock extends Component {
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { activity_block: cms } }
                }
            },
            photo, title, body, link
        } = this.props;
        const lang = localStorage.getItem('lang');

        const formattedBody = htmlEntities(body[lang]);

        return <div className='UI ActivityBlock shadow-sm'>
            <div className='embed-responsive embed-responsive-16by9 bg-img' style={{ backgroundImage: 'url("' + photo + '")' }} />

            <div className='text'>
                <div className='title text-truncate'>{title[lang]}</div>

                <div className='body'>{!!formattedBody && formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody}</div>

                <Link to={link}>{cms.read_more}<i className='fas fa-angle-double-right' /></Link>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ActivityBlock);