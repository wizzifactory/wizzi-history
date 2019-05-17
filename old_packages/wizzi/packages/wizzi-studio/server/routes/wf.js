/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\wf.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Wf
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
    var wfApi = api.wf;
    app.get('/api/wf/load', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        var sessionData = {};
        var modelContext = {};
        var artifactContext = {};
        wfApi.loadModel(sessionData, uri, modelContext, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wf/trans', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        var transform = check.notEmpty('query', 'transform');
        if (check.errors) {
            return check.sendErrors(res);
        }
        var sessionData = {};
        var modelContext = {};
        var artifactContext = {};
        wfApi.transformModel(sessionData, uri, modelContext, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wf/gen', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        var artifact = check.notEmpty('query', 'artifact');
        if (check.errors) {
            return check.sendErrors(res);
        }
        var sessionData = {};
        var modelContext = {};
        var artifactContext = {};
        wfApi.loadModelAndGenerateArtifact(sessionData, uri, modelContext, artifact, artifactContext, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/wf/gen', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var content = check.notEmpty('body', 'content');
        var artifactName = check.notEmpty('body', 'artifactName');
        if (check.errors) {
            return check.sendErrors(res);
        }
        var sessionData = {};
        var modelContext = {};
        var artifactContext = {};
        var ss = artifactName.split('/');
        var schema = ss[0];
        var artifact = ss[1];
        wfApi.generateArtifactFromText(sessionData, content, modelContext, schema, artifact, artifactContext, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/wf/schema', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('query', 'name');
        if (check.errors) {
            return check.sendErrors(res);
        }
        var sessionData = {};
        var modelContext = {};
        var artifactContext = {};
        wfApi.schemaObject(sessionData, name, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/wf/jswizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var source = check.notEmpty('body', 'source');
        var checked = check.optional('body', 'checked');
        if (check.errors) {
            return check.sendErrors(res);
        }
        var isChecked = checked === 'true' ? true : false;
        wfApi.jsWizzify(source, isChecked, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/wf/htmlwizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var source = check.notEmpty('body', 'source');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wfApi.htmlWizzify(source, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/wf/csswizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var source = check.notEmpty('body', 'source');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wfApi.cssWizzify(source, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/wf/xmlwizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var source = check.notEmpty('body', 'source');
        if (check.errors) {
            return check.sendErrors(res);
        }
        wfApi.xmlWizzify(source, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
};
