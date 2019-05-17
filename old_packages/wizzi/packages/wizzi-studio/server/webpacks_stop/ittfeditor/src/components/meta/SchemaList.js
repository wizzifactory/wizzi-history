/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schemalist.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
const styleSheet = createStyleSheet('SchemaList', theme => (
    {
        selected: {
            color: 'red'
        }
    }));

class SchemaList extends React.Component  {
    render() {
        const {
            classes,
            schemas,
            selectedSchemaUri,
            onSelectSchema
        } = this.props;
        return  (
                <List dense={true}>
                {
                    schemas.map((schema) => {
                        return  (
                                <ListItem key={schema.uri} className={selectedSchemaUri === schema.uri ? classes.selected : ''} onClick={() => {
                                    onSelectSchema(schema.uri);
                                }}>
                                    <ListItemText primary={schema.uri }>
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

SchemaList.propTypes = {
    schemas: PropTypes.array.isRequired,
    selectedSchemaUri: PropTypes.string,
    onSelectSchema: PropTypes.func.isRequired
}

const SchemaListStyled = withStyles(styleSheet)(SchemaList)
;
export default SchemaListStyled;
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
