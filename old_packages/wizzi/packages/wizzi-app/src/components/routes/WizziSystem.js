/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzisystem.js.ittf
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
import {getWizziSystemPackages} from '../../store/actions';
import MySelect from '../mui/MySelect';
import CollapseListItem from '../mui/CollapseListItem';
import MyLink from '../mui/AppDrawerNavItem';
const title = 'Wizzi system';
function getLinks(items) {
    var withLinks = [], newItem;
    var i, i_items=items, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        if (item.children && item.children.length > 0) {
            newItem = {
                name: item.name, 
                children: getLinks(item.children)
            };
        }
        else {
            newItem = {
                name: item.name, 
                toPackageSource: '/wizzi/ittf/' + item.uri, 
                toPackageJobs: '/wizzi/jobs/' + item.uri
            };
        }
        withLinks.push(newItem);
    }
    return withLinks;
}
function getPackageTree(version, packages) {
    var v = packages[version];
    return {
            name: version, 
            openImmediately: true, 
            children: [
                {
                    name: 'kernel', 
                    openImmediately: true, 
                    children: getLinks(v.kernel)
                }, 
                {
                    name: 'plugins', 
                    openImmediately: true, 
                    children: getLinks(v.plugins)
                }, 
                {
                    name: 'apps', 
                    children: getLinks(app_flat_to_tree(v.apps).children
                    )
                }
            ]
        };
}
// returns node
// { item
// int kind
// oneOf 0,1
// string name
// string itemPath
// [ children
function app_flat_to_tree(flatItems) {
    var tree = {
        children: [
            
        ]
    };
    var ss, cur, itemPath, hash, schema, isFragment;
    var i, i_items=flatItems, i_len=flatItems.length, f;
    for (i=0; i<i_len; i++) {
        f = flatItems[i];
        itemPath = f.appId;
        ss = itemPath.split('/');
        cur = tree;
        var j, j_items=ss, j_len=ss.length, s;
        for (j=0; j<j_len; j++) {
            s = ss[j];
            cur = app_getCreateChild(cur, s, j < ss.length -1);
        }
        cur.itemPath = itemPath;
        if (cur.kind == 1) {
            cur.uri = f.uri;
        }
    }
    return tree;
}
function app_getCreateChild(parent, name, isFolder) {
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

class WizziSystemContainer extends React.Component {
    state = {
        splitter1Sizes: {
            primary: 500, 
            secondary: 500
        }, 
        selectedVersion: null, 
        selectedPackage: null
    };
    componentDidMount() {
        const {
            pageInfo,
            dispatchGetWizziSystemPackages
        } = this.props;
        if (pageInfo && pageInfo.title !== (title)) {
            pageInfo.setTitle(title);
        }
        dispatchGetWizziSystemPackages();
    }
    componentDidUpdate(prevProps, prevState) {
        if (!this.state.selectedVersion && this.props.versions && this.props.versions.length > 0) {
            this.setState({
                selectedVersion: this.props.versions[this.props.versions.length-1].name
            });
        }
    }
    handleVersionChanged = (e) => {
        this.setState({
            selectedVersion: e.target.value
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
            loadingError,
            classes,
            versions,
            packages
        } = this.props;
        if (!!(versions || versions.length == 0) == false) {
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
        const {selectedVersion, selectedPackage} = this.state;
        const itemTree = selectedVersion ? getPackageTree(selectedVersion, packages) : null;
        return  (
                <div className={ classes.root }>
                    <AppBar position="static" color="default">
                        <Paper>
                            <Toolbar>
                                <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                {
                                    selectedVersion &&  (
                                        <MySelect label='' items={versions} value={selectedVersion} onChange={this.handleVersionChanged}>
                                        </MySelect>
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
                                {
                                    itemTree &&  (
                                        <CollapseListItem item={itemTree} applySort={false}>
                                        </CollapseListItem>
                                    )
                                    
                                }</div>
                            
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
                                    <pre>
                                    {JSON.stringify(versions, null, 2)}{JSON.stringify(packages, null, 2)}</pre>
                                
                                </div>
                            
                            </div>
                        
                        </Splitter>
                    
                    </div>
                
                </div>
            )
        ;
    }
    }
const WizziSystemStyled = withStyles(styles)(WizziSystemContainer)
;
const WizziSystemContexted = withPageInfo(WizziSystemStyled);
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetWizziSystemPackages: () => {
                console.log('dispatchGetWizziSystemPackages', null, null, null, null);
                dispatch(getWizziSystemPackages());
            }
        };
};
const mapStateToProps = (state) => {
    return {
            loadingError: state.wizziSystem.loadingError, 
            versions: state.wizziSystem.versions, 
            packages: state.wizziSystem.packages
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziSystemContexted)
;
