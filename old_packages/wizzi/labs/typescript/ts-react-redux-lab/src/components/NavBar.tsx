import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
      <h1>Typescript react redux router example</h1>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/hello">Hello</Link>
      <span> | </span>
      <Link to="/counter">Counter</Link>
      <span> | </span>
      <Link to="/todos">Todos</Link>
      <span> | </span>
      <Link to="/teams">Teams</Link>
      <span> | </span>
      <Link to="/heros?episode=NEWHOPE">Hero</Link>
      <span> | </span>
      <Link to="/arabafenice">Phoenix</Link>
  </div>
);

export default NavBar;
