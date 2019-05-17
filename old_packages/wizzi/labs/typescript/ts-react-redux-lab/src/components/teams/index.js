import * as tslib_1 from "tslib";
import React from 'react';
import TeamsList from './TeamsList';
var Todos = (function (_super) {
    tslib_1.__extends(Todos, _super);
    function Todos(props) {
        return _super.call(this, props) || this;
    }
    Todos.prototype.render = function () {
        var _a = this.props, loading = _a.loading, teams = _a.teams;
        return (React.createElement("div", { style: { padding: '100px 100px' } },
            React.createElement("h1", null, "Teams"),
            loading && (React.createElement("h1", null, "Loading ...")),
            React.createElement(TeamsList, { teams: teams })));
    };
    return Todos;
}(React.Component));
export default Todos;
//# sourceMappingURL=index.js.map