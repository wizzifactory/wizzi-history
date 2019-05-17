/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\appdrawer.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
function renderNavItems(props, navRoot) {
    // log 'renderNavItems.props.navRoot', props, navRoot
    let navItems = null;
    if (navRoot.childRoutes && navRoot.childRoutes.length) {
        // eslint-disable-next-line no-use-before-define
        navItems = navRoot.childRoutes.reduce(reduceChildRoutes.bind(null, props), []);
    }
    return  (
            <List>
            {navItems}
            </List>
        )
    ;
}
function reduceChildRoutes(props, items, childRoute, index) {
    // log 'reduceChildRoutes.childRoute' , childRoute , index, props
    if (childRoute.nav) {
        if (childRoute.childRoutes && childRoute.childRoutes.length) {
            const openImmediately = props.routes.indexOf(childRoute) !== -1 || false;
            items.push(
                <AppDrawerNavItem key={index} openImmediately={openImmediately} title={childRoute.title}>
                {renderNavItems(props, childRoute)}
                </AppDrawerNavItem>
            );
        }
        else {
            items.push(
                <AppDrawerNavItem key={index} title={childRoute.title} to={childRoute.path} onClick={props.onRequestClose}>
                </AppDrawerNavItem>
            );
        }
    }
    return items;
}
const styleSheet = createStyleSheet('AppDrawer', theme => (
    {
        paper: {
            width: 250, 
            backgroundColor: theme.palette.background.paper
        }, 
        title: {
            color: theme.palette.text.secondary, 
            '&:hover': {
                color: theme.palette.primary[500]
            }
        }, 
        toolbar: {
            flexDirection: 'column', 
            alignItems: 'flex-start', 
            justifyContent: 'center'
        }, 
        anchor: {
            color: theme.palette.text.secondary
        }
    }));

class AppDrawer extends React.Component  {
    render() {
        const {
            classes,
            className,
            open,
            onRequestClose,
            docked,
            routes
        } = this.props;
        return  (
                <Drawer className={className} classes={{
                    paper: classes.paper
                }} open={open} onRequestClose={onRequestClose} docked={docked}>
                    <div className={classes.nav}>
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.title} to="/" onClick={onRequestClose}>
                                <Typography type="title" gutterBottom={true} color='inherit'>
                                Wizzi Factory
                                </Typography>
                            
                            </Link>
                        
                            <Divider absolute>
                            </Divider>
                        
                        </Toolbar>
                    
                    {renderNavItems(this.props, routes[0])}
                    </div>
                
                </Drawer>
            )
        ;
    }
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    docked: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired
}

const AppDrawerStyled = withStyles(styleSheet)(AppDrawer)
;
export default AppDrawerStyled;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
