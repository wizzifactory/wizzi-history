/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\formdialog.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//
import Typography from '@material-ui/core/Typography';
//
import SimpleDialog from './dialogs/SimpleDialog';
//
import FullScreen from './dialogs/FullScreen';
//
import Confirmation from './dialogs/Confirmation';
//
import OptionsDialog from './dialogs/OptionsDialog';
//
import TemporaryDrawer from './drawers/TemporaryDrawer';
const emails = [
    'username@gmail.com', 
    'user02@gmail.com'
];
const styles = theme => (
    {});

class FormDialog extends React.Component {
    state = {
        open: false, 
        openSimple: false, 
        selectedValue: emails[1], 
        scroll: 'paper', 
        openScroll: false, 
        optionsDialogOpen: false, 
        optionsDialogTitle: "Options", 
        optionsDialogOptions: [
            {
                name: 'project'
            }, 
            {
                name: 'folder'
            }, 
            {
                name: 'document'
            }
        ]
    };
    handleClickOpenScroll = (scroll) => {
        return () => {
                this.setState({
                    openScroll: true, 
                    scroll: scroll
                });
            };
    }
    handleCloseScroll = () => {
        this.setState({
            openScroll: false
        });
    }
    handleClickOpenSimple = () => {
        this.setState({
            openSimple: true
        });
    }
    handleCloseSimple = (value) => {
        this.setState({
            selectedValue: value, 
            openSimple: false
        });
    }
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
    handleOptionsDialogOpen = () => {
        this.setState({
            optionsDialogOpen: true
        });
    }
    render() {
        return  (
                <div>
                    <Button onClick={this.handleClickOpen}>
                    Open form dialog</Button>
                
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                        Subscribe</DialogTitle>
                    
                        <DialogContent>
                            <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
                        
                            <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth>
                            </TextField>
                        
                        </DialogContent>
                    
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel</Button>
                        
                            <Button onClick={this.handleClose} color="primary">
                            Subscribe</Button>
                        
                        </DialogActions>
                    
                    </Dialog>
                
                    <hr>
                    </hr>
                
                    <Typography variant="subheading">
                    Selected:{this.state.selectedValue}</Typography>
                
                    <br>
                    </br>
                
                    <Button onClick={this.handleClickOpenSimple}>
                    Open simple dialog</Button>
                
                    <SimpleDialog selectedValue={this.state.selectedValue} open={this.state.openSimple} onClose={this.handleCloseSimple}>
                    </SimpleDialog>
                
                    <hr>
                    </hr>
                
                    <div>
                        <Button onClick={this.handleClickOpenScroll('paper')}>
                        scroll=paper</Button>
                    
                        <Button onClick={this.handleClickOpenScroll('body')}>
                        scroll=body</Button>
                    
                        <Dialog open={this.state.openScroll} onClose={this.handleCloseScroll} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
                            <DialogTitle id="scroll-dialog-title">
                            Subscribe</DialogTitle>
                        
                            <DialogContent>
                                <DialogContentText>
                                \n              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac\n              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum\n              at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus\n              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum\n              nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur\n              et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras\n              mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\n              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\n              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\n              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\n              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\n              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\n              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\n              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\n              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\n              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\n              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\n              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\n              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\n              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\n              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\n              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\n              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\n              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\n              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\n              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis\n              consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,\n              egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\n              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis\n              lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla\n              sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\n              Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.\n</DialogContentText>
                            
                            </DialogContent>
                        
                            <DialogActions>
                                <Button onClick={this.handleCloseScroll} color="primary">
                                \n              Cancel\n</Button>
                            
                                <Button onClick={this.handleCloseScroll} color="primary">
                                \n              Subscribe\n</Button>
                            
                            </DialogActions>
                        
                        </Dialog>
                    
                    </div>
                
                    <hr>
                    </hr>
                
                    <FullScreen>
                    </FullScreen>
                
                    <hr>
                    </hr>
                
                    <Confirmation>
                    </Confirmation>
                
                    <hr>
                    </hr>
                
                    <TemporaryDrawer>
                    </TemporaryDrawer>
                
                    <hr>
                    </hr>
                
                    <Button onClick={this.handleOptionsDialogOpen}>
                    Options dialog</Button>
                
                    <OptionsDialog open={this.state.optionsDialogOpen} title={this.state.optionsDialogTitle} options={this.state.optionsDialogOptions} onClose={(values) => {
                        alert(JSON.stringify(values, null, 2));
                        this.setState({
                            optionsDialogOpen: false
                        });
                    }}>
                    </OptionsDialog>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(FormDialog)
;
