/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\notifierdemo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Notifier from '../mui/Notifier';
var counter = 0;
const styles = theme => (
    {});

class NotifierDemo extends React.Component {
    state = {
        message: null
    };
    notify = (message) => {
        this.setState({
            message: message + '|' + counter++
        });
    }
    checkAnswer = (event) => {
        event.preventDefault();
        const answer = this.answerInput && this.answerInput.value || null;
        if (this.answerInput && !answer) {
            this.notify('Empty field. Enter a number.');
        }
        if (answer && parseInt(answer, 10) === 4) {
            this.notify('Correct answer!');
        }
        else {
            if (answer && parseInt(answer, 10) !== 4) {
                this.notify('Incorrect answer.');
            }
        }
    }
    render() {
        const {message} = this.state;
        return  (
                <div style={{
                    padding: '10px 45px'
                }}>
                    <Notifier message={message} vertical="top" horizontal="center">
                    </Notifier>
                
                    <form onSubmit={this.checkAnswer}>
                        <p>
                        What is 2+2?</p>
                    
                        <TextField inputRef={(elm) => {
                            this.answerInput = elm;
                        }} type="number" label="Type your answer" style={{
                            font: '15px Muli', 
                            color: '#222', 
                            fontWeight: '300'
                        }}>
                        </TextField>
                    
                        <p>
                        </p>
                    
                        <Button variant="raised" color="primary" type="submit">
                        Submit</Button>
                    
                    </form>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(NotifierDemo)
;
