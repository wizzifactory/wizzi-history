/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\demobutton.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import find from 'lodash/find';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';
import { kebabCase } from '../../utils/helpers';
import { demoComponentsTree } from '../files';
const styleSheet = createStyleSheet('DemoButton', theme => (
    {}));

class DemoButton extends React.Component  {
    render() {
        const {
            routes
        } = this.props;
        const currentRoute = routes[routes - 1];
        if (!currentRoute.componentAPI) {
            return null;
        }
        const item = find(demoComponentsTree, (node) => {
            return find(node.components, (component) => {
                    return component === currentRoute.componentAPI.name);
                });
        });
        if (!item) {
            return null;
        }
        return  (
                <IconButton component={Link} to={`/component-demos/${kebabCase(item.demo.name)}`}>
                    <PlayCircleOutlineIcon>
                    </PlayCircleOutlineIcon>
                
                </IconButton>
            )
        ;
    }
}

DemoButton.propTypes = {
    routes: PropTypes.array.isRequired
}

const DemoButtonStyled = withStyles(styleSheet)(DemoButton)
;
export default DemoButtonStyled;
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
