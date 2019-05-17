/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\studio.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Studio
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
    var studioApi = api.studio;
    app.get('/api/studio/check', function(req, res, next) {
        studioApi.getCheck(function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/commons', function(req, res, next) {
        studioApi.getCommons({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/studio/commons', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/commons/defaultartifacts', function(req, res, next) {
        studioApi.getDefaultArtifacts({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/user', function(req, res, next) {
        studioApi.getUser({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/studio/user/create', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var project = check.notEmpty('body', 'project');
        studioApi.createUser({
            userId: req.user.id, 
            currentProject: project
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
        if (check.errors) {
            return check.sendErrors(res);
        }
    });
    app.post('/api/studio/user', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var project = check.notEmpty('body', 'project');
        studioApi.updateUser({
            userId: req.user.id, 
            currentProject: project
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
        if (check.errors) {
            return check.sendErrors(res);
        }
    });
    app.get('/api/studio/packages', function(req, res, next) {
        studioApi.getPackages({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/package', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var id = check.notEmpty('query', 'id');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getPackage({
            userId: req.user.id, 
            packageId: id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/schemas', function(req, res, next) {
        studioApi.getSchemas({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/schema/jsondoc', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getSchemaJsonDoc({
            userId: req.user.id, 
            schemaUri: uri
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/schema', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getSchema({
            userId: req.user.id, 
            schemaUri: uri
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/projects', function(req, res, next) {
        studioApi.getProjects({
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/studio/project', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var project = check.notEmpty('body', 'project');
        studioApi.createProject({
            projectName: project, 
            userId: req.user.id
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
        if (check.errors) {
            return check.sendErrors(res);
        }
    });
    app.get('/api/studio/documents', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var project = check.notEmpty('query', 'project');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getDocuments({
            userId: req.user.id, 
            projectName: project
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/document', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getDocument(uri, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/studio/document', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.optional('body', 'uri');
        if (uri != null) {
            console.log('POST /api/studio/document req.body', req.body);
            var newcontent = check.notEmpty('body', 'newcontent');
            studioApi.updateDocument(uri, newcontent, function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        else {
            var kind = check.optional('body', 'kind');
            var project = check.optional('body', 'project');
            var folder = check.optional('body', 'folder');
            var name = check.notEmpty('body', 'name');
            var schema = check.notEmpty('body', 'schema');
            studioApi.createDocument({
                kind: kind, 
                documentName: name, 
                schemaName: schema, 
                folder: folder, 
                projectName: project, 
                userId: req.user.id
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        if (check.errors) {
            return check.sendErrors(res);
        }
    });
    app.delete('/api/studio/document', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.deleteDocument(uri, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/fragments', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var project = check.notEmpty('query', 'project');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getFragments({
            userId: req.user.id, 
            projectName: project
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/fragment', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.getFragment(uri, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/studio/fragment', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.optional('body', 'uri');
        if (uri != null) {
            console.log('POST /api/studio/fragment req.body', req.body);
            var newcontent = check.notEmpty('body', 'newcontent');
            studioApi.updateFragment(uri, newcontent, function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        else {
            var kind = check.optional('body', 'kind');
            var project = check.optional('body', 'project');
            var folder = check.optional('body', 'folder');
            var name = check.notEmpty('body', 'name');
            var schema = check.notEmpty('body', 'schema');
            studioApi.createFragment({
                kind: kind, 
                fragmentName: name, 
                schemaName: schema, 
                projectName: project, 
                folder: folder
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        if (check.errors) {
            return check.sendErrors(res);
        }
    });
    app.delete('/api/studio/fragment', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.deleteFragment(uri, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/studio/artifact', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var uri = check.notEmpty('query', 'uri');
        var artifact = check.notEmpty('query', 'artifact');
        if (check.errors) {
            return check.sendErrors(res);
        }
        studioApi.generateArtifact(uri, artifact, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
};
