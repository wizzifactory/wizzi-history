/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\filesystemnavitem.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import { FolderIcon, FileIcon, DuplicateIcon, RenameIcon } from './Icons';
import DeleteIcon from '@material-ui/icons/Delete';
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

class FileSystemNavItem extends React.Component {
    state = {
        open: false
    };
    componentWillMount() {
        if (this.props.openImmediately) {
            this.setState({
                open: true
            });
        }
    }
    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        const {
            classes,
            children,
            title,
            kind,
            value,
            checked,
            onClick,
            onContextMenu,
            to,
            onCheck,
            onDuplicate,
            onRename,
            onDelete,
            ariaOwns,
            ariaHasPopup,
            key
        } = this.props;
        // log 'FileSystemNavItem.render.ariaOwns', ariaOwns, ariaHasPopup
        if (onClick || to) {
            return  (
                    <ListItem className={classes.navLink} disableGutters>
                    {
                        kind == 0 &&  (
                            <FolderIcon>
                            </FolderIcon>
                        )
                        
                    }{
                        kind == 1 &&  (
                            <FileIcon>
                            </FileIcon>
                        )
                        
                    }{
                        onCheck &&  (
                            <Checkbox checked={checked} onChange={onCheck} value={value}>
                            </Checkbox>
                        )
                        
                    }{
                        onClick &&  (
                            <Button id={ 'fsitem-' + key } className={classNames(classes.button, classes.navLinkButton)} onClick={onClick} onContextMenu={onContextMenu} aria-owns={ariaOwns} aria-haspopup={ariaHasPopup}>
                            {title}</Button>
                        )
                        
                    }{
                        to &&  (
                            <Button component={Link} to={to} className={classNames(classes.button, classes.navLinkButton)}>
                            {title}</Button>
                        )
                        
                    }{
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
                        
                    }</ListItem>
                )
            ;
        }
        return  (
                <ListItem className={classes.navItem} disableGutters>
                    <Button className={classes.button} onClick={this.handleClick}>
                    {title}</Button>
                
                    <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                    {children}</Collapse>
                
                </ListItem>
            )
        ;
    }
}

FileSystemNavItem.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string,
    openImmediately: PropTypes.bool,
    title: PropTypes.string.isRequired,
    kind: PropTypes.number.isRequired,
    onContextMenu: PropTypes.func
}

FileSystemNavItem.defaultProps  = {
    openImmediately: false
}
export default withStyles(styles)(FileSystemNavItem)
;
