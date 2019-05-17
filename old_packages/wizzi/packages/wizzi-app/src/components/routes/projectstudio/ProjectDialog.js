/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\projectstudio\projectdialog.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '../../mui/MySelect';
const styles = theme => (
    {
        container: {
            display: 'flex', 
            flexWrap: 'wrap'
        }, 
        input: {
            margin: theme.spacing.unit
        }
    });

class ProjectDialog extends React.Component {
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
                    { 'Select project' }</DialogTitle>
                
                    <DialogContent>
                    {
                        projects.length > 0 &&  (
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
                    { 'Or create a new project' }</DialogTitle>
                
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
                        { 'Create project' }</Button>
                    
                        <Button onClick={() => {
                            onRequestClose();
                        }}>
                        { 'Cancel' }</Button>
                    
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
export default withStyles(styles)(ProjectDialog)
;
