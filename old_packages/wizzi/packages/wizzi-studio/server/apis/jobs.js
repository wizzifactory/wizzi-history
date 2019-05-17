/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\jobs.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Jobs
*/
/**
     Dependencies
*/
var util = require('util');
var path = require('path');
var async = require('async');
var _ = require('lodash');
var wizzi = require('wizzi');
var file = wizzi.file;
var verify = wizzi.verify;
var u = require('../lib/utils');
var globalApi;
var globalConfig;
var assert = require('assert');
var chalk = require('chalk');
var fs = require('fs');
var temp = require('temp');
var myCrypto = require('../lib/myCrypto');
function hashEncrypt(text) {
    // return myCrypto.encryptSimple(text)
    return myCrypto.encrypt(text);
}
function hashDecrypt(text) {
    // return myCrypto.decryptSimple(text)
    return myCrypto.decrypt(text);
}
var wizziTools = require("wizzi-tools");
var wizziScripts = require("wizzi-scripts");
var scriptManager = new wizziScripts.Manager();
function error(message) {
    return {
            __is_error: true, 
            message: message
        };
}
function success(message) {
    return {
            __is_success: true, 
            message: message
        };
}
function filefy(textOrPath, callback) {
    if (file.isFile(textOrPath)) {
        return callback(null, textOrPath);
    }
    temp.track();
    temp.open('ittfSource', function(err, info) {
        if (err) {
            return callback(err);
        }
        fs.write(info.fd, textOrPath);
        fs.close(info.fd, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, info.path);
        });
    });
}
function makeWizziFactoryCreator(storeKind, plugins, configGlobalContext, configUser, configRoleOrSubscription) {
    configGlobalContext = configGlobalContext || {};
    if (verify.isString(configUser) && verify.isString(configRoleOrSubscription)) {
        return function createWizziFactory(globalContext, callback) {
                globalContext = _.merge(configGlobalContext, globalContext || {});
                wizzi.createFactory(configUser, configRoleOrSubscription, {
                    repo: {
                        storeKind: storeKind
                    }, 
                    plugins: {
                        items: plugins
                    }, 
                    globalContext: globalContext || {}
                }, callback);
            };
    }
    else {
        return function createWizziFactory(user, roleOrSubscription, globalContext, callback) {
                globalContext = _.merge(configGlobalContext, globalContext || {});
                wizzi.createFactory(user, roleOrSubscription, {
                    repo: {
                        storeKind: storeKind
                    }, 
                    plugins: {
                        items: plugins
                    }, 
                    globalContext: globalContext || {}
                }, callback);
            };
    }
}
// TODO transform in cache with expiring time
var jobsStore = {};
function makePaths(config) {
    return {
            normalize: function(filepath) {
                return verify.replaceAll(filepath, '\\', '/');
            }, 
            uriFromPath: function(filepath, excludeIttfExtension) {
                filepath = this.normalize(filepath).toLowerCase();
                if (excludeIttfExtension && verify.endsWith(filepath, '.ittf')) {
                    filepath = filepath.substr(0, filepath.length - 5);
                }
                return filepath.substr(config.studioBasePath.length);
            }, 
            pathFromUri: function(uri) {
                return path.join(config.studioBasePath, uri);
            }, 
            joinPathFromArray: function(segments) {
                var ret = segments[0];
                for (var i=1; i<segments.length; i++) {
                    ret = path.join(ret, segments[i]);
                }
                return ret;
            }, 
            fileInfoByPath: function(filePath, baseFolder, baseUri) {
                filePath = this.normalize(filePath);
                baseFolder = this.normalize(baseFolder);
                var basename = path.basename(filePath);
                var dirname = path.dirname(filePath);
                var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
                var fileUri = filePath.substr(baseFolder.length);
                var ss = basename.split('.');
                if (ss[ss.length-1] === 'ittf') {
                    return {
                            uri: (baseUri || '') + fileUri, 
                            name: ss.slice(0, ss.length-2).join('.'), 
                            basename: basename, 
                            displayName: (relFolder.length > 0 ? relFolder + '/' + basename : basename), 
                            isIttfDocument: true, 
                            isFragment: filePath.indexOf('/t/') > -1, 
                            schema: ss[ss.length-2], 
                            mime: ss[ss.length-2], 
                            relFolder: relFolder, 
                            fullPath: filePath, 
                            hash: hashEncrypt(filePath)
                        };
                }
                else {
                    return {
                            uri: fileUri, 
                            name: ss.slice(0, ss.length-1).join('.'), 
                            basename: basename, 
                            displayName: (relFolder.length > 0 ? relFolder + '/' + basename : basename), 
                            isIttfDocument: false, 
                            schema: null, 
                            mime: ss[ss.length-1], 
                            relFolder: relFolder, 
                            fullPath: filePath, 
                            hash: hashEncrypt(filePath)
                        };
                }
            }, 
            getFolderFiles: function(folderPath, baseFolderPath, baseUri, callback) {
                if (typeof callback === 'undefined') {
                    callback = baseUri;
                    baseUri = '';
                }
                var glob = this.normalize(folderPath) + '/*.*';
                var files = file.getGlobbedFiles(glob);
                console.log('wizzi-studio.apis.gists.getFolderFiles', glob, files);
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    ret.push(this.fileInfoByPath(item, baseFolderPath, baseUri));
                }
                return callback(null, {
                        status: success("Got folder files"), 
                        data: {
                            items: ret
                        }
                    });
            }, 
            getIttfFilesOfSchema: function(folderPath, schemaName) {
                var suffix = '.' + schemaName + '.ittf';
                var glob = this.normalize(folderPath) + '/*.' + schemaName + '.ittf';
                var files = file.getGlobbedFiles(glob);
                console.log('getFolderIttfFiles', glob, schemaName, files);
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    var dirName = path.dirname(item);
                    var baseName = path.basename(item);
                    var name = baseName.substring(0, baseName.length - suffix.length);
                    ret.push({
                        name: name, 
                        baseName: baseName, 
                        dirName: dirName, 
                        fullPath: this.normalize(path.join(dirName, path.basename(item)))
                    });
                }
                return ret;
            }, 
            fsItemExists: function(filePath, callback) {
                return callback(null, file.exists(filePath));
            }, 
            getFile: function(filePath, callback) {
                file.readFile(filePath, callback);
            }, 
            putFile: function(filePath, content, callback) {
                file.writeFile(filePath, content, callback);
            }, 
            deleteFile: function(filePath, callback) {
                file.deleteFile(filePath, callback);
            }, 
            duplicateFsItem: function(itemPath, newPath, callback) {
                file.duplicate(itemPath, newPath, callback);
            }, 
            renameFsItem: function(oldPath, newPath, callback) {
                file.rename(oldPath, newPath, callback);
            }, 
            consoleIttfFolder: function() {
                return path.join(config.jobsBasePath, 'console', 'ittf');
            }, 
            consoleIttfDocument: function(name) {
                return path.join(config.jobsBasePath, 'console', 'ittf', name + '.js.ittf');
            }, 
            consoleJsFolder: function() {
                return path.join(config.jobsBasePath, 'console', 'js');
            }, 
            consoleJsDocument: function(name) {
                return path.join(config.jobsBasePath, 'console', 'js', name + '.js');
            }, 
            consoleRunFolder: function() {
                return path.join(config.jobsBasePath, 'console', 'run');
            }, 
            consoleRunResult: function(name) {
                return path.join(config.jobsBasePath, 'console', 'run', name + '.json');
            }, 
            getConsoleIttfDocuments: function() {
                return this.getIttfFilesOfSchema(this.consoleIttfFolder(), 'js');
            }, 
            batchesIttfFolderPath: function() {
                return path.join(config.jobsBasePath, 'batches', 'ittf');
            }, 
            batchesIttfDocumentPath: function(name) {
                return path.join(this.batchesIttfFolderPath(), name + '.json.ittf');
            }, 
            batchesIttfDocuments: function() {
                return this.getIttfFilesOfSchema(this.batchesIttfFolderPath(), 'json');
            }, 
            gistFolderNameFromKind: function(kind, userId) {
                if (userId) {
                    if (kind === 'gist') {
                        return 'gists/' + userId;
                    }
                    else if (kind === 'fragment') {
                        return 'gists/' + userId + '/t';
                    }
                    else if (kind === 'context') {
                        return 'contexts/' + userId;
                    }
                    else {
                        return 'snippets/' + userId;
                    }
                }
                else {
                    if (kind === 'gist') {
                        return 'gists';
                    }
                    else if (kind === 'fragment') {
                        return 'gists';
                    }
                    else if (kind === 'context') {
                        return 'contexts';
                    }
                    else {
                        return 'snippets';
                    }
                }
            }, 
            gistKindFromFolderPath: function(folderParts) {
                console.log('gistKindFromFolderPath.folderParts', folderParts);
                if (folderParts.length == 3) {
                    return 'fragment';
                }
                else {
                    if (folderParts[0] === 'gists') {
                        return 'gist';
                    }
                    else if (folderParts[0] === 'contexts') {
                        return 'context';
                    }
                    else {
                        return 'snippet';
                    }
                }
            }, 
            gistKindFromFilePath: function(filePath) {
                var dirname = path.dirname(filePath);
                var relFolder = this.normalize(dirname.substr(config.jobsBasePath.length + 1));
                console.log('gistKindFromFilePath.relFolder', relFolder);
                return this.gistKindFromFolderPath(relFolder.split('/'));
            }, 
            gistsFolderPath: function(kind, userId) {
                if (userId) {
                    return path.join(config.jobsBasePath, this.gistFolderNameFromKind(kind, userId));
                }
                else {
                    return path.join(config.jobsBasePath, this.gistFolderNameFromKind(kind));
                }
            }, 
            gistExecutablesFolderPath: function(kind, userId) {
                if (userId) {
                    return path.join(config.jobsBasePath, this.gistFolderNameFromKind(kind, userId) + '_executables');
                }
                else {
                    return path.join(config.jobsBasePath, this.gistFolderNameFromKind(kind) + '_executables');
                }
            }, 
            gistFilePath: function(kind, userId, name) {
                return path.join(this.gistsFolderPath(kind, userId), name);
            }, 
            gistExecutableFilePath: function(kind, userId, name) {
                return path.join(this.gistExecutablesFolderPath(kind, userId), name);
            }, 
            gistInfoByPath: function(filePath) {
                return this.fileInfoByPath(filePath, this.gistsFolderPath());
            }, 
            getGistFiles: function(kind, userId, callback) {
                if (kind === 'snippet') {
                    return this.getFolderFiles(this.gistsFolderPath(kind, userId), this.gistsFolderPath(kind), '/wizzi/' + kind + 's', callback);
                }
                else {
                    var that = this;
                    this.getFolderFiles(this.gistsFolderPath('gist', userId), this.gistsFolderPath('gist'), '/wizzi/gists', function(err, gists) {
                        if (err) {
                            return callback(error(err));
                        }
                        that.getFolderFiles(that.gistsFolderPath('fragment', userId), that.gistsFolderPath('fragment'), '/wizzi/fragments', function(err, fragments) {
                            if (err) {
                                return callback(error(err));
                            }
                            that.getFolderFiles(that.gistsFolderPath('context', userId), that.gistsFolderPath('context'), '/wizzi/contexts', function(err, contexts) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        status: success("Got gist files"), 
                                        data: {
                                            gists: gists.data.items, 
                                            fragments: fragments.data.items, 
                                            contexts: contexts.data.items
                                        }
                                    });
                            });
                        });
                    });
                }
            }, 
            gistFileExists: function(kind, userId, name, callback) {
                return this.fsItemExists(this.gistFilePath(kind, userId, name), callback);
            }, 
            getGistFile: function(kind, userId, name, callback) {
                return this.getFile(this.gistFilePath(kind, userId, name), callback);
            }, 
            putGistFile: function(kind, userId, name, content, callback) {
                var filePath = this.gistFilePath(kind, userId, name);
                var that = this;
                this.putFile(filePath, content, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    var gist = that.gistInfoByPath(filePath);
                    gist.content = content;
                    return callback(null, {
                            status: success("Gist created"), 
                            data: {
                                gist: gist
                            }
                        });
                });
            }, 
            putGistExecutable: function(kind, userId, filePath, content, callback) {
                var name = path.basename(filePath);
                var executablePath = this.gistExecutableFilePath(kind, userId, name);
                return this.putFile(executablePath, content, function(err, notUsed) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                executablePath: executablePath
                            });
                    });
            }
        };
}
function makeBatchesApi(config) {
    var paths = makePaths(config);
    return {
            getBatch: function(options, callback) {
                var hash = options.hash;
                var version = options.version || globalConfig.wizziCurrentVersion;
                var xpackage = options.xpackage;
                this.getBatchList(options, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    var found;
                    var i, i_items=result.data.batches, i_len=result.data.batches.length, group;
                    for (i=0; i<i_len; i++) {
                        group = result.data.batches[i];
                        var j, j_items=group.items, j_len=group.items.length, batch;
                        for (j=0; j<j_len; j++) {
                            batch = group.items[j];
                            if (batch.hash == hash || (batch.version == version && batch.packageName == xpackage)) {
                                if (!batch.dependencies) {
                                    batch.dependencies = [];
                                }
                                found = batch;
                            }
                        }
                    }
                    if (found) {
                        paths.getFile(found.fullPath, function(err, result) {
                            if (err) {
                                return callback(error(err));
                            }
                            found.fileContent = result;
                            async.map(found.dependencies, function(dep, callback) {
                                paths.getFile(dep.fullPath, function(err, depContent) {
                                    if (err) {
                                        return callback(error(err));
                                    }
                                    dep.fileContent = depContent;
                                    callback(null);
                                });
                            }, function(err, notUsed) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        status: success("Got job batch"), 
                                        data: {
                                            batch: found
                                        }
                                    });
                            });
                        });
                    }
                    else {
                        return callback(error("Job not found"));
                    }
                });
            }, 
            getBatchList: function(options, callback) {
                var docs = paths.batchesIttfDocuments();
                console.log('getBatchList', docs);
                var sessionData = {};
                var modelContext = {};
                var artifactContext = {};
                async.map(docs, function(doc, callback) {
                    globalApi.wf.loadModelAndGenerateArtifact(sessionData, doc.fullPath, modelContext, 'json/document', artifactContext, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        var jsonItems = JSON.parse(result.data);
                        var i, i_items=jsonItems, i_len=jsonItems.length, item;
                        for (i=0; i<i_len; i++) {
                            item = jsonItems[i];
                            item.fullPath = path.join(item.cwd, item.argv0);
                            item.hash = hashEncrypt(item.fullPath);
                        }
                        callback(null, {
                            name: doc.name, 
                            items: jsonItems
                        });
                    });
                }, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            status: success("Got job batches list"), 
                            data: {
                                batches: result
                            }
                        });
                });
            }
        };
}
function makeConsoleApi(config) {
    var paths = makePaths(config);
    var hasDefaultUserFromConfig = verify.isString(config.user) && verify.isString(config.role);
    var userAuthRequired = !hasDefaultUserFromConfig;
    var createWizziFactory = makeWizziFactoryCreator(config.storeKind, config.plugins, config.globalContext, config.user, config.role);
    return {
            getConsoleScriptList: function(options, callback) {
                function cb_list() {
                    callback(null, {
                        data: {
                            jsmodels: jobsStore.consoleScriptList
                        }, 
                        status: success('Got console script list')
                    });
                }
                if (jobsStore.consoleScriptList && !options.refresh) {
                    return cb_list();
                }
                jobsStore.consoleScriptList = paths.getConsoleIttfDocuments();
                return cb_list();
            }, 
            getConsoleScript: function(options, callback) {
                const fileName = options.name;
                const ittfPath = paths.consoleIttfDocument(fileName);
                const ittfContent = file.read(ittfPath);
                return callback(null, {
                        data: ittfContent, 
                        status: success('Got console script')
                    });
            }, 
            saveConsoleScript: function(options, callback) {
                const fileName = options.name;
                const ittfContent = options.content;
                const ittfPath = paths.consoleIttfDocument(fileName);
                console.log('saveConsoleScript.ittfPath', ittfPath);
                file.write(ittfPath, ittfContent);
                globalApi.wf.loadModelAndGenerateArtifact(null, ittfPath, {}, 'js/module', {}, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    const jsPath = paths.consoleJsDocument(fileName);
                    console.log('saveConsoleScript.jsPath', jsPath);
                    file.write(jsPath, result.data);
                    return callback(null, {
                            data: {
                                generated: result.data
                            }, 
                            status: success('Console script saved: ' + fileName)
                        });
                });
            }, 
            runConsoleScript: function(options, callback) {
                var cwd = paths.consoleJsFolder();
                var arg = options.name;
                const { execFile } = require('child_process');
                const child = execFile('node', [arg], {
                    cwd: cwd
                }, (err, stdout, stderr) => {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: {
                                stdout: stdout, 
                                stderr: stderr
                            }, 
                            status: success('Console script run: ' + options.name)
                        });
                });
            }
        };
}
function makeGistsApi(config) {
    var paths = makePaths(config);
    var GIST_KINDS = ['gist', 'fragment', 'context'];
    function isGistKind(kind) {
        return GIST_KINDS.indexOf(kind) > -1;
    }
    return {
            getGist: function(options, callback) {
                var hash = options.hash;
                var filePath = hashDecrypt(hash);
                var kind = paths.gistKindFromFilePath(filePath);
                var gist = paths.gistInfoByPath(filePath);
                paths.getFile(filePath, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    gist.content = result;
                    if (isGistKind(kind)) {
                        return callback(null, {
                                status: success('Got ' + kind), 
                                data: {
                                    gist: gist
                                }
                            });
                    }
                    else {
                        return callback(null, {
                                status: success("Got snippet"), 
                                data: {
                                    snippet: gist
                                }
                            });
                    }
                });
            }, 
            executeGist: function(options, callback) {
                var userId = options.userId;
                var hash = options.hash;
                var filePath = hashDecrypt(hash);
                var kind = paths.gistKindFromFilePath(filePath);
                var fileInfo = paths.gistInfoByPath(filePath);
                if (fileInfo.isIttfDocument && fileInfo.schema === 'js') {
                    var sessionData = {};
                    var modelContext = {};
                    var artifactContext = {};
                    var that = this;
                    globalApi.wf.loadModelAndGenerateArtifact(sessionData, filePath, modelContext, 'js/module', artifactContext, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        paths.putGistExecutable(kind, userId, filePath, result.data, function(err, result) {
                            if (err) {
                                return callback(error(err));
                            }
                            that.executeNodeJsGist(options, result.executablePath, callback);
                        });
                    });
                }
                else if (fileInfo.mime === 'js') {
                    this.executeNodeJsGist(options, filePath, callback);
                }
                else {
                    var xres;
                    if (typeof res === 'undefined') {
                        xres = options.res;
                    }
                    else {
                        xres = res;
                    }
                    if (xres) {
                        xres.writeHead(200, {
                            "Content-Type": "text/event-stream", 
                            "Cache-control": "no-cache"
                        });
                        xres.write('data: ' + 'Mime not managed ' + fileInfo.mime + "\n\n");
                        xres.end('');
                    }
                    else {
                        return callback(error('Mime not managed ' + fileInfo.mime));
                    }
                }
            }, 
            executeNodeJsGist: function(options, executablePath, callback) {
                var res = options.res;
                if (res) {
                    console.log('execute nodeJsExecToEventStream');
                    scriptManager.nodeJsExecToEventStream({
                        scriptPath: executablePath, 
                        args: [
                            
                        ]
                    }, res);
                }
                else {
                    console.log('execute nodeJsExec');
                    scriptManager.nodeJsExec({
                        scriptPath: executablePath, 
                        args: [
                            
                        ]
                    }, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                data: result, 
                                status: success('NodeJs script executed')
                            });
                    });
                }
            }, 
            createGist: function(options, callback) {
                var userId = options.userId;
                var name = options.name;
                var schema = options.schema;
                var type = options.type;
                var kind = options.kind;
                var fullName = name;
                var content = '';
                if (schema) {
                    if (isGistKind(kind)) {
                        fullName = name + '.' + schema + '.ittf';
                    }
                    else {
                        fullName = name + '.' + schema;
                    }
                    if (schema === 'js') {
                        if (isGistKind(kind)) {
                            if (kind === 'gist' || kind === 'context') {
                                content = [
                                    'module', 
                                    '\tkind jsfile', 
                                    '\t_ go', 
                                    '\t\t@ "stefi"', 
                                    '\tfunction go', 
                                    '\t\tparam p1', 
                                    '\t\tlog "Hello " + p1'
                                ].join('\n');
                            }
                            else {
                                content = [
                                    '$group', 
                                    '\t$params p1, p2|@@null', 
                                    '\t'
                                ].join('\n');
                            }
                        }
                        else {
                            content = [
                                'go("stefi")', 
                                'function go(p1) {', 
                                '\tconsole.log("Hello " + p1);', 
                                '}'
                            ].join('\n');
                        }
                    }
                }
                var that = this;
                paths.gistFileExists(kind, userId, fullName, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    if (result) {
                        return callback(error(kind + ' already exists'));
                    }
                    paths.putGistFile(kind, userId, fullName, content, function(err, putResult) {
                        if (err) {
                            return callback(error(err));
                        }
                        that.getGistList({
                            userId: userId, 
                            kind: kind
                        }, function(err, result) {
                            if (err) {
                                return callback(error(err));
                            }
                            if (isGistKind(kind)) {
                                return callback(null, {
                                        status: success(kind + ' created'), 
                                        data: {
                                            gists: result.data.gists, 
                                            gist: putResult.data.gist
                                        }
                                    });
                            }
                            else {
                                // BEWARE! putGistFile result.data contains 'gist' property
                                return callback(null, {
                                        status: success("Snippet created"), 
                                        data: {
                                            snippets: result.data.snippets, 
                                            snippet: putResult.data.gist
                                        }
                                    });
                            }
                        });
                    });
                });
            }, 
            updateGist: function(options, callback) {
                var hash = options.hash;
                var content = options.content;
                var filePath = hashDecrypt(hash);
                var kind = paths.gistKindFromFilePath(filePath);
                paths.putFile(filePath, content, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            status: success(kind + ' updated'), 
                            data: {}
                        });
                });
            }, 
            deleteGist: function(options, callback) {
                var userId = options.userId;
                var hash = options.hash;
                var filePath = hashDecrypt(hash);
                var kind = paths.gistKindFromFilePath(filePath);
                var that = this;
                paths.deleteFile(filePath, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    that.getGistList({
                        userId: userId, 
                        kind: kind
                    }, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        if (isGistKind(kind)) {
                            return callback(null, {
                                    status: success(kind + ' deleted'), 
                                    data: {
                                        gists: result.data.gists
                                    }
                                });
                        }
                        else {
                            return callback(null, {
                                    status: success("Snippet deleted"), 
                                    data: {
                                        snippets: result.data.snippets
                                    }
                                });
                        }
                    });
                });
            }, 
            duplicateGist: function(options, callback) {
                var userId = options.userId;
                var hash = options.hash;
                var newname = options.newname;
                var filePath = hashDecrypt(hash);
                var kind = paths.gistKindFromFilePath(filePath);
                var that = this;
                paths.duplicateFsItem(filePath, path.join(path.dirname(filePath), newname), function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    that.getGistList({
                        userId: userId, 
                        kind: kind
                    }, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        if (isGistKind(kind)) {
                            return callback(null, {
                                    status: success(kind + ' duplicated'), 
                                    data: {
                                        gists: result.data.gists
                                    }
                                });
                        }
                        else {
                            return callback(null, {
                                    status: success("Snippet duplicated"), 
                                    data: {
                                        snippets: result.data.snippets
                                    }
                                });
                        }
                    });
                });
            }, 
            renameGist: function(options, callback) {
                var userId = options.userId;
                var hash = options.hash;
                var newname = options.newname;
                var filePath = hashDecrypt(hash);
                var kind = paths.gistKindFromFilePath(filePath);
                var that = this;
                paths.renameFsItem(filePath, path.join(path.dirname(filePath), newname), function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    that.getGistList({
                        userId: userId, 
                        kind: kind
                    }, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        if (isGistKind(kind)) {
                            return callback(null, {
                                    status: success(kind + ' renamed'), 
                                    data: {
                                        gists: result.data.gists
                                    }
                                });
                        }
                        else {
                            return callback(null, {
                                    status: success("Snippet renamed"), 
                                    data: {
                                        snippets: result.data.snippets
                                    }
                                });
                        }
                    });
                });
            }, 
            getGistList: function(options, callback) {
                console.log('wizzi-studio.apis.getGistList', options);
                var userId = options.userId;
                var kind = options.kind;
                paths.getGistFiles(kind, userId, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    var dummy = '';
                    if (isGistKind(kind)) {
                        return callback(null, {
                                status: success(dummy + 'Got ' + kind + ' files'), 
                                data: {
                                    gists: result.data.gists, 
                                    fragments: result.data.fragments, 
                                    contexts: result.data.contexts
                                }
                            });
                    }
                    else {
                        return callback(null, {
                                status: success("Got snippet files"), 
                                data: {
                                    snippets: result.data.items
                                }
                            });
                    }
                });
            }
        };
}
function makeSnippetsApi(config) {
    var paths = makePaths(config);
    return {
            wizzifySnippet: function(options, callback) {
                var hash = options.hash;
                var filePath = hashDecrypt(hash);
                var gist = paths.gistInfoByPath(filePath);
                console.log('wizzifySnippet.gist', gist);
                if (gist.isIttfDocument) {
                    return callback(error("The file already is a wizzi document"));
                }
                var validMimes = [
                    'js', 
                    'html', 
                    'css', 
                    'scss', 
                    'json', 
                    'xml', 
                    'graphql', 
                    'svg'
                ];
                if (validMimes.indexOf(gist.mime) < 0) {
                    return callback(error('Cannot wizzyfy the mime type ' + gist.mime));
                }
                paths.getFile(filePath, function(err, codeContent) {
                    if (err) {
                        return callback(error(err));
                    }
                    console.log('wizzifySnippet.codeContent', codeContent);
                    wizziTools.wizzify(gist.mime, codeContent, function(err, wizzifiedSnippet) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizzifySnippet.wizzifiedSnippet', wizzifiedSnippet);
                        return callback(null, {
                                data: {
                                    wizzified: wizzifiedSnippet
                                }, 
                                status: success('Code snippet wizzified')
                            });
                    });
                });
            }
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var consoleApi = makeConsoleApi(config);
    var batchesApi = makeBatchesApi(config);
    var gistsApi = makeGistsApi(config);
    var snippetsApi = makeSnippetsApi(config);
    api.jobs = {
        getConsoleScriptList: consoleApi.getConsoleScriptList, 
        getConsoleScript: consoleApi.getConsoleScript, 
        saveConsoleScript: consoleApi.saveConsoleScript, 
        runConsoleScript: consoleApi.runConsoleScript, 
        getBatchList: batchesApi.getBatchList, 
        getBatch: batchesApi.getBatch, 
        getGistList: gistsApi.getGistList, 
        getGist: gistsApi.getGist, 
        createGist: gistsApi.createGist, 
        updateGist: gistsApi.updateGist, 
        deleteGist: gistsApi.deleteGist, 
        duplicateGist: gistsApi.duplicateGist, 
        renameGist: gistsApi.renameGist, 
        executeGist: gistsApi.executeGist, 
        executeNodeJsGist: gistsApi.executeNodeJsGist, 
        wizzifySnippet: snippetsApi.wizzifySnippet
    };
    return callback(null, api);
};
