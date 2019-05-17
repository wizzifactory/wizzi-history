/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzijobs.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withPageInfo } from '../../utils/withPageInfo';
import verify from '../../lib/verify';
import {getJobBatches, createJobGist, updateJobGist, changedJobGist, renameJobGist, duplicateJobGist, deleteJobGist, clearJobNavigations} from '../../store/actions';
import { Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import MyLink from '../mui/AppDrawerNavItem';
import OptionsDialog from './dialogs/OptionsDialog';
import ConfirmDialog from './dialogs/ConfirmDialog';
const title = 'Wizzi jobs';
const styles = theme => (
    {
        root: {
            flexGrow: 1
        }, 
        barHead: {
            marginLeft: '15px'
        }, 
        column: {
            float: 'left', 
            padding: '20px'
        }
    });

class WizziJobsContainer extends React.Component {
    state = {
        selectJob: null
    };
    componentDidMount() {
        const {
            dispatchGetJobBatches
        } = this.props;
        dispatchGetJobBatches();
    }
    render() {
        const {
            classes,
            match,
            batches
        } = this.props;
        const appbarTitle = this.state.selectJobName ? 'Wizzi ' + this.state.selectJobName + ' job ' : 'Wizzi jobs';
        return  (
                <div className={ classes.root }>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="subheading" color="inherit">
                            {appbarTitle}</Typography>
                        
                            <Typography className={classes.barHead} variant="headline" color="inherit">
                            {this.state.selectJobName}</Typography>
                        
                        </Toolbar>
                    
                    </AppBar>
                
                    <div className={ classes.column }>
                        <List>
                        {
                            batches.map((p, i) => {
                                return  (
                                        <div key={i}>
                                            <h3>
                                            {p.name}
                                            </h3>
                                        
                                        {
                                            p.items.map((job, j) => {
                                                return  (
                                                        <MyLink key={j} title={job.label} to={`/wizzijob/${match.params.userId}/${job.hash}`
                                                        }>
                                                        </MyLink>
                                                    )
                                                ;
                                            })
                                        }</div>
                                    )
                                ;
                            })
                        }</List>
                    
                    </div>
                
                </div>
            )
        ;
    }
    }
const WizziJobsStyled = withStyles(styles)(WizziJobsContainer)
;
const WizziJobsContexted = withPageInfo(WizziJobsStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetJobBatches: (userId) => {
                console.log('dispatchGetJobBatches');
                dispatch(getJobBatches(userId));
            }
        };
};
const mapStateToProps = (state) => {
    return {
            batches: state.job.batches
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziJobsContexted)
;
