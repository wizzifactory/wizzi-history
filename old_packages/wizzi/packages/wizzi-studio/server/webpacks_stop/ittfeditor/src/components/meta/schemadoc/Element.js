/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schemadoc\element.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Comments from './Comments';
import Flags from './Flags';
import Attribute from './Attribute';
const Element = (props) => {
    const {
        element
    } = props;
    const attributes = element.attributes.map((attr) => {
         (
            <Attribute attr={attr}>
            </Attribute>
        )
    });
    return  (
            <div>
                <h4>
                Element {element.name}
                </h4>
            
                <Comments data={element.comments}>
                </Comments>
            
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                            Tag
                            </th>
                        
                            <th>
                            Super
                            </th>
                        
                            <th>
                            Is root
                            </th>
                        
                            <th>
                            Flags
                            </th>
                        
                        </tr>
                    
                    </thead>
                
                    <tbody>
                        <tr>
                            <td>
                            {element.tags.join(' | ' )}
                            </td>
                        
                            <td>
                            {element.super}
                            </td>
                        
                            <td>
                            {element.isRoot}
                            </td>
                        
                            <td>
                                <Flags flags={element.flags}>
                                </Flags>
                            
                            </td>
                        
                        </tr>
                    
                    </tbody>
                
                </table>
            
                <section>
                 (
                    <h5>
                    Attributes
                    </h5>
                )
                 (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                Tag
                                </th>
                            
                                <th>
                                Name
                                </th>
                            
                                <th>
                                Type
                                </th>
                            
                                <th>
                                Default
                                </th>
                            
                                <th>
                                Flags
                                </th>
                            
                                <th>
                                Description
                                </th>
                            
                            </tr>
                        
                        </thead>
                    
                        <tbody>
                        {attributes}
                        </tbody>
                    
                    </table>
                )
                </section>
            
            </div>
        )
    ;
}

Element.propTypes = {
    element: PropTypes.object
}

export default Element;
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
