/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\muidocs\link.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
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
                }, className)
                } {...other}>
                </Component>
            )
        ;
    }
}

Link.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    component: PropTypes.oneOfType(
        [
            PropTypes.string, 
            PropTypes.func
        ])
    ,
    to: PropTypes.string,
    variant: PropTypes.oneOf(
        [
            'primary', 
            'accent'
        ])
    
}

const LinkStyled = withStyles(styleSheet)(Link)

;
export default LinkStyled;
