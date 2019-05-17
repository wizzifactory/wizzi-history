/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\v5\apps\wizzi-demo\src\ittf\root\index.js.ittf
*/
'use strict';
var starter_essentials = require('./examples/starter/essentials');
var starter_apps = require('./examples/starter/apps');
var advanced_essentials = require('./examples/advanced/essentials');
var advanced_plugins = require('./examples/advanced/plugins');
var request = process.argv.length > 2 ? process.argv[2] : 'all';
var p1 = process.argv.length > 3 ? process.argv[3] : null;
if (request == 'se' || request == 'all') {
    starter_essentials(p1);
}
if (request == 'sa' || request == 'all') {
    starter_apps(p1);
}
if (request == 'ae' || request == 'all') {
    advanced_essentials(p1);
}
if (request == 'ap' || request == 'all') {
    advanced_plugins(p1);
}
