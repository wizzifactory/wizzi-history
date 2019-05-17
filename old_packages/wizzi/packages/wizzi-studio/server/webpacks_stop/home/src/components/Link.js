/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\wizzi\ittf\server\webpacks\home\src\components\link.js.ittf
    utc time: Mon, 20 Aug 2018 16:09:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as LinkRouter } from 'react-router';
import { withStyles, createStyleSheet } from 'material-ui/styles';
var styleSheet = createStyleSheet('Link', (theme) => {
    return {
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
        };
});
function Link(props) {
    const { component: ComponentProp, classes, className, variant, to, ...other } = props;
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
Link.propTypes = {
    classes: PropTypes.object.isRequired, 
    className: PropTypes.string, 
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), 
    to: PropTypes.string, 
    variant: PropTypes.oneOf(['primary', 'accent'])
};
export default withStyles(styleSheet)(Link)
;
