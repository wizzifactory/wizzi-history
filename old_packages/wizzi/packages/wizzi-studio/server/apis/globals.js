/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\globals.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Globals
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
var globalsStore = {};
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
            getIttfFilesOfSchema: function(folderPath, schemaName) {
                var glob = this.normalize(folderPath) + '/*.' + schemaName + '.ittf';
                var files = file.getGlobbedFiles(glob);
                console.log('getFolderIttfFiles', glob, schemaName, files);
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    var dirName = path.dirname(item);
                    ret.push({
                        baseName: path.basename(item), 
                        dirName: dirName, 
                        fullPath: this.normalize(path.join(dirName, path.basename(item)))
                    });
                }
                return ret;
            }, 
            getIttfFiles: function(folderPath) {
                var files = file.getGlobbedFiles(folderPath + "/**/*.ittf");
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    ret.push({
                        baseName: path.basename(item), 
                        dirName: path.dirname(item), 
                        fullPath: item
                    });
                }
                return ret;
            }, 
            getFolders: function(folderPath) {
                var ret = [];
                var dir = fs.readdirSync(folderPath);
                var i, i_items=dir, i_len=dir.length, name;
                for (i=0; i<i_len; i++) {
                    name = dir[i];
                    var target = folderPath + '/' + name;
                    var stats = fs.statSync(target);
                    if (stats.isDirectory()) {
                        ret.push({
                            name: name, 
                            fullPath: target
                        });
                    }
                }
                return ret;
            }, 
            fileExecJobsPath: function() {
                return path.join(config.studioBasePath, 'fileExecs');
            }, 
            getFileExecJobsIttfDocuments: function() {
                return this.getIttfFilesOfSchema(this.fileExecJobsPath(), 'wfjob');
            }
        };
}
function makeJobsApi(config, api) {
    var paths = makePaths(config);
    var hasDefaultUserFromConfig = verify.isString(config.user) && verify.isString(config.role);
    var userAuthRequired = !hasDefaultUserFromConfig;
    var createWizziFactory = makeWizziFactoryCreator(config.storeKind, config.plugins, config.globalContext, config.user, config.role);
    return {
            getExecFileJobList: function(options, callback) {
                function cb_execFileJobList(callback) {
                    callback(null, {
                        data: {
                            files: globalsStore.execFileJobList, 
                            models: globalsStore.execFileModelList
                        }, 
                        status: success('Got execFile joblist')
                    });
                }
                if (globalsStore.execFileJobList && !options.refresh) {
                    return cb_execFileJobList(callback);
                }
                globalsStore.execFileJobList = paths.getFileExecJobsIttfDocuments();
                async.map(globalsStore.execFileJobList, function(file, callback) {
                    api.wf.loadModel(null, file.fullPath, {}, function(err, wizziModel) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizziModel', wizziModel);
                        return callback(err, wizziModel.data.toJson());
                    });
                }, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    console.log('result', result);
                    globalsStore.execFileModelList = result;
                    return cb_execFileJobList(callback);
                });
            }, 
            getExecFile: function(options, callback) {
                const fileName = options.name;
                this.getExecFileJobList(options, function(err, list) {
                    if (err) {
                        return callback(error(err));
                    }
                    console.log('getExecFile.list', list);
                    const jobs = list.data.models;
                    var i, i_items=jobs, i_len=jobs.length, job;
                    for (i=0; i<i_len; i++) {
                        job = jobs[i];
                        var j, j_items=job.execFiles, j_len=job.execFiles.length, file;
                        for (j=0; j<j_len; j++) {
                            file = job.execFiles[j];
                            if (file.wzName === fileName) {
                                return callback(null, {
                                        data: file, 
                                        status: success('Got execFile')
                                    });
                            }
                        }
                    }
                    return callback(error('execFile not found: ' + fileName));
                });
            }, 
            runExecFile: function(options, callback) {
                this.getExecFile(options, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    const file = result.data;
                    const { execFile } = require('child_process');
                    const child = execFile('node', file.__args, file.__options, (err, stdout, stderr) => {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                data: {
                                    stdout: stdout, 
                                    stderr: stderr
                                }, 
                                status: success('execFile run')
                            });
                    });
                });
            }
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var jobsApi = makeJobsApi(config, api);
    api.globals = {
        getExecFileJobList: jobsApi.getExecFileJobList, 
        getExecFile: jobsApi.getExecFile, 
        runExecFile: jobsApi.runExecFile
    };
    return callback(null, api);
};
