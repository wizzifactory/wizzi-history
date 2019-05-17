var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import TodosList from './TodosList';
import AddTodoForm from './AddTodoForm';
var Todos = /** @class */ (function (_super) {
    __extends(Todos, _super);
    function Todos(props) {
        return _super.call(this, props) || this;
    }
    Todos.prototype.render = function () {
        var props = this.props;
        console.log('props', props);
        console.log('todos', props.todos);
        var _a = this.props, filter = _a.filter, todos = _a.todos, filteredTodos = _a.filteredTodos, onAdd = _a.onAdd, onChangeFilter = _a.onChangeFilter, onToggle = _a.onToggle;
        return (React.createElement("div", { style: { padding: "100px 100px" } },
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
//# sourceMappingURL=Todos.js.map