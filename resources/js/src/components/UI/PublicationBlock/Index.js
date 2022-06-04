import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import { htmlEntities } from '../../../shared/utility';

import './PublicationBlock.scss';

class PublicationBlock extends Component {
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { publication_block: cms } }
                }
            },
            photo, title, body, link = '/'
        } = this.props;
        const lang = localStorage.getItem('lang');

        const formattedBody = htmlEntities(body[lang]);

        return <div className='UI PublicationBlock shadow-sm'>
            <div className='embed-responsive embed-responsive-16by9 bg-img' style={{ backgroundImage: 'url("' + photo + '")' }}>
                {!photo && <div className='title'>{title[lang]}</div>}
            </div>

            <div className='text'>
                <div className='title text-truncate'>{title[lang]}</div>

                <div className='body'>{!!formattedBody && formattedBody.length > 90 ? formattedBody.substr(0, 90) + '...' : formattedBody}</div>

                <Link to={link} className="btn btn-blue">{cms.read_more}<i className='fas fa-angle-double-right' /></Link>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(PublicationBlock);