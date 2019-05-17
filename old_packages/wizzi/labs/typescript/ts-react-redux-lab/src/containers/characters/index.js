import * as tslib_1 from "tslib";
import * as React from 'react';
import { Query } from 'react-apollo';
import { charactersQueries as q } from '../../features/characters';
import CharactersComp from '../../components/characters';
var Character = (function (_super) {
    tslib_1.__extends(Character, _super);
    function Character() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Character.prototype.render = function () {
        var episode = this.props.episode;
        episode = episode || "NEWHOPE";
        return (React.createElement(Query, { query: q.GetCharacter, variables: { episode: episode } }, function (_a) {
            var loading = _a.loading, data = _a.data, error = _a.error;
            return (React.createElement(CharactersComp, { loading: loading, data: data, error: error }));
        }));
    };
    return Character;
}(React.Component));
;
export default Character;
//# sourceMappingURL=index.js.map