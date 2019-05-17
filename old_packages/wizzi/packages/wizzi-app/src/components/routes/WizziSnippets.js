/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzisnippets.js.ittf
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
import {getJobGists, createJobGist, updateJobGist, changedJobGist, renameJobGist, duplicateJobGist, deleteJobGist, clearJobNavigations} from '../../store/actions';
import MyLink from '../mui/FileSystemNavItem';
import OptionsDialog from './dialogs/OptionsDialog';
import ConfirmDialog from './dialogs/ConfirmDialog';
const title = 'Code snippets';
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

class WizziSnippetsContainer extends React.Component {
    state = {
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
    componentDidMount() {
        const {
            pageInfo,
            dispatchGetJobGists
        } = this.props;
        if (pageInfo && pageInfo.title !== (title)) {
            pageInfo.setTitle(title);
        }
        dispatchGetJobGists('snippet');
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            toSnippet,
            match,
            history,
            dispatchClearJobNavigations
        } = this.props;
        if (toSnippet) {
            dispatchClearJobNavigations();
            history.push(`/job/snippet/${match.params.userId}/${toSnippet.hash}`
            );
        }
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
            snippets
        } = this.props;
        if (!!(snippets) == false) {
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
        return  (
                <div className={ classes.root }>
                    <OptionsDialog open={this.state.optionsDialogOpen} title={this.state.optionsDialogTitle} options={this.state.optionsDialogOptions} onClose={this.state.optionsDialogHandler}>
                    </OptionsDialog>
                
                    <ConfirmDialog open={this.state.confirmDialogOpen} title={this.state.confirmDialogTitle} namedValues={this.state.confirmDialogNamedValues} items={this.state.confirmDialogItems} onClose={this.state.confirmDialogHandler}>
                    </ConfirmDialog>
                
                    <AppBar position="static" color="default">
                        <Paper>
                            <Toolbar>
                                <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                    <Grid item>
                                        <Paper className={classes.buttonPaper}>
                                            <Button className={classes.button} onClick={ this.handleCreateJobSnippet }>
                                            Create</Button>
                                        
                                        </Paper>
                                    
                                    </Grid>
                                
                                </Grid>
                            
                            </Toolbar>
                        
                        </Paper>
                    
                    </AppBar>
                
                    <div className={ classes.column }>
                        <List>
                        {
                            snippets.map((p, i) => {
                                return  (
                                        <MyLink key={i} title={p.basename} kind={1} to={`/job/snippet/${match.params.userId}/${p.hash}`
                                        } onDuplicate={() => {
                                            this.handleDuplicateJobSnippet(p.hash, p.basename);
                                        }} onRename={() => {
                                            this.handleRenameJobSnippet(p.hash, p.basename);
                                        }} onDelete={() => {
                                            this.handleDeleteJobSnippet(p.hash, p.basename);
                                        }}>
                                        </MyLink>
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
const WizziSnippetsStyled = withStyles(styles)(WizziSnippetsContainer)
;
const WizziSnippetsContexted = withPageInfo(WizziSnippetsStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetJobGists: (kind) => {
                console.log('dispatchGetJobGists', kind, null, null, null);
                dispatch(getJobGists(kind));
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
            loadingError: state.job.loadingError, 
            snippets: state.job.snippets, 
            toSnippet: state.job.toSnippet
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziSnippetsContexted)
;
