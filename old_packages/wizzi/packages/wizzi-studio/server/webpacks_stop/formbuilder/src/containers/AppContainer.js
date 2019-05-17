/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\containers\appcontainer.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sizeMe from 'react-sizeme';
import App from '../components/App';

class AppContainer extends React.Component  {
    state = {
        code: 1
    };
    componentDidMount() {
    }
    render() {
        console.log('render.state', this.state);
        return  (
                <App>
                </App>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {})
    ;
};

const AppContainerConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AppContainer)

;
export default sizeMe({
    monitorHeight: true, 
    monitorPosition: true
})(AppContainerConnected)

;
