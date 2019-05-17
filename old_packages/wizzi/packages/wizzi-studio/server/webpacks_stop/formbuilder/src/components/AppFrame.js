/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\appframe.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import compose from 'recompose/compose';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import AppDrawer from './muidocs/AppDrawer';
function getTitle(routes) {
    for (var i = routes.length - 1; i >= 0; i -= 1) {
        if (routes[i].hasOwnProperty('title') && routes[i].title) {
            return routes[i].title;
        }
    }
    return null;
}
const styleSheet = createStyleSheet('AppFrame', theme => (
    {
        '@global': {
            html: {
                boxSizing: 'border-box'
            }, 
            '*, *:before, *:after': {
                boxSizing: 'inherit'
            }, 
            body: {
                margin: 0, 
                background: theme.palette.background.default, 
                color: theme.palette.text.primary, 
                lineHeight: '1.2', 
                overflowX: 'hidden', 
                WebkitFontSmoothing: 'antialiased', 
                MozOsxFontSmoothing: 'grayscale'
            }, 
            img: {
                maxWidth: '100%', 
                height: 'auto', 
                width: 'auto'
            }
        }, 
        appFrame: {
            display: 'flex', 
            alignItems: 'stretch', 
            minHeight: '100vh', 
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
            left: 'auto', 
            right: 0, 
            transition: theme.transitions.create('width')
        }, 
        appBarHome: {
            backgroundColor: 'transparent', 
            boxShadow: 'none'
        }, 
        [theme.breakpoints.up('lg')]: {
            drawer: {
                width: '250px'
            }, 
            appBarShift: {
                width: 'calc(100% - 250px)'
            }, 
            navIconHide: {
                display: 'none'
            }
        }
    }));

class AppFrame extends React.Component  {
    state = {
        drawerOpen: false
    };
    handleDrawerClose = () => {
        this.setState({
            drawerOpen: false
        })
    }
    handleDrawerToggle = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }
    handleToggleShade = () => {
        this.props.dispatch({
            type: 'TOGGLE_THEME_SHADE'
        })
    }
    render() {
        const {
            children,
            routes,
            width,
            classes
        } = this.props;
        console.log('AppFrame.props', this.props);
        const title = getTitle(routes);
        console.log('title', title);
        // let drawerDocked = isWidthUp('lg', width)
        let drawerDocked = true;
        let navIconClassName = classes.icon;
        let appBarClassName = classes.appBar;
        if (title === null) {
            // home route, don't shift app bar or dock drawer
            drawerDocked = false;
            appBarClassName += ` ${classes.appBarHome}`;
        }
        else {
            navIconClassName += ` ${classes.navIconHide}`;
            appBarClassName += ` ${classes.appBarShift}`;
        }
        return  (
                <div className={classes.appFrame}>
                    <AppBar className={appBarClassName}>
                        <Toolbar>
                            <IconButton contrast onClick={this.handleDrawerToggle} className={navIconClassName}>
                                <MenuIcon>
                                </MenuIcon>
                            
                            </IconButton>
                        
                        {
                            title !== null
                             &&  (
                                <Typography className={classes.title} type="title" colorInherit noWrap>
                                {title}
                                </Typography>
                            )
                            
                        }<IconButton title="Toggle light/dark theme" contrast onClick={this.handleToggleShade}>
                                <LightbulbOutline>
                                </LightbulbOutline>
                            
                            </IconButton>
                        
                        </Toolbar>
                    
                    </AppBar>
                
                    <AppDrawer className={classes.drawer} docked={drawerDocked} routes={routes} onRequestClose={this.handleDrawerClose} open={drawerDocked || this.state.drawerOpen}>
                    </AppDrawer>
                
                {children}
                </div>
            )
        ;
    }
}

AppFrame.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    width: PropTypes.string.isRequired
}

const AppFrameStyled = compose(withStyles(styleSheet)
, withWidth(), connect())(AppFrame)

;
export default AppFrameStyled;
