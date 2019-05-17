import * as tslib_1 from "tslib";
import cuid from 'cuid';
import { createStandardAction } from 'typesafe-actions';
var ADD = '@todos/ADD';
var TOGGLE = '@todos/TOGGLE';
var CHANGE_FILTER = '@todos/CHANGE_FILTER';
export var add = createStandardAction(ADD).map(function (payload) { return ({
    payload: tslib_1.__assign({}, payload, { id: cuid(), completed: false }),
}); });
export var toggle = createStandardAction(TOGGLE)();
export var changeFilter = createStandardAction(CHANGE_FILTER)();
//# sourceMappingURL=actions.js.map