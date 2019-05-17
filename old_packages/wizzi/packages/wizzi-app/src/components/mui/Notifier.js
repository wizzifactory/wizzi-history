/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\notifier.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
function isString(test) {
    return test !== null && typeof(test) === 'string';
}
function isEmpty(test) {
    return isString(test) == false || test.length == 0;
}
const styles = theme => (
    {
        close: {
            width: theme.spacing.unit * 4, 
            height: theme.spacing.unit * 4
        }
    });

class Notifier extends React.Component {
    state = {
        open: false, 
        messageInfo: {
            message: ''
        }
    };
    queue = [];
    componentDidMount() {
        const {
            message
        } = this.props;
        if (!isEmpty(message)) {
            this.enqueueNotify(message);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            message
        } = this.props;
        if (message !== prevProps.message && message !== this.state.messageInfo.message && isEmpty(message) == false) {
            this.enqueueNotify(message);
        }
    }
    enqueueNotify = (message) => {
        this.queue.push({
            message: message, 
            key: new Date().getTime()
        });
        if (this.state.open) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({
                open: false
            });
        }
        else {
            this.processQueue();
        }
    }
    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(), 
                open: true
            });
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return ;
        }
        this.setState({
            open: false
        });
    }
    handleExited = () => {
        this.processQueue();
    }
    render() {
        const {
            classes,
            vertical,
            horizontal,
            duration
        } = this.props;
        const { open, messageInfo } = this.state;
        const { message, key } = messageInfo;
        const messageElement =  (
            <span id="snackbar-message-id" dangerouslySetInnerHTML={{
                __html: message.split('|')[0]
            }}>
            </span>
        )
        ;
        return  (
                <Snackbar key={key} anchorOrigin={{
                    vertical: vertical, 
                    horizontal: horizontal
                }} message={messageElement} autoHideDuration={duration} onClose={this.handleClose} onExited={this.handleExited} open={open} ContentProps={{
                    'aria-describedby': 'snackbar-message-id'
                }} action={[
                     (
                        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleClose}>
                            <CloseIcon>
                            </CloseIcon>
                        
                        </IconButton>
                    )
                    
                ]}>
                </Snackbar>
            )
        ;
    }
}

Notifier.propTypes = {
    message: PropTypes.string,
    duration: PropTypes.number,
    vertical: PropTypes.string,
    horizontal: PropTypes.string
}

Notifier.defaultProps  = {
    message: '',
    duration: 5000,
    vertical: 'top',
    horizontal: 'center'
}
export default withStyles(styles)(Notifier)
;
