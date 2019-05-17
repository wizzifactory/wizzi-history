/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\projectstudio\document.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ProjectDialog from './ProjectDialog';
import DocumentDialog from './DocumentDialog';
import DocumentList from './DocumentList';
import Splitter from '../../mui/Splitter';
import Select from '../../mui/MySelect';
import CodeEditor from '../../mui/CodeEditor';
import CodeBeautify from '../../mui/CodeBeautify';
const drawerWidth = 240;
const styles = theme => (
    {
        document: {
            width: '100%'
        }, 
        list: {
            
        }, 
        generated: {
            
        }, 
        toolbar: {
            
        }, 
        editor: {
            
        }, 
        generated: {
            
        }, 
        marginLeft_10: {
            marginLeft: 10
        }, 
        appFrame: {
            zIndex: 1, 
            overflow: 'hidden', 
            position: 'relative', 
            display: 'flex', 
            width: '100%'
        }, 
        drawerPaper: {
            position: 'relative', 
            width: drawerWidth
        }
    });

class Document extends React.Component {
    state = {
        openCreateDocumentDialog: false, 
        openCreateProjectDialog: false, 
        splitter1Sizes: {
            primary: 500, 
            secondary: 500
        }
    };
    handleSelectProject = (project) => {
        this.handleCloseCreateProjectDialog();
        this.props.onSelectProject(project);
    }
    handleCreateProjectSubmit = (project) => {
        this.handleCloseCreateProjectDialog();
        this.props.onCreateProjectSubmit(project);
    }
    handleSplitter1Resize = (sizes) => {
        console.log('handleSplitter1Resize', sizes);
        this.setState({
            splitter1Sizes: sizes
        });
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
        const { splitter1Sizes } = this.state;
        const editOptions = {};
        return  (
                <div className={classes.document}>
                    <Toolbar>
                        <Typography type="title" color='inherit' noWrap>
                        Project</Typography>
                    
                        <Button raised className={classes.marginLeft_10} title="Select or create project" onClick={ this.handleOpenCreateProjectDialog }>
                        {currentProject || 'Create' }</Button>
                    
                    </Toolbar>
                
                    <DocumentDialog schemas={schemas} open={this.state.openCreateDocumentDialog} onRequestClose={this.handleCloseCreateDocumentDialog} onCreateDocument={onCreateDocumentSubmit} onCreateFragment={onCreateFragmentSubmit}>
                    </DocumentDialog>
                
                    <ProjectDialog projects={projects} open={this.state.openCreateProjectDialog} onRequestClose={this.handleCloseCreateProjectDialog} onCreateProject={this.handleCreateProjectSubmit} onSelectProject={this.handleSelectProject}>
                    </ProjectDialog>
                
                    <div className={classes.appFrame}>
                        <Drawer variant="permanent" anchor="left" classes={{
                            paper: classes.drawerPaper
                        }}>
                            <div className={classes.list}>
                                <Typography color='inherit' type="subheading" noWrap gutterBottom={true}>
                                Documents</Typography>
                            
                                <DocumentList documents={documents} onSelectDocument={onSelectDocument} selectedUri={selectedUri}>
                                </DocumentList>
                            
                            </div>
                        
                        {
                            userFragments.length > 0 &&  (
                                <div className={classes.list}>
                                    <Typography color='inherit' type="subheading" noWrap gutterBottom={true}>
                                    User fragments</Typography>
                                
                                    <DocumentList documents={userFragments} onSelectDocument={onSelectFragment} selectedUri={selectedUri}>
                                    </DocumentList>
                                
                                </div>
                            )
                            
                        }{
                            projectFragments.length > 0 &&  (
                                <div className={classes.list}>
                                    <Typography color='inherit' type="subheading" noWrap gutterBottom={true}>
                                    Project fragments</Typography>
                                
                                    <DocumentList documents={projectFragments} onSelectDocument={onSelectFragment} selectedUri={selectedUri}>
                                    </DocumentList>
                                
                                </div>
                            )
                            
                        }</Drawer>
                    
                        <Splitter split="vertical" secondaryInitialSize={ 800 } primaryMinSize={200} secondaryMinSize={800} onResize={ this.handleSplitter1Resize }>
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                    <div className={classes.toolbar}>
                                        <Toolbar>
                                        {
                                            selectedUri !== null &&  (
                                                <Typography type="title" color='inherit' noWrap>
                                                {selectedUri}</Typography>
                                            )
                                            
                                        }<Button variant="raised" className={classes.marginLeft_10} title="Save the document or fragment" onClick={ onSaveDocument }>
                                            Save</Button>
                                        
                                            <Button variant="raised" className={classes.marginLeft_10} title="Create a new document or fragment" onClick={ this.handleOpenCreateDocumentDialog }>
                                            New</Button>
                                        
                                        </Toolbar>
                                    
                                    </div>
                                
                                </div>
                            
                                <div className={classes.editor}>
                                    <CodeEditor theme='vs-dark' width={ splitter1Sizes.primary } height={ splitter1Sizes.third } value={ selectedContent } options={ editOptions } onChange={ this.handleCodeChange }>
                                    </CodeEditor>
                                
                                </div>
                            
                            </div>
                        
                            <div className={classes.generated}>
                            {
                                artifacts && artifacts.length > 0 &&  (
                                    <div>
                                        <Toolbar>
                                            <Typography type="title" color='inherit' noWrap>
                                            Artifact</Typography>
                                        
                                            <Select items={artifacts} selected={artifacts[0]} ref={onSelectArtifactRef}>
                                            </Select>
                                        
                                            <Button variant="raised" className={classes.marginLeft_10} title="Generate artifact" onClick={ onGenerateArtifact }>
                                            Go</Button>
                                        
                                        </Toolbar>
                                    
                                    {
                                        generatedContent &&  (
                                            <CodeBeautify language={ 'js' } codeSnippet={ generatedContent }>
                                            </CodeBeautify>
                                        )
                                        
                                    }</div>
                                )
                                
                            }</div>
                        
                        </Splitter>
                    
                    </div>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(Document)
;
