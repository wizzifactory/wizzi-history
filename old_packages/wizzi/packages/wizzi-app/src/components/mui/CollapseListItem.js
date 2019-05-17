/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\collapselistitem.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { CreateFileIcon } from './Icons';
import { FolderIcon, FileIcon, DuplicateIcon, RenameIcon } from './Icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';
function compareFsItems(a, b) {
    var a_has_children = a.children && a.children.length > 0;
    var b_has_children = b.children && b.children.length > 0;
    if (a_has_children && !b_has_children) {
        return -1;
    }
    else if (b_has_children && !a_has_children) {
        return 1;
    }
    else if (a.name < b.name) {
        return -1;
    }
    else if (b.name < a.name) {
        return 1;
    }
    else {
        return 0;
    }
}
const styles = theme => (
    {
        button: theme.mixins.gutters({
            borderRadius: 0, 
            justifyContent: 'flex-start', 
            textTransform: 'none', 
            width: '100%', 
            '&:hover': {
                textDecoration: 'none'
            }
        }), 
        navItem: {
            ...theme.typography.body2, 
            display: 'block', 
            paddingTop: 0, 
            paddingBottom: 0
        }, 
        navLink: {
            fontWeight: theme.typography.fontWeightRegular, 
            display: 'flex', 
            paddingTop: 0, 
            paddingBottom: 0
        }, 
        navLinkButton: {
            color: theme.palette.text.secondary, 
            fontSize: 13
        }, 
        activeButton: {
            color: theme.palette.text.primary
        }
    });

