/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzisnippet.js.ittf
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
import EditIcon from '@material-ui/icons/Edit';
import CollapseListItem from '../mui/CollapseListItem';
import CodeEditor from '../mui/CodeEditor';
import WizziMTreeDebugInfo from './WizziMTreeDebugInfo';
import Splitter from '../mui/Splitter';
import OptionsDialog from './dialogs/OptionsDialog';
import ConfirmDialog from './dialogs/ConfirmDialog';
import {getJobGist, wizzifySnippet, transpileSnippet, getSnippetAst, flowSnippet, lintSnippet, prettierSnippet, getIttfDocument, getMTreeDebugInfo, generateDefaultArtifact, generateWfSchema, executeWfJob, createJobGist, updateJobGist, changedJobGist, renameJobGist, duplicateJobGist, deleteJobGist, clearJobNavigations} from '../../store/actions';
import CodeHighLight from '../mui/CodeHighLight';
import EventSourceView from '../mui/EventSourceView';
const title = 'Code snippet';
const createJobSnippetData = (owner, props) => {
    const {selectedGistKind} = owner.state;
    return {
            title: 'Create snippet', 
            options: [
                {
                    name: 'snippetName', 
                    label: 'name', 
                    notEmpty: true
                }, 
                {
                    name: 'snippetSchema', 
                    label: 'schema'
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                // _ alert(JSON.stringify(values, null, 2))
                if (values) {
                    props.dispatchCreateJobGist(selectedGistKind, values.snippetName, values.snippetSchema, '');
                }
            }
        };
};
const duplicateJobSnippetData = (owner, props, hash, basename) => {
    return {
            title: 'Duplicate snippet ' + basename, 
            options: [
                {
                    name: 'itemName', 
                    label: 'New name', 
                    value: basename, 
                    mustChange: true, 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                // _ alert(JSON.stringify(values, null, 2))
                if (values) {
                    props.dispatchDuplicateJobGist(hash, values.itemName);
                }
            }
        };
};
const renameJobSnippetData = (owner, props, hash, basename) => {
    return {
            title: 'Rename snippet ' + basename, 
            options: [
                {
                    name: 'itemName', 
                    label: 'New name', 
                    value: basename, 
                    mustChange: true, 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                // _ alert(JSON.stringify(values, null, 2))
                if (values) {
                    props.dispatchRenameJobGist(hash, values.itemName);
                }
            }
        };
};
const confirmDeleteJobSnippetData = (owner, props, hash, basename) => {
    return {
            title: 'Confirm snippet deletion', 
            namedValues: [
                {
                    label: 'basename', 
                    value: basename
                }
            ], 
            handler: (ok) => {
                owner.setState({
                    confirmDialogOpen: false
                });
                if (ok) {
                    props.dispatchDeleteJobGist(hash);
                }
            }
        };
};
const WF_ACTION = {
    MTREE_SCRIPT: 'MTREE_SCRIPT', 
    MTREE: 'MTREE', 
    GEN_ARTIFACT: 'GEN_ARTIFACT', 
    GEN_SCHEMA: 'GEN_SCHEMA', 
    EXEC_JOB: 'EXEC_JOB'
};
const styles = theme => (
    {
        grow: {
            flex: '1 1 auto'
        }, 
        title: {
            marginLeft: 24, 
            flex: '0 1 auto'
        }, 
        appBar: {
            transition: theme.transitions.create('width'), 
            '@media print': {
                position: 'absolute'
            }
        }, 
        appBarShift: {
            [theme.breakpoints.up('lg')]: {
                width: 'calc(100% - 240px)'
            }
        }, 
        drawer: {
            [theme.breakpoints.up('lg')]: {
                width: 240
            }
        }, 
        barHead: {
            marginLeft: '15px'
        }, 
        content: {
            display: 'flex', 
            width: '100%', 
            height: '85%', 
            margin: '10px 0'
        }, 
        column1: {
            flex: '0 1 400px', 
            padding: '20px', 
            height: '100%', 
            overflow: 'auto'
        }, 
        column2: {
            flex: '1', 
            height: '100%', 
            overflow: 'auto'
        }, 
        split2_wrapper: {
            width: '100%', 
            height: '75vh', 
            backgroundColor: '#1d1f20', 
            display: 'flex', 
            flexDirection: 'column', 
            margin: '10px 0'
        }, 
        editorbox: {
            margin: '.5vw .5vw', 
            flex: '1 auto', 
            display: 'flex', 
            height: '100%', 
            flexDirection: 'column'
        }, 
        editorHead: {
            margin: '4px', 
            backgroundColor: '#0a0a0a', 
            height: '64px', 
            width: '100%'
        }, 
        split2_pane1: {
            margin: '10px 5px', 
            height: '100%', 
            overflow: 'auto'
        }, 
        split2_pane2: {
            margin: '10px 5px', 
            height: '100%', 
            overflow: 'auto'
        }
    });

class WizziSnippetContainer extends React.Component {
    state = {
        selectedSchema: null, 
        selectedDocumentHash: null, 
        selectedDocumenSchema: null, 
        selectedDocumenIsFragment: null, 
        mTreeDebugInfoOpen: false, 
        lastDebugInfoAction: null, 
        splitter1Sizes: {
            primary: 500, 
            secondary: 500
        }, 
        execUrl: null, 
        execUrlCounter: 1, 
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
        if (pageInfo && pageInfo.title !== (this.props.snippet ? title + ': ' + this.props.snippet.basename : title)) {
            pageInfo.setTitle(this.props.snippet ? title + ': ' + this.props.snippet.basename : title);
        }
    }
    componentDidMount() {
        const {
            pageInfo,
            match,
            dispatchGetJobGist
        } = this.props;
        if (pageInfo && pageInfo.title !== (this.props.snippet ? title + ': ' + this.props.snippet.basename : title)) {
            pageInfo.setTitle(this.props.snippet ? title + ': ' + this.props.snippet.basename : title);
        }
        dispatchGetJobGist(match.params.hash);
    }
    handleSplitter1Resize = (sizes) => {
        console.log('handleSplitter1Resize', sizes);
        this.setState({
            splitter1Sizes: sizes
        });
    }
    handleSnippetChange = (value) => {
        const {
            snippet,
            dispatchUpdateJobGist
        } = this.props;
        dispatchUpdateJobGist(snippet.hash, value);
    }
    handleExec = () => {
        const {
            snippet
        } = this.props;
        const {execUrlCounter} = this.state;
        this.setState({
            execUrl: '/api/jobs/gistexec?hash=' + snippet.hash + '&eventstream=true&counter=' + execUrlCounter, 
            execUrlCounter: execUrlCounter + 1
        });
    }
    handleWizzifySnippet = () => {
        const {
            snippet,
            dispatchWizzifySnippet
        } = this.props;
        dispatchWizzifySnippet(snippet.hash);
        this.setState({
            execUrl: null
        });
    }
    handleTranspileSnippet = () => {
        const {
            snippet,
            dispatchTranspileSnippet
        } = this.props;
        const {execUrlCounter} = this.state;
        this.setState({
            execUrl: '/api/build/transpile?hash=' + snippet.hash + '&eventstream=true&counter=' + execUrlCounter, 
            execUrlCounter: execUrlCounter + 1
        });
        /**
            dispatchTranspileSnippet(snippet.hash)*/
    }
    handleGetSnippetAst = () => {
        const {
            snippet,
            dispatchGetSnippetAst
        } = this.props;
        const {execUrlCounter} = this.state;
        this.setState({
            execUrl: '/api/build/ast?hash=' + snippet.hash + '&eventstream=true&counter=' + execUrlCounter, 
            execUrlCounter: execUrlCounter + 1
        });
        /**
            dispatchGetSnippetAst(snippet.hash)*/
    }
    handleFlowSnippet = () => {
        const {
            snippet,
            dispatchFlowSnippet
        } = this.props;
        const {execUrlCounter} = this.state;
        this.setState({
            execUrl: '/api/build/flow?hash=' + snippet.hash + '&eventstream=true&counter=' + execUrlCounter, 
            execUrlCounter: execUrlCounter + 1
        });
        /**
            dispatchFlowSnippet(snippet.hash)*/
    }
    handlePrettierSnippet = () => {
        const {
            snippet,
            dispatchPrettierSnippet
        } = this.props;
        const {execUrlCounter} = this.state;
        this.setState({
            execUrl: '/api/build/prettier?hash=' + snippet.hash + '&eventstream=true&counter=' + execUrlCounter, 
            execUrlCounter: execUrlCounter + 1
        });
        /**
            dispatchPrettierSnippet(snippet.hash)*/
    }
    handleEslintSnippet = () => {
        const {
            snippet,
            dispatchEslintSnippet
        } = this.props;
        const {execUrlCounter} = this.state;
        this.setState({
            execUrl: '/api/build/eslint?hash=' + snippet.hash + '&eventstream=true&counter=' + execUrlCounter, 
            execUrlCounter: execUrlCounter + 1
        });
        /**
            dispatchEslintSnippet(snippet.hash)*/
    }
    handleSelectSchema = (e) => {
        this.setState({
            selectedSchema: e.target.value
        });
    }
    handleSelectIttfDocument = (hash, schema, isFragment) => {
        const {
            dispatchGetIttfDocument
        } = this.props;
        this.setState({
            selectedDocumentHash: hash, 
            selectedDocumenSchema: schema, 
            selectedDocumenIsFragment: isFragment
        });
        dispatchGetIttfDocument(hash);
    }
    handleSelectIttfDocumentByItem = (item) => {
        const {
            dispatchGetIttfDocument
        } = this.props;
        console.log('WizziKernelPackage.handleSelectIttfDocumentByItem.item', item);
        this.setState({
            selectedDocumentHash: item.hash, 
            selectedDocumenSchema: item.schema, 
            selectedDocumenIsFragment: item.isFragment
        });
        dispatchGetIttfDocument(item.hash);
    }
    handleMTreeDebugInfo = () => {
        const {
            dispatchGetMTreeDebugInfo
        } = this.props;
        if (this.state.selectedDocumentHash || this.props.selectedDocumentHash) {
            dispatchGetMTreeDebugInfo(this.state.selectedDocumentHash || this.props.selectedDocumentHash);
            this.setState({
                mTreeDebugInfoOpen: true, 
                lastDebugInfoAction: WF_ACTION.MTREE_SCRIPT
            });
        }
    }
    handleGenerateDefaultArtifact = () => {
        const {
            dispatchGenerateDefaultArtifact
        } = this.props;
        if (this.state.selectedDocumentHash || this.props.selectedDocumentHash) {
            dispatchGenerateDefaultArtifact(this.state.selectedDocumentHash || this.props.selectedDocumentHash);
            this.setState({
                mTreeDebugInfoOpen: true, 
                lastDebugInfoAction: WF_ACTION.GEN_ARTIFACT
            });
        }
    }
    handleExecuteWfJob = () => {
        const {
            dispatchExecuteWfJob
        } = this.props;
        if (this.state.selectedDocumentHash || this.props.selectedDocumentHash) {
            dispatchExecuteWfJob(this.state.selectedDocumentHash || this.props.selectedDocumentHash);
            this.setState({
                mTreeDebugInfoOpen: true, 
                lastDebugInfoAction: WF_ACTION.EXEC_JOB
            });
        }
    }
    handleGenerateWfSchema = () => {
        const {
            dispatchGenerateWfSchema
        } = this.props;
        if (this.state.selectedDocumentHash || this.props.selectedDocumentHash) {
            dispatchGenerateWfSchema(this.state.selectedDocumentHash || this.props.selectedDocumentHash);
            this.setState({
                mTreeDebugInfoOpen: true, 
                lastDebugInfoAction: WF_ACTION.GEN_SCHEMA
            });
        }
    }
    handleMTreeDebugInfoClose = () => {
        this.setState({
            mTreeDebugInfoOpen: false
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
    openConfirmDialog = (data) => {
        if (data) {
            this.setState({
                confirmDialogOpen: true, 
                confirmDialogTitle: data.title, 
                confirmDialogNamedValues: data.namedValues, 
                confirmDialogItems: data.items, 
                confirmDialogHandler: data.handler
            });
        }
    }
    handleCreateJobSnippet = () => {
        this.openOptionsDialog(createJobSnippetData(this, this.props));
    }
    handleDuplicateJobSnippet = (hash, basename) => {
        this.openOptionsDialog(duplicateJobSnippetData(this, this.props, hash, basename));
    }
    handleRenameJobSnippet = (hash, basename) => {
        this.openOptionsDialog(renameJobSnippetData(this, this.props, hash, basename));
    }
    handleDeleteJobSnippet = (hash, basename) => {
        this.openConfirmDialog(confirmDeleteJobSnippetData(this, this.props, hash, basename));
    }
    render() {
        const {
            classes,
            loadingError,
            match,
            snippet,
            wizzified,
            ittfDocument,
            generatedArtifact,
            mTreeScript,
            jobExecutionResult,
            jobExecutionError,
            schemaGenerationResult,
            schemaGenerationError
        } = this.props;
        if (!!(snippet) == false) {
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
        const { mTreeDebugInfoOpen, lastDebugInfoAction } = this.state;
        console.log('lastDebugInfoAction', lastDebugInfoAction);
        const { splitter1Sizes } = this.state;
        const { execUrl } = this.state;
        return  (
                <div>
                    <OptionsDialog open={this.state.optionsDialogOpen} title={this.state.optionsDialogTitle} options={this.state.optionsDialogOptions} onClose={this.state.optionsDialogHandler}>
                    </OptionsDialog>
                
                    <ConfirmDialog open={this.state.confirmDialogOpen} title={this.state.confirmDialogTitle} namedValues={this.state.confirmDialogNamedValues} items={this.state.confirmDialogItems} onClose={this.state.confirmDialogHandler}>
                    </ConfirmDialog>
                
                    <WizziMTreeDebugInfo open={mTreeDebugInfoOpen} lastDebugInfoAction={lastDebugInfoAction} mTreeScript={mTreeScript} generatedArtifact={generatedArtifact} jobExecutionResult={jobExecutionResult} jobExecutionError={jobExecutionError} schemaGenerationResult={schemaGenerationResult} schemaGenerationError={schemaGenerationError} onClose={this.handleMTreeDebugInfoClose}>
                    </WizziMTreeDebugInfo>
                
                    <Paper>
                        <Toolbar>
                            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleExec }>
                                        Exec</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleWizzifySnippet }>
                                        wizzify</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleTranspileSnippet }>
                                        transpile</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleGetSnippetAst }>
                                        ast</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleFlowSnippet }>
                                        flow</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handlePrettierSnippet }>
                                        prettier</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                                <Grid item>
                                    <Paper className={classes.buttonPaper}>
                                        <Button className={classes.button} onClick={ this.handleEslintSnippet }>
                                        lint</Button>
                                    
                                    </Paper>
                                
                                </Grid>
                            
                            </Grid>
                        
                        </Toolbar>
                    
                    </Paper>
                
                    <div className={classes.split2_wrapper}>
                        <Splitter split="vertical" secondaryInitialSize={ 700 } primaryMinSize={200} secondaryMinSize={700} onResize={ this.handleSplitter1Resize }>
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                    <Paper>
                                        <Toolbar>
                                            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                            </Grid>
                                        
                                        </Toolbar>
                                    
                                    </Paper>
                                
                                </div>
                            
                                <div className={classes.split2_pane1}>
                                    <CodeEditor language={ 'js' } value={ snippet.content } onChange={ this.handleSnippetChange }>
                                    </CodeEditor>
                                
                                </div>
                            
                            </div>
                        
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                    <Paper>
                                        <Toolbar>
                                            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                            </Grid>
                                        
                                        </Toolbar>
                                    
                                    </Paper>
                                
                                </div>
                            
                                <div className={classes.split2_pane2}>
                                {
                                    execUrl || !wizzified ? ( (
                                        <EventSourceView url={ execUrl }>
                                        </EventSourceView>
                                    )
                                    ) :  (
                                            <CodeEditor language={ 'js' } value={ wizzified }>
                                            </CodeEditor>
                                        )
                                    
                                }</div>
                            
                            </div>
                        
                        </Splitter>
                    
                    </div>
                
                </div>
            )
        ;
    }
    }
const WizziSnippetStyled = withStyles(styles)(WizziSnippetContainer)
;
const WizziSnippetContexted = withPageInfo(WizziSnippetStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetJobGist: (hash) => {
                console.log('dispatchGetJobGist', hash, null, null, null);
                dispatch(getJobGist(hash));
            }, 
            dispatchWizzifySnippet: (hash) => {
                console.log('dispatchWizzifySnippet', hash, null, null, null);
                dispatch(wizzifySnippet(hash));
            }, 
            dispatchTranspileSnippet: (hash) => {
                console.log('dispatchTranspileSnippet', hash, null, null, null);
                dispatch(transpileSnippet(hash));
            }, 
            dispatchGetSnippetAst: (hash) => {
                console.log('dispatchGetSnippetAst', hash, null, null, null);
                dispatch(getSnippetAst(hash));
            }, 
            dispatchFlowSnippet: (hash) => {
                console.log('dispatchFlowSnippet', hash, null, null, null);
                dispatch(flowSnippet(hash));
            }, 
            dispatchLintSnippet: (hash) => {
                console.log('dispatchLintSnippet', hash, null, null, null);
                dispatch(lintSnippet(hash));
            }, 
            dispatchPrettierSnippet: (hash) => {
                console.log('dispatchPrettierSnippet', hash, null, null, null);
                dispatch(prettierSnippet(hash));
            }, 
            dispatchUpdateJobGist: (hash, newcontent) => {
                console.log('dispatchUpdateJobGist', hash);
                dispatch(updateJobGist(hash, newcontent));
                dispatch(changedJobGist(newcontent));
            }, 
            dispatchGetIttfDocument: (hash) => {
                console.log('dispatchGetIttfDocument', hash);
                dispatch(getIttfDocument(hash));
            }, 
            dispatchGetMTreeDebugInfo: (hash) => {
                console.log('dispatchGetMTreeDebugInfo', hash);
                dispatch(getMTreeDebugInfo(hash));
            }, 
            dispatchGenerateDefaultArtifact: (hash) => {
                console.log('dispatchGenerateDefaultArtifact', hash);
                dispatch(generateDefaultArtifact(hash));
            }, 
            dispatchGenerateWfSchema: (hash) => {
                console.log('dispatchGenerateWfSchema', hash);
                dispatch(generateWfSchema(hash));
            }, 
            dispatchExecuteWfJob: (hash) => {
                console.log('dispatchExecuteWfJob', hash);
                dispatch(executeWfJob(hash));
            }, 
            dispatchCreateJobGist: (kind, name, schema, content) => {
                console.log('dispatchCreateJobGist', name, schema, content);
                dispatch(createJobGist(kind, name, schema, content));
            }, 
            dispatchDuplicateJobGist: (hash, newName) => {
                console.log('dispatchDuplicateJobGist', hash, newName);
                dispatch(duplicateJobGist(hash, newName));
            }, 
            dispatchRenameJobGist: (hash, newName) => {
                console.log('dispatchRenameJobGist', hash, newName);
                dispatch(renameJobGist(hash, newName));
            }, 
            dispatchDeleteJobGist: (hash) => {
                console.log('dispatchDeleteJobGist', hash);
                dispatch(deleteJobGist(hash));
            }, 
            dispatchClearJobNavigations: () => {
                console.log('dispatchClearJobNavigations', null, null, null, null);
                dispatch(clearJobNavigations());
            }
        };
};
const mapStateToProps = (state) => {
    return {
            ittfDocument: state.wizziIttf.ittfDocument, 
            mTreeScript: state.wizziIttf.mTreeScript, 
            generatedArtifact: state.wizziIttf.generatedArtifact, 
            jobExecutionResult: state.job.executionResult, 
            jobExecutionError: state.job.executionError, 
            schemaGenerationResult: state.schema.generationResult, 
            schemaGenerationError: state.schema.generationError, 
            schemas: state.commons.managedSchemas, 
            loadingError: state.job.loadingError, 
            snippet: state.job.snippet, 
            wizzified: state.job.wizzified, 
            selectedDocumentHash: state.job.snippet ? state.job.snippet.hash : null
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziSnippetContexted)
;
