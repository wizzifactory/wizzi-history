/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\wizzi.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Wizzi
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
    var wizziApi = api.wizzi;
    app.get('/api/wizzi/check', function(req, res, next) {
        wizziApi.getCheck({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/kernel/info', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var packageName = check.optional('query', 'packageName');
        var version = check.optional('query', 'version');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getKernelInfo({
            userId: req.user.id, 
            packageName: packageName, 
            version: version
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/ittf', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getIttfDocument({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.put('/api/wizzi/ittf', function(req, res, next) {
        console.log('put.body', JSON.stringify(req.body));
        console.log('put.params', JSON.stringify(req.params));
        console.log('req.body', req.body);
        console.log('req.query', req.query);
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('body', 'hash');
        var content = check.notEmpty('body', 'content');
        var prettify = check.optional('body', 'prettify');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.putIttfDocument({
            userId: req.user.id, 
            hash: hash, 
            content: content, 
            prettify: prettify
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/ittf/defaultartifact', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.generateDefaultArtifact({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/ittf/mtreedebug', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getMTreeDebugInfo({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/ittf/wizzifactory', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var storeKind = check.notEmpty('query', 'storeKind');
        var plugins = check.optional('query', 'plugins');
        var globalContext = check.optional('query', 'globalContext');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getWizziFactoryInfo({
            userId: req.user.id, 
            storeKind: storeKind, 
            plugins: plugins, 
            globalContext: globalContext
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/wfjob', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.generateWfJob({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/wfschema', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        var packageName = check.optional('query', 'packageName');
        var version = check.optional('query', 'version');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.generateWfSchema({
            userId: req.user.id, 
            hash: hash, 
            packageName: packageName, 
            version: version
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/kernel/packages', function(req, res, next) {
        wizziApi.getKernelPackages({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/kernel/package', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var xpackage = check.notEmpty('query', 'xpackage');
        var version = check.optional('query', 'version');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getKernelPackage({
            userId: req.user.id, 
            packageName: xpackage, 
            version: version
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/plugins/packages', function(req, res, next) {
        wizziApi.getPluginsPackages({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/plugin/package', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var xpackage = check.notEmpty('query', 'xpackage');
        var version = check.optional('query', 'version');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getPluginPackage({
            userId: req.user.id, 
            packageName: xpackage, 
            version: version
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/plugin/schemas', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var xpackage = check.notEmpty('query', 'xpackage');
        var version = check.optional('query', 'version');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getPluginSchemas({
            userId: req.user.id, 
            packageName: xpackage, 
            version: version
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/plugin/artifacts', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var xpackage = check.notEmpty('query', 'xpackage');
        var version = check.optional('query', 'version');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wizziApi.getPluginArtifacts({
            userId: req.user.id, 
            packageName: xpackage, 
            version: version
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wizzi/system/packages', function(req, res, next) {
        wizziApi.getSystemPackages({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
};
