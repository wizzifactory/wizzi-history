/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\files.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
export const requireMarkdown = require.context('../pages', true, /^((?![\\/]component-demos[\\/]).)*\.md$/);
export const componentAPIs = requireMarkdown.keys().reduce((res, n) => {
    console.log('files.componentAPIs res, n', res, n);
    if (/^\.\/component-api\//.test(n)) {
        res.push({
            path: n, 
            name: n.replace(/.*\//, '').replace('.md', '')
        });
    }
    return res;
}, []);
export const requireDemo = require.context('../pages/component-demos', true, /\.md$/);
export const demos = requireDemo.keys().map((n) => {
    console.log('files.requireDemo n', n);
    return {
            path: n, 
            name: n.replace(/.*\//, '').replace('.md', '')
        };
});
const headerRegexp = /---\n(.*)\n---/;
const componentsRegexp = /^components: (.*)$/;
export const demoComponentsTree = demos.map((demo) => {
    const content = requireDemo(demo.path);
    const header = content.match(headerRegexp);
    console.log('files.demoComponentsTree content, header', content, header);
    const node = {
        demo, 
        components: []
    };
    if (!header) {
        return node;
    }
    const components = header[1].match(componentsRegexp);
    if (!components) {
        return node;
    }
    node.components = components[1].split(', ');
    return node;
});
