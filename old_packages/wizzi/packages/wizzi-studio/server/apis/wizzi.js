/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\wizzi.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Wizzi
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
var fs = require('fs');
var ittfHtmlPrettifier = require('wizzi-utils').ittfHtmlPrettifier;
var myCrypto = require('../lib/myCrypto');
function hashEncrypt(text) {
    // return myCrypto.encryptSimple(text)
    return myCrypto.encrypt(text);
}
function hashDecrypt(text) {
    // return myCrypto.decryptSimple(text)
    return myCrypto.decrypt(text);
}
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
function makeCheckApi(config) {
    var paths = makePaths(config);
    return {
            get: function(options, callback) {
                var version = options.version || config.wizziCurrentVersion;
                return callback(null, {
                        data: {
                            config: config, 
                            kernelUriFromPath: {
                                in: 'C:\\My\\wizzi\\v5\\kernel\\wizzi-mtree\\src\\ittf\\tests\\loader\\function.js.ittf', 
                                out: paths.kernelUriFromPath('C:\\My\\wizzi\\v5\\kernel\\wizzi-mtree\\src\\ittf\\tests\\loader\\function.js.ittf')
                            }, 
                            kernelPathFromUri: {
                                in: '/wizzi-mtree/src/ittf/tests/loader/function.js.ittf, ' + version, 
                                out: paths.kernelPathFromUri('/wizzi-mtree/src/ittf/tests/loader/function.js.ittf', version)
                            }, 
                            kernelSrcPath: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.kernelSrcPath('wizzi-mtree', version)
                            }, 
                            kernelGeneratePath: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.kernelGeneratePath('wizzi-mtree', version)
                            }, 
                            kernelGenerateWfJobPath: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.kernelGenerateWfJobPath('wizzi-mtree', version)
                            }, 
                            kernelRootFolderPath: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.kernelRootFolderPath('wizzi-mtree', version)
                            }, 
                            kernelRootFolderIttfDocuments: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.getIttfFiles(paths.kernelRootFolderPath('wizzi-mtree', version))
                            }, 
                            kernelLibFolderPath: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.kernelLibFolderPath('wizzi-mtree', version)
                            }, 
                            kernelLibFolderIttfDocuments: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.getIttfFiles(paths.kernelLibFolderPath('wizzi-mtree', version))
                            }, 
                            kernelLibUtilsFolderPath: {
                                in: 'wizzi-mtree, ' + version + ', utils', 
                                out: paths.kernelLibFolderPath('wizzi-mtree', version, 'utils')
                            }, 
                            kernelLibUtilsFolderIttfDocuments: {
                                in: 'wizzi-mtree, ' + version, 
                                out: paths.getIttfFiles(paths.kernelLibFolderPath('wizzi-mtree', version, 'utils'))
                            }
                        }, 
                        status: success('Check data retrieved')
                    });
            }
        };
}
function makeWizziIttfApi(config) {
    var paths = makePaths(config);
    var createWizziFactory = makeWizziFactoryCreator(config.storeKind, config.plugins, config.globalContext, config.user, config.role);
    return {
            getIttfDocument: function(options, callback) {
                var hash = options.hash;
                var ittf = paths.getIttfFileContentByHash(hash);
                if (ittf.ok == false) {
                    return callback({
                            status: error(ittf.message)
                        });
                }
                else {
                    return callback(null, {
                            data: {
                                content: ittf.content
                            }, 
                            status: success('Ittf document content fetched')
                        });
                }
            }, 
            putIttfDocument: function(options, callback) {
                var hash = options.hash;
                var content = options.content;
                var ittf = paths.putIttfFileContentByHash(hash, content);
                if (ittf.ok == false) {
                    return callback({
                            status: error(ittf.message)
                        });
                }
                else {
                    var pretty = null;
                    if (options.prettify) {
                        pretty = ittfHtmlPrettifier(content, {
                            fromString: true
                        });
                    }
                    return callback(null, {
                            data: {
                                pretty: pretty
                            }, 
                            status: success('Ittf document content written')
                        });
                }
            }, 
            getWizziFactoryInfo: function(options, callback) {
                var storeKind = options.storeKind;
                var pluginsBaseFolder = options.pluginsBaseFolder;
                var pluginItems = [
                    'wizzi-core', 
                    'wizzi-js', 
                    'wizzi-web'
                ];
                var pluginsString = options.plugins;
                if (verify.isEmpty(pluginsString) == false) {
                    var ss = pluginsString.split(';');
                    var i, i_items=ss, i_len=ss.length, s;
                    for (i=0; i<i_len; i++) {
                        s = ss[i];
                        if (pluginItems.indexOf(s) < 0) {
                            pluginItems.push(s);
                        }
                    }
                }
                var globalContext = {};
                var globalContextString = options.globalContext;
                if (verify.isEmpty(globalContextString) == false) {
                    var ss = globalContextString.split(';');
                    var i, i_items=ss, i_len=ss.length, s;
                    for (i=0; i<i_len; i++) {
                        s = ss[i];
                        var ss2 = s.split('=');
                        if (ss2.length == 2) {
                            globalContext[ss2[0]] = ss2[1];
                        }
                    }
                }
                wizzi.createFactory('stefi', 'admin', {
                    repo: {
                        storeKind: storeKind
                    }, 
                    plugins: {
                        items: pluginItems, 
                        pluginsBaseFolder: pluginsBaseFolder
                    }, 
                    globalContext: globalContext
                }, function(err, wf) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: wf.getInfo(), 
                            status: success('Wizzi factory info fetched')
                        });
                });
            }, 
            generateDefaultArtifact: function(options, callback) {
                var ittfDocumentHash = options.hash;
                var mTreeBuildUpContext = options.context || {};
                var sessionData = {};
                var modelContext = {};
                var artifactContext = {};
                var ittfDocumentUri = paths.getIttfFilePathByHash(ittfDocumentHash);
                var schema = paths.getSchemaByIttfDocumentUri(ittfDocumentUri);
                globalApi.studio.getDefaultArtifacts(options, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    var artifactName = result.data.defaultArtifacts[schema];
                    globalApi.wf.loadModelAndGenerateArtifact(sessionData, ittfDocumentUri, modelContext, artifactName, artifactContext, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        return callback(null, {
                                data: result, 
                                status: success('Artifact generation ' + artifactName + ' on uri ' + ittfDocumentUri + ' executed')
                            });
                    });
                });
            }, 
            getMTreeDebugInfo: function(options, callback) {
                var ittfDocumentHash = options.hash;
                var mTreeBuildUpContext = options.context || {};
                var ittfDocumentUri = paths.getIttfFilePathByHash(ittfDocumentHash);
                createWizziFactory(null, loadMTreeDebugInfo_cb(ittfDocumentUri, mTreeBuildUpContext, callback));
                function loadMTreeDebugInfo_cb(ittfDocumentUri, mTreeBuildUpContext, callback) {
                    return function(err, wizziFactory) {
                            if (err) {
                                return callback(error(err));
                            }
                            wizziFactory.loadMTreeDebugInfo(ittfDocumentUri, mTreeBuildUpContext, function(err, result) {
                                if (err) {
                                    return callback(error(err));
                                }
                                return callback(null, {
                                        data: result, 
                                        status: success('mTree debug info on uri ' + ittfDocumentUri + ' fetched')
                                    });
                            });
                        };
                }
            }, 
            generateWfJob: function(options, callback) {
                var jobName = options.jobName || 'wizzi.ittf.wfjob.default';
                var ittfDocumentHash = options.hash;
                var mTreeBuildUpContext = options.context || {};
                var sessionData = {};
                var globalContext = {};
                var ittfDocumentUri = paths.getIttfFilePathByHash(ittfDocumentHash);
                globalApi.wf.executeJob(sessionData, ittfDocumentUri, jobName, globalContext, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: result, 
                            status: success('WfJob ' + jobName + ' on uri ' + ittfDocumentUri + ' executed')
                        });
                });
            }, 
            generateWfSchema: function(options, callback) {
                var packageName = options.packageName || null;
                var ittfDocumentHash = options.hash;
                var mTreeBuildUpContext = options.context || {};
                var sessionData = {};
                var globalContext = {};
                var ittfDocumentUri = paths.getIttfFilePathByHash(ittfDocumentHash);
                var schemaName = paths.getSchemaByIttfDocumentUri(ittfDocumentUri);
                var schemaOutputPath = paths.schemaOutputPath(packageName, schemaName);
                globalApi.wf.generateSchema(sessionData, ittfDocumentUri, schemaName, schemaOutputPath, mTreeBuildUpContext, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: result, 
                            status: success('WfSchema ' + schemaName + ' on uri ' + ittfDocumentUri + ' generated')
                        });
                });
            }
        };
}
function makeWizziKernelApi(config) {
    var paths = makePaths(config);
    return {
            getKernelInfo: function(options, callback) {
                // no option yet
                var metaPath = paths.kernelMeta(options);
                console.log('getKernelInfo.metaPath', metaPath);
                if (file.isFile(metaPath)) {
                    return callback(null, {
                            data: file.readJSON(metaPath), 
                            status: success('Kernel info data fetched')
                        });
                }
                else {
                    return callback({
                            status: error('Kernel info not yet available')
                        });
                }
            }, 
            getKernelPackages: function(options, callback) {
                return callback(null, {
                        data: {
                            packages: [
                                {
                                    name: 'wizzi'
                                }, 
                                {
                                    name: 'wizzi-mtree'
                                }, 
                                {
                                    name: 'wizzi-repo'
                                }, 
                                {
                                    name: 'wizzi-utils'
                                }
                            ]
                        }, 
                        status: success('Kernel packages data fetched')
                    });
            }, 
            getKernelPackage: function(options, callback) {
                // options.packageName required
                var packageName = options.packageName;
                var version = options.version || globalConfig.wizziCurrentVersion;
                console.log('packageName', packageName);
                return callback(null, {
                        data: {
                            name: packageName, 
                            generatePath: paths.kernelGeneratePath(packageName, version), 
                            generateWfJobPath: paths.kernelGenerateWfJobPath(packageName, version), 
                            rootIttfDocuments: paths.getIttfFiles(paths.kernelRootFolderPath(packageName, version)), 
                            libIttfDocuments: paths.getIttfFiles(paths.kernelLibFolderPath(packageName, version)), 
                            examplesIttfDocuments: paths.getIttfFiles(paths.kernelExamplesFolderPath(packageName, version)), 
                            testsIttfDocuments: paths.getIttfFiles(paths.kernelTestsFolderPath(packageName, version)), 
                            metaIttfDocuments: paths.getIttfFiles(paths.kernelMetaFolderPath(packageName, version)), 
                            tIttfDocuments: paths.getIttfFiles(paths.kernelTFolderPath(packageName, version))
                        }, 
                        status: success('Kernel package data fetched')
                    });
            }
        };
}
function makeWizziPluginsApi(config) {
    var paths = makePaths(config);
    return {
            getKernelInfo: function(options, callback) {
                // no option yet
                var metaPath = paths.kernelMeta(options);
                console.log('getKernelInfo.metaPath', metaPath);
                if (file.isFile(metaPath)) {
                    return callback(null, {
                            data: file.readJSON(metaPath), 
                            status: success('Kernel info data fetched')
                        });
                }
                else {
                    return callback({
                            status: error('Kernel info not yet available')
                        });
                }
            }, 
            getPluginsPackages: function(options, callback) {
                return callback(null, {
                        data: {
                            packages: [
                                {
                                    name: 'wizzi-core'
                                }, 
                                {
                                    name: 'wizzi-meta'
                                }, 
                                {
                                    name: 'wizzi-js'
                                }, 
                                {
                                    name: 'wizzi-web'
                                }
                            ]
                        }, 
                        status: success('Plugins packages data fetched')
                    });
            }, 
            getPluginPackage: function(options, callback) {
                // options.packageName required
                var version = options.version;
                var packageName = options.packageName;
                var schemaName = options.schemaName;
                var libIttfDocuments = [];
                var files = paths.getIttfFiles(paths.pluginLibFolderPath(packageName, version));
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    if (!(item.relFolder.substr(0,5) === 'wizzi' || item.relFolder.substr(0,9) === 'artifacts')) {
                        libIttfDocuments.push(item);
                    }
                }
                return callback(null, {
                        data: {
                            name: packageName, 
                            generatePathModule: paths.pluginGeneratePath(packageName, version), 
                            generateWfJobDocument: paths.pluginGenerateWfJobPath(packageName, version), 
                            rootIttfDocuments: paths.getIttfFiles(paths.pluginRootFolderPath(packageName, version)), 
                            libIttfDocuments: libIttfDocuments, 
                            examplesIttfDocuments: paths.getIttfFiles(paths.pluginExamplesFolderPath(packageName, version)), 
                            testsIttfDocuments: paths.getIttfFiles(paths.pluginTestsFolderPath(packageName, version)), 
                            metaIttfDocuments: paths.getIttfFiles(paths.pluginMetaFolderPath(packageName, version)), 
                            tIttfDocuments: paths.getIttfFiles(paths.pluginTFolderPath(packageName, version))
                        }, 
                        status: success('Plugins package data fetched')
                    });
            }, 
            getPluginSchemas: function(options, callback) {
                var packageName = options.packageName;
                var version = options.version || globalConfig.wizziCurrentVersion;
                var schemaArray = paths.pluginSchemas(packageName, version);
                var schemas = {};
                var i, i_items=schemaArray, i_len=schemaArray.length, s;
                for (i=0; i<i_len; i++) {
                    s = schemaArray[i];
                    s.tIttfDocuments = paths.getIttfFiles(path.join(paths.pluginWizziSchemaPath(packageName, version), 't', s.name));
                    schemas[s.name] = s;
                }
                return callback(null, {
                        data: {
                            schemas: schemas, 
                            libIttfDocuments: paths.pluginLibDocuments(packageName, version), 
                            schemasTIttfDocuments: paths.pluginSchemasTIttfDocuments(packageName, version), 
                            packageTIttfDocuments: paths.pluginsPackageTDocuments(packageName, version)
                        }, 
                        status: success('Plugin schemas data fetched')
                    });
            }, 
            getPluginArtifacts: function(options, callback) {
                var packageName = options.packageName;
                var version = options.version || globalConfig.wizziCurrentVersion;
                var schemas = paths.getFolders(paths.pluginArtifactPath(packageName, version));
                var artifacts = {};
                var packageTDocuments = [];
                var libTDocuments = [];
                var artifactsTDocuments = [];
                var i, i_items=schemas, i_len=schemas.length, s;
                for (i=0; i<i_len; i++) {
                    s = schemas[i];
                    if (s.name === 't') {
                        // artifactsTDocuments
                        var files = paths.getIttfFiles(path.join(paths.pluginArtifactPath(packageName, version), s.name));
                        var j, j_items=files, j_len=files.length, item;
                        for (j=0; j<j_len; j++) {
                            item = files[j];
                            artifactsTDocuments.push(item);
                        }
                    }
                    else {
                        var s_artifacts = paths.getFolders(path.join(paths.pluginArtifactPath(packageName, version), s.name));
                        var artifactSchemaTDocuments = [];
                        var j, j_items=s_artifacts, j_len=s_artifacts.length, s_artifact;
                        for (j=0; j<j_len; j++) {
                            s_artifact = s_artifacts[j];
                            if (s_artifact.name === 't') {
                                // schema folder level t-documents
                                var files = paths.getIttfFiles(paths.pluginArtifactPath(packageName, version, s.name, s_artifact.name));
                                var k, k_items=files, k_len=files.length, item;
                                for (k=0; k<k_len; k++) {
                                    item = files[k];
                                    artifactSchemaTDocuments.push(item);
                                }
                            }
                        }
                        var j, j_items=s_artifacts, j_len=s_artifacts.length, s_artifact;
                        for (j=0; j<j_len; j++) {
                            s_artifact = s_artifacts[j];
                            if (s_artifact.name === 't') {
                                // schema level t files
                            }
                            else {
                                var gen_trans = paths.getFolders(path.join(paths.pluginArtifactPath(packageName, version), s.name, s_artifact.name));
                                if (gen_trans.length == 1) {
                                    // artifact level documents
                                    var files = paths.getIttfFiles(path.join(paths.pluginArtifactPath(packageName, version), s.name, s_artifact.name, gen_trans[0].name));
                                    var artifactDocuments = [];
                                    var artifactTDocuments = [];
                                    var k, k_items=files, k_len=files.length, item;
                                    for (k=0; k<k_len; k++) {
                                        item = files[k];
                                        if (item.relFolder.substr(0,2) == 't/') {
                                            artifactTDocuments.push(item);
                                        }
                                        else {
                                            artifactDocuments.push(item);
                                        }
                                    }
                                    var mainDocumentFullPath = path.join(paths.pluginArtifactPath(packageName, version), s.name, s_artifact.name, gen_trans[0].name, 'main.js.ittf');
                                    artifacts[s.name + '/' + s_artifact.name] = {
                                        packageName: packageName, 
                                        schema: s.name, 
                                        schemaId: paths.schemaId(packageName, version, s.name), 
                                        artifact: s_artifact.name, 
                                        artifactId: paths.artifactId(packageName, version, s.name, s_artifact.name), 
                                        gentrans: gen_trans[0].name, 
                                        baseFolder: path.join(paths.pluginArtifactPath(packageName, version), s.name, s_artifact.name, gen_trans[0].name), 
                                        mainDocument: {
                                            baseName: 'main.js.ittf', 
                                            displayName: 'main.js.ittf', 
                                            baseFolder: path.join(paths.pluginArtifactPath(packageName, version), s.name, s_artifact.name, gen_trans[0].name), 
                                            relFolder: '', 
                                            fullPath: mainDocumentFullPath, 
                                            hash: hashEncrypt(mainDocumentFullPath), 
                                            isFragment: false, 
                                            schema: 'js'
                                        }, 
                                        artifactIttfDocuments: artifactDocuments, 
                                        artifactTIttfDocuments: artifactTDocuments, 
                                        artifactSchemaTIttfDocuments: artifactSchemaTDocuments
                                    };
                                }
                            }
                        }
                    }
                }
                return callback(null, {
                        data: {
                            artifactsTIttfDocuments: artifactsTDocuments, 
                            libIttfDocuments: paths.pluginLibDocuments(packageName, version), 
                            packageTIttfDocuments: paths.pluginsPackageTDocuments(packageName, version), 
                            artifacts: artifacts
                        }, 
                        status: success('Plugin artifacts data fetched')
                    });
            }
        };
}
function makeWizziSystemApi(config) {
    var paths = makePaths(config);
    return {
            getSystemPackages: function(options, callback) {
                var wizziPath = 'c:/my/wizzi';
                var result = {
                    versions: [
                        
                    ], 
                    packages: {
                        
                    }
                };
                var folders = getFolders(wizziPath);
                var i, i_items=folders, i_len=folders.length, f;
                for (i=0; i<i_len; i++) {
                    f = folders[i];
                    if (f[0] === 'v') {
                        var folders_1 = getFolders(wizziPath, f);
                        if (folders_1.indexOf('kernel') > -1 && folders_1.indexOf('plugins')) {
                            // log f, folders_1
                            var version = {
                                name: f
                            };
                            var versionPackages = {
                                version: f, 
                                kernel: [
                                    
                                ], 
                                plugins: [
                                    
                                ], 
                                apps: [
                                    
                                ]
                            };
                            var folders_2 = getFolders(wizziPath + '/' + f, 'kernel');
                            var j, j_items=folders_2, j_len=folders_2.length, f2;
                            for (j=0; j<j_len; j++) {
                                f2 = folders_2[j];
                                var ok = file.isDirectory(path.join(wizziPath, f, 'kernel', f2, 'src', 'ittf', 'meta'));
                                if (ok) {
                                    var kernel = {
                                        name: f2, 
                                        uri: f + '/kernel/' + f2
                                    };
                                    versionPackages.kernel.push(kernel);
                                }
                            }
                            folders_2 = getFolders(wizziPath + '/' + f, 'plugins');
                            var j, j_items=folders_2, j_len=folders_2.length, f2;
                            for (j=0; j<j_len; j++) {
                                f2 = folders_2[j];
                                var ok = file.isDirectory(path.join(wizziPath, f, 'plugins', f2, 'src', 'ittf', 'meta'));
                                if (ok) {
                                    var plugin = {
                                        name: f2, 
                                        uri: f + '/plugin/' + f2
                                    };
                                    versionPackages.plugins.push(plugin);
                                }
                            }
                            folders_2 = getFolders(wizziPath + '/' + f, 'apps');
                            var j, j_items=folders_2, j_len=folders_2.length, f2;
                            for (j=0; j<j_len; j++) {
                                f2 = folders_2[j];
                                var ok = file.isDirectory(path.join(wizziPath, f, 'apps', f2, 'wizzi', 'ittf'));
                                if (!ok) {
                                    ok = file.isDirectory(path.join(wizziPath, f, 'apps', f2, 'src', 'ittf'));
                                }
                                if (ok) {
                                    var app = {
                                        name: f2, 
                                        appId: f2, 
                                        uri: f + '/app/' + f2, 
                                        appPath: path.join(wizziPath, f, 'apps', f2)
                                    };
                                    versionPackages.apps.push(app);
                                }
                                else {
                                    var folders_3 = getFolders(wizziPath + '/' + f + '/' + 'apps', f2);
                                    var k, k_items=folders_3, k_len=folders_3.length, f3;
                                    for (k=0; k<k_len; k++) {
                                        f3 = folders_3[k];
                                        var ok = file.isDirectory(path.join(wizziPath, f, 'apps', f2, f3, 'wizzi', 'ittf'));
                                        if (ok) {
                                            var app = {
                                                name: f3, 
                                                appId: f2 + '/' + f3, 
                                                uri: f + '/app/' + f2 + '/' + f3, 
                                                appPath: path.join(wizziPath, f, 'apps', f2, f3)
                                            };
                                            versionPackages.apps.push(app);
                                        }
                                        else {
                                            var folders_4 = getFolders(wizziPath + '/' + f + '/' + 'apps' + '/' + f2, f3);
                                            var l, l_items=folders_4, l_len=folders_4.length, f4;
                                            for (l=0; l<l_len; l++) {
                                                f4 = folders_4[l];
                                                var ok = file.isDirectory(path.join(wizziPath, f, 'apps', f2, f3, f4, 'wizzi', 'ittf'));
                                                if (ok) {
                                                    var app = {
                                                        name: f4, 
                                                        appId: f2 + '/' + f3 + '/' + f4, 
                                                        uri: f + '/app/' + f2 + '/' + f3 + '/' + f4, 
                                                        appPath: path.join(wizziPath, f, 'apps', f2, f3, f4)
                                                    };
                                                    versionPackages.apps.push(app);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (versionPackages.kernel.length > 0 && versionPackages.plugins.length > 0) {
                                result.versions.push(version);
                                result.packages[version.name] = versionPackages;
                            }
                        }
                    }
                }
                console.log(JSON.stringify(result, null, 2));
                // log JSON.stringify(getPackageTree('v5', result.packages), null, 2)
                function getFolders(p1, p2) {
                    var p = p2 ? p1 + '/' + p2 : p1;
                    return file.getFolders(p, {
                            deep: false
                        });
                }
                return callback(null, {
                        data: result, 
                        status: success('Versions, kernels and plugins fetched')
                    });
            }
        };
}
function makePaths(config) {
    return {
            schemaId: function(packageName, version, schemaName) {
                return [
                        config.getWizziPluginsBaseId(version), 
                        packageName, 
                        schemaName
                    ].join('_');
            }, 
            artifactId: function(packageName, version, schemaName, artifactName) {
                return [
                        config.getWizziPluginsBaseId(version), 
                        packageName, 
                        schemaName, 
                        artifactName
                    ].join('_');
            }, 
            getIttfFiles: function(folderPath) {
                folderPath = this.normalize(folderPath);
                var files = file.getGlobbedFiles(folderPath + "/**/*.ittf");
                var wizziBaseUriLength = this.normalize(config.wizziBasePath).length;
                var parts, relFolder, ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    relFolder = path.dirname(item).length > folderPath.length ? path.dirname(item).substr(folderPath.length + 1) : '';
                    parts = path.basename(item).split('.');
                    ret.push({
                        baseName: path.basename(item), 
                        displayName: (relFolder.length > 0 ? relFolder + '/' + path.basename(item) : path.basename(item)), 
                        baseFolder: folderPath, 
                        relFolder: relFolder, 
                        fullPath: item, 
                        uri: item.substr(wizziBaseUriLength), 
                        hash: hashEncrypt(item), 
                        schema: parts[parts.length-2], 
                        isFragment: item.indexOf('/t/') > -1, 
                        hashTest: hashDecrypt(hashEncrypt(item))
                    });
                }
                return ret;
            }, 
            getIttfFilePathByHash: function(hash) {
                return hashDecrypt(hash);
            }, 
            getIttfFileContentByHash: function(hash) {
                var filePath = hashDecrypt(hash);
                if (file.isFile(filePath)) {
                    return {
                            ok: true, 
                            content: file.read(filePath)
                        };
                }
                else {
                    return {
                            ok: false, 
                            message: 'Ittf document ' + filePath + ' not found'
                        };
                }
            }, 
            putIttfFileContentByHash: function(hash, content) {
                var filePath = hashDecrypt(hash);
                console.log('putIttfFileContentByHash', hash, filePath);
                try {
                    file.write(filePath, content);
                } 
                catch (ex) {
                    return {
                            ok: false, 
                            message: 'Error writing ittf document ' + filePath + '. Message: ' + ex.message
                        };
                } 
                return {
                        ok: true, 
                        message: 'Ittf document written succesfully'
                    };
            }, 
            getSchemaByIttfDocumentUri: function(ittfDocumentUri) {
                var ss = ittfDocumentUri.split('.');
                return ss[ss.length-2];
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
            joinPathFromArray: function(segments) {
                var ret = segments[0];
                for (var i=1; i<segments.length; i++) {
                    ret = path.join(ret, segments[i]);
                }
                return ret;
            }, 
            normalize: function(filepath) {
                return verify.replaceAll(filepath, '\\', '/');
            }, 
            kernelUriFromPath: function(filepath, excludeIttfExtension) {
                filepath = this.normalize(filepath).toLowerCase();
                if (excludeIttfExtension && verify.endsWith(filepath, '.ittf')) {
                    filepath = filepath.substr(0, filepath.length - 5);
                }
                return filepath.substr(config.wizziKernelBasePath.length);
            }, 
            kernelPathFromUri: function(uri) {
                return path.join(config.wizziKernelBasePath, uri);
            }, 
            kernelSrcPath: function(packageName, version) {
                return path.join(config.getWizziKernelBasePath(version), packageName, 'src');
            }, 
            kernelSrcIttfPath: function(packageName, version) {
                return path.join(config.getWizziKernelBasePath(version), packageName, 'src', 'ittf');
            }, 
            kernelGeneratePath: function(packageName, version) {
                return path.join(this.kernelSrcPath(packageName, version), 'generate.js');
            }, 
            kernelGenerateWfJobPath: function(packageName, version) {
                return path.join(this.kernelSrcPath(packageName, version), 'generate.wfjob.ittf');
            }, 
            kernelRootFolderPath: function(packageName, version) {
                return path.join(this.kernelSrcIttfPath(packageName, version), 'root');
            }, 
            kernelLibFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'lib');
                }
                else {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'lib', folder);
                }
            }, 
            kernelExamplesFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'examples');
                }
                else {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'examples', folder);
                }
            }, 
            kernelMetaFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'meta');
                }
                else {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'meta', folder);
                }
            }, 
            kernelTestsFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'tests');
                }
                else {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 'tests', folder);
                }
            }, 
            kernelTFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 't');
                }
                else {
                    return path.join(this.kernelSrcIttfPath(packageName, version), 't', folder);
                }
            }, 
            // v<x>-plugins/<packageName>/src
            pluginSrcPath: function(packageName, version) {
                return path.join(config.getWizziPluginsBasePath(version), packageName, 'src');
            }, 
            // v<x>-plugins/<packageName>/src/ittf
            pluginSrcIttfPath: function(packageName, version) {
                return path.join(config.getWizziPluginsBasePath(version), packageName, 'src', 'ittf');
            }, 
            // v<x>-plugins/<packageName>/src/generate.js
            pluginGeneratePath: function(packageName, version) {
                return path.join(this.pluginSrcPath(packageName, version), 'generate.js');
            }, 
            // v<x>-plugins/<packageName>/src/generate.wfjob.ittf
            pluginGenerateWfJobPath: function(packageName, version) {
                return path.join(this.pluginSrcPath(packageName, version), 'generate.wfjob.ittf');
            }, 
            // v<x>-plugins/<packageName>/src/ittf/root
            pluginRootFolderPath: function(packageName, version) {
                return path.join(this.pluginSrcIttfPath(packageName, version), 'root');
            }, 
            // v<x>-plugins/<packageName>/src/ittf/lib[/<folder>]
            pluginLibFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'lib');
                }
                else {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'lib', folder);
                }
            }, 
            // v<x>-plugins/<packageName>/src/ittf/examples[/<folder>]
            pluginExamplesFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'examples');
                }
                else {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'examples', folder);
                }
            }, 
            // v<x>-plugins/<packageName>/src/ittf/meta[/<folder>]
            pluginMetaFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'meta');
                }
                else {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'meta', folder);
                }
            }, 
            // v<x>-plugins/<packageName>/src/ittf/tests[/<folder>]
            pluginTestsFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'tests');
                }
                else {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'tests', folder);
                }
            }, 
            // v<x>-plugins/<packageName>/src/ittf/t
            pluginTFolderPath: function(packageName, version, folder) {
                if (verify.isEmpty(folder)) {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 't');
                }
                else {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 't', folder);
                }
            }, 
            // v<x>-plugins/<packageName>/src/ittf/lib/wizzi[/<schemaName>]
            pluginWizziSchemaPath: function(packageName, version, schemaName) {
                if (verify.isEmpty(schemaName)) {
                    return path.join(this.pluginLibFolderPath(packageName, version, 'wizzi'), 'schemas');
                }
                else {
                    return path.join(this.pluginSrcIttfPath(packageName, version), 'schemas', schemaName + '.wfschema.ittf');
                }
            }, 
            pluginWizziTSchemaPath: function(packageName, version, schemaName) {
                if (verify.isEmpty(schemaName)) {
                    return path.join(this.pluginLibFolderPath(packageName, version, 'wizzi'), 'schemas', 't');
                }
                else {
                    return path.join(this.pluginLibFolderPath(packageName, version), 'schemas', 't', schemaName);
                }
            }, 
            pluginArtifactPath: function(packageName, version, schemaName, artifactName) {
                if (verify.isEmpty(schemaName)) {
                    return path.join(this.pluginLibFolderPath(packageName, version, 'artifacts'));
                }
                else {
                    return path.join(this.pluginLibFolderPath(packageName, version, 'artifacts'), schemaName, artifactName);
                }
            }, 
            pluginTArtifactPath: function(packageName, version, schemaName, artifactName) {
                if (verify.isEmpty(schemaName)) {
                    return path.join(this.pluginLibFolderPath(packageName, version, 'artifacts'), 't');
                }
                else {
                    return path.join(this.pluginLibFolderPath(packageName, 'artifacts', version), schemaName, artifactName, 't');
                }
            }, 
            // v<x>-plugins/<packageName>/src/ittf/lib
            // except lib/wizzi, lib/artifacts, lib/t
            pluginLibDocuments: function(packageName, version) {
                var docs = this.getIttfFiles(path.join(this.pluginLibFolderPath(packageName, version)));
                var result = [];
                var i, i_items=docs, i_len=docs.length, doc;
                for (i=0; i<i_len; i++) {
                    doc = docs[i];
                    if (!(doc.relFolder.substr(0,6) === 'wizzi/' || doc.relFolder.substr(0,10) === 'artifacts/' || doc.relFolder.substr(0,2) === 't/')) {
                        result.push(doc);
                    }
                }
                return result;
            }, 
            // v<x>-plugins/t
            pluginsTDocuments: function(packageName, version) {
                return this.getIttfFiles(path.join(config.getWizziPluginsBasePath(version), 't'));
            }, 
            // v<x>-plugins/<packageName>/src/ittf/t
            pluginsPackageTDocuments: function(packageName, version) {
                return this.getIttfFiles(path.join(this.pluginSrcPath(packageName, version), 't'));
            }, 
            // v<x>-plugins/<packageName>/src/ittf/lib/t
            pluginLibTDocuments: function(packageName, version) {
                return this.getIttfFiles(path.join(this.pluginLibFolderPath(packageName, version), 't'));
            }, 
            // v<x>-plugins/<packageName>/src/ittf/lib/wizzi/schemas/*.wfschema.ittf
            pluginSchemas: function(packageName, version) {
                var schemas = [];
                var libWizziSchemaFiles = this.getIttfFiles(this.pluginWizziSchemaPath(packageName, version));
                var i, i_items=libWizziSchemaFiles, i_len=libWizziSchemaFiles.length, item;
                for (i=0; i<i_len; i++) {
                    item = libWizziSchemaFiles[i];
                    if (item.relFolder.length == 0) {
                        var ss = item.baseName.split('.');
                        if (ss.length == 3 && ss[1] === 'wfschema') {
                            schemas.push({
                                name: ss[0], 
                                schemaId: this.schemaId(packageName, ss[0]), 
                                mainDocument: item
                            });
                        }
                    }
                }
                return schemas;
            }, 
            // v<x>-plugins/<packageName>/src/ittf/lib/wizzi/schemas/t/*.* excluded /t/<schemaname>
            pluginSchemasTIttfDocuments: function(packageName, version) {
                var schemaRootFiles = this.getIttfFiles(this.pluginWizziSchemaPath(packageName, version));
                var schemaNames = [];
                var i, i_items=schemaRootFiles, i_len=schemaRootFiles.length, item;
                for (i=0; i<i_len; i++) {
                    item = schemaRootFiles[i];
                    if (item.relFolder.length == 0) {
                        var ss = item.baseName.split('.');
                        if (ss.length == 3 && ss[1] === 'wfschema') {
                            schemaNames.push(ss[0]);
                        }
                    }
                }
                var schemaTRootFiles = this.getIttfFiles(path.join(this.pluginWizziSchemaPath(packageName), 't'));
                console.log('pluginSchemasTIttfDocuments.schemaTRootFiles', schemaTRootFiles);
                var schemasTDocuments = [];
                var i, i_items=schemaTRootFiles, i_len=schemaTRootFiles.length, item;
                for (i=0; i<i_len; i++) {
                    item = schemaTRootFiles[i];
                    if (item.relFolder.length == 0) {
                        schemasTDocuments.push(item);
                    }
                    else {
                        var ss = item.relFolder.split('/');
                        if (schemaNames.indexOf(ss[0]) < 0) {
                            schemasTDocuments.push(item);
                        }
                    }
                }
                return schemasTDocuments;
            }, 
            schemaOutputPath: function(packageName, schemaName) {
                return path.join(config.generatedPluginsOutputBasePath, packageName || config.defaultGeneratedPlugin, 'wizzi', 'models');
            }
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var checkApi = makeCheckApi(config);
    var wizziIttfApi = makeWizziIttfApi(config);
    var wizziKernelApi = makeWizziKernelApi(config);
    var wizziPluginsApi = makeWizziPluginsApi(config);
    var wizziSystemApi = makeWizziSystemApi(config);
    api.wizzi = {
        getCheck: checkApi.get, 
        getKernelPackages: wizziKernelApi.getKernelPackages, 
        getKernelPackage: wizziKernelApi.getKernelPackage, 
        getPluginsPackages: wizziPluginsApi.getPluginsPackages, 
        getPluginPackage: wizziPluginsApi.getPluginPackage, 
        getPluginSchemas: wizziPluginsApi.getPluginSchemas, 
        getPluginArtifacts: wizziPluginsApi.getPluginArtifacts, 
        getIttfDocument: wizziIttfApi.getIttfDocument, 
        putIttfDocument: wizziIttfApi.putIttfDocument, 
        generateDefaultArtifact: wizziIttfApi.generateDefaultArtifact, 
        generateArtifact: wizziIttfApi.generateArtifact, 
        getMTreeDebugInfo: wizziIttfApi.getMTreeDebugInfo, 
        getWizziFactoryInfo: wizziIttfApi.getWizziFactoryInfo, 
        generateDefaultArtifact: wizziIttfApi.generateDefaultArtifact, 
        generateWfJob: wizziIttfApi.generateWfJob, 
        generateWfSchema: wizziIttfApi.generateWfSchema, 
        getSystemPackages: wizziSystemApi.getSystemPackages, 
        paths: makePaths(config)
    };
    return callback(null, api);
};
