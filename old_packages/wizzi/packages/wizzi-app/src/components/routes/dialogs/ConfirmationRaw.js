/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\confirmationraw.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const options = [
    'None', 
    'Atria', 
    'Callisto', 
    'Dione', 
    'Ganymede', 
    'Hangouts Call', 
    'Luna', 
    'Oberon', 
    'Phobos', 
    'Pyxis', 
    'Sedna', 
    'Titania', 
    'Triton', 
    'Umbriel'
];
const styles = theme => (
    {});

class ConfirmationRaw extends React.Component {
    state = {};
    constructor(props) {
        super(props);
        super(props);
        this.radioGroupRef = null;
        this.state.value = this.props.value;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    handleEntering = () => {
        this.radioGroupRef.focus();
    }
    handleCancel = () => {
        this.props.onClose(this.props.value);
    }
    handleOk = () => {
        this.props.onClose(this.state.value);
    }
    handleChange = (event, value) => {
        this.setState({
            value: value
        });
    }
    render() {
        const {value: value, ...other} = this.props;
        return  (
                <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="xs" onEntering={this.handleEntering} aria-labelledby="confirmation-dialog-title" {...other}>
                    <DialogTitle id="confirmation-dialog-title">
                    Phone Ringtone</DialogTitle>
                
                    <DialogContent>
                        <RadioGroup ref={(ref) => {
                            this.radioGroupRef = ref;
                        }} aria-label="Ringtone" name="ringtone" value={this.state.value} onChange={this.handleChange}>
                        {
                            options.map((option) => {
                                return  (
                                        <FormControlLabel value={option} key={option} control={ (
                                            <Radio>
                                            </Radio>
                                        )
                                        } label={option}>
                                        </FormControlLabel>
                                    )
                                ;
                            })
                        }</RadioGroup>
                    
                    </DialogContent>
                
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                        \n            Cancel\n</Button>
                    
                        <Button onClick={this.handleOk} color="primary">
                        \n            Ok\n</Button>
                    
                    </DialogActions>
                
                </Dialog>
            )
        ;
    }
}

ConfirmationRaw.propTypes = {
    onClose: PropTypes.func,
    value: PropTypes.string
}
export default withStyles(styles)(ConfirmationRaw)
;
