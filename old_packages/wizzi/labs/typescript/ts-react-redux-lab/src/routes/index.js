import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import Hello from '../components/Hello';
import Counter from '../containers/counter';
import Todos from '../containers/todos';
import Teams from '../containers/teams';
import Character from '../containers/characters';
import NoMatch from '../components/NoMatch';
import NavBar from '../components/NavBar';
var routes = (React.createElement("div", null,
    React.createElement(NavBar, null),
    React.createElement(Switch, null,
        React.createElement(Route, { exact: true, path: "/", component: Home }),
        React.createElement(Route, { path: "/hello", component: Hello }),
        React.createElement(Route, { path: "/counter", component: Counter }),
        React.createElement(Route, { path: "/todos", component: Todos }),
        React.createElement(Route, { path: "/teams", component: Teams }),
        React.createElement(Route, { path: "/heros", component: Character }),
        React.createElement(Route, { component: NoMatch }))));
export default routes;
//# sourceMappingURL=index.js.map