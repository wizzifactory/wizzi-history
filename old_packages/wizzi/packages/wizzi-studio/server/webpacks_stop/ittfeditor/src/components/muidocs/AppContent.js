/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\appcontent.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import MarkdownElement from './MarkdownElement';
const styleSheet = createStyleSheet('AppContent', theme => (
    {
        content: theme.mixins.gutters({
            paddingTop: 80, 
            flex: '1 1 100%', 
            maxWidth: '100%', 
            margin: '0 auto'
        }), 
        [theme.breakpoints.up(948)]: {
            content: {
                maxWidth: 900
            }
        }
    }));

class AppContent extends React.Component  {
    render() {
        const {
            className,
            classes,
            children: childrenProp,
            route
        } = this.props;
        let children = childrenProp;
        if (!children) {
            const text = `# Summary
            
            ${route.childRoutes.map((childRoute) => {
                return `- [${childRoute.title}](${childRoute.path})`;
            }).join('\n')
            }`
            ;
            console.log('AppContent.text', text);
            children =  (
                <MarkdownElement text={text}>
                </MarkdownElement>
            )
            ;
        }
        console.log('AppContent.children', children);
        return  (
                <div className={classNames(classes.content, className)}>
                {children}
                </div>
            )
        ;
    }
}

AppContent.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    route: PropTypes.object.isRequired
}

const AppContentStyled = withStyles(styleSheet)(AppContent)
;
export default AppContentStyled;
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
