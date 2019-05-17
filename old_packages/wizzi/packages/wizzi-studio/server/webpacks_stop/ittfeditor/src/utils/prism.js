/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\utils\prism.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
// eslint-disable import/no-webpack-loader-syntax
import lightTheme from '!raw-loader!prismjs/themes/prism.css';
import darkTheme from '!raw-loader!prismjs/themes/prism-okaidia.css';
// eslint-enable import/no-webpack-loader-syntax
export { lightTheme, darkTheme };
const styleNode = window.document.createElement('style');
styleNode.setAttribute('data-prism', true);
window.document.head.appendChild(styleNode);
export function setPrismTheme(theme = lightTheme) {
    styleNode.textContent = theme;
};
export default prism;
