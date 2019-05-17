/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\material-ui-docs\src\components\ui\styles\withstyles.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createEagerFactory from 'recompose/createEagerFactory';
import customPropTypes from '../utils/customPropTypes';
/**
    Link a style sheet with a component.
     It does not modify the component passed to it;
     instead, it returns a new, with a `classes` property.
     This classes object contains the name of the class names injected in the DOM.
*/
const withStyles = (styleSheet) => {
    return (BaseComponent) => {
            const factory = createEagerFactory(BaseComponent);
            class Style extends Component {
                constructor() {
                    super();
                }
                static Naked = BaseComponent;
                render() {
                    const { classes: classesProp, innerRef, ...other } = this.props;
                    let classes;
                    const renderedClasses = this.context.styleManager.render(styleSheet);
                    if (classesProp) {
                        classes = {
                            ...renderedClasses, 
                            ...Object.keys(classesProp).reduce((acc, key) => {
                                warning(renderedClasses[key], `Material-UI: the key \`${key}\` provided to the classes property object is not implemented.`);
                                acc[key] = `${renderedClasses[key]} ${classesProp[key]}`;
                                return acc;
                            }, {})
                        };
                    }
                    else {
                        classes = renderedClasses;
                    }
                    return factory({
                            classes, 
                            ref: innerRef, 
                            ...other
                        });
                }
            }
            Style.propTypes = {
                classes: PropTypes.object, 
                innerRef: PropTypes.func
            };
            Style.contextTypes = {
                styleManager: customPropTypes.muiRequired
            };
            hoistNonReactStatics(Style, BaseComponent);
            if (process && process.env && process.env.NODE_ENV !== 'production') {
                Style.displayName = wrapDisplayName(BaseComponent, 'withStyles');
            }
            return Style;
        };
};
export default withStyles;
