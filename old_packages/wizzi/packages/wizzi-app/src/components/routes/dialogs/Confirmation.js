/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\confirmation.js.ittf
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
import ConfirmationRaw from './ConfirmationRaw';
const styles = theme => (
    {
        root: {
            width: '100%', 
            maxWidth: 360, 
            backgroundColor: theme.palette.background.paper
        }, 
        paper: {
            width: '80%', 
            maxHeight: 435
        }
    });

class Confirmation extends React.Component {
    state = {
        open: false, 
        value: 'Dione'
    };
    // p button = null
    handleClickListItem = () => {
        this.setState({
            open: true
        });
    }
    handleClose = (value) => {
        this.setState({
            value: value, 
            open: false
        });
    }
    render() {
        const {classes: classes} = this.props;
        return  (
                <div className={classes.root}>
                    <List>
                        <ListItem button divider disabled>
                            <ListItemText primary="Interruptions">
                            </ListItemText>
                        
                        </ListItem>
                    
                        <ListItem button divider aria-haspopup="true" aria-controls="ringtone-menu" aria-label="Phone ringtone" onClick={this.handleClickListItem}>
                            <ListItemText primary="Phone ringtone" secondary={this.state.value}>
                            </ListItemText>
                        
                        </ListItem>
                    
                        <ListItem button divider disabled>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys">
                            </ListItemText>
                        
                        </ListItem>
                    
                        <ConfirmationRaw classes={{
                            paper: classes.paper
                        }} open={this.state.open} onClose={this.handleClose} value={this.state.value}>
                        </ConfirmationRaw>
                    
                    </List>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(Confirmation)
;
