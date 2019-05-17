import * as tslib_1 from "tslib";
import * as React from 'react';
var AddTodoForm = (function (_super) {
    tslib_1.__extends(AddTodoForm, _super);
    function AddTodoForm(props) {
        return _super.call(this, props) || this;
    }
    AddTodoForm.prototype.render = function () {
        var teams = this.props.teams;
        return (React.createElement("div", null,
            React.createElement("ul", null, teams.map(function (team) { return (React.createElement("li", { key: team.team_id }, team.name)); }))));
    };
    return AddTodoForm;
}(React.Component));
export default AddTodoForm;
//# sourceMappingURL=TeamsList.js.map