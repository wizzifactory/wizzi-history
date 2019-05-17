/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\fullscreen.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
function Transition(props) {
    return  (
            <Slide direction="up" {...props}>
            </Slide>
        )
    ;
}
const styles = theme => (
    {
        appBar: {
            position: 'relative'
        }, 
        flex: {
            flex: 1
        }
    });

class SimpleDialog extends React.Component {
    state = {
        open: false
    };
    handleClickOpen = () => {
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
        const {classes: classes} = this.props;
        return  (
                <div>
                    <Button onClick={this.handleClickOpen}>
                    Open full-screen dialog</Button>
                
                    <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                    <CloseIcon>
                                    </CloseIcon>
                                
                                </IconButton>
                            
                                <Typography variant="title" color="inherit" className={classes.flex}>
                                \n                Sound\n</Typography>
                            
                                <Button color="inherit" onClick={this.handleClose}>
                                \n                save\n</Button>
                            
                            </Toolbar>
                        
                        </AppBar>
                    
                        <List>
                            <ListItem button>
                                <ListItemText primary="Phone ringtone" secondary="Titania">
                                </ListItemText>
                            
                            </ListItem>
                        
                            <Divider>
                            </Divider>
                        
                            <ListItem button>
                                <ListItemText primary="Default notification ringtone" secondary="Tethys">
                                </ListItemText>
                            
                            </ListItem>
                        
                        </List>
                    
                    </Dialog>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(SimpleDialog)
;
