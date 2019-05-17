/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\home\src\components\appdrawer.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';
const styleSheet = createStyleSheet('AppDrawer', (theme) => {
    return {
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
        };
});
function renderNavItems(props, navRoot) {
    console.log('renderNavItems.props.navRoot', props, navRoot);
    let navItems = null;
    if (navRoot.childRoutes && navRoot.childRoutes.length) {
        // eslint-disable-next-line no-use-before-define
        navItems = navRoot.childRoutes.reduce(reduceChildRoutes.bind(null, props), []);
    }
    return  (
            <List>
            {navItems}</List>
        )
    ;
}
function reduceChildRoutes(props, items, childRoute, index) {
    console.log('reduceChildRoutes.childRoute' , childRoute , index, props);
    if (childRoute.nav) {
        if (childRoute.childRoutes && childRoute.childRoutes.length) {
            const openImmediately = props.routes.indexOf(childRoute) !== -1 || false;
            items.push(
                <AppDrawerNavItem key={index} openImmediately={openImmediately} title={childRoute.title}>
                {renderNavItems(props, childRoute)}</AppDrawerNavItem>
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
function AppDrawer(props) {
    const classes = props.classes;
    const GITHUB_RELEASE_BASE_URL = 'https://github.com/callemall/./ui/releases/tag/';
    return  (
            <Drawer className={props.className} classes={{
                paper: classes.paper
            }} open={props.open} onRequestClose={props.onRequestClose} docked={props.docked}>
                <div className={classes.nav}>
                    <Toolbar className={classes.toolbar}>
                        <Link className={classes.title} to="/" onClick={props.onRequestClose}>
                            <Typography type="title" gutterBottom="colorInherit">
                            Wizzi Factory</Typography>
                        
                        </Link>
                    
                    {
                        process.env.MATERIAL_UI_VERSION ?  (
                                <Link className={classes.anchor} href={`${GITHUB_RELEASE_BASE_URL}v${process.env.MATERIAL_UI_VERSION}`}>
                                    <Typography type="caption">
                                    {`v${process.env.MATERIAL_UI_VERSION}`}</Typography>
                                
                                </Link>
                            )
                         : null
                    }<Divider absolute>
                        </Divider>
                    
                    </Toolbar>
                
                {renderNavItems(props, props.routes[0])}</div>
            
            </Drawer>
        )
    ;
}
AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired, 
    className: PropTypes.string, 
    docked: PropTypes.bool.isRequired, 
    onRequestClose: PropTypes.func.isRequired, 
    open: PropTypes.bool.isRequired, 
    routes: PropTypes.array.isRequired
};
export default withStyles(styleSheet)(AppDrawer);
