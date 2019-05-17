import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../store/reducers';

interface HelloChildProps {
  pathname: string;
  search: string;
  hash: string;
}

const HelloChild = ({ pathname, search, hash }: HelloChildProps) => (
  <div>
    Hello-Child
    <ul>
      <li><Link to="/hello?color=Blue&size=40">with query string</Link></li>
      <li><Link to="/hello#lovelove">with hash</Link></li>
    </ul>
    <div>
      pathname: {pathname}
    </div>
    <div>
      search: {search}
    </div>
    <div>
      hash: {hash}
    </div>
  </div>
);

const mapStateToProps = (state: AppState) => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

export default connect(mapStateToProps)(HelloChild);
