/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\apimenu.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import find from 'lodash/find';
import ApiMenuComponents from './ApiMenuComponents';
import { demoComponentsTree } from '../files';
const styleSheet = createStyleSheet('ApiMenu', theme => (
    {}));

class ApiMenu extends React.Component  {
    render() {
        const {
            routes
        } = this.props;
        const currentRoute = routes[routes.length - 1];
        if (!currentRoute.demo) {
            return null;
        }
        const item = find(demoComponentsTree, (node) => {
            return node.demo.name === currentRoute.demo.name;
        });
        if (!item) {
            return null;
        }
        return  (
                <ApiMenuComponents components={item.components}>
                </ApiMenuComponents>
            )
        ;
    }
}

ApiMenu.propTypes = {
    routes: PropTypes.array.isRequired
}

const ApiMenuStyled = withStyles(styleSheet)(ApiMenu)
;
export default ApiMenuStyled;
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
