/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schemadoc\elementlist.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
const styleSheet = createStyleSheet('ElementList', theme => (
    {
        selected: {
            color: 'red'
        }
    }));

class ElementList extends React.Component  {
    render() {
        const {
            classes,
            elements,
            selectedElementName,
            onElementSelected
        } = this.props;
        return  (
                <List dense={true}>
                {
                    elements.map((element) => {
                        return  (
                                <ListItem key={element.name} onClick={() => {
                                    onElementSelected(element);
                                }}>
                                    <ListItemText className={selectedElementName === element.name ? classes.selected : ''} primary={element.name}>
                                    </ListItemText>
                                
                                </ListItem>
                            )
                        ;
                    })
                }</List>
            )
        ;
    }
}

ElementList.propTypes = {
    elements: PropTypes.array,
    selectedElementName: PropTypes.string,
    onElementSelected: PropTypes.func
}

const ElementListStyled = withStyles(styleSheet)(ElementList)
;
export default ElementListStyled;
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
