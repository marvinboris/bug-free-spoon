import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../../../components/UI/PageTitle';
import SectionTitle from '../../../components/UI/SectionTitle';

import { getOpportunities, resetOpportunities } from '../../../store/actions/frontend/opportunities';

import './Opportunities.scss';

class Opportunities extends Component {
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
                pages: { frontend: { pages: { opportunities: cms } } }
            } },
            frontend: { opportunities: { loading } }
        } = this.props;


        return <div className="Opportunities">
            <PageTitle {...cms} />
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getOpportunities()),
    reset: () => dispatch(resetOpportunities()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Opportunities));