/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\build.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Build
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
            }
        };
}
function makeTasksApi(config) {
    var paths = makePaths(config);
    return {
            getSnippetAst: function(options, callback) {
                var hash = options.hash;
                var res = options.res;
                var filePath = hashDecrypt(hash);
                var options = {
                    codePath: filePath, 
                    removeLocation: true
                };
                if (res) {
                    scriptManager.babelParseExecToEventStream(options, res, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizzi-studio.apis.getSnippetAst.result', result);
                        // no need to callback
                    });
                }
                else {
                    scriptManager.babelParseExec(options, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                status: success("Got snippet AST"), 
                                data: {
                                    ast: result
                                }
                            });
                    });
                }
            }, 
            transpileSnippet: function(options, callback) {
                var hash = options.hash;
                var res = options.res;
                var filePath = hashDecrypt(hash);
                var options = {
                    codePath: filePath, 
                    removeLocation: true
                };
                if (res) {
                    scriptManager.babelTransformExecToEventStream(options, res, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizzi-studio.apis.transpileSnippet.result', result);
                        // no need to callback
                    });
                }
                else {
                    scriptManager.babelTransformExec(options, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                status: success("Got snippet transpile"), 
                                data: {
                                    transpiled: result
                                }
                            });
                    });
                }
            }, 
            eslintSnippet: function(options, callback) {
                var hash = options.hash;
                var res = options.res;
                var filePath = hashDecrypt(hash);
                var options = {
                    packagePath: path.dirname(path.dirname(filePath)), 
                    language: 'js', 
                    folder: path.basename(path.dirname(filePath))
                };
                if (res) {
                    scriptManager.eslintExecToEventStream(options, res, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizzi-studio.apis.eslintSnippet.result', result);
                        // no need to callback
                    });
                }
                else {
                    scriptManager.eslintExec(options, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                status: success("Got eslint analysis"), 
                                data: {
                                    transpiled: result
                                }
                            });
                    });
                }
            }, 
            flowSnippet: function(options, callback) {
                var hash = options.hash;
                var res = options.res;
                var filePath = hashDecrypt(hash);
                var options = {
                    codePath: filePath
                };
                if (res) {
                    scriptManager.flowExecToEventStream(options, res, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizzi-studio.apis.flowSnippet.result', result);
                        // no need to callback
                    });
                }
                else {
                    scriptManager.flowExec(options, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                status: success("Got flow analysis"), 
                                data: {
                                    transpiled: result
                                }
                            });
                    });
                }
            }, 
            prettierSnippet: function(options, callback) {
                var hash = options.hash;
                var res = options.res;
                var filePath = hashDecrypt(hash);
                var options = {
                    codePath: filePath
                };
                if (res) {
                    scriptManager.prettierExecToEventStream(options, res, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        console.log('wizzi-studio.apis.transpileSnippet.result', result);
                        // no need to callback
                    });
                }
                else {
                    scriptManager.prettierExec(options, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                status: success("Got snippet prettified"), 
                                data: {
                                    transpiled: result
                                }
                            });
                    });
                }
            }
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var tasksApi = makeTasksApi(config);
    api.build = {
        wizzifySnippet: tasksApi.wizzifySnippet, 
        transpileSnippet: tasksApi.transpileSnippet, 
        getSnippetAst: tasksApi.getSnippetAst, 
        flowSnippet: tasksApi.flowSnippet, 
        prettierSnippet: tasksApi.prettierSnippet, 
        eslintSnippet: tasksApi.eslintSnippet
    };
    return callback(null, api);
};
