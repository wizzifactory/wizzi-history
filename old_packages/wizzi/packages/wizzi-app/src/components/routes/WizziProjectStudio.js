/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizziprojectstudio.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {selectProject, createProject, getDocuments, selectDocument, createDocument, updateDocument, changeDocument, getFragments, selectFragment, createFragment, generateArtifact} from '../../store/actions';
import Document from './projectstudio/Document';
import verify from '../../lib/verify';
import {getSchema} from '../../store/actions';
class WizziProjectStudioContainer extends React.Component {
    state = {
        currentProject: null, 
        selectedUri: null, 
        selectedContent: null
    };
    componentWillReceiveProps(nextProps) {
        console.log('WizziProjectStudio.WillReceiveProps', nextProps);
        if (nextProps && nextProps.selectedUri !== this.state.selectedUri) {
            this.setState({
                ...this.state, 
                selectedUri: nextProps.selectedUri, 
                selectedContent: nextProps.selectedContent
            });
        }
    }
    componentDidMount() {
        const {
            match
        } = this.props;
        const projectId = match.params.projectId;
        console.log('WizziProjectStudio.DidMount.projectId', projectId);
        if (projectId && projectId.length > 0) {
            this.setState({
                ...this.state, 
                currentProject: projectId, 
                selectedUri: null, 
                selectedContent: null
            });
            this.props.dispatchLoadDocuments(projectId);
            this.props.dispatchLoadFragments(projectId);
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
            dispatchSelectProject,
            dispatchCreateProjectSubmit,
            dispatchChangeDocument,
            dispatchSelectDocument,
            dispatchCreateDocumentSubmit,
            dispatchSelectFragment,
            dispatchCreateFragmentSubmit,
            dispatchGenerateArtifact
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
        console.log('WizziProjectStudio.render.schemas, schemaNames, artifactNames', schemas, schemaNames, artifactNames);
        return  (
                <Document projects={projects} schemas={schemaNames} documents={documents} userFragments={userFragments} projectFragments={projectFragments} currentProject={this.state.currentProject} selectedUri={selectedUri} selectedContent={selectedContent} artifacts={artifactNames} generatedArtifactContent={generatedArtifactContent} generatedArtifactError={generatedArtifactError} onSelectProject={dispatchSelectProject} onCreateProjectSubmit={dispatchCreateProjectSubmit} onEditorRef={(node) => {
                    this.editor = node;
                    console.log('DocumentEditor.onTextRef.this.editor', this.editor);
                }} onSelectArtifactRef={(node) => {
                    this.selectArtifact = node;
                    console.log('DocumentEditor.onSelectArtifactRef.node', node);
                }} onSelectDocument={dispatchSelectDocument} onSelectFragment={dispatchSelectFragment} onSaveDocument={() => {
                    console.log('this.editor', this.editor);
                    console.log('this.editor.value', this.editor.value);
                    dispatchChangeDocument(selectedUri, this.editor.value);
                }} onGenerateArtifact={() => {
                    dispatchGenerateArtifact(selectedUri, this.selectArtifact.value);
                }} onCreateDocumentSubmit={dispatchCreateDocumentSubmit} onCreateFragmentSubmit={dispatchCreateFragmentSubmit}>
                </Document>
            )
        ;
    }
    }
const WizziProjectStudioStyled = WizziProjectStudioContainer;
const WizziProjectStudioContexted = WizziProjectStudioStyled;
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchLoadDocuments: (project) => {
                dispatch(getDocuments(project));
            }, 
            dispatchSelectDocument: (uri, schema) => {
                dispatch(selectDocument(uri, schema));
            }, 
            dispatchChangeDocument: (uri, newValue) => {
                // log 'DocumentEditor.dispatchChange', uri, newValue
                dispatch(changeDocument(newValue));
                dispatch(updateDocument(uri, newValue));
            }, 
            dispatchLoadFragments: (project) => {
                dispatch(getFragments(project));
            }, 
            dispatchSelectFragment: (uri, schema) => {
                dispatch(selectFragment(uri, schema));
            }, 
            dispatchGenerateArtifact: (uri, artifactName) => {
                console.log('DocumentEditor.generateArtifact', uri, artifactName);
                dispatch(generateArtifact(uri, artifactName));
            }, 
            dispatchCreateDocumentSubmit: (name, schema, folder, project) => {
                dispatch(createDocument(name, schema, folder, project));
            }, 
            dispatchCreateFragmentSubmit: (name, schema, folder, project) => {
                dispatch(createFragment(name, schema, folder, project));
            }, 
            dispatchSelectProject: (project) => {
                dispatch(selectProject(project));
            }, 
            dispatchCreateProjectSubmit: (project) => {
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
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziProjectStudioContexted)
;
