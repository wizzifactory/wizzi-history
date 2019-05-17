/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\utils\prism.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
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
