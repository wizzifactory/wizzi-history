import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
var HelloChild = function (_a) {
    var pathname = _a.pathname, search = _a.search, hash = _a.hash;
    return (React.createElement("div", null,
        "Hello-Child",
        React.createElement("ul", null,
            React.createElement("li", null,
                React.createElement(Link, { to: "/hello?color=Blue&size=40" }, "with query string")),
            React.createElement("li", null,
                React.createElement(Link, { to: "/hello#lovelove" }, "with hash"))),
        React.createElement("div", null,
            "pathname: ",
            pathname),
        React.createElement("div", null,
            "search: ",
            search),
        React.createElement("div", null,
            "hash: ",
            hash)));
};
var mapStateToProps = function (state) { return ({
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
}); };
export default connect(mapStateToProps)(HelloChild);
//# sourceMappingURL=HelloChild.js.map