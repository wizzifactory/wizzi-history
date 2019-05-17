/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schemadoc\attribute.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Comments from './Comments';
import Flags from './Flags';
const Attribute = (props) => {
    const {
        attr
    } = props;
    var xenums = null;
    if (attr.enums.length > 0) {
        xenums =  (
            <div>
            Restrict - Enum
                <table>
                attr.enums.map((xenum) => {
                     (
                        <tr>
                            <td>
                            {xenum.name}
                            </td>
                        
                            <td>
                                <Comments comments={xenum.comments}>
                                </Comments>
                            
                            </td>
                        
                        </tr>
                    )
                })</table>
            
            </div>
        )
        ;
    }
    return  (
            <tr>
                <td>
                {attr.tag}
                </td>
            
                <td>
                {attr.name}
                </td>
            
                <td>
                {attr.type}
                </td>
            
                <td>
                {attr.default}
                </td>
            
                <td>
                    <Flags flags={attr.flags}>
                    </Flags>
                
                </td>
            
                <td>
                    <Comments comments={attr.comments}>
                    </Comments>
                
                {xenums}
                </td>
            
            </tr>
        )
    ;
}

Attribute.propTypes = {
    attr: PropTypes.object
}

export default Attribute;
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
