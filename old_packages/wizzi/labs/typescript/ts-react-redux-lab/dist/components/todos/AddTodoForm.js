import * as tslib_1 from "tslib";
import * as React from 'react';
var AddTodoForm = (function (_super) {
    tslib_1.__extends(AddTodoForm, _super);
    function AddTodoForm(props) {
        var _this = _super.call(this, props) || this;
        _this.updateValue = function (value) {
            _this.setState({ value: value });
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            if (!_this.state.value.trim()) {
                return;
            }
            _this.props.handleSubmit(_this.state.value);
            _this.setState({ value: '' });
        };
        _this.state = { value: '' };
        return _this;
    }
    AddTodoForm.prototype.render = function () {
        var _this = this;
        var value = this.state.value;
        return (React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement("input", { type: "text", value: value, onChange: function (e) { return _this.updateValue(e.target.value); } }),
            React.createElement("button", { type: "submit" }, "Add todo !")));
    };
    return AddTodoForm;
}(React.Component));
export default AddTodoForm;
//# sourceMappingURL=AddTodoForm.js.map