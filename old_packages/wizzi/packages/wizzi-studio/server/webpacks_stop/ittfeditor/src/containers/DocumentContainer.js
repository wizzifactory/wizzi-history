/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\containers\documentcontainer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectProject, createProject, getDocuments, selectDocument, createDocument, updateDocument, changeDocument, getFragments, selectFragment, createFragment, generateArtifact, } from '../store/actions';
import Document from '../components/Document';

class DocumentContainer extends React.Component  {
    state = {
        currentProject: null, 
        selectedUri: null, 
        selectedContent: null
    };
    componentWillReceiveProps(nextProps) {
        console.log('DocumentContainer.WillReceiveProps', nextProps);
        if (nextProps && nextProps.currentProject && nextProps.currentProject !== this.state.currentProject) {
            this.props.loadDocuments(nextProps.currentProject);
            this.props.loadFragments(nextProps.currentProject);
            this.setState({
                ...this.state, 
                currentProject: nextProps.currentProject, 
                selectedUri: null, 
                selectedContent: null
            });
        }
        else if (nextProps && nextProps.selectedUri !== this.state.selectedUri) {
            this.setState({
                ...this.state, 
                selectedUri: nextProps.selectedUri, 
                selectedContent: nextProps.selectedContent
            });
        }
    }
    componentDidMount() {
        const {
            currentProject
        } = this.props;
        console.log('DocumentContainer.DidMount.currentProject', currentProject);
        if (currentProject && currentProject.length > 0) {
            this.setState({
                ...this.state, 
                currentProject: currentProject, 
                selectedUri: null, 
                selectedContent: null
            });
            this.props.loadDocuments(currentProject);
            this.props.loadFragments(currentProject);
        }
    }
    render() {
        const {
            schemas,
            projects,
            documents,
            userFragments,
            projectFragments,
            selectedType,
            selectedUri,
            selectedSchema,
            selectedContent,
            generatedArtifactContent,
            generatedArtifactError,
            handleSelectProject,
            handleCreateProjectSubmit,
            handleChange,
            handleSelectDocument,
            handleCreateDocumentSubmit,
            handleSelectFragment,
            handleCreateFragmentSubmit,
            handleGenerateArtifact
        } = this.props;
        var _selectedSchemaData = null;
        var schemaNames = [];
        var artifactNames = [];
        var i, i_items=schemas, i_len=schemas.length, s;
        for (i=0; i<i_len; i++) {
            s = schemas[i];
            schemaNames.push(s.name);
            if (s.name === selectedSchema) {
                _selectedSchemaData = s;
            }
        }
        if (selectedType === 'document' && _selectedSchemaData && _selectedSchemaData.artifacts) {
            var i, i_items=_selectedSchemaData.artifacts, i_len=_selectedSchemaData.artifacts.length, a;
            for (i=0; i<i_len; i++) {
                a = _selectedSchemaData.artifacts[i];
                artifactNames.push(a.name);
            }
        }
        console.log('DocumentContainer.render.schemas, schemaNames, artifactNames', schemas, schemaNames, artifactNames);
        return  (
                <Document projects={projects} schemas={schemaNames} documents={documents} userFragments={userFragments} projectFragments={projectFragments} currentProject={this.state.currentProject} selectedUri={selectedUri} selectedContent={selectedContent} artifacts={artifactNames} generatedArtifactContent={generatedArtifactContent} generatedArtifactError={generatedArtifactError} onSelectProject={handleSelectProject} onCreateProjectSubmit={handleCreateProjectSubmit} onEditorRef={(node) => {
                    this.editor = node;
                    console.log('DocumentEditor.onTextRef.this.editor', this.editor);
                }} onSelectArtifactRef={(node) => {
                    this.selectArtifact = node;
                    console.log('DocumentEditor.onSelectArtifactRef.node', node);
                }} onSelectDocument={handleSelectDocument} onSelectFragment={handleSelectFragment} onSaveDocument={() => {
                    console.log('this.editor', this.editor);
                    console.log('this.editor.value', this.editor.value);
                    handleChange(selectedUri, this.editor.value);
                }} onGenerateArtifact={() => {
                    handleGenerateArtifact(selectedUri, this.selectArtifact.value);
                }} onCreateDocumentSubmit={handleCreateDocumentSubmit} onCreateFragmentSubmit={handleCreateFragmentSubmit}>
                </Document>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            loadDocuments: (project) => {
                dispatch(getDocuments(project));
            }, 
            handleSelectDocument: (uri, schema) => {
                dispatch(selectDocument(uri, schema));
            }, 
            handleChange: (uri, newValue) => {
                // log 'DocumentEditor.handleChange', uri, newValue
                dispatch(changeDocument(newValue));
                dispatch(updateDocument(uri, newValue));
            }, 
            loadFragments: (project) => {
                dispatch(getFragments(project));
            }, 
            handleSelectFragment: (uri, schema) => {
                dispatch(selectFragment(uri, schema));
            }, 
            handleGenerateArtifact: (uri, artifactName) => {
                console.log('DocumentEditor.generateArtifact', uri, artifactName);
                dispatch(generateArtifact(uri, artifactName));
            }, 
            handleCreateDocumentSubmit: (name, schema, folder, project) => {
                dispatch(createDocument(name, schema, folder, project));
            }, 
            handleCreateFragmentSubmit: (name, schema, folder, project) => {
                dispatch(createFragment(name, schema, folder, project));
            }, 
            handleSelectProject: (project) => {
                dispatch(selectProject(project));
            }, 
            handleCreateProjectSubmit: (project) => {
                dispatch(createProject(project));
            }
        };
};

const mapStateToProps = (state) => {
    return {
            currentProject: state.commons.currentProject, 
            schemas: state.commons.schemas, 
            projects: state.commons.projects, 
            documents: state.document.items, 
            userFragments: state.fragment.userItems, 
            projectFragments: state.fragment.projectItems, 
            selectedType: state.editor.selectedType, 
            selectedUri: state.editor.selectedUri, 
            selectedSchema: state.editor.selectedSchema, 
            selectedContent: state.editor.selectedContent, 
            generatedArtifactContent: state.artifact.generatedArtifact, 
            generatedArtifactError: state.artifact.error
        };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};

const DocumentContainerConnected = withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(DocumentContainer)
);
export default DocumentContainerConnected;
