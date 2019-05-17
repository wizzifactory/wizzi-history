/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\home\src\components\markdowndocs.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MarkdownElement from './MarkdownElement';
import Demo from './Demo';
const styleSheet = createStyleSheet('MarkdownDocs', (theme) => {
    return {
            root: {
                marginBottom: 100
            }, 
            header: {
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end'
            }
        };
});
const headerRegexp = /---\n(.*)\n---/;
const demoRegexp = /^demo='(.*)'$/;
const emptyRegexp = /^\s*$/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/callemall/material-ui/tree/next';
function MarkdownDocs(props) {
    const { classes, route } = props;
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
                    { 'Edit this page' }</Button>
                
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
MarkdownDocs.propTypes = {
    classes: PropTypes.object.isRequired, 
    route: PropTypes.shape({
        content: PropTypes.string.isRequired, 
        path: PropTypes.string.isRequired, 
        componentAPI: PropTypes.object, 
        demo: PropTypes.object
    }).isRequired
    
};
export default withStyles(styleSheet)(MarkdownDocs)
;
