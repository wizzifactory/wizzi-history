/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\app.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: App
*/
// Dependencies
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var rest = require('../lib/rest');
var u = require('../lib/utils');
/**
     Helpers
*/
function sendError(res, err, options) {
    rest.sendError(res, err, options);
}
function sendSuccess(res, result, options) {
    rest.sendSuccess(res, result, options);
}
/**
     Routes
*/
module.exports = function(app, api) {
    var appApi = api.app;
    app.get('/app/formbuilder', function(req, res, next) {
        var payload = {};
        res.set('Content-Type', 'text/html');
        res.send(view(payload));
        function view(ctx) {
            var __html = [];
            __html.push('<html>');
            __html.push('<head>');
            __html.push('<link href="/ittf/demo/apps/formbuilder/styles.css.ittf" rel="stylesheet">')
            __html.push('</head>');
            __html.push('<body>');
            __html.push('<div id="' + "root" + '">');
            __html.push('</div>');
            __html.push('\n<script src="' + "/webpack/formbuilder/bundle.js" + '">\n');
            __html.push('</script>\n');
            __html.push('</body>');
            __html.push('</html>');
            return __html.join('');
        }
    });
    app.get('/app/cssstyle', function(req, res, next) {
        var payload = {};
        res.set('Content-Type', 'text/html');
        res.send(view(payload));
        function view(ctx) {
            var __html = [];
            __html.push('<html>');
            __html.push('<head>');
            __html.push('<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">')
            __html.push('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">')
            __html.push('</head>');
            __html.push('<body>');
            __html.push('<div id="' + "root" + '">');
            __html.push('</div>');
            __html.push('\n<script src="' + "/webpack/cssstyle/bundle.js" + '">\n');
            __html.push('</script>\n');
            __html.push('</body>');
            __html.push('</html>');
            return __html.join('');
        }
    });
    app.get('/app/csslayout', function(req, res, next) {
        var payload = {};
        res.set('Content-Type', 'text/html');
        res.send(view(payload));
        function view(ctx) {
            var __html = [];
            __html.push('<html>');
            __html.push('<head>');
            __html.push('<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">')
            __html.push('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">')
            __html.push('</head>');
            __html.push('<body>');
            __html.push('<div id="' + "root" + '">');
            __html.push('</div>');
            __html.push('\n<script src="' + "/webpack/csslayout/bundle.js" + '">\n');
            __html.push('</script>\n');
            __html.push('</body>');
            __html.push('</html>');
            return __html.join('');
        }
    });
    app.get('/app/wf', function(req, res, next) {
        var payload = {};
        res.set('Content-Type', 'text/html');
        res.send(view(payload));
        function view(ctx) {
            var __html = [];
            __html.push('<html>');
            __html.push('<head>');
            __html.push('</head>');
            __html.push('<body>');
            __html.push('<div id="' + "root" + '">');
            __html.push('</div>');
            __html.push('\n<script src="' + "/webpack/wf/bundle.js" + '">\n');
            __html.push('</script>\n');
            __html.push('</body>');
            __html.push('</html>');
            return __html.join('');
        }
    });
};
