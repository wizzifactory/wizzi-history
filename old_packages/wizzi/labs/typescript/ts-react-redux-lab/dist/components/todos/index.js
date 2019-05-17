import * as tslib_1 from "tslib";
import React from 'react';
import TodosList from './TodosList';
import AddTodoForm from './AddTodoForm';
var Todos = (function (_super) {
    tslib_1.__extends(Todos, _super);
    function Todos(props) {
        return _super.call(this, props) || this;
    }
    Todos.prototype.render = function () {
        var _a = this.props, filter = _a.filter, todos = _a.todos, filteredTodos = _a.filteredTodos, onAdd = _a.onAdd, onChangeFilter = _a.onChangeFilter, onToggle = _a.onToggle;
        return (React.createElement("div", { style: { padding: '100px 100px' } },
            React.createElement("h1", null, "Todos"),
            React.createElement("div", null,
                React.createElement("span", null, "filter: "),
                React.createElement("select", { value: filter, onChange: function (ev) {
                        onChangeFilter(ev.target.value);
                    } },
                    React.createElement("option", { value: "all" }, "all"),
                    React.createElement("option", { value: "completed" }, "completed"),
                    React.createElement("option", { value: "active" }, "active"))),
            React.createElement(TodosList, { todos: todos, filteredTodos: filteredTodos, onTodoClicked: onToggle }),
            React.createElement(AddTodoForm, { handleSubmit: onAdd })));
    };
    return Todos;
}(React.Component));
export default Todos;
//# sourceMappingURL=index.js.map