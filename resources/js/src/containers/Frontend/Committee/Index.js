import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageTitle from '../../../components/Frontend/UI/Title/PageTitle';

import { getCommittee, resetCommittee } from '../../../store/actions/frontend/committee';

import './Committee.scss';

class Committee extends Component {
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
                pages: { frontend: { pages: { committee: cms } } }
            } },
            frontend: { committee: { loading } }
        } = this.props;


        return <div className="Committee">
            <PageTitle {...cms} />
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getCommittee()),
    reset: () => dispatch(resetCommittee()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Committee));