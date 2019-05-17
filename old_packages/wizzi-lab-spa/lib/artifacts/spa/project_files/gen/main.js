/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v2\sources\plugins\wizzi-lab-spa\ittf\lib\artifacts\spa\project_files\gen\main.js.ittf
    utc time: Mon, 17 Jul 2017 15:07:32 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'spa.project_files.main';
md.gen = function(model, ctx, callback) {
    console.log(myname, model.gd.name);
    if (model.gd.name === 'package') {
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'package.json.ittf');
        wizzi.jsonDocument(ittfDocumentPath, {
            pkg: model.spa.package
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
    else if (model.gd.name === 'gulp') {
        console.log(myname, util.inspect(model.spa.browserify, { depth: 2 }));
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'gulp.js.ittf');
        wizzi.jsModule(ittfDocumentPath, {
            browserify: model.spa.browserify, 
            react: model.spa.react
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
    else if (model.gd.name === 'webpack') {
        console.log(myname, util.inspect(model.spa.webpack, { depth: 2 }));
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'webpack.js.ittf');
        wizzi.jsModule(ittfDocumentPath, {
            spa: model.spa, 
            react: model.spa.react
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
    else if (model.gd.name === 'react-webpack-env') {
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'react-webpack', 'env.js.ittf');
        wizzi.jsModule(ittfDocumentPath, {
            spa: model.spa
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
    else if (model.gd.name === 'react-webpack-paths') {
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'react-webpack', 'paths.js.ittf');
        wizzi.jsModule(ittfDocumentPath, {
            spa: model.spa
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
    else if (model.gd.name === 'react-webpack-polyfill') {
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'react-webpack', 'polyfill.js.ittf');
        wizzi.jsModule(ittfDocumentPath, {
            spa: model.spa
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
    else {
        var ittfDocumentPath = path.join(__dirname, 'ittf', 'main.js.ittf');
        wizzi.textDocument(ittfDocumentPath, {
            gd: model.gd
        }, function(err, result) {
            if (err) {
                throw new Error(err);
            }
            ctx.w(result);
            callback(null, ctx);
        });
    }
};
