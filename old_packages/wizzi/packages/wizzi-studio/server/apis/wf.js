/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\wf.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Wf
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
var tools = require('wizzi-tools');
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
function makeJsonWizziFactoryCreator(plugins, configGlobalContext, configUser, configRoleOrSubscription) {
    configGlobalContext = configGlobalContext || {};
    if (verify.isString(configUser) && verify.isString(configRoleOrSubscription)) {
        return function createWizziFactory(documents, globalContext, callback) {
                wizzi.JsonComponents.createJsonFsData(documents, function(err, jsonFsData) {
                    if (err) {
                        return callback(err);
                    }
                    globalContext = _.merge(configGlobalContext, globalContext || {});
                    wizzi.createFactory(configUser, configRoleOrSubscription, {
                        repo: {
                            storeKind: 'json', 
                            storeJsonFsData: jsonFsData
                        }, 
                        plugins: {
                            items: plugins
                        }, 
                        globalContext: globalContext || {}
                    }, callback);
                });
            };
    }
    else {
        return function createWizziFactory(user, roleOrSubscription, documents, globalContext, callback) {
                wizzi.JsonComponents.createJsonFsData(documents, function(err, jsonFsData) {
                    if (err) {
                        return callback(err);
                    }
                    globalContext = _.merge(configGlobalContext, globalContext || {});
                    wizzi.createFactory(user, roleOrSubscription, {
                        repo: {
                            storeKind: 'json', 
                            storeJsonFsData: jsonFsData
                        }, 
                        plugins: {
                            items: plugins
                        }, 
                        globalContext: globalContext || {}
                    }, callback);
                });
            };
    }
}
function makeWfApi(config) {
    var hasDefaultUserFromConfig = verify.isString(config.user) && verify.isString(config.role);
    var userAuthRequired = !hasDefaultUserFromConfig;
    var createWizziFactory = makeWizziFactoryCreator(config.storeKind, config.plugins, config.globalContext, config.user, config.role);
    var createJsonWizziFactory = makeJsonWizziFactoryCreator(config.plugins, config.globalContext, config.user, config.role);
    return {
            loadModel: function(sessionData, ittfDocumentUri, context, formatOptions, callback) {
                if (typeof(callback) != 'function') {
                    callback = formatOptions;
                    formatOptions = {};
                }
                context = context || {};
                context.__formatOptions = formatOptions;
                if (userAuthRequired) {
                    createWizziFactory(sessionData.user, sessionData.role, null, loadModel_cb(ittfDocumentUri, context, callback));
                }
                else {
                    createWizziFactory(null, loadModel_cb(ittfDocumentUri, context, callback));
                }
                function loadModel_cb(ittfDocumentUri, context, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.loadModel(ittfDocumentUri, context, function(err, result) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        data: result, 
                                        status: success('Model on uri ' + ittfDocumentUri + ' loaded')
                                    });
                            });
                        };
                }
            }, 
            generateArtifact: function(sessionData, ittfDocumentUri, model, artifactName, artifactContext, callback) {
                if (typeof(callback) != 'function') {
                    callback = artifactContext;
                    artifactContext = {};
                }
                artifactContext = artifactContext || {};
                // Global context on a single generateArtifact not implemented
                var globalContext = {};
                if (userAuthRequired) {
                    createWizziFactory(sessionData.user, sessionData.role, globalContext, generateArtifact_cb(ittfDocumentUri, model, artifactName, artifactContext, callback));
                }
                else {
                    createWizziFactory(globalContext, generateArtifact_cb(ittfDocumentUri, model, artifactName, artifactContext, callback));
                }
                function generateArtifact_cb(ittfDocumentUri, model, artifactName, artifactContext, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.generateArtifact(ittfDocumentUri, model, artifactName, artifactContext, function(err, result) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        data: result, 
                                        status: success('Artifact generation ' + artifactName + ' on uri ' + ittfDocumentUri + ' executed')
                                    });
                            });
                        };
                }
            }, 
            loadModelAndGenerateArtifact: function(sessionData, ittfDocumentUri, modelContext, artifactName, artifactContext, callback) {
                if (typeof(callback) != 'function') {
                    callback = artifactContext;
                    artifactContext = {};
                }
                modelContext = modelContext || {};
                artifactContext = artifactContext || {};
                var requestContext = {
                    modelRequestContext: modelContext, 
                    artifactRequestContext: artifactContext
                };
                // Global context on a single generateArtifact not implemented
                var globalContext = {};
                if (userAuthRequired) {
                    createWizziFactory(sessionData.user, sessionData.role, globalContext, loadModelAndGenerateArtifact_cb(ittfDocumentUri, requestContext, artifactName, callback));
                }
                else {
                    createWizziFactory(globalContext, loadModelAndGenerateArtifact_cb(ittfDocumentUri, requestContext, artifactName, callback));
                }
                function loadModelAndGenerateArtifact_cb(ittfDocumentUri, requestContext, artifactName, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.loadModelAndGenerateArtifact(ittfDocumentUri, requestContext, artifactName, function(err, artifactText) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        data: artifactText, 
                                        status: success('Artifact generation ' + artifactName + ' on uri ' + ittfDocumentUri + ' executed')
                                    });
                            });
                        };
                }
            }, 
            generateArtifactFromText: function(sessionData, ittfContent, modelContext, schemaName, artifactName, artifactContext, callback) {
                if (typeof(callback) != 'function') {
                    callback = artifactContext;
                    artifactContext = {};
                }
                modelContext = modelContext || {};
                artifactContext = artifactContext || {};
                var requestContext = {
                    modelRequestContext: modelContext, 
                    artifactRequestContext: artifactContext
                };
                // Global context on a single generateArtifact not implemented
                var globalContext = {};
                // A basefolder is required
                var tempIttfUri = "c:/basefolder/temp." + schemaName + '.ittf';
                var documents = [
                    {
                        path: tempIttfUri, 
                        content: ittfContent
                    }
                ];
                if (userAuthRequired) {
                    createJsonWizziFactory(sessionData.user, sessionData.role, documents, globalContext, loadModelAndGenerateArtifact_cb(tempIttfUri, requestContext, schemaName + '/' + artifactName, callback));
                }
                else {
                    createJsonWizziFactory(documents, globalContext, loadModelAndGenerateArtifact_cb(tempIttfUri, requestContext, schemaName + '/' + artifactName, callback));
                }
                function loadModelAndGenerateArtifact_cb(ittfDocumentUri, requestContext, artifactName, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.loadModelAndGenerateArtifact(ittfDocumentUri, requestContext, artifactName, function(err, artifactText) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        data: artifactText, 
                                        status: success('Artifact generation ' + artifactName + ' on uri ' + ittfDocumentUri + ' executed')
                                    });
                            });
                        };
                }
            }, 
            schemaObject: function(sessionData, wfschema, callback) {
                if (userAuthRequired) {
                    createWizziFactory(sessionData.user, sessionData.role, null, schemaObject_cb(wfschema, callback));
                }
                else {
                    createWizziFactory(null, schemaObject_cb(wfschema, callback));
                }
                function schemaObject_cb(wfschema, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.schemaObject(wfschema, function(err, result) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        data: result, 
                                        status: success('Schema object ' + wfschema + ' retrieved')
                                    });
                            });
                        };
                }
            }, 
            generateSchema: function(sessionData, ittfDocumentUri, wfschemaName, outputPackagePath, mTreeBuildUpContext, callback) {
                if (typeof(callback) != 'function') {
                    callback = mTreeBuildUpContext;
                    mTreeBuildUpContext = {};
                }
                if (userAuthRequired) {
                    createWizziFactory(sessionData.user, sessionData.role, null, generateModelTypes_cb(ittfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback));
                }
                else {
                    createWizziFactory(null, generateModelTypes_cb(ittfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback));
                }
                function generateModelTypes_cb(ittfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.generateModelTypes(ittfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, function(err, result) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        result: result, 
                                        status: success('Schema ' + wfschemaName + ' generated')
                                    });
                            });
                        };
                }
            }, 
            executeJob: function(sessionData, ittfDocumentUri, jobName, globalContext, callback) {
                if (typeof(callback) != 'function') {
                    callback = globalContext;
                    globalContext = {};
                }
                if (userAuthRequired) {
                    createWizziFactory(sessionData.user, sessionData.role, null, executeJob_cb(jobName, ittfDocumentUri, globalContext, callback));
                }
                else {
                    createWizziFactory(null, executeJob_cb(jobName, ittfDocumentUri, globalContext, callback));
                }
                function executeJob_cb(jobName, ittfDocumentUri, globalContext, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.executeJob({
                                name: jobName, 
                                path: ittfDocumentUri, 
                                productionOptions: wizzi.productionOptions({
                                    indentSpaces: 4, 
                                    basedir: path.dirname(ittfDocumentUri), 
                                    verbose: 2
                                }), 
                                globalContext: globalContext
                            }, function(err, result) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        result: result, 
                                        status: success('Wizzi job ' + jobName + ' executed')
                                    });
                            });
                        };
                }
            }, 
            jsWizzify: function(source, checked, callback) {
                tools.jsWizzify(source, {
                    checked: checked
                }, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    callback(null, {
                        data: {
                            wizzified: result
                        }, 
                        status: success('Js code wizzified')
                    });
                });
            }, 
            htmlWizzify: function(source, callback) {
                tools.htmlWizzify(source, {}, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    callback(null, {
                        data: {
                            wizzified: result
                        }, 
                        status: success('Html code wizzified')
                    });
                });
            }, 
            cssWizzify: function(source, callback) {
                tools.cssWizzify(source, {}, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    callback(null, {
                        data: {
                            wizzified: result
                        }, 
                        status: success('Css code wizzified')
                    });
                });
            }, 
            xmlWizzify: function(source, callback) {
                tools.xmlWizzify(source, {}, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    callback(null, {
                        data: {
                            wizzified: result
                        }, 
                        status: success('Xml code wizzified')
                    });
                });
            }
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var wfApi = makeWfApi(config);
    api.wf = {
        loadModel: wfApi.loadModel, 
        generateArtifact: wfApi.generateArtifact, 
        loadModelAndGenerateArtifact: wfApi.loadModelAndGenerateArtifact, 
        generateArtifactFromText: wfApi.generateArtifactFromText, 
        schemaObject: wfApi.schemaObject, 
        generateSchema: wfApi.generateSchema, 
        executeJob: wfApi.executeJob, 
        jsWizzify: wfApi.jsWizzify, 
        htmlWizzify: wfApi.htmlWizzify, 
        cssWizzify: wfApi.cssWizzify, 
        xmlWizzify: wfApi.xmlWizzify
    };
    return callback(null, api);
};
