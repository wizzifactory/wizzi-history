import React from 'react';
import { connect } from 'react-redux';
import { todosSelectors } from '../../features/todos/index';
import { add, toggle, changeFilter } from '../../features/todos/actions';
import TodosComp from '../../components/todos';
var mapStateToProps = function (state) { return ({
    todos: state.todos.todos,
    filter: state.todos.todosFilter,
    filteredTodos: todosSelectors.getFilteredTodos(state.todos),
}); };
var mapDispatchToProps = function (dispatch) { return ({
    add: function (payload) {
        dispatch(add(payload));
    },
    toggle: function (payload) { return dispatch(toggle(payload)); },
    changeFilter: function (payload) { return dispatch(changeFilter(payload)); },
}); };
var Todos = function (props) {
    return (React.createElement("div", null,
        React.createElement(TodosComp, { filter: props.filter, todos: props.todos, filteredTodos: props.filteredTodos, onToggle: function (id) {
                props.toggle({ id: id });
            }, onAdd: function (title) {
                props.add({ title: title });
            }, onChangeFilter: function (filter) {
                props.changeFilter(filter);
            } })));
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
//# sourceMappingURL=index.js.map