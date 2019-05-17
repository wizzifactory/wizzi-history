/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\home\src\components\apimenu.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import ApiMenuComponents from './ApiMenuComponents';
import { demoComponentsTree } from './files';
function ApiMenu(props) {
    const currentRoute = props.routes[props.routes.length - 1];
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
ApiMenu.propTypes = {
    routes: PropTypes.array.isRequired
};
export default ApiMenu;
