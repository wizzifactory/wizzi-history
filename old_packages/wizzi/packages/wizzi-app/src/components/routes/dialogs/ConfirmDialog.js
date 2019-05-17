/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\confirmdialog.js.ittf
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Icons from '../../mui/Icons';
import TextField from '@material-ui/core/TextField';
const styles = theme => (
    {});

class ConfirmDialog extends React.Component {
    handleConfirm = () => {
        this.props.onClose(true);
    }
    handleCancel = () => {
        this.props.onClose(false);
    }
    render() {
        const {
            classes,
            open,
            title,
            contentText,
            namedValues,
            items
        } = this.props;
        var ItemsList = () => {
            return items ? items.map((p, i) => {
                        const ItemIcon = Icons(p.type);
                        return  (
                                <ListItem key={i}>
                                    <ItemIcon>
                                    </ItemIcon>
                                
                                    <ListItemText primary={p.name}>
                                    </ListItemText>
                                
                                </ListItem>
                            )
                        ;
                    }) :  (
                        <div>
                        </div>
                    )
            ;
        };
        var FieldsList = () => {
            return namedValues ? namedValues.map((o, i) => {
                        return  (
                                <TextField key={i} label={o.label} defaultValue={o.value} margin="normal" InputProps={{ readOnly: true }}>
                                </TextField>
                            )
                        ;
                    }) :  (
                        <div>
                        </div>
                    )
            ;
        };
        return  (
                <div>
                    <Dialog open={open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                        {title}</DialogTitle>
                    
                        <DialogContent>
                            <DialogContentText>
                            {contentText}</DialogContentText>
                        
                        {
                            ItemsList &&  (
                                <List>
                                    <ItemsList>
                                    </ItemsList>
                                
                                </List>
                            )
                            
                        }{
                            FieldsList &&  (
                                <FieldsList>
                                </FieldsList>
                            )
                            
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
export default withStyles(styles)(ConfirmDialog)
;
