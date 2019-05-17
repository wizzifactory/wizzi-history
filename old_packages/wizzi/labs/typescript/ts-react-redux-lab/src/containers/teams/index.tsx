import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../store/reducers';
import { teamsModels } from '../../features/teams/index';
import { fetchRequest } from '../../features/teams/actions';
import TeamsComp from '../../components/teams';

interface StateProps {
    loading: boolean;
    teams: teamsModels.Team[];
}

interface DispatchProps {
    fetchRequest: () => void;
}

const mapStateToProps = (state: AppState) => ({
    loading: state.teams.loading,
    teams: state.teams.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: () => {
        dispatch(fetchRequest());
    },
});

class Teams extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {
    public componentDidMount() {
      const { teams } = this.props;
      if (teams.length === 0) {
        this.props.fetchRequest();
      }
    }
    public render() {
        const { loading, teams } = this.props;
        return (
            <div>
                <TeamsComp
                    teams={teams}
                    loading={loading}
                />
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Teams);
