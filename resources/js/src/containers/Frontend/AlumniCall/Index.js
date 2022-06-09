import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../../../components/UI/PageTitle';
import SectionTitle from '../../../components/UI/SectionTitle';
import ElderBlock from '../../../components/UI/ElderBlock';

import { getAlumniCall, resetAlumniCall } from '../../../store/actions/frontend/alumni-call';

import './AlumniCall.scss';

class AlumniCall extends Component {
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
                pages: { frontend: { pages: { alumni_call: cms } } }
            } },
            frontend: { alumni_call: { loading, elders = [] } }
        } = this.props;

        const eldersContent = elders.map(elder => <div className='col-md-6 col-xl-4' key={JSON.stringify(elder)}><ElderBlock {...elder} /></div>);

        return <div className="AlumniCall">
            <PageTitle {...cms} />

            <section className='elders'>
                <div className='container'>
                    <SectionTitle {...cms.elders} />

                    <p>{cms.elders.description}</p>

                    <div className='row'>{eldersContent}</div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getAlumniCall()),
    reset: () => dispatch(resetAlumniCall()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlumniCall));