/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\simpledialog.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
const emails = [
    'username@gmail.com', 
    'user02@gmail.com'
];
const styles = theme => (
    {
        avatar: {
            backgroundColor: blue[100], 
            color: blue[600]
        }
    });

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    }
    handleListItemClick = (value) => {
        this.props.onClose(value);
    }
    render() {
        const {classes: classes, onClose: onClose, selectedValue: selectedValue, ...other} = this.props;
        return  (
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                    <DialogTitle id="simple-dialog-title">
                    Set backup account</DialogTitle>
                
                    <div>
                        <List>
                        {
                            emails.map((email) => (
                                    <ListItem button onClick={() => {
                                        this.handleListItemClick(email);
                                    }} key={email}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                <PersonIcon>
                                                </PersonIcon>
                                            
                                            </Avatar>
                                        
                                        </ListItemAvatar>
                                    
                                        <ListItemText primary={email}>
                                        </ListItemText>
                                    
                                    </ListItem>
                                ))
                        }<ListItem button onClick={() => {
                                this.handleListItemClick('addAccount');
                            }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AddIcon>
                                        </AddIcon>
                                    
                                    </Avatar>
                                
                                </ListItemAvatar>
                            
                                <ListItemText primary="add account">
                                </ListItemText>
                            
                            </ListItem>
                        
                        </List>
                    
                    </div>
                
                </Dialog>
            )
        ;
    }
}
export default withStyles(styles)(SimpleDialog)
;
