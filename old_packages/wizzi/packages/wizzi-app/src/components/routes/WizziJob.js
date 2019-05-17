/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzijob.js.ittf
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
import { Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {getJobBatch, executeJobBatch} from '../../store/actions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { GithubIcon, GitCommit } from '../mui/Icons';
import CodeHighLight from '../mui/CodeHighLight';
import EventSourceView from '../mui/EventSourceView';
import OptionsDialog from './dialogs/OptionsDialog';
import ConfirmDialog from './dialogs/ConfirmDialog';
const title = 'Wizzi job';
function TabContainer(props) {
    return  (
            <Typography component="div">
            {props.children}</Typography>
        )
    ;
}
const createGitCommitData = (owner, props) => {
    return {
            title: 'Enter commit message', 
            options: [
                {
                    name: 'commitMessage', 
                    label: 'message', 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                alert(JSON.stringify(values, null, 2));
                if (values) {
                    owner.executeGitCommit(values.commitMessage);
                }
            }
        };
};
const styles = theme => (
    {});

class WizziJobContainer extends React.Component {
    state = {
        value: 0, 
        execUrl: null, 
        optionsDialogOpen: false, 
        optionsDialogTitle: "Options", 
        optionsDialogOptions: [], 
        optionsDialogHandler: () => {
        }, 
        confirmDialogOpen: false, 
        confirmDialogTitle: "Confirm ...", 
        confirmDialogNamedValues: null, 
        confirmDialogItems: null, 
        confirmDialogHandler: () => {
        }
    };
    componentDidUpdate(prevProps, prevState) {
        const {
            pageInfo
        } = this.props;
        if (pageInfo && pageInfo.title !== (this.props.match ? title + ': ' + this.props.match.params.packageName : title)) {
            pageInfo.setTitle(this.props.match ? title + ': ' + this.props.match.params.packageName : title);
        }
    }
    componentDidMount() {
        const {
            pageInfo,
            match,
            dispatchGetJobBatch
        } = this.props;
        if (pageInfo && pageInfo.title !== (this.props.match ? title + ': ' + this.props.match.params.packageName : title)) {
            pageInfo.setTitle(this.props.match ? title + ': ' + this.props.match.params.packageName : title);
        }
        dispatchGetJobBatch(match.params.hash, match.params.version, match.params.packageName);
    }
    executeGitCommit = (message) => {
        const {
            batch
        } = this.props;
        const depCount = batch.dependencies ? batch.dependencies.length : 0;
        this.setState({
            execUrl: '/api/jobs/batch/gitcommit?hash=' + batch.hash + '&message=' + message, 
            value: depCount + 1
        });
    }
    handleGitPush = () => {
        const {
            batch
        } = this.props;
        const depCount = batch.dependencies ? batch.dependencies.length : 0;
        this.setState({
            execUrl: '/api/jobs/batch/gitpush?hash=' + batch.hash, 
            value: depCount + 1
        });
    }
    handleExec = () => {
        const {
            batch
        } = this.props;
        const depCount = batch.dependencies ? batch.dependencies.length : 0;
        this.setState({
            execUrl: '/api/jobs/batch/exec?hash=' + batch.hash, 
            value: depCount + 1
        });
    }
    handleChange = (event, value) => {
        this.setState({
            value
        });
    }
    openOptionsDialog = (data) => {
        if (data) {
            this.setState({
                optionsDialogOpen: true, 
                optionsDialogTitle: data.title, 
                optionsDialogOptions: data.options, 
                optionsDialogHandler: data.handler
            });
        }
    }
    handleGitCommit = () => {
        this.openOptionsDialog(createGitCommitData(this, this.props));
    }
    render() {
        const {
            classes,
            match,
            batch,
            loadingError
        } = this.props;
        if (!!(batch) == false) {
            if (loadingError) {
                return  (
                        <div>
                            <h2>
                            Loading error
                            </h2>
                        
                            <pre>
                            {JSON.stringify(verify.replaceAll(loadingError, '\\n', '\n'), null, 2)}</pre>
                        
                        </div>
                    )
                ;
            }
            else {
                return  (
                        <h2>
                        Loading ...
                        </h2>
                    )
                ;
            }
        }
        const { value, execUrl } = this.state;
        return  (
                <div>
                    <h2>
                    Job {batch.label}
                    </h2>
                
                    <p>
                    cwd: {batch.cwd}
                    </p>
                
                    <p>
                    command: {batch.command}
                    </p>
                
                    <p>
                    argv0: {batch.argv0}
                    </p>
                
                    <OptionsDialog open={this.state.optionsDialogOpen} title={this.state.optionsDialogTitle} options={this.state.optionsDialogOptions} onClose={this.state.optionsDialogHandler}>
                    </OptionsDialog>
                
                    <ConfirmDialog open={this.state.confirmDialogOpen} title={this.state.confirmDialogTitle} namedValues={this.state.confirmDialogNamedValues} items={this.state.confirmDialogItems} onClose={this.state.confirmDialogHandler}>
                    </ConfirmDialog>
                
                    <Paper>
                        <Toolbar>
                            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleExec }>
                                        Exec</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                            {
                                batch.git && batch.git.commit &&  (
                                    <Grid item>
                                        <Paper className={classes.buttonPaper}>
                                            <Button className={classes.button} onClick={ this.handleGitCommit }>
                                            git Commit</Button>
                                        
                                        </Paper>
                                    
                                    </Grid>
                                )
                                
                            }{
                                batch.git && batch.git.push &&  (
                                    <Grid item>
                                        <Paper className={classes.buttonPaper}>
                                            <Button className={classes.button} onClick={ this.handleGitPush }>
                                            git Push</Button>
                                        
                                        </Paper>
                                    
                                    </Grid>
                                )
                                
                            }{
                                batch.git && batch.git.visitUrl &&  (
                                    <Tooltip title="GitHub repository" enterDelay={300}>
                                        <IconButton href={batch.git.visitUrl} component="a" color="inherit" aria-label="GitHub repository">
                                            <GithubIcon color="action">
                                            </GithubIcon>
                                        
                                        </IconButton>
                                    
                                    </Tooltip>
                                )
                                
                            }</Grid>
                        
                        </Toolbar>
                    
                    </Paper>
                
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label={batch.argv0}>
                            </Tab>
                        
                        {
                            batch.dependencies && batch.dependencies.length > 0 && batch.dependencies.map((p, i) => {
                                return  (
                                        <Tab key={i} label={p.name}>
                                        </Tab>
                                    )
                                ;
                            })
                        }<Tab label="result">
                            </Tab>
                        
                        </Tabs>
                    
                    </AppBar>
                
                {
                    value === 0 &&  (
                        <TabContainer>
                            <CodeHighLight codeSnippet={ batch.fileContent }>
                            </CodeHighLight>
                        
                        </TabContainer>
                    )
                    
                }{
                    batch.dependencies && batch.dependencies.length > 0 && batch.dependencies.map((p, i) => {
                        return  (
                                <div key={i}>
                                {
                                    value === i + 1 &&  (
                                        <TabContainer>
                                            <CodeHighLight codeSnippet={ p.fileContent }>
                                            </CodeHighLight>
                                        
                                        </TabContainer>
                                    )
                                    
                                }</div>
                            )
                        ;
                    })
                }{
                    value === batch.dependencies.length + 1 &&  (
                        <TabContainer>
                            <EventSourceView url={ execUrl }>
                            </EventSourceView>
                        
                        </TabContainer>
                    )
                    
                }</div>
            )
        ;
    }
    }
const WizziJobStyled = withStyles(styles)(WizziJobContainer)
;
const WizziJobContexted = withPageInfo(WizziJobStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetJobBatch: (hash, version, xpackage) => {
                console.log('dispatchGetJobBatch', hash, version, xpackage, null);
                dispatch(getJobBatch(hash, version, xpackage));
            }, 
            /**
                @dispatchGetJobBatch(
                    (hash) => {
                        console.log('dispatchGetJobBatch');
                        dispatch(getJobBatch(hash));
                    })
            */
            
        };
};
const mapStateToProps = (state) => {
    return {
            batch: state.job.batch, 
            loadingError: state.job.loadingError
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziJobContexted)
;
