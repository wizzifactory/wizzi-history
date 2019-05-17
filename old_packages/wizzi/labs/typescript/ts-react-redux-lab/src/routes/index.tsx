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

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/hello" component={Hello} />
      <Route path="/counter" component={Counter} />
      <Route path="/todos" component={Todos} />
      <Route path="/teams" component={Teams} />
      <Route path="/heros" component={Character} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);
export default routes;
