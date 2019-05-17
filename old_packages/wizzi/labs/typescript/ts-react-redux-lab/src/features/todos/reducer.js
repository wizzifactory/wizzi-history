import * as tslib_1 from "tslib";
import cuid from 'cuid';
import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { TodosFilter } from './models';
import * as todosActions from './actions';
var initialTodos = [
    {
        id: cuid(),
        title: 'first to do',
        completed: false,
    },
];
var initialTodosFilter = TodosFilter.All;
export default combineReducers({
    todos: function (state, action) {
        if (state === void 0) { state = initialTodos; }
        switch (action.type) {
            case getType(todosActions.add):
                return state.concat([action.payload]);
            case getType(todosActions.toggle):
                return state.map(function (item) { return (item.id === action.payload.id ? tslib_1.__assign({}, item, { completed: !item.completed }) : item); });
            default:
                return state;
        }
    },
    todosFilter: function (state, action) {
        if (state === void 0) { state = initialTodosFilter; }
        switch (action.type) {
            case getType(todosActions.changeFilter):
                return action.payload;
            default:
                return state;
        }
    },
});
//# sourceMappingURL=reducer.js.map