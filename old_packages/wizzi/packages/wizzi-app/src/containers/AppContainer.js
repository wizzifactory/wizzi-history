/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\containers\appcontainer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppComponent from '../components/App';
class AppContainer extends React.Component {
    render() {
        return  (
                <AppComponent>
                </AppComponent>
            )
        ;
    }
    }
const AppStyled = AppContainer;
const AppContexted = AppStyled;
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch
        };
};
const mapStateToProps = (state) => {
    return {};
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AppContexted)
;
