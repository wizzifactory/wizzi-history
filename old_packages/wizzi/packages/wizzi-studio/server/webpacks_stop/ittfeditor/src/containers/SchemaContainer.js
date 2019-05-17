/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\containers\schemacontainer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getSchemas, getSchema } from '../store/actions';
import Schema from '../components/Schema';

class SchemaContainer extends React.Component  {
    componentDidMount() {
        const {
            loadSchemas
        } = this.props;
        loadSchemas();
    }
    render() {
        const {
            schemas,
            selectedSchemaUri,
            ittfDocument,
            model,
            factory,
            jsonDoc,
            handleSelectSchema
        } = this.props;
        return  (
                <Schema schemas={schemas} selectedSchemaUri={selectedSchemaUri} ittfDocument={ittfDocument} model={model} factory={factory} jsonDoc={jsonDoc} onSelectSchema={handleSelectSchema}>
                </Schema>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            loadSchemas: () => {
                dispatch(getSchemas());
            }, 
            handleSelectSchema: (uri) => {
                dispatch(getSchema(uri));
            }, 
            handleCreateSubmit: (name, xpackage) => {
                dispatch(createSchema(name, xpackage));
            }, 
            handleChange: (uri, newValue) => {
                // log 'SchemaEditor.handleChange', uri, newValue
                dispatch(changeSchema(newValue));
                dispatch(updateSchema(uri, newValue));
            }
        };
};

const mapStateToProps = (state) => {
    return {
            schemas: state.schema.items, 
            selectedSchemaUri: state.schema.selectedSchemaUri, 
            ittfDocument: state.schema.ittfDocument, 
            model: state.schema.model, 
            factory: state.schema.factory, 
            jsonDoc: state.schema.jsonDoc
        };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};

const SchemaContainerConnected = withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SchemaContainer)
);
export default SchemaContainerConnected;
