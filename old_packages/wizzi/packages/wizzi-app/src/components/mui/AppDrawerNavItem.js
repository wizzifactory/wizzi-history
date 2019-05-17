/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\appdrawernavitem.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
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

class AppDrawerNavItem extends React.Component {
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
            to,
            onClick
        } = this.props;
        if (to || onClick) {
            return  (
                    <ListItem className={classes.navLink} disableGutters>
                    {
                        to &&  (
                            <Button component={Link} to={to} className={classNames(classes.button, classes.navLinkButton)}>
                            {title}</Button>
                        )
                        
                    }{
                        onClick &&  (
                            <Button className={classNames(classes.button, classes.navLinkButton)} onClick={onClick}>
                            {title}</Button>
                        )
                        
                    }</ListItem>
                )
            ;
        }
        return  (
                <ListItem className={classes.navItem} disableGutters dense={true}>
                    <Button className={classes.button} onClick={this.handleClick}>
                    {title}</Button>
                
                    <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                    {children}</Collapse>
                
                </ListItem>
            )
        ;
    }
}

AppDrawerNavItem.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    openImmediately: PropTypes.bool,
    title: PropTypes.string.isRequired,
    to: PropTypes.string
}

AppDrawerNavItem.defaultProps  = {
    openImmediately: false
}
export default withStyles(styles)(AppDrawerNavItem)
;
