/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\myselect.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const styles = theme => (
    {
        formControl: {
            margin: theme.spacing.unit
        }
    });

class MySelect extends React.Component {
    //
    // [ items
    // string
    state = {
        open: false, 
        value: ''
    };
    handleOpen = (event) => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    render() {
        const {
            classes,
            label,
            items,
            value,
            nameProp,
            valueProp,
            onChange
        } = this.props;
        var selvalue = value;
        if (typeof selvalue === 'undefined') {
            if (items && items.length > 0) {
                selvalue = valueProp ? items[0][valueProp] : items[0].value || items[0].name || items[0];
            }
            else {
                selvalue = '';
            }
        }
        return  (
                <form autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='open-select'>
                        {label}</InputLabel>
                    
                        <Select open={this.state.open} onClose={this.handleClose} onOpen={this.handleOpen} value={selvalue} onChange={onChange} inputProps={{
                            id: 'open-select', 
                            name: 'value'
                        }}>
                            <MenuItem value="">
                                <em>
                                None</em>
                            
                            </MenuItem>
                        
                        {
                            items.map((item, i) => {
                                const iname = nameProp ? item[nameProp] : item.name || item;
                                const ivalue = valueProp ? item[valueProp] : item.value || item.name || item;
                                return  (
                                        <MenuItem key={i} value={ivalue}>
                                        {iname}</MenuItem>
                                    )
                                ;
                            })
                        }</Select>
                    
                    </FormControl>
                
                </form>
            )
        ;
    }
}

MySelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    items: PropTypes.array.isRequired,
    nameProp: PropTypes.string,
    valueProp: PropTypes.string,
    onChange: PropTypes.func
}
export default withStyles(styles)(MySelect)
;
