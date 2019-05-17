import * as tslib_1 from "tslib";
import { getType } from 'typesafe-actions';
import * as teamsActions from './actions';
var initialState = {
    loading: false,
    data: [],
    selected: undefined,
    errors: undefined,
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case getType(teamsActions.fetchRequest): {
            console.log("teamsActions.fetchRequest");
            return tslib_1.__assign({}, state, { loading: true });
        }
        case getType(teamsActions.selectTeam): {
            return tslib_1.__assign({}, state, { loading: true });
        }
        case getType(teamsActions.fetchSuccess): {
            console.log("teamsActions.fetchSuccess", action);
            return tslib_1.__assign({}, state, { loading: false, data: action.payload.teams });
        }
        case getType(teamsActions.fetchError): {
            console.log("teamsActions.fetchError", action);
            return tslib_1.__assign({}, state, { loading: false, errors: action.payload });
        }
        case getType(teamsActions.teamSelected): {
            return tslib_1.__assign({}, state, { loading: false, selected: action.payload });
        }
        case getType(teamsActions.clearSelected): {
            return tslib_1.__assign({}, state, { selected: undefined });
        }
        default: {
            return state;
        }
    }
};
export default reducer;
//# sourceMappingURL=reducer.js.map