/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\home.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Home
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
    var homeApi = api.home;
    app.get('/', function(req, res, next) {
        return res.redirect('/ittf/home/index.html.ittf');
        var payload = {};
        res.set('Content-Type', 'text/html');
        res.send(view(payload));
        function view(ctx) {
            var __html = [];
            __html.push('<html>');
            __html.push('<head>');
            __html.push('<link rel="' + "stylesheet" + '" href="' + "/static/lib/codemirror/lib/codemirror.css" + '">');
            __html.push('</link>');
            __html.push('<link rel="' + "stylesheet" + '" href="' + "/static/lib/codemirror/addon/display/fullscreen.css" + '">');
            __html.push('</link>');
            __html.push('<link rel="' + "stylesheet" + '" href="' + "/ittf/home/css/main.css.ittf" + '">');
            __html.push('</link>');
            __html.push('</head>');
            __html.push('<body>');
            __html.push('<div id="' + "root" + '">');
            __html.push('</div>');
            __html.push('\n<script src="' + "/static/lib/codemirror/lib/codemirror.js" + '">\n');
            __html.push('</script>\n');
            __html.push('\n<script src="' + "/static/lib/codemirror/mode/javascript/javascript.js" + '">\n');
            __html.push('</script>\n');
            __html.push('\n<script src="' + "/static/lib/codemirror/mode/yaml/yaml.js" + '">\n');
            __html.push('</script>\n');
            __html.push('\n<script src="' + "/static/lib/codemirror/addon/display/fullscreen.js" + '">\n');
            __html.push('</script>\n');
            __html.push('\n<script src="' + "/webpack/ittfeditor/bundle.js" + '">\n');
            __html.push('</script>\n');
            __html.push('</body>');
            __html.push('</html>');
            return __html.join('');
        }
        function view_x(ctx) {
            var __html = [];
            __html.push('<html>');
            __html.push('<head>');
            __html.push('<link rel="' + "stylesheet" + '" href="' + "https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css" + '">');
            __html.push('</link>');
            __html.push('<link rel="' + "stylesheet" + '" href="' + "https://fonts.googleapis.com/css?family=Roboto:300,400,500" + '">');
            __html.push('</link>');
            __html.push('</head>');
            __html.push('<body>');
            __html.push('<div id="' + "app" + '">');
            __html.push('</div>');
            __html.push('\n<script src="' + "/webpack/home/bundle.js" + '">\n');
            __html.push('</script>\n');
            __html.push('</body>');
            __html.push('</html>');
            return __html.join('');
        }
    });
};
