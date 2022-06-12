import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';
import PublicationBlock from '../../../components/Frontend/UI/Blocks/PublicationBlock';

import { getPublications, resetPublications } from '../../../store/actions/frontend/publications';

import './Publications.scss';

class Publications extends Component {
    // Lifecycle methods
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { publications: cms } } }
            } },
            frontend: { publications: { loading, publications = [] } }
        } = this.props;

        const publicationsContent = publications.map(publication => <div className='col-lg-4' key={JSON.stringify(publication)}><PublicationBlock {...publication} /></div>);

        return <div className="Publications">
            <PageTitle {...cms} />

            <section className='publications'>
                <div className='container'>
                    <SectionTitle {...cms.publications} />

                    <p>{cms.publications.description}</p>

                    <div className='row'>{publicationsContent}</div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getPublications()),
    reset: () => dispatch(resetPublications()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Publications));