/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\appdrawernavitem.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Link } from 'react-router';
import { ListItem } from 'material-ui/List';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
const styleSheet = createStyleSheet('AppDrawerNavItem', theme => (
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
            textIndent: 24, 
            fontSize: 13
        }, 
        activeButton: {
            color: theme.palette.text.primary
        }
    }));

class AppDrawerNavItem extends React.Component  {
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
            to
        } = this.props;
        if (to) {
            return  (
                    <ListItem className={classes.navLink} disableGutters>
                        <Button component={Link} to={to} className={classNames(classes.button, classes.navLinkButton)} activeClassName={classes.activeButton} onClick={this.props.onClick}>
                        {title}
                        </Button>
                    
                    </ListItem>
                )
            ;
        }
        return  (
                <ListItem className={classes.navItem} disableGutters>
                    <Button className={classes.button} onClick={this.handleClick}>
                    {title}
                    </Button>
                
                    <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                    {children}
                    </Collapse>
                
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

const AppDrawerNavItemStyled = withStyles(styleSheet)(AppDrawerNavItem)
;
export default AppDrawerNavItemStyled;
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
