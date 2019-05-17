/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\document.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import NoteAddIcon from 'material-ui-icons/NoteAdd';
import AddBoxIcon from 'material-ui-icons/AddBox';
import ProjectDialog from './ProjectDialog';
import DocumentDialog from './DocumentDialog';
import DocumentList from './DocumentList2';
import DocumentEditor from './DocumentEditor';
import Splitter from './mui/Splitter';
import Select from './mui/Select';
const styleSheet = createStyleSheet('Document', theme => (
    {
        document: {
            // @ border '1px solid red'
            // @ padding '2px'
            width: '100%'
        }, 
        dialog: {
            // @ border '1px solid orange'
            // @ padding '2px'
            
        }, 
        list: {
            // @ border '1px solid green'
            // @ padding '2px'
            
        }, 
        generated: {
            // @ border '1px solid gray'
            // @ padding '2px'
            
        }, 
        toolbar: {
            // @ border '1px solid green'
            // @ padding '2px'
            
        }, 
        editor: {
            // @ border '1px solid blue'
            // @ padding '2px'
            
        }, 
        generated: {
            // @ border '1px solid violet'
            // @ padding '2px'
            
        }, 
        marginLeft_10: {
            marginLeft: 10
        }
    }));

class Document extends React.Component  {
    state = {
        openCreateDocumentDialog: false, 
        openCreateProjectDialog: false
    };
    handleSelectProject = (project) => {
        this.handleCloseCreateProjectDialog();
        this.props.onSelectProject(project);
    }
    handleCreateProjectSubmit = (project) => {
        this.handleCloseCreateProjectDialog();
        this.props.onCreateProjectSubmit(project);
    }
    handleOpenCreateDocumentDialog = () => {
        this.setState({
            ...this.state, 
            openCreateDocumentDialog: true
        });
    }
    handleCloseCreateDocumentDialog = () => {
        this.setState({
            ...this.state, 
            openCreateDocumentDialog: false
        });
    }
    handleOpenCreateProjectDialog = () => {
        this.setState({
            ...this.state, 
            openCreateProjectDialog: true
        });
    }
    handleCloseCreateProjectDialog = () => {
        this.setState({
            ...this.state, 
            openCreateProjectDialog: false
        });
    }
    render() {
        const {
            classes,
            projects,
            schemas,
            documents,
            userFragments,
            projectFragments,
            currentProject,
            onSelectProject,
            onCreateProjectSubmit,
            selectedUri,
            selectedContent,
            onSaveDocument,
            onSelectDocument,
            onSelectFragment,
            onCreateDocumentSubmit,
            onCreateFragmentSubmit,
            onEditorRef,
            artifacts,
            onSelectArtifactRef,
            onGenerateArtifact,
            generatedArtifactContent,
            generatedArtifactError
        } = this.props;
        const generatedContent = generatedArtifactContent || generatedArtifactError;
        return  (
                <div className={classes.document}>
                    <Toolbar>
                        <Typography type="title" color='inherit' noWrap>
                        Project
                        </Typography>
                    
                        <Button raised className={classes.marginLeft_10} title="Select or create project" onClick={ this.handleOpenCreateProjectDialog }>
                        {currentProject || 'Create' }
                        </Button>
                    
                    </Toolbar>
                
                    <div className={classes.dialog}>
                        <DocumentDialog schemas={schemas} open={this.state.openCreateDocumentDialog} onRequestClose={this.handleCloseCreateDocumentDialog} onCreateDocument={onCreateDocumentSubmit} onCreateFragment={onCreateFragmentSubmit}>
                        </DocumentDialog>
                    
                    </div>
                
                    <div className={classes.dialog}>
                        <ProjectDialog projects={projects} open={this.state.openCreateProjectDialog} onRequestClose={this.handleCloseCreateProjectDialog} onCreateProject={this.handleCreateProjectSubmit} onSelectProject={this.handleSelectProject}>
                        </ProjectDialog>
                    
                    </div>
                
                    <table className="table condensed">
                        <tbody>
                            <tr>
                                <td style={{
                                    width: '20%'
                                }}>
                                    <div className={classes.list}>
                                        <Typography color='inherit' type="subheading" noWrap gutterBottom={true}>
                                        Documents
                                        </Typography>
                                    
                                        <DocumentList documents={documents} onSelectDocument={onSelectDocument} selectedUri={selectedUri}>
                                        </DocumentList>
                                    
                                    </div>
                                
                                {
                                    userFragments.length > 0
                                     &&  (
                                        <div className={classes.list}>
                                            <Typography color='inherit' type="subheading" noWrap gutterBottom={true}>
                                            User fragments
                                            </Typography>
                                        
                                            <DocumentList documents={userFragments} onSelectDocument={onSelectFragment} selectedUri={selectedUri}>
                                            </DocumentList>
                                        
                                        </div>
                                    )
                                    
                                }{
                                    projectFragments.length > 0
                                     &&  (
                                        <div className={classes.list}>
                                            <Typography color='inherit' type="subheading" noWrap gutterBottom={true}>
                                            Project fragments
                                            </Typography>
                                        
                                            <DocumentList documents={projectFragments} onSelectDocument={onSelectFragment} selectedUri={selectedUri}>
                                            </DocumentList>
                                        
                                        </div>
                                    )
                                    
                                }</td>
                            
                                <td style={{
                                    width: '80%'
                                }}>
                                    <Splitter>
                                        <div className={classes.ittf}>
                                            <div className={classes.toolbar}>
                                                <Toolbar>
                                                {
                                                    selectedUri !== null
                                                     &&  (
                                                        <Typography type="title" color='inherit' noWrap>
                                                        {selectedUri}
                                                        </Typography>
                                                    )
                                                    
                                                }<Button raised className={classes.marginLeft_10} title="Save the document or fragment" onClick={ onSaveDocument }>
                                                    Save
                                                    </Button>
                                                
                                                    <Button raised className={classes.marginLeft_10} title="Create a new document or fragment" onClick={this.handleOpenCreateDocumentDialog}>
                                                    New
                                                    </Button>
                                                
                                                </Toolbar>
                                            
                                            </div>
                                        
                                            <div className={classes.editor}>
                                                <DocumentEditor value={selectedContent} onEditorRef={onEditorRef}>
                                                </DocumentEditor>
                                            
                                            </div>
                                        
                                        </div>
                                    
                                        <div className={classes.generated}>
                                        {
                                            artifacts && artifacts.length > 0
                                             &&  (
                                                <div>
                                                    <Toolbar>
                                                        <Typography type="title" color='inherit' noWrap>
                                                        Artifact
                                                        </Typography>
                                                    
                                                        <Select items={artifacts} selected={artifacts[0]} ref={onSelectArtifactRef}>
                                                        </Select>
                                                    
                                                        <Button raised title="Generate artifact" onClick={ onGenerateArtifact }>
                                                        go
                                                        </Button>
                                                    
                                                    </Toolbar>
                                                
                                                {
                                                    generatedContent
                                                     &&  (
                                                        <DocumentEditor value={generatedContent}>
                                                        </DocumentEditor>
                                                    )
                                                    
                                                }</div>
                                            )
                                            
                                        }</div>
                                    
                                    </Splitter>
                                
                                </td>
                            
                            </tr>
                        
                        </tbody>
                    
                    </table>
                
                </div>
            )
        ;
    }
}

const DocumentStyled = withStyles(styleSheet)(Document)
;
export default DocumentStyled;
