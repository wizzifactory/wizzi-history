/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\codehighlightdemo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from "react";
import CodeHighLight from '../mui/CodeHighLight';
const jsSnippet = [
    "import Lowlight from 'react-lowlight'", 
    "", 
    "// Load any languages you want to use", 
    "// (see https://github.com/isagalaev/highlight.js/tree/master/src/languages)", 
    "import js from 'highlight.js/lib/languages/javascript", 
    "", 
    "// Then register them with lowlight", 
    "Lowlight.registerLanguage('js', js)", 
    "", 
    "ReactDOM.render(", 
    "  <Lowlight", 
    "    language='js'", 
    "    value='/* Code to highlight */'", 
    "  />,", 
    "  document.getElementById('target')", 
    ")"
].join('\n');
const CodeHighLightDemo = () => (
        <CodeHighLight language={ 'js' } codeSnippet={ jsSnippet }>
        </CodeHighLight>
    );
export default CodeHighLightDemo;
