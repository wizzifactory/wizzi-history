import React from 'react';
import { teamsModels } from '../../features/teams/index';
import TeamsList from './TeamsList';

interface Props {
    loading: boolean;
    teams: teamsModels.Team[];
}

export default class Todos extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const {loading, teams} = this.props;
        return (
            <div style={{padding: '100px 100px'}}>
                <h1>Teams</h1>
                {loading && (
                    <h1>Loading ...</h1>
                )}
                <TeamsList
                    teams={teams}
                />
            </div>
        );
    }
}
