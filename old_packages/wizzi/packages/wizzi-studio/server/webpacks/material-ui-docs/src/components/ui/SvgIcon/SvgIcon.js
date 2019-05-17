/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\material-ui-docs\src\components\ui\svgicon\svgicon.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
export const styleSheet = createStyleSheet('WuiSvgIcon', (theme) => {
    return {
            svgIcon: {
                display: 'inline-block', 
                fill: theme.palette.text.secondary, 
                height: 24, 
                width: 24, 
                userSelect: 'none', 
                transition: theme.transitions.create('fill', {
                    duration: theme.transitions.duration.shorter
                }), 
                '&:hover': {
                    fill: theme.palette.accent.A200
                }
            }
        };
});
class SvgIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }
    handleMouseLeave(event) {
        this.setState({hovered: false});
        this.props.onMouseLeave(event);
    }
    handleMouseEnter(event) {
        this.setState({hovered: true});
        this.props.onMouseEnter(event);
    }
    render() {
        const { children, classes, className: classNameProp, onMouseEnter, onMouseLeave, viewBox, titleAccess, ...other } = this.props;
        const className = classNames({
            [classes.svgIcon]: true
        }, classNameProp);
        return  (
                <svg className={className} viewBox={viewBox} aria-hidden={titleAccess ? 'false' : 'true'} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} {...other}>
                {titleAccess ? <title>{titleAccess}</title> : null}{children}</svg>
            )
        ;
    }
}
SvgIcon.propTypes = {
    classes: PropTypes.object.isRequired, 
    className: PropTypes.string, 
    children: PropTypes.node, 
    onMouseEnter: PropTypes.func, 
    onMouseLeave: PropTypes.func, 
    viewBox: PropTypes.string// Allows you to redefine what the coordinates
    // without units mean inside an svg element. For example,
    // if the SVG element is 500 (width) by 200 (height), and you
    // pass viewBox="0 0 50 20", this means that the coordinates inside
    // the svg will go from the top left corner (0,0) to bottom right (50,20)
    // and each unit will be worth 10px.
    
};
SvgIcon.defaultProps = {
    onMouseEnter: () => {}, 
    onMouseLeave: () => {}, 
    viewBox: '0 0 24 24'
};
export default withStyles(styleSheet)(SvgIcon)
;
