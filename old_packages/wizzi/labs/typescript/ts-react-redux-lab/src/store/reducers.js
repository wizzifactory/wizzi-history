import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counterReducer from '../features/counter/reducer';
import todosReducer from '../features/todos/reducer';
import teamsReducer from '../features/teams/reducer';
export var createRootReducer = function (history) { return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    todos: todosReducer,
    teams: teamsReducer,
}); };
//# sourceMappingURL=reducers.js.map