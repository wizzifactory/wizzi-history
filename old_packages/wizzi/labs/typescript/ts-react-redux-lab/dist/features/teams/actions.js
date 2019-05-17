import { createStandardAction } from 'typesafe-actions';
var FETCH_REQUEST = '@@teams/FETCH_REQUEST';
var FETCH_SUCCESS = '@@teams/FETCH_SUCCESS';
var FETCH_ERROR = '@@teams/FETCH_ERROR';
var SELECT_TEAM = '@@teams/SELECT_TEAM';
var SELECTED = '@@teams/SELECTED';
var CLEAR_SELECTED = '@@teams/CLEAR_SELECTED';
export var fetchRequest = createStandardAction(FETCH_REQUEST)();
export var clearSelected = createStandardAction(CLEAR_SELECTED)();
export var fetchSuccess = createStandardAction(FETCH_SUCCESS)();
export var fetchError = createStandardAction(FETCH_ERROR)();
export var selectTeam = createStandardAction(SELECT_TEAM)();
export var teamSelected = createStandardAction(SELECTED)();
//# sourceMappingURL=actions.js.map