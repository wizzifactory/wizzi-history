/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\markdowndocs.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MarkdownElement from './MarkdownElement';
import Demo from './Demo';
const headerRegexp = /---\n(.*)\n---/;
const demoRegexp = /^demo='(.*)'$/;
const emptyRegexp = /^\s*$/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/callemall/material-ui/tree/next';
const styleSheet = createStyleSheet('MarkdownDocs', theme => (
    {
        root: {
            marginBottom: 100
        }, 
        header: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end'
        }
    }));

class MarkdownDocs extends React.Component  {
    render() {
        const {
            classes,
            route
        } = this.props;
        const contents = route.content.replace(headerRegexp, '').split(/^{{|}}$/gm).filter(content => !emptyRegexp.test(content));
        let markdownUrl = SOURCE_CODE_ROOT_URL;
        // Map back to the source code
        if (route.componentAPI) {
            markdownUrl += `/src${route.componentAPI.path.replace('./component-api/', '/').replace('.md', '.js')}`;
            console.log('markdownUrl', markdownUrl);
        }
        else if (route.demo) {
            markdownUrl += `/docs/src/pages/component-demos${route.demo.path.replace('./', '/')}`;
        }
        else {
            markdownUrl += `/docs/src/pages${route.path}.md`;
        }
        return  (
                <div className={classes.root}>
                    <div className={classes.header}>
                        <Button component="a" href={markdownUrl} target="_blank">
                        { 'Edit this page' }
                        </Button>
                    
                    </div>
                
                {
                    contents.map((content) => {
                        if (demoRegexp.test(content)) {
                            return  (
                                    <Demo key={content} demo={content.match(demoRegexp)[1]}>
                                    </Demo>
                                )
                            ;
                        }
                        else {
                            return  (
                                    <MarkdownElement key={content} text={content}>
                                    </MarkdownElement>
                                )
                            ;
                        }
                    })
                }</div>
            )
        ;
    }
}

MarkdownDocs.propTypes = {
    classes: PropTypes.object.isRequired,
    route: PropTypes.shape(
        PropTypes.string,
        PropTypes.string,
        PropTypes.object,
        PropTypes.object
    ).isRequired
    
}

const MarkdownDocsStyled = withStyles(styleSheet)(MarkdownDocs)
;
export default MarkdownDocsStyled;
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
