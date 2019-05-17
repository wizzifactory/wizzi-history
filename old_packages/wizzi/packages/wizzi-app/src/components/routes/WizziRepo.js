/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzirepo.js.ittf
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
import {getRepoUser, getRepoProject, getRepoFolder, getRepoDocument, getIttfDocument, getMTreeDebugInfo, generateDefaultArtifact, generateWfSchema, executeWfJob, createRepoProject, createRepoFolder, createRepoDocument, updateRepoDocument, duplicateFsItem, renameFsItem, deleteRepoBatch, copyCutRepoFsItems, pasteRepoFsItems} from '../../store/actions';
import CreateIcon from '@material-ui/icons/Create';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { CreateFileIcon } from '../mui/Icons';
import MyLink from '../mui/FileSystemNavItem';
import CodeHighLight from '../mui/CodeHighLight';
import OptionsDialog from './dialogs/OptionsDialog';
import ConfirmDialog from './dialogs/ConfirmDialog';
import ContextMenu from './dialogs/ContextMenu';
import EditIcon from '@material-ui/icons/Edit';
import CollapseListItem from '../mui/CollapseListItem';
import CodeEditor from '../mui/CodeEditor';
import WizziMTreeDebugInfo from './WizziMTreeDebugInfo';
const title = 'Wizzi repo';
const WF_ACTION = {
    MTREE_SCRIPT: 'MTREE_SCRIPT', 
    MTREE: 'MTREE', 
    GEN_ARTIFACT: 'GEN_ARTIFACT', 
    GEN_SCHEMA: 'GEN_SCHEMA', 
    EXEC_JOB: 'EXEC_JOB'
};
const hasCheckeds = (owner) => {
    const {checkeds} = owner.state;
    for (var k in checkeds) {
        if (checkeds[k].checked) {
            return true;
        }
    }
    return false;
};
const getCurrentPath = (props) => {
    if (props.folderPath) {
        return props.match.params.userId + '/' + props.projectId + '/' + props.folderPath;
    }
    else if (props.projectId) {
        return props.match.params.userId + '/' + props.projectId;
    }
    else {
        return props.match.params.userId;
    }
};
const createProjectData = (owner, props) => {
    return {
            title: 'Create a new project', 
            options: [
                {
                    name: 'projectId', 
                    label: 'project name', 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                alert(JSON.stringify(values, null, 2));
                console.log(props.dispatchCreateRepoProject);
                if (values) {
                    props.dispatchCreateRepoProject(props.match.params.userId, values.projectId);
                }
            }
        };
};
const createFolderData = (owner, props) => {
    return {
            title: 'Create a new folder in ' + getCurrentPath(props), 
            options: [
                {
                    name: 'folderName', 
                    label: 'folder name', 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                alert(JSON.stringify(values, null, 2));
                if (values) {
                    props.dispatchCreateRepoFolder(props.match.params.userId, props.projectId, props.folderPath, values.folderName);
                }
            }
        };
};
const createDocumentData = (owner, props) => {
    return {
            title: 'Create a new document in ' + getCurrentPath(props), 
            options: [
                {
                    name: 'documentName', 
                    label: 'document name', 
                    notEmpty: true
                }, 
                {
                    name: 'schemaName', 
                    label: 'schema', 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                alert(JSON.stringify(values, null, 2));
                if (values) {
                    props.dispatchCreateRepoDocument(props.match.params.userId, props.projectId, props.folderPath, values.documentName + '.' + values.schemaName + '.ittf');
                }
            }
        };
};
const duplicateFsItemData = (owner, props, kind, fullPath, basename) => {
    const df = kind == 0 ? 'folder' : 'document';
    return {
            title: 'Duplicate ' + df  + ' ' + fullPath, 
            options: [
                {
                    name: 'itemName', 
                    label: 'Name of duplicated ' + df, 
                    value: basename, 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                alert(JSON.stringify(values, null, 2));
                if (values) {
                    props.dispatchDuplicateFsItem(kind, fullPath, values.itemName);
                }
            }
        };
};
const renameFsItemData = (owner, props, kind, fullPath, basename) => {
    const df = kind == 0 ? 'folder' : 'document';
    return {
            title: 'Rename ' + df  + ' ' + fullPath, 
            options: [
                {
                    name: 'itemName', 
                    label: 'New ' + df + ' name', 
                    value: basename, 
                    notEmpty: true
                }
            ], 
            handler: (values) => {
                owner.setState({
                    optionsDialogOpen: false
                });
                alert(JSON.stringify(values, null, 2));
                if (values) {
                    props.dispatchRenameFsItem(kind, fullPath, values.itemName);
                }
            }
        };
};
const getSelectedFsItemsData = (owner, props) => {
    const ret = {
        selectedItems: [
            
        ], 
        confirmItems: [
            
        ]
    };
    const { selectProjectId, checkeds } = owner.state;
    const { match } = props;
    const userId = match.params.userId;
    for (var k in checkeds) {
        if (checkeds[k].checked) {
            ret.selectedItems.push({
                userId: userId, 
                projectId: selectProjectId, 
                itemPath: k, 
                fullPath: userId + '/' + selectProjectId + '/' + k, 
                kind: checkeds[k].kind
            });
            ret.confirmItems.push(userId + '/' + selectProjectId + '/' + k);
        }
    }
    return ret;
};
const confirmDeleteFsItemsData = (owner, props) => {
    const fsitems = getSelectedFsItemsData(owner, props);
    if (fsitems.selectedItems.length == 0) {
        return null;
    }
    else {
        var confirmItems = [];
        var i, i_items=fsitems.selectedItems, i_len=fsitems.selectedItems.length, item;
        for (i=0; i<i_len; i++) {
            item = fsitems.selectedItems[i];
            confirmItems.push({
                type: (item.kind == 0 ? 'folder' : 'document'), 
                name: item.fullPath
            });
        }
        return {
                title: 'Confirm deletion', 
                items: confirmItems, 
                handler: (ok) => {
                    owner.setState({
                        confirmDialogOpen: false
                    });
                    if (ok) {
                        const { match, projectId, folderPath, copyCutType } = props;
                        const userId = match.params.userId;
                        props.dispatchDeleteBatch(userId, projectId, folderPath, fsitems.selectedItems);
                    }
                }
            };
    }
};
const confirmPasteFsItemsData = (owner, props) => {
    const selectedItems = props.copyCutSelectedItems;
    if (selectedItems.length == 0) {
        return null;
    }
    else {
        var confirmItems = [];
        var i, i_items=selectedItems, i_len=selectedItems.length, item;
        for (i=0; i<i_len; i++) {
            item = selectedItems[i];
            confirmItems.push({
                type: (item.kind == 0 ? 'folder' : 'document'), 
                name: item.fullPath
            });
        }
        return {
                title: 'Confirm paste', 
                items: confirmItems, 
                handler: (ok) => {
                    owner.setState({
                        confirmDialogOpen: false
                    });
                    if (ok) {
                        const { match, projectId, folderPath, copyCutType } = props;
                        const userId = match.params.userId;
                        props.dispatchPasteFsItems(copyCutType, userId, projectId, folderPath, selectedItems);
                    }
                }
            };
    }
};
const createFsItemContextMenu = (owner, props) => {
    return {
            dynMenuItems: [
                {
                    label: 'copy', 
                    onClick: () => {
                        alert('copy');
                        owner.handleContextMenuClose();
                    }
                }, 
                {
                    label: 'cut', 
                    onClick: () => {
                        alert('cut');
                        owner.handleContextMenuClose();
                    }
                }, 
                {
                    label: 'duplicate', 
                    onClick: () => {
                        alert('duplicate');
                        owner.handleContextMenuClose();
                    }
                }, 
                {
                    label: 'delete', 
                    onClick: () => {
                        alert('delete');
                        owner.handleContextMenuClose();
                    }
                }
            ]
        };
};
const styles = theme => (
    {
        root: {
            flexGrow: 1
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
        fsitems: {
            padding: '30px', 
            overflow: 'auto'
        }, 
        button: {
            margin: theme.spacing.unit
        }, 
        buttonPaper: {
            padding: theme.spacing.unit, 
            textAlign: 'center', 
            color: theme.palette.text.secondary
        }
    });

class WizziRepoContainer extends React.Component {
    state = {
        selectProjectId: null, 
        selectFolderId: null, 
        selectDocumentName: null, 
        mTreeDebugInfoOpen: false, 
        lastDebugInfoAction: null, 
        checkeds: {}, 
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
        }, 
        copyCutType: '', 
        copyCutSourcePath: '', 
        copyCutPending: false, 
        copyCutSelectedItems: [], 
        contextMenuAnchorEl: null, 
        contextMenuItems: []
    };
    componentDidMount() {
        const {
            pageInfo,
            match,
            dispatchGetRepoUser
        } = this.props;
        if (pageInfo && pageInfo.title !== (title)) {
            pageInfo.setTitle(title);
        }
        const userId = match.params.userId;
        dispatchGetRepoUser(userId);
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            pageInfo,
            copyCutPending
        } = this.props;
        if (pageInfo && pageInfo.title !== (title)) {
            pageInfo.setTitle(title);
        }
        if (this.getPath(this.props) != this.getPath(prevProps) && copyCutPending == false) {
            this.setState({
                checkeds: {
                    
                }
            });
            this.props.dispatchCancelCopyCutFsItems();
        }
    }
    getPath = (propsObject) => {
        const { match, projectId, folderPath } = propsObject;
        const userId = match.params.userId;
        if (verify.isNotEmpty(folderPath)) {
            return userId + '/' + projectId + '/' + folderPath;
        }
        else if (verify.isNotEmpty(projectId)) {
            return userId + '/' + projectId;
        }
        else {
            return userId;
        }
    }
    getCurrentPath = () => {
        return this.getPath(this.props);
    }
    handleSelectUser = () => {
        const {
            match,
            dispatchGetRepoUser
        } = this.props;
        const userId = match.params.userId;
        dispatchGetRepoUser(userId);
    }
    handleSelectProject = (projectId) => {
        const {
            match,
            dispatchGetRepoProject
        } = this.props;
        const userId = match.params.userId;
        this.setState({
            selectProjectId: projectId
        });
        dispatchGetRepoProject(userId, projectId);
    }
    handleSelectFolderOrDocument = (folderPath, kind) => {
        const {
            match,
            ittfDocument,
            generatedArtifact,
            mTreeScript,
            jobExecutionResult,
            jobExecutionError,
            schemaGenerationResult,
            schemaGenerationError,
            dispatchGetRepoFolder,
            dispatchGetRepoDocument
        } = this.props;
        const userId = match.params.userId;
        const { selectProjectId } = this.state;
        const { mTreeDebugInfoOpen, lastDebugInfoAction } = this.state;
        console.log('lastDebugInfoAction', lastDebugInfoAction);
        if (kind == 0) {
            dispatchGetRepoFolder(userId, selectProjectId, folderPath);
        }
        else {
            dispatchGetRepoDocument(userId, selectProjectId, folderPath);
        }
    }
    handleDocumentChange = (value) => {
        const {
            match,
            document,
            dispatchUpdateRepoDocument
        } = this.props;
        const userId = match.params.userId;
        const { selectProjectId } = this.state;
        dispatchUpdateRepoDocument(userId, selectProjectId, document.folderPath, value);
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
    handleCreateProject = () => {
        this.openOptionsDialog(createProjectData(this, this.props));
    }
    handleCreateFolder = () => {
        this.openOptionsDialog(createFolderData(this, this.props));
    }
    handleCreateDocument = () => {
        this.openOptionsDialog(createDocumentData(this, this.props));
    }
    handleDuplicateFsItem = (kind, fullPath, basename) => {
        this.openOptionsDialog(duplicateFsItemData(this, this.props, kind, fullPath, basename));
    }
    handleRenameFsItem = (kind, fullPath, basename) => {
        this.openOptionsDialog(renameFsItemData(this, this.props, kind, fullPath, basename));
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
    handleDeleteFsItems = () => {
        this.openConfirmDialog(confirmDeleteFsItemsData(this, this.props));
    }
    handleCopyFsItems = () => {
        this.props.dispatchCopyFsItems(this.getCurrentPath(), getSelectedFsItemsData(this, this.props).selectedItems
        );
    }
    handleCutFsItems = () => {
        this.props.dispatchCutFsItems(this.getCurrentPath(), getSelectedFsItemsData(this, this.props).selectedItems
        );
    }
    handlePasteFsItems = () => {
        this.openConfirmDialog(confirmPasteFsItemsData(this, this.props));
    }
    openContextMenu = (anchorEl, data) => {
        this.setState({
            contextMenuAnchorEl: anchorEl, 
            contextMenuItems: data.dynMenuItems
        });
    }
    handleFsItemContextMenuOpen = (event) => {
        event.preventDefault();
        this.openContextMenu(event.currentTarget, createFsItemContextMenu(this, this.props));
    }
    handleContextMenuClose = () => {
        this.setState({
            contextMenuAnchorEl: null
        });
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
    handleCheckFolderOrDocument = (folderPath, kind) => {
        const {
            copyCutPending,
            copyCutSourcePath
        } = this.props;
        var {checkeds} = this.state;
        // if a copy/cut is active on a different path cancel the copy/cut and reset checkeds
        if (copyCutPending && copyCutSourcePath != this.getCurrentPath()) {
            checkeds = {};
            this.props.dispatchCancelCopyCutFsItems();
        }
        var checked = checkeds[folderPath];
        if (!checked) {
            checked = {
                kind: kind, 
                checked: true
            };
        }
        else {
            checked.checked = !checked.checked;
        }
        checkeds[folderPath] = checked;
        this.setState({
            checkeds: checkeds
        });
    }
    render() {
        const {
            classes,
            match,
            projectId,
            folderPath,
            items,
            document,
            ittfDocument,
            generatedArtifact,
            mTreeScript,
            jobExecutionResult,
            jobExecutionError,
            schemaGenerationResult,
            schemaGenerationError,
            copyCutPending,
            copyCutType,
            copyCutSourcePath
        } = this.props;
        const userId = match.params.userId;
        const {checkeds} = this.state;
        const { mTreeDebugInfoOpen, lastDebugInfoAction } = this.state;
        console.log('lastDebugInfoAction', lastDebugInfoAction);
        var BreadCrumbUser = () => (
                <Button onClick={this.handleSelectUser}>
                { userId }</Button>
            );
        var BreadCrumbProject = () => {
            return projectId ?  (
                        <React.Fragment>
                            <span>
                            /
                            </span>
                        
                            <Button onClick={() => {
                                this.handleSelectProject(projectId)}}>
                            { projectId }</Button>
                        
                        </React.Fragment>
                    )
                 :  (
                        <span>
                        </span>
                    )
            ;
        };
        var BreadCrumbFolder = () => {
            if (folderPath) {
                var ss = folderPath.split('/'),
                    partFolderPath = [];
                const folderParts = [];
                var i, i_items=ss, i_len=ss.length, s;
                for (i=0; i<i_len; i++) {
                    s = ss[i];
                    partFolderPath.push(s);
                    folderParts.push({
                        name: s, 
                        path: partFolderPath.join('/')
                    });
                }
                return  (
                        <React.Fragment>
                        {
                            folderParts.map((p, i) => {
                                if (i < folderParts.length - 1) {
                                    return  (
                                            <span key={i}>
                                                <span>
                                                /
                                                </span>
                                            
                                                <Button onClick={() => {
                                                    this.handleSelectFolderOrDocument(p.path, 0);
                                                }}>
                                                {p.name}</Button>
                                            
                                            </span>
                                        )
                                    ;
                                }
                                else {
                                    return  (
                                            <span key={i}>
                                                <span>
                                                /
                                                </span>
                                            
                                                <Button>
                                                {p.name}</Button>
                                            
                                            </span>
                                        )
                                    ;
                                }
                            })
                        }</React.Fragment>
                    )
                ;
            }
            else {
                return  (
                        <span>
                        </span>
                    )
                ;
            }
        };
        var BreadCrumbs = () => (
                <div>
                    <BreadCrumbUser>
                    </BreadCrumbUser>
                
                    <BreadCrumbProject>
                    </BreadCrumbProject>
                
                    <BreadCrumbFolder>
                    </BreadCrumbFolder>
                
                </div>
            );
        var MainContent = () => {
            if (document) {
                return  (
                        <div className={classes.fsitems}>
                            <BreadCrumbs>
                            </BreadCrumbs>
                        
                            <WizziMTreeDebugInfo open={mTreeDebugInfoOpen} lastDebugInfoAction={lastDebugInfoAction} mTreeScript={mTreeScript} generatedArtifact={generatedArtifact} jobExecutionResult={jobExecutionResult} jobExecutionError={jobExecutionError} schemaGenerationResult={schemaGenerationResult} schemaGenerationError={schemaGenerationError} onClose={this.handleMTreeDebugInfoClose}>
                            </WizziMTreeDebugInfo>
                        
                            <Paper>
                                <Toolbar>
                                    <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                        <Grid item>
                                            <Paper className={classes.buttonPaper}>
                                                <Button className={classes.button} onClick={ this.handleEditDocument }>
                                                Edit</Button>
                                            
                                            </Paper>
                                        
                                        </Grid>
                                    
                                    {
                                        document.isIttfDocument && document.isFragment == false &&  (
                                            <React.Fragment>
                                                <Grid item>
                                                    <Paper className={classes.buttonPaper}>
                                                        <Button className={classes.button} onClick={ this.handleMTreeDebugInfo }>
                                                        mTree script</Button>
                                                    
                                                    </Paper>
                                                
                                                </Grid>
                                            
                                                <Grid item>
                                                    <Paper className={classes.buttonPaper}>
                                                        <Button className={classes.button} onClick={ this.handleGenerateDefaultArtifact }>
                                                        Generate artifact</Button>
                                                    
                                                    </Paper>
                                                
                                                </Grid>
                                            
                                            </React.Fragment>
                                        )
                                        
                                    }{
                                        document.isIttfDocument && document.schema === 'wfschema' &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleGenerateWfSchema }>
                                                    Generate schema</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }{
                                        document.isIttfDocument && document.schema === 'wfjob' &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleExecuteWfJob }>
                                                    Execute job</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }</Grid>
                                
                                </Toolbar>
                            
                            </Paper>
                        
                            <CodeEditor language={ 'js' } value={ document.content } onChange={ this.handleDocumentChange }>
                            </CodeEditor>
                        
                            <pre>
                            { JSON.stringify(document, null, 2) }</pre>
                        
                        </div>
                    )
                ;
            }
            else if (projectId && items) {
                return  (
                        <div className={classes.fsitems}>
                            <BreadCrumbs>
                            </BreadCrumbs>
                        
                        {
                            copyCutPending &&  (
                                <Typography variant="title" color="inherit">
                                { copyCutType + ' from ' + copyCutSourcePath }</Typography>
                            )
                            
                        }<Paper>
                                <Toolbar>
                                    <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                        <Grid item>
                                            <Paper className={classes.buttonPaper}>
                                                <Tooltip title="Create folder">
                                                    <Button onClick={ this.handleCreateFolder }>
                                                        <CreateNewFolderIcon>
                                                        </CreateNewFolderIcon>
                                                    
                                                    </Button>
                                                
                                                </Tooltip>
                                            
                                            </Paper>
                                        
                                        </Grid>
                                    
                                        <Grid item>
                                            <Paper className={classes.buttonPaper}>
                                                <Tooltip title="Create document">
                                                    <Button onClick={ this.handleCreateDocument }>
                                                        <CreateFileIcon>
                                                        </CreateFileIcon>
                                                    
                                                    </Button>
                                                
                                                </Tooltip>
                                            
                                            </Paper>
                                        
                                        </Grid>
                                    
                                    {
                                        hasCheckeds(this) &&  (
                                            <React.Fragment>
                                                <Grid item>
                                                    <Paper className={classes.buttonPaper}>
                                                        <Button className={classes.button} onClick={ this.handleCopyFsItems }>
                                                        Copy</Button>
                                                    
                                                    </Paper>
                                                
                                                </Grid>
                                            
                                                <Grid item>
                                                    <Paper className={classes.buttonPaper}>
                                                        <Button className={classes.button} onClick={ this.handleCutFsItems }>
                                                        Cut</Button>
                                                    
                                                    </Paper>
                                                
                                                </Grid>
                                            
                                            </React.Fragment>
                                        )
                                        
                                    }{
                                        copyCutPending &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handlePasteFsItems }>
                                                    Paste</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }{
                                        hasCheckeds(this) &&  (
                                            <Grid item>
                                                <Paper className={classes.buttonPaper}>
                                                    <Button className={classes.button} onClick={ this.handleDeleteFsItems }>
                                                    Delete</Button>
                                                
                                                </Paper>
                                            
                                            </Grid>
                                        )
                                        
                                    }</Grid>
                                
                                </Toolbar>
                            
                            </Paper>
                        
                            <React.Fragment>
                                <ContextMenu id="fsItem-context-menu" anchorEl={this.state.contextMenuAnchorEl} items={this.state.contextMenuItems} onClose={this.handleContextMenuClose}>
                                </ContextMenu>
                            
                                <List>
                                {
                                    items.map((p, i) => {
                                        return  (
                                                <MyLink key={i} title={p.basename} kind={p.kind} value={p.folderPath} onClick={() => {
                                                    this.handleSelectFolderOrDocument(p.folderPath, p.kind);
                                                }} checked={ checkeds[p.folderPath] && checkeds[p.folderPath].checked } onCheck={() => {
                                                    this.handleCheckFolderOrDocument(p.folderPath, p.kind);
                                                }} onDuplicate={() => {
                                                    this.handleDuplicateFsItem(p.kind, p.fullPath, p.basename);
                                                }} onRename={() => {
                                                    this.handleRenameFsItem(p.kind, p.fullPath, p.basename);
                                                }} ariaOwns={this.state.contextMenuAnchorEl ? 'fsItem-context-menu' : null} ariaHasPopup="true" onContextMenu={this.handleFsItemContextMenuOpen}>
                                                </MyLink>
                                            )
                                        ;
                                    })
                                }</List>
                            
                                <pre>
                                { JSON.stringify(items, null, 2) }</pre>
                            
                            </React.Fragment>
                        
                        </div>
                    )
                ;
            }
            else if (userId && items) {
                return  (
                        <div className={classes.fsitems}>
                            <BreadCrumbs>
                            </BreadCrumbs>
                        
                            <Paper>
                                <Toolbar>
                                    <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                        <Grid item>
                                            <Paper className={classes.buttonPaper}>
                                                <Button className={classes.button} onClick={ this.handleCreateProject }>
                                                Create project</Button>
                                            
                                            </Paper>
                                        
                                        </Grid>
                                    
                                    </Grid>
                                
                                </Toolbar>
                            
                            </Paper>
                        
                            <React.Fragment>
                                <List>
                                {
                                    items.map((p, i) => {
                                        return  (
                                                <MyLink key={i} title={p.basename} kind={ 0 } onClick={() => {
                                                    this.handleSelectProject(p.basename);
                                                }}>
                                                </MyLink>
                                            )
                                        ;
                                    })
                                }</List>
                            
                                <pre>
                                { JSON.stringify(items, null, 2) }</pre>
                            
                            </React.Fragment>
                        
                        </div>
                    )
                ;
            }
            else {
                return  (
                        <div className={classes.fsitems}>
                            <h1>
                            {userId}
                            </h1>
                        
                        </div>
                    )
                ;
            }
        };
        return  (
                <div className={classes.root}>
                    <OptionsDialog open={this.state.optionsDialogOpen} title={this.state.optionsDialogTitle} options={this.state.optionsDialogOptions} onClose={this.state.optionsDialogHandler}>
                    </OptionsDialog>
                
                    <ConfirmDialog open={this.state.confirmDialogOpen} title={this.state.confirmDialogTitle} namedValues={this.state.confirmDialogNamedValues} items={this.state.confirmDialogItems} onClose={this.state.confirmDialogHandler}>
                    </ConfirmDialog>
                
                    <MainContent>
                    </MainContent>
                
                    <pre>
                    { JSON.stringify(this.state, null, 2) }</pre>
                
                </div>
            )
        ;
    }
    }
const WizziRepoStyled = withStyles(styles)(WizziRepoContainer)
;
const WizziRepoContexted = withPageInfo(WizziRepoStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetRepoUser: (userId) => {
                console.log('dispatchGetRepoUser');
                dispatch(getRepoUser(userId));
            }, 
            dispatchGetRepoProject: (userId, projectId) => {
                console.log('dispatchGetRepoProject');
                dispatch(getRepoProject(userId, projectId));
            }, 
            dispatchGetRepoFolder: (userId, projectId, folderPath) => {
                console.log('dispatchGetRepoFolder');
                dispatch(getRepoFolder(userId, projectId, folderPath));
            }, 
            dispatchGetRepoDocument: (userId, projectId, documentPath) => {
                console.log('dispatchGetRepoDocument');
                dispatch(getRepoDocument(userId, projectId, documentPath));
            }, 
            dispatchUpdateRepoDocument: (userId, projectId, documentPath, content) => {
                console.log('dispatchUpdateRepoDocument', userId, projectId, documentPath, content);
                dispatch(updateRepoDocument(userId, projectId, documentPath, content));
            }, 
            dispatchCreateRepoProject: (userId, projectId) => {
                console.log('dispatchCreateRepoProject', userId, projectId);
                dispatch(createRepoProject(userId, projectId));
            }, 
            dispatchCreateRepoFolder: (userId, projectId, folderBasePath, folderName) => {
                console.log('dispatchCreateRepoFolder', userId, projectId, folderBasePath, folderName);
                const fpath = verify.isEmpty(folderBasePath) ? folderName : folderBasePath + '/' + folderName;
                dispatch(createRepoFolder(userId, projectId, fpath));
            }, 
            dispatchCreateRepoDocument: (userId, projectId, folderBasePath, documentName) => {
                console.log('dispatchCreateRepoDocument', userId, projectId, folderBasePath, documentName);
                const fpath = verify.isEmpty(folderBasePath) ? documentName : folderBasePath + '/' + documentName;
                dispatch(createRepoDocument(userId, projectId, fpath));
            }, 
            dispatchDuplicateFsItem: (kind, fullPath, newName) => {
                console.log('dispatchDuplicateFsItem', kind, fullPath, newName);
                dispatch(duplicateFsItem(kind, fullPath, newName));
            }, 
            dispatchRenameFsItem: (kind, fullPath, newName) => {
                console.log('dispatchRenameFsItem', kind, fullPath, newName);
                dispatch(renameFsItem(kind, fullPath, newName));
            }, 
            dispatchDeleteBatch: (currentUserId, currentProjectId, currentItemPath, selectedFsItems) => {
                alert('Execute dispatchDeleteBatch ' + JSON.stringify(selectedFsItems, null, 2));
                dispatch(deleteRepoBatch(currentUserId, currentProjectId, currentItemPath, selectedFsItems));
            }, 
            dispatchCopyFsItems: (sourcePath, selectedFsItems) => {
                dispatch(copyCutRepoFsItems('copy', sourcePath, selectedFsItems));
            }, 
            dispatchCutFsItems: (sourcePath, selectedFsItems) => {
                dispatch(copyCutRepoFsItems('cut', sourcePath, selectedFsItems));
            }, 
            dispatchCancelCopyCutFsItems: () => {
                dispatch(copyCutRepoFsItems('', '', []));
            }, 
            dispatchPasteFsItems: (copy_cut, dest_userId, dest_projectId, dest_folderBasePath, selectedFsItems) => {
                alert('ready to dispatch pasteRepoFsItems: ' + copy_cut + '/' + dest_userId + '/' + dest_projectId + '/' + dest_folderBasePath + '/' + JSON.stringify(selectedFsItems));
                dispatch(pasteRepoFsItems(copy_cut, dest_userId, dest_projectId, dest_folderBasePath, selectedFsItems));
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
            projectId: state.repo.projectId, 
            folderPath: state.repo.folderPath, 
            items: state.repo.items, 
            document: state.repo.document, 
            selectedDocumentHash: state.repo.document ? state.repo.document.hash : null, 
            loadError: state.repo.loadError, 
            isLoading: state.repo.isLoading, 
            ittfDocument: state.wizziIttf.ittfDocument, 
            mTreeScript: state.wizziIttf.mTreeScript, 
            generatedArtifact: state.wizziIttf.generatedArtifact, 
            jobExecutionResult: state.job.executionResult, 
            jobExecutionError: state.job.executionError, 
            schemaGenerationResult: state.schema.generationResult, 
            schemaGenerationError: state.schema.generationError, 
            schemas: state.commons.managedSchemas, 
            copyCutType: state.repo.copyCutType, 
            copyCutSourcePath: state.repo.copyCutSourcePath, 
            copyCutPending: state.repo.copyCutPending, 
            copyCutSelectedItems: state.repo.copyCutSelectedItems
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziRepoContexted)
;
