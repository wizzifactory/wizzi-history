/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\console.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import InboxIcon from 'material-ui-icons/Inbox';
import ConsoleDialog from './ConsoleDialog';
import DocumentEditor from './DocumentEditor';
const styleSheet = createStyleSheet('Console', theme => (
    {
        content: theme.mixins.gutters({
            paddingTop: 80, 
            flex: '1 1 100%', 
            maxWidth: '100%', 
            margin: '0 auto'
        })
        , 
        selected: {
            color: 'red'
        }, 
        marginLeft_10: {
            marginLeft: '10px'
        }
    }));

class Console extends React.Component  {
    state = {
        openCreateScriptDialog: false
    };
    handleCloseCreateScriptDialog = () => {
        this.setState({
            ...this.state, 
            openCreateScriptDialog: false
        })
    }
    handleOpenCreateScriptDialog = () => {
        this.setState({
            ...this.state, 
            openCreateScriptDialog: true
        })
    }
    handleCreateConsole = (name) => {
        const {
            onCreateConsole,
            onRefreshListConsole
        } = this.props;
        this.handleCloseCreateScriptDialog();
        onCreateConsole(name)
        setTimeout(function() {
            onRefreshListConsole();
        }, 1500)
    }
    handleScriptEdit = (name) => {
        const {
            onGetConsole,
            onChangeView
        } = this.props;
        onGetConsole(name)
        onChangeView('edit')
    }
    handleScriptRun = (name) => {
        const {
            onRunRequest,
            onChangeView
        } = this.props;
        onRunRequest(name)
        onChangeView('run')
    }
    handleSetViewList = () => {
        const {
            onChangeView
        } = this.props;
        onChangeView('list')
    }
    handleSetViewEdit = () => {
        const {
            onChangeView
        } = this.props;
        onChangeView('edit')
    }
    handleRunScript = () => {
        const {
            onSaveConsole,
            onRunRequest,
            selectedConsole,
            onChangeView,
            content
        } = this.props;
        if (content != this.editor.value) {
            onSaveConsole(selectedConsole, this.editor.value, setTimeout(function() {
                onRunRequest(selectedConsole);
            }, 1000)
            );
        }
        else {
            onRunRequest(selectedConsole);
        }
        onChangeView('run')
    }
    handleSaveScript = () => {
        const {
            onSaveConsole,
            selectedConsole
        } = this.props;
        onSaveConsole(selectedConsole, this.editor.value)
    }
    render() {
        const {
            classes,
            isRequestingList,
            isRequestingRun,
            jsmodels,
            listerror,
            selectedConsole,
            stdout,
            stderr,
            runerror,
            content,
            view,
            onRefreshListConsole,
            onGetConsole,
            onCreateConsole,
            onSaveConsole,
            onRunRequest,
            onChangeView
        } = this.props;
        var toolbar;
        if (view == 'list') {
            toolbar =  (
                <Toolbar>
                    <Button title='refresh script list' raised className={classes.marginLeft_10} onClick={onRefreshListConsole}>
                    refresh
                    </Button>
                
                    <Button title='create a new script' raised className={classes.marginLeft_10} onClick={this.handleOpenCreateScriptDialog}>
                    create
                    </Button>
                
                </Toolbar>
            )
            ;
        }
        else if (view == 'edit') {
            toolbar =  (
                <Toolbar>
                    <Button title='list' raised className={classes.marginLeft_10} onClick={this.handleSetViewList}>
                    list
                    </Button>
                
                    <Button title='save' raised className={classes.marginLeft_10} onClick={this.handleSaveScript}>
                    save
                    </Button>
                
                    <Button title='run' raised className={classes.marginLeft_10} onClick={this.handleRunScript}>
                    run
                    </Button>
                
                </Toolbar>
            )
            ;
        }
        else if (view == 'run') {
            toolbar =  (
                <Toolbar>
                    <Button title='list' raised className={classes.marginLeft_10} onClick={this.handleSetViewList}>
                    list
                    </Button>
                
                    <Button title='edit' raised className={classes.marginLeft_10} onClick={this.handleSetViewEdit}>
                    edit
                    </Button>
                
                </Toolbar>
            )
            ;
        }
        if (view === 'list') {
            return  (
                    <div className={classes.content}>
                        <ConsoleDialog open={this.state.openCreateScriptDialog} onRequestClose={this.handleCloseCreateScriptDialog} onCreateScript={this.handleCreateConsole}>
                        </ConsoleDialog>
                    
                    {toolbar}
                        <List dense={true}>
                        {
                            jsmodels.map((jsmodel) => {
                                return  (
                                        <ListItem key={jsmodel.name}>
                                            <ListItemIcon>
                                                <InboxIcon>
                                                </InboxIcon>
                                            
                                            </ListItemIcon>
                                        
                                            <ListItemText primary={jsmodel.name}>
                                            </ListItemText>
                                        
                                            <Button title="edit script" raised className={classes.marginLeft_10} onClick={() => {
                                                this.handleScriptEdit(jsmodel.name)
                                            }}>
                                            { 'edit ' }
                                            </Button>
                                        
                                            <Button title="run script" raised className={classes.marginLeft_10} onClick={() => {
                                                this.handleScriptRun(jsmodel.name)
                                            }}>
                                            { 'run' }
                                            </Button>
                                        
                                        </ListItem>
                                    )
                                ;
                            })
                            
                        }</List>
                    
                    </div>
                )
            ;
        }
        if (view == 'edit') {
            return  (
                    <div className={classes.content}>
                    {toolbar}
                        <h2>
                        { 'Edit script ' + selectedConsole }
                        </h2>
                    
                        <DocumentEditor value={content} onEditorRef={(node) => {
                            this.editor = node;
                            console.log('Console.onEditorRef.this.editor', this.editor);
                        }}>
                        </DocumentEditor>
                    
                    </div>
                )
            ;
        }
        if (view == 'run') {
            var runcontent = runerror ? runerror : (stdout || stderr) ? (stdout + '\n' + stderr) : '';
            return  (
                    <div className={classes.content}>
                    {toolbar}
                        <h2>
                        { 'Execution of script ' + selectedConsole }
                        </h2>
                    
                        <DocumentEditor value={runcontent}>
                        </DocumentEditor>
                    
                    </div>
                )
            ;
        }
    }
}

const ConsoleStyled = withStyles(styleSheet)(Console)

;
export default ConsoleStyled;
