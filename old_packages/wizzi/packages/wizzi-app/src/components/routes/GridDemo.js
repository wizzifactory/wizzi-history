/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\griddemo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => (
    {
        root: {
            flexGrow: 1
        }, 
        paper: {
            padding: theme.spacing.unit * 2, 
            textAlign: 'center', 
            color: theme.palette.text.secondary
        }
    });

class GridDemo extends React.Component {
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                            xs=12</Paper>
                        
                        </Grid>
                    
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                            xs=6</Paper>
                        
                        </Grid>
                    
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                            xs=6</Paper>
                        
                        </Grid>
                    
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                            xs=3</Paper>
                        
                        </Grid>
                    
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                            xs=3</Paper>
                        
                        </Grid>
                    
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                            xs=3</Paper>
                        
                        </Grid>
                    
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                            xs=3</Paper>
                        
                        </Grid>
                    
                    </Grid>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(GridDemo)
;
