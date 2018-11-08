import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Actions
import { fetchRandomTeam } from '../store/team/actions';

//Utilities
import { shouldFetchStandardReducable } from '../utilities/genericApiUtilities';

class TeamContainer extends Component {
    componentDidMount = () => {
        if (shouldFetchStandardReducable(this.props.team, "team")) {
            this.props.fetchRandomTeam();
        }
    }

    render() {
        const { team } = this.props.team;
        return (
            <section>
                <div>
                    {team.map(hero => {
                        return <p key={hero.id}>{hero.name}</p>
                    })}
                </div>
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
        team: state.team
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);
