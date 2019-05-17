/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzimtreedebuginfo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CodeHighLight from '../mui/CodeHighLight';
const WF_ACTION = {
    MTREE_SCRIPT: 'MTREE_SCRIPT', 
    MTREE: 'MTREE', 
    GEN_ARTIFACT: 'GEN_ARTIFACT', 
    GEN_SCHEMA: 'GEN_SCHEMA', 
    EXEC_JOB: 'EXEC_JOB'
};
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

class WizziMTreeDebugInfo extends React.Component {
    state = {
        infoAction: null
    };
    componentDidMount() {
        const {
            lastDebugInfoAction
        } = this.props;
        console.log('did-mount', lastDebugInfoAction);
        if (lastDebugInfoAction) {
            this.setState({
                infoAction: lastDebugInfoAction
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            lastDebugInfoAction
        } = this.props;
        console.log('did-update', lastDebugInfoAction);
        if (lastDebugInfoAction && lastDebugInfoAction !== prevProps.lastDebugInfoAction) {
            this.setState({
                infoAction: lastDebugInfoAction
            });
        }
    }
    handleMTreeScript = () => {
        this.setState({
            infoAction: WF_ACTION.MTREE_SCRIPT
        });
    }
    handleMTree = () => {
        this.setState({
            infoAction: WF_ACTION.MTREE
        });
    }
    handleGenerateArtifact = () => {
        this.setState({
            infoAction: WF_ACTION.GEN_ARTIFACT
        });
    }
    handleGenerateSchema = () => {
        this.setState({
            infoAction: WF_ACTION.GEN_SCHEMA
        });
    }
    handleExecuteJob = () => {
        this.setState({
            infoAction: WF_ACTION.EXEC_JOB
        });
    }
    render() {
        const {
            classes,
            open,
            mTreeScript,
            mTree,
            generatedArtifact,
            jobExecutionResult,
            jobExecutionError,
            schemaGenerationResult,
            schemaGenerationError,
            onClose
        } = this.props;
        // log 'WizziMTreeDebugInfo', 'mTreeScript', mTreeScript, 'mTree', mTree
        const {infoAction} = this.state;
        console.log('infoAction', 'infoAction', infoAction);
        return  (
                <div>
                    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Paper>
                                <Toolbar>
                                    <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                        <IconButton color="inherit" onClick={onClose} aria-label="Close">
                                            <CloseIcon>
                                            </CloseIcon>
                                        
                                        </IconButton>
                                    
                                    {
                                        mTreeScript &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleMTreeScript } disabled={ infoAction === WF_ACTION.MTREE_SCRIPT }>
                                                    mTree script</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }{
                                        mTree &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleMTree } disabled={ infoAction === WF_ACTION.MTREE }>
                                                    mTree</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }{
                                        generatedArtifact &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleGenerateArtifact } disabled={ infoAction === WF_ACTION.GEN_ARTIFACT }>
                                                    generated artifact</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }{
                                        (schemaGenerationResult || schemaGenerationError) &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleGenerateSchema } disabled={ infoAction === WF_ACTION.GEN_SCHEMA }>
                                                    schema generation result</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }{
                                        (jobExecutionResult || jobExecutionError) &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleExecuteJob } disabled={ infoAction === WF_ACTION.EXEC_JOB }>
                                                    job result</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }</Grid>
                                
                                </Toolbar>
                            
                            </Paper>
                        
                        </AppBar>
                    
                    {
                        infoAction === WF_ACTION.MTREE_SCRIPT && mTreeScript &&  (
                            <Paper>
                                <CodeHighLight language={ 'js' } codeSnippet={ mTreeScript }>
                                </CodeHighLight>
                            
                            </Paper>
                        )
                        
                    }{
                        infoAction === WF_ACTION.MTREE && mTree &&  (
                            <Paper>
                                <CodeHighLight language={ 'js' } codeSnippet={ mTree }>
                                </CodeHighLight>
                            
                            </Paper>
                        )
                        
                    }{
                        infoAction === WF_ACTION.GEN_ARTIFACT && generatedArtifact &&  (
                            <Paper>
                                <CodeHighLight language={ 'js' } codeSnippet={ generatedArtifact }>
                                </CodeHighLight>
                            
                            </Paper>
                        )
                        
                    }{
                        infoAction === WF_ACTION.GEN_SCHEMA && (schemaGenerationResult || schemaGenerationError) &&  (
                            <Paper>
                                <CodeHighLight language={ 'js' } codeSnippet={ JSON.stringify(schemaGenerationResult || schemaGenerationError, null, 2) }>
                                </CodeHighLight>
                            
                            </Paper>
                        )
                        
                    }{
                        infoAction === WF_ACTION.EXEC_JOB && (jobExecutionResult || jobExecutionError) &&  (
                            <Paper>
                                <CodeHighLight language={ 'js' } codeSnippet={ JSON.stringify(jobExecutionResult || jobExecutionError, null, 2) }>
                                </CodeHighLight>
                            
                            </Paper>
                        )
                        
                    }</Dialog>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(WizziMTreeDebugInfo)
;
