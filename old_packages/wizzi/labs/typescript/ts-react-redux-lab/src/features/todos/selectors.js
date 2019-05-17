import { createSelector } from 'reselect';
export var getTodos = function (state) { return state.todos; };
export var getTodosFilter = function (state) { return state.todosFilter; };
export var getFilteredTodos = createSelector(getTodos, getTodosFilter, function (todos, todosFilter) {
    switch (todosFilter) {
        case 'completed':
            return todos.filter(function (t) { return t.completed; });
        case 'active':
            return todos.filter(function (t) { return !t.completed; });
        default:
            return todos;
    }
});
//# sourceMappingURL=selectors.js.map