/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\wizzi\ittf\server\webpacks\home\src\utils\prism.js.ittf
    utc time: Mon, 20 Aug 2018 16:09:59 GMT
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
