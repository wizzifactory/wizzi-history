/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\projectstudio\documentdialog.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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

class DocumentDialog extends React.Component {
    constructor(props) {
        super(props);
        this.formNodes = {};
    }
    render() {
        const {
            classes,
            open,
            schemas,
            onRequestClose,
            onCreateDocument,
            onCreateFragment
        } = this.props;
        console.log('DocumentDialog.open', open);
        return  (
                <Dialog open={open} onRequestClose={onRequestClose}>
                    <DialogTitle>
                    { 'Create document or fragment' }</DialogTitle>
                
                    <DialogContent>
                        <div className={classes.container}>
                            <Input placeholder="Project" className={classes.input} key="project" name="project" inputRef={(node) => {
                                this.formNodes.project = node;
                            }}>
                            </Input>
                        
                            <Input placeholder="Folder" className={classes.input} key="folder" name="folder" inputRef={(node) => {
                                this.formNodes.folder = node;
                            }}>
                            </Input>
                        
                            <Input placeholder="Name" className={classes.input} key="document" name="document" inputRef={(node) => {
                                this.formNodes.document = node;
                            }}>
                            </Input>
                        
                            <Select items={schemas} selected={schemas[0]} className={classes.input} ref={(node) => {
                                this.formNodes.schema = node;
                                // log 'this.formNodes.schema', this.formNodes.schema
                            }}>
                            </Select>
                        
                        </div>
                    
                    </DialogContent>
                
                    <DialogActions>
                        <Button onClick={() => {
                            // log 'this.formNodes.schema', this.formNodes.schema.value, this.formNodes.schema
                            // log 'this.formNodes.document', this.formNodes.document.value, this.formNodes.document
                            onCreateDocument(this.formNodes.document.value, this.formNodes.schema.value, this.formNodes.folder.value, this.formNodes.project.value);
                        }}>
                        { 'Create document' }</Button>
                    
                        <Button onClick={() => {
                            // log 'this.formNodes.schema', this.formNodes.schema.value, this.formNodes.schema
                            // log 'this.formNodes.document', this.formNodes.document.value, this.formNodes.document
                            onCreateFragment(this.formNodes.document.value, this.formNodes.schema.value, this.formNodes.folder.value, this.formNodes.project.value);
                        }}>
                        { 'Create fragment' }</Button>
                    
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

DocumentDialog.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    schemas: PropTypes.array.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onCreateDocument: PropTypes.func.isRequired,
    onCreateFragment: PropTypes.func.isRequired
}

DocumentDialog.defaultProps  = {
    open: false
}
export default withStyles(styles)(DocumentDialog)
;
