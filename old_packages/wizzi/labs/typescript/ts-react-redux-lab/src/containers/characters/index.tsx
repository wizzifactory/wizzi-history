import * as React from 'react';
import { Query } from 'react-apollo';
// import { AppState } from '../../store/reducers';
import { charactersGeneratedTypes as g, charactersQueries as q } from '../../features/characters';
import CharactersComp from '../../components/characters';

export interface OwnProps {
    episode: g.Episode;
}

class Character extends React.Component<OwnProps> {
    public render() {
        let { episode } = this.props;
        episode = episode || "NEWHOPE";
        return (
            <Query<g.GetCharacterQuery, g.GetCharacterQueryVariables> query={q.GetCharacter} variables={{ episode }}>
            {({ loading, data, error }) => {
                return (
                    <CharactersComp
                        loading={loading}
                        data={data}
                        error={error}
                    />
                )
            }}
            </Query>
        );
    }
};
export default Character;