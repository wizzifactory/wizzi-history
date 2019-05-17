/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\consoledialog.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Dialog, { DialogTitle, DialogActions, DialogContent, DialogContentText } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input/Input';
const styleSheet = createStyleSheet('ConsoleDialog', theme => (
    {
        container: {
            display: 'flex', 
            flexWrap: 'wrap'
        }, 
        input: {
            margin: theme.spacing.unit
        }
    }));

class ConsoleDialog extends React.Component  {
    constructor(props) {
        super(props);
        this.formNodes = {};
    }
    render() {
        const {
            classes,
            open,
            onRequestClose,
            onCreateScript
        } = this.props;
        console.log('ScriptDialog.open', open);
        return  (
                <Dialog open={open} onRequestClose={onRequestClose}>
                    <DialogTitle>
                    { 'Create a new script' }
                    </DialogTitle>
                
                    <DialogContent>
                        <div className={classes.container}>
                            <Input placeholder="Script" className={classes.input} key="script" name="script" inputRef={(node) => {
                                this.formNodes.script = node;
                            }}>
                            </Input>
                        
                        </div>
                    
                    </DialogContent>
                
                    <DialogActions>
                        <Button onClick={() => {
                            onCreateScript(this.formNodes.script.value)
                        }}>
                        { 'Create script' }
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

ConsoleDialog.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onCreateScript: PropTypes.func.isRequired
}

ConsoleDialog.defaultProps  = {
    open: false
}

const ConsoleDialogStyled = withStyles(styleSheet)(ConsoleDialog)

;
export default ConsoleDialogStyled;
