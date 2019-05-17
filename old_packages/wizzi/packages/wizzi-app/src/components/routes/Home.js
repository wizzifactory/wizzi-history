/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\home.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const styles = theme => (
    {
        root: {
            width: '100%', 
            maxWidth: 500
        }
    });

class Home extends React.Component {
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={classes.root}>
                    <Typography variant="display4" gutterBottom>
                    Display 4</Typography>
                
                    <Typography variant="display3" gutterBottom>
                    Display 3</Typography>
                
                    <Typography variant="display2" gutterBottom>
                    Display 2</Typography>
                
                    <Typography variant="display1" gutterBottom>
                    Display 1</Typography>
                
                    <Typography variant="headline" gutterBottom>
                    Headline</Typography>
                
                    <Typography variant="title" gutterBottom>
                    Title</Typography>
                
                    <Typography variant="subheading" gutterBottom>
                    Subheading</Typography>
                
                    <Typography variant="body2" gutterBottom>
                    Body 2</Typography>
                
                    <Typography variant="body1" gutterBottom align="right">
                    Body 1</Typography>
                
                    <Typography variant="caption" gutterBottom align="center">
                    Caption</Typography>
                
                    <Typography gutterBottom noWrap>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                
                    <Typography variant="button" gutterBottom>
                    Button</Typography>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(Home)
;
