/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\schemadialog.js.ittf
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
const styleSheet = createStyleSheet('SchemaDialog', theme => (
    {
        container: {
            display: 'flex', 
            flexWrap: 'wrap'
        }, 
        input: {
            margin: theme.spacing.unit
        }
    }));

class SchemaDialog extends React.Component  {
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
            onCreateSchema,
            onSelectSchema
        } = this.props;
        console.log('SchemaDialog.open', open);
        return  (
                <Dialog open={open} onRequestClose={onRequestClose}>
                    <DialogTitle>
                    { 'Select schema' }
                    </DialogTitle>
                
                    <DialogContent>
                    {
                        schemas.length > 0
                         &&  (
                            <List dense={true}>
                            {
                                schemas.map((schema) => {
                                    return  (
                                            <ListItem key={schema.uri} onClick={() => {
                                                onSelectSchema(schema.uri);
                                            }}>
                                                <ListItemText primary={ schema.uri }>
                                                </ListItemText>
                                            
                                            </ListItem>
                                        )
                                    ;
                                })
                            }</List>
                        )
                        
                    }</DialogContent>
                
                    <DialogTitle>
                    { 'Or create a new schema' }
                    </DialogTitle>
                
                    <DialogContent>
                        <div className={classes.container}>
                            <Input placeholder="Schema" className={classes.input} key="schema" name="schema" inputRef={(node) => {
                                this.formNodes.schema = node;
                            }}>
                            </Input>
                        
                        </div>
                    
                    </DialogContent>
                
                    <DialogActions>
                        <Button onClick={() => {
                            /** -àà
                                log 'this.formNodes.schema', this.formNodes.schema.value, this.formNodes.schema
                                onCreateSchema(this.formNodes.schema.value)*/
                        }}>
                        { 'Create schema' }
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

SchemaDialog.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    schemas: PropTypes.array.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onCreateSchema: PropTypes.func,
    onSelectSchema: PropTypes.func.isRequired
}

SchemaDialog.defaultProps  = {
    open: false
}

const SchemaDialogStyled = withStyles(styleSheet)(SchemaDialog)
;
export default SchemaDialogStyled;
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
