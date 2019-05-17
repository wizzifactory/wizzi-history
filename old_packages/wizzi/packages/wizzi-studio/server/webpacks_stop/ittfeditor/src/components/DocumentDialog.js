/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\documentdialog.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input/Input';
import Select from './mui/Select';
const styleSheet = createStyleSheet('DocumentDialog', theme => (
    {
        container: {
            display: 'flex', 
            flexWrap: 'wrap'
        }, 
        input: {
            margin: theme.spacing.unit
        }
    }));

class DocumentDialog extends React.Component  {
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
                    { 'Create document or fragment' }
                    </DialogTitle>
                
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
                        { 'Create document' }
                        </Button>
                    
                        <Button onClick={() => {
                            // log 'this.formNodes.schema', this.formNodes.schema.value, this.formNodes.schema
                            // log 'this.formNodes.document', this.formNodes.document.value, this.formNodes.document
                            onCreateFragment(this.formNodes.document.value, this.formNodes.schema.value, this.formNodes.folder.value, this.formNodes.project.value);
                        }}>
                        { 'Create fragment' }
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

const DocumentDialogStyled = withStyles(styleSheet)(DocumentDialog)
;
export default DocumentDialogStyled;
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
