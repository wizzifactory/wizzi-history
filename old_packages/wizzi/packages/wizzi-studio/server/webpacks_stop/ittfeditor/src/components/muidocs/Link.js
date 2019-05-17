/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\link.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Link as LinkRouter } from 'react-router';
const styleSheet = createStyleSheet('Link', theme => (
    {
        root: {
            color: 'inherit', 
            textDecoration: 'none', 
            '&:hover': {
                textDecoration: 'underline'
            }
        }, 
        primary: {
            color: theme.palette.primary[500]
        }, 
        accent: {
            color: theme.palette.accent.A400
        }
    }));

class Link extends React.Component  {
    render() {
        const {
            component: ComponentProp,
            classes,
            className,
            variant,
            to,
            ...other
        } = this.props;
        let Component;
        if (ComponentProp) {
            Component = ComponentProp;
        }
        else if (to) {
            Component = LinkRouter;
        }
        else {
            Component = 'a';
        }
        return  (
                <Component to={to} className={classNames(classes.root, {
                    [classes.primary]: variant === 'primary', 
                    [classes.accent]: variant === 'accent'
                }, className)} {...other}>
                </Component>
            )
        ;
    }
}

Link.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ])
    ,
    to: PropTypes.string,
    variant: PropTypes.oneOf([
        'primary',
        'accent'
    ])
    
}

const LinkStyled = withStyles(styleSheet)(Link)
;
export default LinkStyled;
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
