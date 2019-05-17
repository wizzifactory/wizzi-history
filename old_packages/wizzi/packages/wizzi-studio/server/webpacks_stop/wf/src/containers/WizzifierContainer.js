/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\containers\wizzifiercontainer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { jsWizzify, htmlWizzify, cssWizzify, xmlWizzify } from '../store/actions';
import Wizzifier from '../components/Wizzifier';

class WizzifierContainer extends React.Component  {
    render() {
        const {
            isRequesting,
            lastSourceArray,
            wizzifiedArray,
            handleWizzify
        } = this.props;
        return  (
                <Wizzifier isRequesting={isRequesting} lastSourceArray={lastSourceArray} wizzifiedArray={wizzifiedArray} onWizzify={handleWizzify}>
                </Wizzifier>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            handleWizzify: (index, source, checked) => {
                if (index == 0) {
                    dispatch(jsWizzify(source, checked)
                    );
                }
                else if (index == 1) {
                    dispatch(htmlWizzify(source)
                    );
                }
                else if (index == 2) {
                    dispatch(cssWizzify(source)
                    );
                }
                else if (index == 3) {
                    dispatch(xmlWizzify(source)
                    );
                }
            }
        };
};

const mapStateToProps = (state) => {
    return {
            isRequesting: state.wizzifier.isRequesting, 
            lastSourceArray: state.wizzifier.lastSource, 
            wizzifiedArray: state.wizzifier.wizzified
        };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {})
    ;
};

const WizzifierContainerConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizzifierContainer)

;
export default WizzifierContainerConnected;
