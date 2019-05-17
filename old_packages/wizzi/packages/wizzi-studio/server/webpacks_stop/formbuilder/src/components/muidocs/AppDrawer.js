/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\muidocs\appdrawer.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
var routesBasepath = '/app/formbuilder';
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
        navItems = navRoot.childRoutes.reduce(reduceChildRoutes.bind(null, props), [])
        ;
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
        console.log('AppDrawer.routes[0]', routes[0]);
        return  (
                <Drawer className={className} classes={{
                    paper: classes.paper
                }} open={open} onRequestClose={onRequestClose} docked={docked}>
                    <div className={classes.nav}>
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.title} to={routesBasepath + "/"} onClick={onRequestClose}>
                                <Typography type="title" gutterBottom="colorInherit">
                                Form builder
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
