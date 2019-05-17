/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\muidocs\markdowndocs.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MarkdownElement from './MarkdownElement';
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
                {
                    contents.map((content) => {
                        if (demoRegexp.test(content)) {
                            return  (
                                    <h1>
                                    Demo not implemented
                                    </h1>
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
        {
            content: PropTypes.string.isRequired, 
            path: PropTypes.string.isRequired, 
            componentAPI: PropTypes.object, 
            demo: PropTypes.object
        }).isRequired
    
}

const MarkdownDocsStyled = withStyles(styleSheet)(MarkdownDocs)

;
export default MarkdownDocsStyled;
