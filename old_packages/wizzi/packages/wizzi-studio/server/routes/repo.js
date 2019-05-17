/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\repo.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Repo
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
    var repoApi = api.repo;
    app.get('/repo/:user', function(req, res, next) {
        repoApi.getUserRoot(req.params.user, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            // log '/repo/' + req.params.user, result.data
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/repo/:user/:project', function(req, res, next) {
        repoApi.getProjectRoot(req.params.user, req.params.project, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            // log '/repo/' + req.params.user + '/' + req.params.project, result.data
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/repo/:user/:project/*', function(req, res, next) {
        repoApi.getFolderOrFile(req.params.user, req.params.project, req.params['0'], function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/repo/:user/:project/*', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var kind = check.notUndefined('body', 'kind');
        var action = check.optional('body', 'action');
        var content = check.optional('body', 'content');
        var newname = check.optional('body', 'newname');
        if (check.errors) {
            return check.sendErrors(res);
        }
        if (kind == 0) {
            if (action === 'duplicate') {
                repoApi.duplicateFolder(req.params.user, req.params.project, req.params['0'], newname, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
            else if (action === 'rename') {
                repoApi.renameFolder(req.params.user, req.params.project, req.params['0'], newname, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
            else {
                repoApi.createFolder(req.params.user, req.params.project, req.params['0'], function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
        }
        else if (kind == 1) {
            if (action === 'duplicate') {
                repoApi.duplicateDocument(req.params.user, req.params.project, req.params['0'], newname, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
            else if (action === 'rename') {
                repoApi.renameDocument(req.params.user, req.params.project, req.params['0'], newname, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
            else {
                repoApi.createDocument(req.params.user, req.params.project, req.params['0'], content, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
        }
        else {
            sendError("The 'kind' parameter has an invalid value");
        }
    });
    app.delete('/repo/:user/:project/*', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var kind = check.notUndefined('body', 'kind');
        if (check.errors) {
            return check.sendErrors(res);
        }
        if (kind == 0) {
            repoApi.deleteFolder(req.params.user, req.params.project, req.params['0'], function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        else if (kind == 1) {
            repoApi.deleteDocument(req.params.user, req.params.project, req.params['0'], function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        else {
            sendError("The 'kind' parameter has an invalid value");
        }
    });
    app.delete('/repo/batch', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var fsitems = check.notUndefined('body', 'fsitems');
        var currentPath = check.optional('body', 'currentPath');
        if (check.errors) {
            return check.sendErrors(res);
        }
        repoApi.deleteFsItems(fsitems, currentPath, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            sendSuccess(res, result.status, result.data);
        });
    });
    app.put('/repo/:user/:project/*', function(req, res, next) {
        console.log('put.body', JSON.stringify(req.body));
        console.log('put.params', JSON.stringify(req.params));
        var check = rest.paramsCheck(req);
        var kind = check.notUndefined('body', 'kind');
        var content = check.optional('body', 'content');
        var copyCut = check.optional('body', 'copyCut');
        var fsitems = check.optional('body', 'fsitems');
        if (check.errors) {
            return check.sendErrors(res);
        }
        if (kind == 1) {
            console.log('Kind 1 updateDocument');
            repoApi.updateDocument(req.params.user, req.params.project, req.params['0'], content, function(err, result) {
                if (err) {
                    console.log('err', err);
                    return sendError(res, err);
                }
                sendSuccess(res, result.status, result.data);
            });
        }
        else if (kind == 2) {
            if (copyCut === 'copy') {
                console.log('Kind 2 copyPasteFsItems');
                repoApi.copyPasteFsItems(req.params.user, req.params.project, req.params['0'], fsitems, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
            else if (copyCut === 'cut') {
                console.log('Kind 2 cutPasteFsItems');
                repoApi.cutPasteFsItems(req.params.user, req.params.project, req.params['0'], fsitems, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        return sendError(res, err);
                    }
                    sendSuccess(res, result.status, result.data);
                });
            }
            else {
                sendError(res, "The 'copyCut' parameter has an invalid value for kind == 2.");
            }
        }
        else {
            sendError(res, "The 'kind' parameter has an invalid value");
        }
    });
};