class CollapseListItem extends React.Component {
    //
    // { item
    // string name
    // string schema
    // boolean isFragment
    // string itemPath
    // string hash
    // [ children
    //
    state = {
        open: false, 
        showItemIcons: false, 
        showGroupIcons: false
    };
    componentDidMount() {
        const {
            item
        } = this.props;
        if (item && item.openImmediately) {
            this.setState({
                open: true
            });
        }
    }
    handleExpandCollapse = () => {
        this.setState({
            open: !this.state.open
        });
    }
    handleMouseEnterItem = (e) => {
        e.stopPropagation();
        this.setState({
            showItemIcons: true
        });
        setTimeout(() => {
            this.setState({
                showItemIcons: false
            });
        }, 2000);
    }
    handleMouseLeaveItem = () => {
        this.setState({
            showItemIcons: false
        });
    }
    handleMouseEnterGroup = (e) => {
        e.stopPropagation();
        this.setState({
            showGroupIcons: true
        });
        setTimeout(() => {
            this.setState({
                showGroupIcons: false
            });
        }, 2000);
    }
    handleMouseLeaveGroup = () => {
        this.setState({
            showGroupIcons: false
        });
    }
    render() {
        const {
            classes,
            item,
            onSelect,
            to,
            applySort,
            onCreateFolder,
            onCreateFile,
            onDuplicate,
            onRename,
            onDelete
        } = this.props;
        const { open, showItemIcons, showGroupIcons } = this.state;
        const hasChildren = item.children && item.children.length;
        if ((hasChildren || item.name) == false) {
            // case of empty list
            return  (
                    <span>
                    </span>
                )
            ;
        }
        if (hasChildren) {
            const children_sorted = applySort ? item.children.sort(compareFsItems) : item.children;
            return  (
                    <ListItem className={classes.navItem} disableGutters dense={true} onMouseEnter={this.handleMouseEnterGroup} onMouseLeave={this.handleMouseLeaveGroup}>
                        <React.Fragment>
                            <Button className={classes.button} onClick={this.handleExpandCollapse}>
                            {item.name}</Button>
                        
                        {
                            showGroupIcons &&  (
                                <React.Fragment>
                                {
                                    onCreateFolder &&  (
                                        <Tooltip title="Create new folder">
                                            <Button className={classes.navLinkButton} onClick={onCreateFolder}>
                                                <CreateNewFolderIcon>
                                                </CreateNewFolderIcon>
                                            
                                            </Button>
                                        
                                        </Tooltip>
                                    )
                                    
                                }{
                                    onCreateFile &&  (
                                        <Tooltip title="Create new file">
                                            <Button className={classes.navLinkButton} onClick={onCreateFile}>
                                                <CreateFileIcon>
                                                </CreateFileIcon>
                                            
                                            </Button>
                                        
                                        </Tooltip>
                                    )
                                    
                                }</React.Fragment>
                            )
                            
                        }</React.Fragment>
                    
                        <Collapse in={open} timeout="auto" unmountOnExit component="ul">
                        {
                            children_sorted.map((child, i) => {
                                return  (
                                        <CollapseListItem key={i} item={child} classes={classes} onSelect={onSelect} onCreateFolder={onCreateFolder} onCreateFile={onCreateFile} onDuplicate={onDuplicate} onRename={onRename} onDelete={onDelete} onDelete={onDelete}>
                                        </CollapseListItem>
                                    )
                                ;
                            })
                        }</Collapse>
                    
                    </ListItem>
                )
            ;
        }
        else {
            return  (
                    <ListItem className={classes.navLink} dense={true} disableGutters onMouseEnter={this.handleMouseEnterItem} onMouseLeave={this.handleMouseLeaveItem}>
                        <React.Fragment>
                        {
                            !!(onSelect || to) == false &&  (
                                <Button className={classNames(classes.button, classes.navLinkButton)}>
                                {item.name}</Button>
                            )
                            
                        }{
                            onSelect &&  (
                                <Button className={classNames(classes.button, classes.navLinkButton)} onClick={() => {
                                    if (onSelect) {
                                        onSelect(item);
                                    }
                                }}>
                                {item.name}</Button>
                            )
                            
                        }{
                            to &&  (
                                <Button component={Link} to={to} className={classNames(classes.button, classes.navLinkButton)}>
                                {item.name}</Button>
                            )
                            
                        }{
                            showItemIcons &&  (
                                <React.Fragment>
                                {
                                    onDuplicate &&  (
                                        <Tooltip title="Duplicate">
                                            <Button className={classes.navLinkButton} onClick={onDuplicate}>
                                                <DuplicateIcon>
                                                </DuplicateIcon>
                                            
                                            </Button>
                                        
                                        </Tooltip>
                                    )
                                    
                                }{
                                    onRename &&  (
                                        <Tooltip title="Rename">
                                            <Button className={classes.navLinkButton} onClick={onRename}>
                                                <RenameIcon>
                                                </RenameIcon>
                                            
                                            </Button>
                                        
                                        </Tooltip>
                                    )
                                    
                                }{
                                    onDelete &&  (
                                        <Tooltip title="Delete">
                                            <Button className={classes.navLinkButton} onClick={onDelete}>
                                                <DeleteIcon>
                                                </DeleteIcon>
                                            
                                            </Button>
                                        
                                        </Tooltip>
                                    )
                                    
                                }{
                                    item.toPackageSource &&  (
                                        <Tooltip title="Edit source">
                                            <IconButton className={classes.navLinkButton} component={Link} to={item.toPackageSource}>
                                                <EditIcon>
                                                </EditIcon>
                                            
                                            </IconButton>
                                        
                                        </Tooltip>
                                    )
                                    
                                }{
                                    item.toPackageJobs &&  (
                                        <Tooltip title="Execute jobs">
                                            <IconButton className={classes.navLinkButton} component={Link} to={item.toPackageJobs}>
                                                <LaunchIcon>
                                                </LaunchIcon>
                                            
                                            </IconButton>
                                        
                                        </Tooltip>
                                    )
                                    
                                }</React.Fragment>
                            )
                            
                        }</React.Fragment>
                    
                    </ListItem>
                )
            ;
        }
    }
}

CollapseListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    to: PropTypes.string,
    openImmediately: PropTypes.bool,
    applySort: PropTypes.bool
}

CollapseListItem.defaultProps  = {
    openImmediately: false,
    applySort: true
}
export default withStyles(styles)(CollapseListItem)
;
