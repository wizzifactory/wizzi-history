/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\build.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Jobs
*/
// Dependencies
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var rest = require('../lib/rest');
var u = require('../lib/utils');
var wizziScripts = require("wizzi-scripts");
var scriptManager = new wizziScripts.Manager();
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
    var jobsApi = api.jobs;
    app.get('/api/build/transpile', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        var eventstream = check.optional('query', 'eventstream');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.build.transpileSnippet({
            userId: req.user.id, 
            hash: hash, 
            res: eventstream === 'true' ? res : null
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/build/transpile', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/build/ast', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        var eventstream = check.optional('query', 'eventstream');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.build.getSnippetAst({
            userId: req.user.id, 
            hash: hash, 
            res: eventstream === 'true' ? res : null
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/build/ast', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/build/flow', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        var eventstream = check.optional('query', 'eventstream');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.build.flowSnippet({
            userId: req.user.id, 
            hash: hash, 
            res: eventstream === 'true' ? res : null
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/build/flow', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/build/prettier', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        var eventstream = check.optional('query', 'eventstream');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.build.prettierSnippet({
            userId: req.user.id, 
            hash: hash, 
            res: eventstream === 'true' ? res : null
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/build/prettier', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/build/eslint', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        var eventstream = check.optional('query', 'eventstream');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.build.eslintSnippet({
            userId: req.user.id, 
            hash: hash, 
            res: eventstream === 'true' ? res : null
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/build/lint', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
};
