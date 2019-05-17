/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\codeprettier.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from "react";
import prettier  from 'prettier';
import CodeHighLight from './CodeHighLight';
const CodePrettier = ({ codeSnippet, language }) => {
    var parser;
    if (language === 'js') {
        parser = 'babylon';
    }
    else if (language === 'flow') {
        parser = 'flow';
    }
    else if (language === 'ts') {
        parser = 'typescript';
    }
    else if (language === 'css') {
        parser = 'postcss';
    }
    else if (language === 'json') {
        parser = 'json';
    }
    else if (language === 'graphql') {
        parser = 'graphql';
    }
    else if (language === 'markdown') {
        parser = 'markdown';
    }
    else {
        parser = 'babylon';
    }
    const message = [
        "Sorry but", 
        "Prettier doesn't work when builded with webpack", 
        "because it tries to access the filesystem.", 
        "We must call a service to make it work.", 
        "", 
        ""
    ].join('\n');
    const formattedCodeSnippet = message + codeSnippet;
    /**
        const formattedCodeSnippet = prettier.format(codeSnippet, {
            parser: parser
        });
    */
    return  (
            <CodeHighLight language={ language || 'js' } codeSnippet={ formattedCodeSnippet }>
            </CodeHighLight>
        )
    ;
};
export default CodePrettier;
