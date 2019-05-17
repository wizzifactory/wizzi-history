/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\mui\select.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
class Select extends React.Component  {
    state = {
        anchorEl: undefined, 
        open: false
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.state.selected) {
            this.setState({
                ...this.state, 
                selected: nextProps.selected
            });
            this.value = nextProps.selected;
        }
    }
    componentDidMount() {
        if (typeof(this.value) === 'undefined') {
            this.setState({
                ...this.state, 
                selected: this.props.items[0]
            });
            this.value = this.props.items[0];
        }
    }
    handleClick = (event) => {
        this.setState({
            open: true, 
            anchorEl: event.currentTarget
        });
    }
    handleRequestClose = ({target}) => {
        console.log(target.id, target);
        this.setState({
            ...this.state, 
            open: false, 
            selected: target.id
        });
        this.value = target.id;
    }
    render() {
        const { items } = this.props;
        return  (
                <div>
                    <Button aria-owns="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    { this.state.selected || items[0] }
                    </Button>
                
                    <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open} onRequestClose={this.handleRequestClose}>
                    {
                        items.map((item) => {
                            return  (
                                    <MenuItem onClick={this.handleRequestClose} key={item} id={item}>
                                    {item}
                                    </MenuItem>
                                )
                            ;
                        })
                    }</Menu>
                
                </div>
            )
        ;
    }
}
export default Select;
