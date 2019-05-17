/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\menus.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ContextMenu from './dialogs/ContextMenu';
const styles = theme => (
    {});

class Menus extends React.Component {
    state = {
        anchorEl: null, 
        dynAnchorEl: null, 
        dynMenuItems: []
    };
    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            anchorEl: event.currentTarget
        });
    }
    handleDynClick = (event) => {
        event.preventDefault();
        const that = this;
        this.setState({
            dynAnchorEl: event.currentTarget, 
            dynMenuItems: [
                {
                    label: 'copy', 
                    onClick: () => {
                        alert('copy');
                        that.handleDynClose();
                    }
                }, 
                {
                    label: 'cut', 
                    onClick: () => {
                        alert('cut');
                        that.handleDynClose();
                    }
                }, 
                {
                    label: 'duplicate', 
                    onClick: () => {
                        alert('duplicate');
                        that.handleDynClose();
                    }
                }, 
                {
                    label: 'delete', 
                    onClick: () => {
                        alert('delete');
                        that.handleDynClose();
                    }
                }
            ]
        });
    }
    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    }
    handleDynClose = () => {
        this.setState({
            dynAnchorEl: null
        });
    }
    render() {
        const {anchorEl, dynAnchorEl, dynMenuItems} = this.state;
        return  (
                <div>
                    <Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onContextMenu={this.handleClick}>
                    Context Menu</Button>
                
                    <Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
                    Click Menu</Button>
                
                    <Button aria-owns={anchorEl ? 'dynamic-menu' : null} aria-haspopup="true" onContextMenu={this.handleDynClick}>
                    Dynamic context Menu</Button>
                
                    <Button aria-owns={anchorEl ? 'dynamic-menu' : null} aria-haspopup="true" onContextMenu={this.handleDynClick}>
                    Dynamic context Menu</Button>
                
                    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                        <MenuItem onClick={this.handleClose}>
                        Profile</MenuItem>
                    
                        <MenuItem onClick={this.handleClose}>
                        My account</MenuItem>
                    
                        <MenuItem onClick={this.handleClose}>
                        Logout</MenuItem>
                    
                    </Menu>
                
                    <ContextMenu id="dynamic-menu" anchorEl={dynAnchorEl} items={dynMenuItems} onClose={this.handleDynClose}>
                    </ContextMenu>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(Menus)
;
