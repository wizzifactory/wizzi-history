import * as React from 'react';
import {Team} from '../../features/teams/models';

interface Props {
  teams: Team[];
}
interface State { }

export default class AddTodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { teams } = this.props;
    return (
      <div>
        <ul>
          {
            teams.map(team => (
              <li
                key={team.team_id}
              >
              {team.name}
              </li>)
            )
          }
        </ul>
      </div>
    );
  }
}
