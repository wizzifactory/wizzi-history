/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\projectdialog.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input/Input';
import Select from './mui/Select';
const styleSheet = createStyleSheet('ProjectDialog', theme => (
    {
        container: {
            display: 'flex', 
            flexWrap: 'wrap'
        }, 
        input: {
            margin: theme.spacing.unit
        }
    }));

class ProjectDialog extends React.Component  {
    constructor(props) {
        super(props);
        this.formNodes = {};
    }
    render() {
        const {
            classes,
            open,
            projects,
            onRequestClose,
            onCreateProject,
            onSelectProject
        } = this.props;
        console.log('ProjectDialog.open', open);
        return  (
                <Dialog open={open} onRequestClose={onRequestClose}>
                    <DialogTitle>
                    { 'Select project' }
                    </DialogTitle>
                
                    <DialogContent>
                    {
                        projects.length > 0
                         &&  (
                            <List dense={true}>
                            {
                                projects.map((project) => {
                                    return  (
                                            <ListItem key={project.name} onClick={() => {
                                                onSelectProject(project.name);
                                            }}>
                                                <ListItemText primary={ project.name }>
                                                </ListItemText>
                                            
                                            </ListItem>
                                        )
                                    ;
                                })
                            }</List>
                        )
                        
                    }</DialogContent>
                
                    <DialogTitle>
                    { 'Or create a new project' }
                    </DialogTitle>
                
                    <DialogContent>
                        <div className={classes.container}>
                            <Input placeholder="Project" className={classes.input} key="project" name="project" inputRef={(node) => {
                                this.formNodes.project = node;
                            }}>
                            </Input>
                        
                        </div>
                    
                    </DialogContent>
                
                    <DialogActions>
                        <Button onClick={() => {
                            // log 'this.formNodes.project', this.formNodes.project.value, this.formNodes.project
                            onCreateProject(this.formNodes.project.value);
                        }}>
                        { 'Create project' }
                        </Button>
                    
                        <Button onClick={() => {
                            onRequestClose();
                        }}>
                        { 'Cancel' }
                        </Button>
                    
                    </DialogActions>
                
                </Dialog>
            )
        ;
    }
}

ProjectDialog.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onCreateProject: PropTypes.func.isRequired,
    onSelectProject: PropTypes.func.isRequired
}

ProjectDialog.defaultProps  = {
    open: false
}

const ProjectDialogStyled = withStyles(styleSheet)(ProjectDialog)
;
export default ProjectDialogStyled;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
