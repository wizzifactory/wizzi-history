import * as tslib_1 from "tslib";
import React from 'react';
import { connect } from 'react-redux';
import { fetchRequest } from '../../features/teams/actions';
import TeamsComp from '../../components/teams';
var mapStateToProps = function (state) { return ({
    loading: state.teams.loading,
    teams: state.teams.data,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    fetchRequest: function () {
        dispatch(fetchRequest());
    },
}); };
var Teams = (function (_super) {
    tslib_1.__extends(Teams, _super);
    function Teams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Teams.prototype.componentDidMount = function () {
        var teams = this.props.teams;
        if (teams.length === 0) {
            this.props.fetchRequest();
        }
    };
    Teams.prototype.render = function () {
        var _a = this.props, loading = _a.loading, teams = _a.teams;
        return (React.createElement("div", null,
            React.createElement(TeamsComp, { teams: teams, loading: loading })));
    };
    return Teams;
}(React.Component));
export default connect(mapStateToProps, mapDispatchToProps)(Teams);
//# sourceMappingURL=index.js.map