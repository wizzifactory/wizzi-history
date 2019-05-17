/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\containers\documentcontainer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectProject, createProject, getDocuments, selectDocument, createDocument, updateDocument, changeDocument, getFragments, selectFragment, createFragment, generateArtifact, } from '../store/actions';
import Document from '../components/Document';
class DocumentContainer extends React.Component {
    }
const DocumentStyled = DocumentContainer;
const DocumentContexted = DocumentStyled;
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(DocumentContexted)
);
