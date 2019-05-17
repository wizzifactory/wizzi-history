/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\optionsdialog.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
function isString(test) {
    return test !== null && typeof(test) === 'string';
}
function isEmpty(test) {
    return isString(test) == false || test.length == 0;
}
const styles = theme => (
    {});

class OptionsDialog extends React.Component {
    state = {
        initValues: {}, 
        optionValues: {}, 
        errors: {}
    };
    componentDidMount() {
        const {
            options
        } = this.props;
        //
        var initValues = {};
        var i, i_items=options, i_len=options.length, o;
        for (i=0; i<i_len; i++) {
            o = options[i];
            initValues[o.name] = o.defaultValue || null;
        }
        this.setState({
            initValues: initValues, 
            optionValues: Object.assign({}, initValues)
        });
    }
    validate = () => {
        const errors = {};
        const {optionValues, initValues} = this.state;
        // _ alert( 'validate: ' + JSON.stringify(optionValues, null, 2))
        var test, testInit, ok = true;
        var i, i_items=this.props.options, i_len=this.props.options.length, o;
        for (i=0; i<i_len; i++) {
            o = this.props.options[i];
            testInit = initValues[o.name];
            test = optionValues[o.name];
            if (o.notEmpty && isEmpty(test)) {
                ok = false;
                errors[o.name] = 'A value is required.';
            }
            else if (o.mustChange && test == testInit) {
                ok = false;
                errors[o.name] = 'The value must be changed.';
            }
            else {
                errors[o.name] = '';
            }
        }
        this.setState({
            errors: errors
        });
        return ok;
    }
    handleChange = (name) => {
        return (event) => {
                const values = this.state.optionValues;
                values[name] = event.target.value;
                this.setState({
                    optionValues: values
                });
            };
    }
    handleConfirm = () => {
        // _ alert('validate: ' + this.validate())
        // _ alert( JSON.stringify(this.state.errors, null, 2))
        if (this.validate()) {
            this.props.onClose(this.state.optionValues);
        }
    }
    handleCancel = () => {
        this.props.onClose(null);
    }
    render() {
        const {
            classes,
            open,
            title,
            contentText,
            options
        } = this.props;
        const {errors} = this.state;
        return  (
                <div>
                    <Dialog open={open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                        {title}</DialogTitle>
                    
                        <DialogContent>
                            <DialogContentText>
                            {contentText}</DialogContentText>
                        
                        {
                            options.map((o, i) => {
                                const errorText = errors[o.name];
                                return  (
                                        <TextField key={i} autoFocus margin="dense" id={o.name} defaultValue={o.value || ''} label={o.label || o.name} type="text" fullWidth onChange={this.handleChange(o.name)} helperText={errorText} error={ isEmpty(errorText) == false}>
                                        </TextField>
                                    )
                                ;
                            })
                        }</DialogContent>
                    
                        <DialogActions>
                            <Button onClick={this.handleCancel} color="primary">
                            Cancel</Button>
                        
                            <Button onClick={this.handleConfirm} color="primary">
                            Confirm</Button>
                        
                        </DialogActions>
                    
                    </Dialog>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(OptionsDialog)
;
