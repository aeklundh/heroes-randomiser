import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Components
import HeroList from './HeroList';

//Actions
import { fetchRandomTeam } from '../store/team/actions';

//Utilities
import { shouldFetchStandardReducable } from '../utilities/genericApiUtilities';

class TeamContainer extends Component {
    componentDidMount = () => {
        if (shouldFetchStandardReducable(this.props.team, "team")) {
            this.props.fetchRandomTeam(this.props.clientOptions.teamSize);
        }
    }

    render() {
        const { team } = this.props.team;
        return (
            <section>
                <HeroList heroes={team} />
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRandomTeam: bindActionCreators(fetchRandomTeam, dispatch)
    }
}

const mapStateToProps = state => {
    return {
        clientOptions: state.clientOptions,
        team: state.team
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);
