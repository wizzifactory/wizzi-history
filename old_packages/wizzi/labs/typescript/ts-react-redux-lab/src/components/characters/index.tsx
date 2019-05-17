import * as React from 'react';
import { charactersGeneratedTypes as g} from '../../features/characters';

export interface Props {
  loading: boolean;
  data: g.GetCharacterQuery | undefined;
  error: any;
}

export const Character: React.SFC<Props> = props => {
  const { loading, data, error } = props;
  const hero = data ? data.hero : null;

  return (
    <div>
      { loading &&
        <div>Loading</div>
      }
      { error &&
        <div>ERROR {error}</div>
      }
      { hero &&
        <div>
        <h3>{hero.name}</h3>
        {hero.friends &&
            hero.friends.map(
            friend =>
                friend && (
                <h6 key={friend.id}>
                    {friend.name}:{' '}
                    {friend.appearsIn &&
                        friend.appearsIn.map(x => x && x.toLowerCase()).join(', ')
                    }
                </h6>
                ),
            )}
        </div>
      }
      </div>
  )
};

export default Character;