/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\codebeautify.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from "react";
import CodeHighLight from './CodeHighLight';
var beauties = {};
beauties['js'] = require('js-beautify').js;
beauties['html'] = require('js-beautify').html;
beauties['css'] = require('js-beautify').css;
const CodeBeautify = ({ codeSnippet, language, indentSize }) => {
    var formattedCodeSnippet = codeSnippet;
    if (beauties[language]) {
        formattedCodeSnippet = beauties[language](codeSnippet, {
            indent_size: indentSize || 2
        });
    }
    return  (
            <CodeHighLight language={ language || 'js' } codeSnippet={ formattedCodeSnippet }>
            </CodeHighLight>
        )
    ;
};
export default CodeBeautify;
