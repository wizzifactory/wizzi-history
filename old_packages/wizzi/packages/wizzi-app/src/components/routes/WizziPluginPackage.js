/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzipluginpackage.js.ittf
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
import Splitter from '../mui/Splitter';
import {getPluginPackage, getPluginSchemas, getPluginArtifacts, getIttfDocument, getMTreeDebugInfo, generateDefaultArtifact, generateWfSchema, executeWfJob} from '../../store/actions';
import EditIcon from '@material-ui/icons/Edit';
import CollapseListItem from '../mui/CollapseListItem';
import CodeEditor from '../mui/CodeEditor';
import WizziMTreeDebugInfo from './WizziMTreeDebugInfo';
import Topic from './Topic';
import MyLink from '../mui/AppDrawerNavItem';
const title = 'Plugin sources';
const WF_ACTION = {
    MTREE_SCRIPT: 'MTREE_SCRIPT', 
    MTREE: 'MTREE', 
    GEN_ARTIFACT: 'GEN_ARTIFACT', 
    GEN_SCHEMA: 'GEN_SCHEMA', 
    EXEC_JOB: 'EXEC_JOB'
};
function test_fsitem_flat_to_tree() {
    var files = [
        'a.js', 
        'b/b.js', 
        'c/b/c.js'
    ];
    var tree = fsitem_flat_to_tree(files);
    console.log(JSON.stringify(tree, null, 2));
}
// returns node
// { item
// int kind
// oneOf 0,1
// string name
// string itemPath
// string schema
// boolean isFragment
// string hash
// [ children
function fsitem_flat_to_tree(flatItems, title) {
    var tree = {
        name: title, 
        children: [
            
        ]
    };
    var ss, cur, itemPath, hash, schema, isFragment;
    var i, i_items=flatItems, i_len=flatItems.length, item;
    for (i=0; i<i_len; i++) {
        item = flatItems[i];
        /**
            override these in $hook
            itemPath = itemhash = 0schema = ''isFragment = false*/
        itemPath = item.displayName;
        hash = item.hash;
        schema = item.schema;
        isFragment = item.isFragment;
        ss = itemPath.split('/');
        cur = tree;
        var j, j_items=ss, j_len=ss.length, s;
        for (j=0; j<j_len; j++) {
            s = ss[j];
            cur = fsitem_getCreateChild(cur, s, j < ss.length -1);
        }
        cur.itemPath = itemPath;
        if (cur.kind == 1) {
            cur.hash = hash;
            cur.schema = schema;
            cur.isFragment = isFragment;
        }
    }
    return tree;
}
function fsitem_getCreateChild(parent, name, isFolder) {
    var i, i_items=parent.children, i_len=parent.children.length, item;
    for (i=0; i<i_len; i++) {
        item = parent.children[i];
        if (item.name === name) {
            return item;
        }
    }
    var ret = {
        kind: isFolder ? 0 : 1, 
        name: name, 
        children: [
            
        ]
    };
    parent.children.push(ret);
    return ret;
}
const styles = theme => (
    {
        root: {
            height: '100%', 
            width: '100%'
        }, 
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

class WizziPluginPackageContainer extends React.Component {
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
        selectedPackage: null
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
            dispatchGetPluginPackage,
            dispatchGetPluginSchemas,
            dispatchGetPluginArtifacts
        } = this.props;
        if (pageInfo && pageInfo.title !== (this.props.match ? title + ': ' + this.props.match.params.packageName : title)) {
            pageInfo.setTitle(this.props.match ? title + ': ' + this.props.match.params.packageName : title);
        }
        console.log('***** WizziPluginPackage.didmount.match', match);
        const packageName = match.params.packageName;
        this.setState({
            selectedPackage: packageName
        });
        dispatchGetPluginPackage(packageName);
        dispatchGetPluginSchemas(packageName);
        dispatchGetPluginArtifacts(packageName);
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
    handleSplitter1Resize = (sizes) => {
        console.log('handleSplitter1Resize', sizes);
        this.setState({
            splitter1Sizes: sizes
        });
    }
    render() {
        const {
            classes,
            loadingError,
            match,
            pluginSchemas,
            pluginArtifacts,
            rootIttfDocuments,
            libIttfDocuments,
            metaIttfDocuments,
            tIttfDocuments,
            ittfDocument,
            generatedArtifact,
            mTreeScript,
            jobExecutionResult,
            jobExecutionError,
            schemaGenerationResult,
            schemaGenerationError
        } = this.props;
        const { mTreeDebugInfoOpen, lastDebugInfoAction } = this.state;
        console.log('lastDebugInfoAction', lastDebugInfoAction);
        if (!!(pluginSchemas) == false) {
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
        const { splitter1Sizes } = this.state;
        const { selectedPackage, selectedDocumenIsFragment, selectedDocumenSchema } = this.state;
        const schemas = Object.keys(pluginSchemas);
        const artifacts = Object.keys(pluginArtifacts);
        const rootIttfDocuments_tree = rootIttfDocuments ? fsitem_flat_to_tree(rootIttfDocuments, 'root') : {};
        const libIttfDocuments_tree = libIttfDocuments ? fsitem_flat_to_tree(libIttfDocuments, 'lib') : {};
        const metaIttfDocuments_tree = metaIttfDocuments ? fsitem_flat_to_tree(metaIttfDocuments, 'meta') : {};
        const tIttfDocuments_tree = tIttfDocuments ? fsitem_flat_to_tree(tIttfDocuments, 't') : {};
        return  (
                <div className={ classes.root }>
                    <WizziMTreeDebugInfo open={mTreeDebugInfoOpen} lastDebugInfoAction={lastDebugInfoAction} mTreeScript={mTreeScript} generatedArtifact={generatedArtifact} jobExecutionResult={jobExecutionResult} jobExecutionError={jobExecutionError} schemaGenerationResult={schemaGenerationResult} schemaGenerationError={schemaGenerationError} onClose={this.handleMTreeDebugInfoClose}>
                    </WizziMTreeDebugInfo>
                
                    <AppBar position="static" color="default">
                        <Paper>
                            <Toolbar>
                                <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                {
                                    selectedDocumenIsFragment == false &&  (
                                        <React.Fragment>
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleGenerateDefaultArtifact }>
                                                    generate</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleMTreeDebugInfo }>
                                                    script</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        
                                        </React.Fragment>
                                    )
                                    
                                }</Grid>
                            
                            </Toolbar>
                        
                        </Paper>
                    
                    </AppBar>
                
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
                                    <h4>
                                    Schemas
                                    </h4>
                                
                                    <List>
                                    {
                                        schemas.map((p, i) => {
                                            return  (
                                                    <MyLink key={i} to={`/wizzischemaeditor/${pluginSchemas[p].schemaId}`
                                                    } title={p}>
                                                    </MyLink>
                                                )
                                            ;
                                        })
                                    }</List>
                                
                                    <h4>
                                    Artifacts
                                    </h4>
                                
                                    <List>
                                    {
                                        artifacts.map((p, i) => {
                                            return  (
                                                    <MyLink key={i} to={`/wizziartifacteditor/${pluginArtifacts[p].artifactId}`
                                                    } title={p}>
                                                    </MyLink>
                                                )
                                            ;
                                        })
                                    }</List>
                                
                                    <h4>
                                    Common
                                    </h4>
                                
                                    <CollapseListItem item={rootIttfDocuments_tree} onSelect={this.handleSelectIttfDocumentByItem} onCreateFolder={() => {
                                    }} onCreateFile={() => {
                                    }} onDuplicate={() => {
                                    }} onRename={() => {
                                    }} onDelete={() => {
                                    }}>
                                    </CollapseListItem>
                                
                                    <CollapseListItem item={libIttfDocuments_tree} onSelect={this.handleSelectIttfDocumentByItem} onCreateFolder={() => {
                                    }} onCreateFile={() => {
                                    }} onDuplicate={() => {
                                    }} onRename={() => {
                                    }} onDelete={() => {
                                    }}>
                                    </CollapseListItem>
                                
                                    <CollapseListItem item={metaIttfDocuments_tree} onSelect={this.handleSelectIttfDocumentByItem} onCreateFolder={() => {
                                    }} onCreateFile={() => {
                                    }} onDuplicate={() => {
                                    }} onRename={() => {
                                    }} onDelete={() => {
                                    }}>
                                    </CollapseListItem>
                                
                                    <CollapseListItem item={tIttfDocuments_tree} onSelect={this.handleSelectIttfDocumentByItem} onCreateFolder={() => {
                                    }} onCreateFile={() => {
                                    }} onDuplicate={() => {
                                    }} onRename={() => {
                                    }} onDelete={() => {
                                    }}>
                                    </CollapseListItem>
                                
                                </div>
                            
                            </div>
                        
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                    <Paper>
                                        <Toolbar>
                                            <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                                <Grid item>
                                                    <Paper className={classes.buttonPaper}>
                                                        <Tooltip title="Edit" enterDelay={300}>
                                                            <IconButton color="inherit" onClick={ this.handleEditStart }>
                                                                <EditIcon color="action">
                                                                </EditIcon>
                                                            
                                                            </IconButton>
                                                        
                                                        </Tooltip>
                                                    
                                                    </Paper>
                                                
                                                </Grid>
                                            
                                            </Grid>
                                        
                                        </Toolbar>
                                    
                                    </Paper>
                                
                                </div>
                            
                                <div className={classes.split2_pane2}>
                                {
                                    ittfDocument &&  (
                                        <CodeEditor browse={true} value={ittfDocument} width={ splitter1Sizes.secondary - 30 } height={ splitter1Sizes.third - 64}>
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
const WizziPluginPackageStyled = withStyles(styles)(WizziPluginPackageContainer)
;
const WizziPluginPackageContexted = withPageInfo(WizziPluginPackageStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetPluginPackage: (packageName) => {
                console.log('dispatchGetPluginPackage', packageName);
                dispatch(getPluginPackage(packageName));
            }, 
            dispatchGetPluginSchemas: (packageName) => {
                console.log('dispatchGetPluginSchemas', packageName);
                dispatch(getPluginSchemas(packageName));
            }, 
            dispatchGetPluginArtifacts: (packageName) => {
                console.log('dispatchGetPluginArtifacts', packageName);
                dispatch(getPluginArtifacts(packageName));
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
            }
        };
};
const mapStateToProps = (state) => {
    return {
            loadingError: state.wizziPackages.loadingError, 
            generatePath: state.wizziPackages.generatePath, 
            generateWfJobPath: state.wizziPackages.generateWfJobPath, 
            pluginSchemas: state.wizziPackages.pluginSchemas, 
            pluginArtifacts: state.wizziPackages.pluginArtifacts, 
            rootIttfDocuments: state.wizziPackages.rootIttfDocuments, 
            libIttfDocuments: state.wizziPackages.libIttfDocuments, 
            metaIttfDocuments: state.wizziPackages.metaIttfDocuments, 
            tIttfDocuments: state.wizziPackages.tIttfDocuments, 
            ittfDocument: state.wizziIttf.ittfDocument, 
            mTreeScript: state.wizziIttf.mTreeScript, 
            generatedArtifact: state.wizziIttf.generatedArtifact, 
            jobExecutionResult: state.job.executionResult, 
            jobExecutionError: state.job.executionError, 
            schemaGenerationResult: state.schema.generationResult, 
            schemaGenerationError: state.schema.generationError, 
            schemas: state.commons.managedSchemas
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziPluginPackageContexted)
;
