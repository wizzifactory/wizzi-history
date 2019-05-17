/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\jobs.js.ittf
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
var cp = require("child_process");
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
    app.get('/api/jobs/execfiles', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var refresh = check.optional('query', 'refresh');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.globals.getExecFileJobList({
            userId: req.user.id, 
            refresh: refresh === 'true'
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/execfiles', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/execfile', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('query', 'name');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.globals.getExecFile({
            userId: req.user.id, 
            name: name
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/execfile', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/runexecfile', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('query', 'name');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.globals.runExecFile({
            userId: req.user.id, 
            name: name
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/runexecfile', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/scripts', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var refresh = check.optional('query', 'refresh');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getConsoleScriptList({
            userId: req.user.id, 
            refresh: refresh === 'true'
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/scripts', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/script', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('query', 'name');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getConsoleScript({
            userId: req.user.id, 
            name: name
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/script', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/jobs/script', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('body', 'name');
        var content = check.notEmpty('body', 'content');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.saveConsoleScript({
            userId: req.user.id, 
            name: name, 
            content: content
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/script', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/runscript', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('query', 'name');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.runConsoleScript({
            userId: req.user.id, 
            name: name
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/runscript', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/batches', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var refresh = check.optional('query', 'refresh');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getBatchList({
            userId: req.user.id, 
            refresh: refresh === 'true'
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/batches', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/batch', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.optional('query', 'hash');
        var version = check.optional('query', 'version');
        var xpackage = check.optional('query', 'xpackage');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getBatch({
            userId: req.user.id, 
            hash: hash, 
            version: version, 
            xpackage: xpackage
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/batch', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/batch/exec', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getBatch({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            var batch;
            if (result.status.error) {
                return sendSuccess(res, result.status, result.data);
            }
            batch = result.data.batch;
            res.writeHead(200, {
                "Content-Type": "text/event-stream", 
                "Cache-control": "no-cache"
            });
            var spw = cp.spawn(batch.command, [
                batch.argv0
            ], {
                cwd: batch.cwd, 
                env: {
                    
                }, 
                argv0: undefined, 
                stdio: undefined, 
                detached: false, 
                shell: true, 
                windowsVerbatimArguments: false, 
                windowsHide: false
            }),
                str = "";
            console.log("/api/jobs/batch/exec : spawned");
            spw.stdout.on('data', function(data) {
                str += data.toString();
                // just so we can see the server is doing something
                console.log("data");
                // Flush out line by line.
                var lines = str.split("\n");
                for (var i in lines) {
                    if (i == lines.length - 1) {
                        str = lines[i];
                    }
                    else {
                        // Note: The double-newline is *required*
                        res.write('data: ' + lines[i] + "\n\n");
                    }
                }
            });
            spw.on('close', function(code) {
                console.log("/api/jobs/batch/exec : close", "code", code);
                res.write('data: ***___CLOSE___***\n\n');
                res.end(str);
            });
            spw.stderr.on('data', function(data) {
                console.log("/api/jobs/batch/exec : stderr data", data);
                res.end('stderr: ' + data);
            });
        });
    });
    app.get('/api/jobs/batch/gitcommit', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        var message = check.notEmpty('query', 'message');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getBatch({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            var batch;
            if (result.status.error) {
                return sendSuccess(res, result.status, result.data);
            }
            batch = result.data.batch;
            if (batch.git && batch.git.commit && batch.git.localPath) {
                scriptManager.gitExecToEventStream({
                    scriptPath: [
                        'cd ' + batch.git.localPath, 
                        'git add .', 
                        'git commit -m "' + message + ' commit"'
                    ].join('\n')
                }, res);
            }
            else {
                sendError(res, 'The batch has no commit info.');
            }
        });
    });
    app.get('/api/jobs/batch/gitpush', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getBatch({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            var batch;
            if (result.status.error) {
                return sendSuccess(res, result.status, result.data);
            }
            batch = result.data.batch;
            if (batch.git && batch.git.push && batch.git.localPath) {
                scriptManager.gitExecToEventStream({
                    scriptPath: [
                        'cd ' + batch.git.localPath, 
                        'git push -u origin master'
                    ].join('\n')
                }, res);
            }
            else {
                sendError(res, 'The batch has no push info.');
            }
        });
    });
    app.get('/api/jobs/gists', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var kind = check.optional('query', 'kind');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getGistList({
            userId: req.user.id, 
            kind: kind || 'gist'
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/gists', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/gist', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.getGist({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/gist', result.data.gist);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/jobs/gist', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var name = check.notEmpty('body', 'name');
        var schema = check.optional('body', 'schema');
        var type = check.optional('body', 'type');
        var kind = check.optional('body', 'kind');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.createGist({
            userId: req.user.id, 
            name: name, 
            schema: schema, 
            type: type, 
            kind: kind || 'gist'
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('post /api/jobs/gist', req.body, result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.put('/api/jobs/gist', function(req, res, next) {
        console.log('put.body', JSON.stringify(req.body));
        console.log('put.params', JSON.stringify(req.params));
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('body', 'hash');
        var content = check.notEmpty('body', 'content');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.updateGist({
            userId: req.user.id, 
            hash: hash, 
            content: content
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('put /api/jobs/gist', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.delete('/api/jobs/gist', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('body', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.deleteGist({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('delete /api/jobs/gist', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/jobs/gist/duplicate', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('body', 'hash');
        var newname = check.notEmpty('body', 'newname');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.duplicateGist({
            userId: req.user.id, 
            hash: hash, 
            newname: newname
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('delete /api/jobs/gist', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.post('/api/jobs/gist/rename', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('body', 'hash');
        var newname = check.notEmpty('body', 'newname');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.renameGist({
            userId: req.user.id, 
            hash: hash, 
            newname: newname
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('delete /api/jobs/gist', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/gistexec', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        var eventstream = check.optional('query', 'eventstream');
        if (check.errors) {
            return check.sendErrors(res);
        }
        api.jobs.executeGist({
            userId: req.user.id, 
            hash: hash, 
            res: eventstream === 'true' ? res : null
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/gistexec', result.status);
            sendSuccess(res, result.status, result.data);
        });
    });
    app.get('/api/jobs/wizzify', function(req, res, next) {
        var check = rest.paramsCheck(req);
        var hash = check.notEmpty('query', 'hash');
        if (check.errors) {
            return check.sendErrors(res);
        }
        console.log('/api/jobs/wizzify', hash);
        api.jobs.wizzifySnippet({
            userId: req.user.id, 
            hash: hash
        }, function(err, result) {
            if (err) {
                console.log('err', err);
                return sendError(res, err);
            }
            console.log('/api/jobs/wizzify', result.data);
            sendSuccess(res, result.status, result.data);
        });
    });
};
