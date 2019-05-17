import * as tslib_1 from "tslib";
import * as React from 'react';
var AddTodoForm = (function (_super) {
    tslib_1.__extends(AddTodoForm, _super);
    function AddTodoForm(props) {
        return _super.call(this, props) || this;
    }
    AddTodoForm.prototype.render = function () {
        var _a = this.props, filteredTodos = _a.filteredTodos, onTodoClicked = _a.onTodoClicked;
        return (React.createElement("ul", null, filteredTodos.map(function (todo) { return (React.createElement("li", { key: todo.id, onClick: function () { return onTodoClicked(todo.id); }, style: { textDecoration: "" + (todo.completed ? 'line-through' : ''), cursor: 'pointer' } }, todo.title)); })));
    };
    return AddTodoForm;
}(React.Component));
export default AddTodoForm;
//# sourceMappingURL=TodosList.js.map