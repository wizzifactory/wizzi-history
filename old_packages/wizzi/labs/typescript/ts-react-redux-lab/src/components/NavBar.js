import React from 'react';
import { Link } from 'react-router-dom';
var NavBar = function () { return (React.createElement("div", null,
    React.createElement("h1", null, "Typescript react redux router example"),
    React.createElement(Link, { to: "/" }, "Home"),
    React.createElement("span", null, " | "),
    React.createElement(Link, { to: "/hello" }, "Hello"),
    React.createElement("span", null, " | "),
    React.createElement(Link, { to: "/counter" }, "Counter"),
    React.createElement("span", null, " | "),
    React.createElement(Link, { to: "/todos" }, "Todos"),
    React.createElement("span", null, " | "),
    React.createElement(Link, { to: "/teams" }, "Teams"),
    React.createElement("span", null, " | "),
    React.createElement(Link, { to: "/heros?episode=NEWHOPE" }, "Hero"),
    React.createElement("span", null, " | "),
    React.createElement(Link, { to: "/arabafenice" }, "Phoenix"))); };
export default NavBar;
//# sourceMappingURL=NavBar.js.map