/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\muidocs\appcontent.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
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
        })
        , 
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
