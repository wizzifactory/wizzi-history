/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\studio.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Studio
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
function makeCheckApi(config) {
    var paths = makePaths(config);
    return {
            get: function(callback) {
                return callback(null, {
                        data: {
                            config: config, 
                            dashboardIttfPath: paths.dashboardIttfPath({}), 
                            uriFromPath: {
                                in: 'C:\\My\\wizzi\\v5\\apps\\wizzi-studio\\wizzi-studio-express\\dist\\server\\data\\studio\\api\\user', 
                                out: paths.uriFromPath('C:\\My\\wizzi\\v5\\apps\\wizzi-studio\\wizzi-studio-express\\dist\\server\\data\\studio\\api\\user')
                            }, 
                            pathFromUri: {
                                in: '/api/user', 
                                out: paths.pathFromUri('/api/user')
                            }, 
                            userPath: {
                                in: 'stefi', 
                                out: paths.userPath('stefi')
                            }, 
                            projectPath: {
                                in: 'stefi,wizzi', 
                                out: paths.projectPath('stefi', 'wizzi')
                            }, 
                            userMeta: {
                                in: "{userId: 'stefi'}", 
                                out: paths.userMeta({
                                    userId: 'stefi'
                                })
                            }, 
                            projectList: {
                                in: "{userId: 'stefi'}", 
                                out: paths.projectList({
                                    userId: 'stefi'
                                })
                            }, 
                            projectMeta: {
                                in: "{userId: 'stefi', userId: 'wizzi'}", 
                                out: paths.projectMeta({
                                    userId: 'stefi', 
                                    projectName: 'wizzi'
                                })
                            }, 
                            documentList: {
                                in: "{userId: 'stefi', userId: 'wizzi'}", 
                                out: paths.documentList({
                                    userId: 'stefi', 
                                    projectName: 'wizzi'
                                })
                            }
                        }, 
                        status: success('Check data retrieved')
                    });
            }
        };
}
function makeUserApi(config) {
    var paths = makePaths(config);
    return {
            getUser: function(options, callback) {
                // options.userId required
                var metaPath = paths.userMeta(options);
                console.log('getUser.metaPath', metaPath);
                if (file.isFile(metaPath)) {
                    return callback(null, {
                            data: file.readJSON(metaPath), 
                            status: success('User data fetched')
                        });
                }
                else {
                    file.writeJSON(metaPath, {
                        name: options.userId, 
                        currentProject: null
                    });
                    return callback(null, {
                            data: {
                                name: options.userId, 
                                currentProject: null
                            }, 
                            status: success('User data fetched')
                        });
                }
            }, 
            updateUser: function(options, callback) {
                // options.userId required
                // options.project required
                var metaPath = paths.userMeta(options);
                this.getUser(options, function(err, result) {
                    if (err) {
                        return this.createtUser(options, callback);
                    }
                    delete options.userId
                    var userMeta = Object.assign({}, result.data, options);
                    file.writeJSON(metaPath, userMeta);
                    callback(null, {
                        data: {
                            name: userMeta.name, 
                            currentProject: userMeta.currentProject
                        }, 
                        status: success('User updated: "' + options.userId + '"')
                    });
                });
            }
        };
}
function makePackageApi(config) {
    var paths = makePaths(config);
    return {
            createPackage: function(options, callback) {
                var metaPath = paths.packageMeta(options);
                if (file.isFile(metaPath)) {
                    return callback(error('studioApi.createPackage. Package document meta already exists: "' + metaPath + '"'));
                }
                var packageMeta = {
                    name: options.packageName, 
                    user: options.userId, 
                    metaPath: metaPath, 
                    created: u.now_GMYHMS(), 
                    lastUpdated: u.now_GMYHMS(), 
                    schemas: [], 
                    transformers: [], 
                    artifacts: []
                };
                file.writeJSON(metaPath, packageMeta);
                var inserted = {
                    name: options.packageName, 
                    user: options.userId
                };
                this.getPackages(options, function(err, result) {
                    if (err) {
                        callback(null, {
                            data: {
                                inserted: inserted, 
                                packages: [inserted]
                            }, 
                            status: success('Package created: "' + options.packageName + '"')
                        });
                    }
                    else {
                        callback(null, {
                            data: {
                                inserted: inserted, 
                                packages: result.data.packages
                            }, 
                            status: success('Package created: "' + options.packageName + '"')
                        });
                    }
                });
            }, 
            getPackages: function(options, callback) {
                this.getCommons(options, function(err, commons) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: {
                                packages: commons.data.packages
                            }, 
                            status: success('Package list fetched')
                        });
                });
            }, 
            getPackage: function(options, callback) {
                var packageId = options.packageId;
                this.getCommons(options, function(err, commons) {
                    if (err) {
                        return callback(error(err));
                    }
                    var xpackage = _.find(commons.data.packages, {
                        'name': packageId
                    });
                    return callback(null, {
                            data: {
                                package: xpackage
                            }, 
                            status: success('Package fetched')
                        });
                });
            }
        };
}
function makeProjectApi(config) {
    var paths = makePaths(config);
    return {
            createProject: function(options, callback) {
                var metaPath = paths.projectMeta(options);
                if (file.isFile(metaPath)) {
                    return callback(error('studioApi.createProject. Project document meta already exists: "' + metaPath + '"'));
                }
                var projectMeta = {
                    name: options.projectName, 
                    user: options.userId, 
                    metaPath: metaPath, 
                    created: u.now_GMYHMS(), 
                    lastUpdated: u.now_GMYHMS(), 
                    schemas: [], 
                    transformers: [], 
                    artifacts: []
                };
                file.writeJSON(metaPath, projectMeta);
                var inserted = {
                    name: options.projectName, 
                    user: options.userId
                };
                this.getProjects(options, function(err, result) {
                    if (err) {
                        callback(null, {
                            data: {
                                inserted: inserted, 
                                projects: [inserted]
                            }, 
                            status: success('Project created: "' + options.projectName + '"')
                        });
                    }
                    else {
                        callback(null, {
                            data: {
                                inserted: inserted, 
                                projects: result.data.projects
                            }, 
                            status: success('Project created: "' + options.projectName + '"')
                        });
                    }
                });
            }, 
            getProjects: function(options, callback) {
                console.log('getProjects', options);
                var projects = paths.projectList(options);
                callback(null, {
                    data: {
                        projects: projects
                    }, 
                    status: success('Projects fetched')
                });
            }
        };
}
function makeSchemaApi(config) {
    var paths = makePaths(config);
    return {
            getSchema: function(options, callback) {
                this.getCommons(options, function(err, commons) {
                    if (err) {
                        return callback(error(err));
                    }
                    var schemaUri = options.schemaUri;
                    var schema = _.find(commons.data.schemas, {
                        'uri': schemaUri
                    });
                    console.log('getSchema', schemaUri, schema);
                    if (!schema) {
                        return callback(error('Cannot find schema: ' + schemaUri));
                    }
                    try {
                        var src = file.read(schema.srcPath);
                        var model = file.read(schema.modelPath);
                        var factory = file.read(schema.factoryPath);
                        var jsonDoc = file.readJSON(schema.jsonDocPath);
                    } 
                    catch (ex) {
                        return callback(error('Error retrieving files of schema: ' + schemaUri + ' message:' + ex.message));
                    } 
                    callback(null, {
                        data: {
                            uri: schemaUri, 
                            ittfDocument: src, 
                            model: model, 
                            factory: factory, 
                            jsonDoc: jsonDoc
                        }, 
                        status: success('Schemas fetched: ' + schemaUri)
                    });
                });
            }, 
            getSchemas: function(options, callback) {
                this.getCommons(options, function(err, commons) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: {
                                schemas: commons.data.schemas
                            }, 
                            status: success('Schema list fetched')
                        });
                });
            }, 
            getSchemaJsonDoc: function(options, callback) {
                this.getCommons(options, function(err, commons) {
                    if (err) {
                        return callback(error(err));
                    }
                    var schemaUri = options.schemaUri;
                    var result = null;
                    var i, i_items=commons.data.schemas, i_len=commons.data.schemas.length, item;
                    for (i=0; i<i_len; i++) {
                        item = commons.data.schemas[i];
                        if (item.uri === schemaUri) {
                            result = file.readJSON(item.jsonDocPath);
                            break;
                        }
                    }
                    if (result) {
                        callback(null, {
                            data: {
                                schemaJsonDoc: result, 
                                schemaUri: schemaUri
                            }, 
                            status: success('Schemas json doc fetched: ' + schemaUri)
                        });
                    }
                    else {
                        callback(error('Schemas json doc not found for schema: "' + schemaUri + '" at path:"' + item.jsonDocPath + '"'));
                    }
                });
            }
        };
}
function makeIttfDocumentApi(config) {
    var paths = makePaths(config);
    return {
            getDocumentMeta: function(options, callback) {
                var documentUri = paths.documentMeta(options);
                if (file.isFile(documentUri)) {
                    return callback(null, {
                            data: file.readJSON(documentUri), 
                            status: success('Ittf document meta fetched')
                        });
                }
                else {
                    return callback(error('Ittf document meta not found: "' + documentUri + '"'));
                }
            }, 
            getDocument: function(uri, callback) {
                var documentUri = paths.pathFromUri(uri);
                if (file.isFile(documentUri)) {
                    return callback(null, {
                            data: file.read(documentUri), 
                            status: success('Ittf document ' + uri + ' fetched')
                        });
                }
                else {
                    return callback(error('Ittf document not found: "' + documentUri + '"'));
                }
            }, 
            getDocuments: function(options, callback) {
                console.log('getDocuments', options);
                var documents = paths.documentList(options);
                callback(null, {
                    data: {
                        documents: documents
                    }, 
                    status: success('Documents fetched')
                });
            }, 
            createDocument: function(options, callback) {
                var metaPath = paths.documentMeta(options);
                if (file.isFile(metaPath)) {
                    return callback(error('studioApi.createDocument. Ittf document meta already exists: "' + metaPath + '"'));
                }
                var ittfPath = paths.documentIttf(options);
                if (file.isFile(ittfPath)) {
                    return callback(error('studioApi.createDocument. Ittf document already exists: "' + ittfPath + '"'));
                }
                var ittfContent = options.schemaName + ' ' + options.documentName;
                file.write(ittfPath, ittfContent);
                var documentMeta = {
                    name: options.documentName, 
                    schema: options.schemaName, 
                    folder: options.folder, 
                    project: options.projectName, 
                    user: options.userId, 
                    metaPath: metaPath, 
                    ittfPath: ittfPath, 
                    uri: paths.uriFromPath(ittfPath, false), 
                    created: u.now_GMYHMS(), 
                    lastUpdated: u.now_GMYHMS(), 
                    contextModels: [], 
                    contextValues: []
                };
                file.writeJSON(metaPath, documentMeta);
                callback(null, {
                    data: {
                        name: options.documentName, 
                        schema: options.schemaName, 
                        folder: options.folder, 
                        project: options.projectName, 
                        user: options.userId, 
                        uri: paths.uriFromPath(ittfPath, false), 
                        ittfContent: ittfContent
                    }, 
                    status: success('Ittf document created: "' + paths.uriFromPath(ittfPath, false) + '"')
                });
            }, 
            updateDocument: function(documentUri, ittfContent, callback) {
                var ittfPath = paths.pathFromUri(documentUri);
                if (file.isFile(ittfPath) === false) {
                    return callback(error('Ittf document does not exist: "' + ittfPath + '"'));
                }
                file.write(ittfPath, ittfContent);
                callback(null, {
                    data: null, 
                    status: success('Ittf document updated "' + documentUri + '"')
                });
            }, 
            deleteDocument: function(documentUri, callback) {
                var metaPath = paths.metaPathFromUri(documentUri);
                if (file.isFile(metaPath) === false) {
                    return callback(error('Ittf document meta does not exist: "' + metaPath + '"'));
                }
                var ittfPath = paths.pathFromUri(documentUri);
                if (file.isFile(ittfPath) === false) {
                    return callback(error('Ittf document does not exist: "' + ittfPath + '"'));
                }
                file.delete(metaPath);
                file.delete(ittfPath);
                callback(null, {
                    data: {
                        uri: documentUri
                    }, 
                    status: success('Ittf document deleted: "' + documentUri + '"')
                });
            }
        };
}
function makeIttfFragmentApi(config) {
    var paths = makePaths(config);
    return {
            getFragment: function(uri, callback) {
                var fragmentUri = paths.pathFromUri(uri);
                if (file.isFile(fragmentUri)) {
                    return callback(null, {
                            data: file.read(fragmentUri), 
                            status: success('Ittf fragment ' + uri + ' fetched')
                        });
                }
                else {
                    return callback(error('Ittf fragment not found: "' + fragmentUri + '"'));
                }
            }, 
            getFragments: function(options, callback) {
                var fragments = paths.fragmentList(options);
                callback(null, {
                    data: {
                        fragments: fragments
                    }, 
                    status: success('Fragments fetched')
                });
            }, 
            createFragment: function(options, callback) {
                var ittfPath = paths.fragmentIttf(options);
                if (file.isFile(ittfPath)) {
                    return callback(error('studioApi.createFragment. Ittf document already exists: "' + ittfPath + '"'));
                }
                file.write(ittfPath, '');
                callback(null, {
                    data: {
                        name: options.artifactName, 
                        schema: options.schemaName, 
                        folder: options.folder, 
                        project: options.projectName, 
                        user: options.userId, 
                        uri: paths.uriFromPath(ittfPath, false), 
                        ittfContent: ''
                    }, 
                    status: success('Ittf fragment created: "' + paths.uriFromPath(ittfPath, false) + '"')
                });
            }, 
            updateFragment: function(fragmentUri, ittfContent, callback) {
                var ittfPath = paths.pathFromUri(fragmentUri);
                if (file.isFile(ittfPath) === false) {
                    return callback(error('Ittf fragment does not exist: "' + ittfPath + '"'));
                }
                file.write(ittfPath, ittfContent);
                callback(null, {
                    data: null, 
                    status: success('Ittf fragment updated "' + fragmentUri + '"')
                });
            }, 
            deleteFragment: function(fragmentUri, callback) {
                var ittfPath = paths.pathFromUri(fragmentUri);
                if (file.isFile(ittfPath) === false) {
                    return callback(error('Ittf fragment does not exist: "' + ittfPath + '"'));
                }
                file.delete(ittfPath);
                callback(null, {
                    data: {
                        uri: fragmentUri
                    }, 
                    status: success('Ittf fragment deleted: "' + fragmentUri + '"')
                });
            }
        };
}
function makeGenerationApi(config) {
    var paths = makePaths(config);
    return {
            generateArtifact: function(documentUri, artifactName, callback) {
                var ittfDocumentPath = paths.pathFromUri(documentUri);
                var sessionData = {};
                var modelContext = {};
                var artifactContext = {};
                globalApi.wf.loadModelAndGenerateArtifact(sessionData, ittfDocumentPath, modelContext, artifactName, artifactContext, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    return callback(null, {
                            data: result, 
                            status: success('Artifact generation ' + artifactName + ' on uri ' + documentUri + ' executed')
                        });
                });
            }
        };
}
function makeCommonsApi(config) {
    var paths = makePaths(config);
    return {
            getCommons: function(options, callback) {
                var that = this;
                this.getUser(options, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    var userState = result.data;
                    that.getProjects(options, function(err, result) {
                        if (err) {
                            return callback(error(err));
                        }
                        var projects = result.data.projects;
                        var dashboardIttfPath = paths.dashboardIttfPath(options);
                        var sessionData = {};
                        var modelContext = {};
                        var formatOptions = {};
                        globalApi.wf.loadModel(sessionData, dashboardIttfPath, modelContext, formatOptions, function(err, result) {
                            if (err) {
                                return callback(error(err));
                            }
                            console.log('getCommons.result', result.data);
                            return callback(null, {
                                    data: {
                                        userState: userState, 
                                        projects: projects, 
                                        schemas: result.data.schemas, 
                                        packages: result.data.packagesEx, 
                                        artifacts: result.data.artifacts, 
                                        transformations: result.data.transformations
                                    }, 
                                    status: success('Commons dashboard data retrieved')
                                });
                        });
                    });
                });
            }, 
            getDefaultArtifacts: function(options, callback) {
                this.getCommons(options, function(err, result) {
                    if (err) {
                        return callback(error(err));
                    }
                    var ret = {};
                    var i, i_items=result.data.schemas, i_len=result.data.schemas.length, s;
                    for (i=0; i<i_len; i++) {
                        s = result.data.schemas[i];
                        var j, j_items=s.artifacts, j_len=s.artifacts.length, a;
                        for (j=0; j<j_len; j++) {
                            a = s.artifacts[j];
                            if (a.isDefault) {
                                ret[s.name] = a.name;
                            }
                        }
                        if (!ret[s.name] && s.artifacts.length > 0) {
                            ret[s.name] = s.artifacts[0];
                        }
                    }
                    return callback(null, {
                            data: {
                                defaultArtifacts: ret
                            }, 
                            status: success('Defualt artifact fetched')
                        });
                });
            }
        };
}
function makePaths(config) {
    return {
            schemaId: function(packageName, schemaName) {
                return [
                        config.wizziPluginsBaseId, 
                        packageName, 
                        schemaName
                    ].join('_');
            }, 
            artifactId: function(packageName, schemaName, artifactName) {
                return [
                        config.wizziPluginsBaseId, 
                        packageName, 
                        schemaName, 
                        artifactName
                    ].join('_');
            }, 
            getFolderMetaFiles: function(folderPath) {
                var files = file.getGlobbedFiles(folderPath + "/**/*.meta.json");
                console.log('getFolderMetaFiles', folderPath, files);
                var ret = [];
                var i, i_items=files, i_len=files.length, item;
                for (i=0; i<i_len; i++) {
                    item = files[i];
                    // remove /__/ meta sub folder
                    var dirName = path.dirname(path.dirname(item));
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
            projectPath: function(userId, projectName) {
                return path.join(config.studioBasePath, userId, projectName);
            }, 
            userPath: function(userId) {
                return path.join(config.studioBasePath, userId);
            }, 
            detectLevel: function(options) {
                if (verify.isEmpty(options.folder)) {
                    if (verify.isEmpty(options.projectName)) {
                        return 'user';
                    }
                    else {
                        return 'project';
                    }
                }
                else {
                    return 'folder';
                }
            }, 
            detectOptions: function(options) {
                if (options.kind === 'genexplorer') {
                    options.userId = 'demo';
                    options.projectName = 'genexplorer';
                }
                options.level = this.detectLevel(options);
                return options;
            }, 
            dashboardIttfPath: function(options) {
                console.log('config.metaBasePath', config.metaBasePath);
                var segments = [
                    config.metaBasePath, 
                    'dashboard.wfstudio.ittf'
                ];
                return this.joinPathFromArray(segments);
            }, 
            userMeta: function(options) {
                var segments = [
                    config.studioBasePath, 
                    options.userId
                ];
                segments.push('__');
                segments.push(options.userId + '.meta.json');
                return this.joinPathFromArray(segments);
            }, 
            projectMeta: function(options) {
                var segments = [
                    config.studioBasePath, 
                    options.userId, 
                    options.projectName
                ];
                segments.push('__');
                segments.push(options.projectName + '.meta.json');
                return this.joinPathFromArray(segments);
            }, 
            projectList: function(options) {
                options = this.detectOptions(options);
                var folderPath = this.userPath(options.userId);
                console.log('projectList.folderPath', folderPath);
                var folders = this.getFolders(folderPath);
                var projects = [];
                var i, i_items=folders, i_len=folders.length, folder;
                for (i=0; i<i_len; i++) {
                    folder = folders[i];
                    if (folder.name !== '__') {
                        projects.push({
                            name: folder.name
                        });
                    }
                }
                return projects;
            }, 
            documentMeta: function(options) {
                options = this.detectOptions(options);
                var segments = [
                    config.studioBasePath, 
                    options.userId
                ];
                if (options.level === 'folder') {
                    segments.push(options.projectName);
                    segments.push(options.folder);
                }
                else if (options.level === 'project') {
                    segments.push(options.projectName);
                }
                else {
                    // user level
                }
                segments.push('__');
                segments.push(options.documentName + '.' + options.schemaName + '.meta.json');
                return this.joinPathFromArray(segments);
            }, 
            documentIttf: function(options) {
                options = this.detectOptions(options);
                var segments = [
                    config.studioBasePath, 
                    options.userId
                ];
                if (options.level === 'folder') {
                    segments.push(options.projectName);
                    segments.push(options.folder);
                }
                else if (options.level === 'project') {
                    segments.push(options.projectName);
                }
                else {
                    // user level
                }
                segments.push(options.documentName + '.' + options.schemaName + '.ittf');
                return this.joinPathFromArray(segments);
            }, 
            documentList: function(options) {
                options = this.detectOptions(options);
                var folderPath = this.projectPath(options.userId, options.projectName);
                console.log('documentList.folderPath', folderPath);
                var files = this.getFolderMetaFiles(folderPath);
                var documents = [];
                var i, i_items=files, i_len=files.length, file;
                for (i=0; i<i_len; i++) {
                    file = files[i];
                    var nameSchema = this.documentNameAndSchemaFromBaseName(file.baseName);
                    var dirUri = this.uriFromPath(file.dirName);
                    var folder = dirUri.substr(('/' + options.userId + '/' + options.projectName + '/').length);
                    documents.push({
                        name: nameSchema.name, 
                        schema: nameSchema.schema, 
                        folder: folder, 
                        project: options.projectName, 
                        user: options.userId, 
                        uri: this.normalize(path.join(dirUri, nameSchema.name + '.' + nameSchema.schema + '.ittf'))
                    });
                }
                return documents;
            }, 
            documentNameAndSchemaFromBaseName: function(basename) {
                var suffix = '.meta.json';
                var docName = basename.substring(0, basename.length - suffix.length);
                var lastDotPos = docName.lastIndexOf('.');
                var docSchema = docName.substring(lastDotPos + 1, docName.length);
                var docNameNoExt = docName.substring(0, lastDotPos);
                return {
                        name: docNameNoExt, 
                        schema: docSchema
                    };
            }, 
            fragmentIttf: function(options) {
                options = this.detectOptions(options);
                var segments = [
                    config.studioBasePath, 
                    options.userId
                ];
                if (options.level === 'folder') {
                    segments.push(options.projectName);
                    segments.push(options.folder);
                }
                else if (options.level === 'project') {
                    segments.push(options.projectName);
                }
                else {
                    // user level
                }
                segments.push('t');
                if (options.tfolder) {
                    segments.push(options.tfolder);
                }
                segments.push(options.fragmentName + '.' + options.schemaName + '.ittf');
                return this.joinPathFromArray(segments);
            }, 
            fragmentList: function(options) {
                return {
                        user: this.userFragmentList(options), 
                        project: this.projectFragmentList(options)
                    };
            }, 
            projectFragmentList: function(options) {
                options = this.detectOptions(options);
                var folderPath = this.projectPath(options.userId, options.projectName);
                return this.folderFragmentList(folderPath, options);
            }, 
            userFragmentList: function(options) {
                options = this.detectOptions(options);
                var folderPath = this.projectPath(options.userId, 't');
                return this.folderFragmentList(folderPath, options);
            }, 
            folderFragmentList: function(folderPath, options) {
                var files = this.getIttfFiles(folderPath);
                var fragments = [];
                var i, i_items=files, i_len=files.length, file;
                for (i=0; i<i_len; i++) {
                    file = files[i];
                    if (this.isFragment(file.fullPath)) {
                        var nameSchema = this.fragmentNameAndSchemaFromBaseName(file.baseName);
                        var dirUri = this.uriFromPath(file.dirName);
                        var folder = dirUri.substr(('/' + options.userId + '/' + options.projectName + '/').length);
                        fragments.push({
                            name: nameSchema.name, 
                            schema: nameSchema.schema, 
                            folder: folder, 
                            project: options.projectName, 
                            user: options.userId, 
                            uri: this.normalize(path.join(dirUri, nameSchema.name + '.' + nameSchema.schema + '.ittf'))
                        });
                    }
                }
                return fragments;
            }, 
            isFragment: function(filePath) {
                filePath = this.normalize(filePath);
                return filePath.indexOf('/t/') > -1;
            }, 
            fragmentNameAndSchemaFromBaseName: function(basename) {
                var suffix = '.ittf';
                var docName = basename.substring(0, basename.length - suffix.length);
                var lastDotPos = docName.lastIndexOf('.');
                var docSchema = docName.substring(lastDotPos + 1, docName.length);
                var docNameNoExt = docName.substring(0, lastDotPos);
                return {
                        name: docNameNoExt, 
                        schema: docSchema
                    };
            }
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    var checkApi = makeCheckApi(config);
    var documentApi = makeIttfDocumentApi(config);
    var fragmentApi = makeIttfFragmentApi(config);
    var projectApi = makeProjectApi(config);
    var packageApi = makePackageApi(config);
    var schemaApi = makeSchemaApi(config);
    var userApi = makeUserApi(config);
    var commonsApi = makeCommonsApi(config);
    var generationApi = makeGenerationApi(config);
    api.studio = {
        getCheck: checkApi.get, 
        getCommons: commonsApi.getCommons, 
        getDefaultArtifacts: commonsApi.getDefaultArtifacts, 
        getUser: userApi.getUser, 
        updateUser: userApi.updateUser, 
        createPackage: packageApi.createPackage, 
        getPackages: packageApi.getPackages, 
        getPackage: packageApi.getPackage, 
        createProject: projectApi.createProject, 
        getProjects: projectApi.getProjects, 
        getSchemas: schemaApi.getSchemas, 
        getSchemaJsonDoc: schemaApi.getSchemaJsonDoc, 
        getSchema: schemaApi.getSchema, 
        getDocuments: documentApi.getDocuments, 
        getDocument: documentApi.getDocument, 
        createDocument: documentApi.createDocument, 
        updateDocument: documentApi.updateDocument, 
        deleteDocument: documentApi.deleteDocument, 
        getFragments: fragmentApi.getFragments, 
        getFragment: fragmentApi.getFragment, 
        createFragment: fragmentApi.createFragment, 
        updateFragment: fragmentApi.updateFragment, 
        deleteFragment: fragmentApi.deleteFragment, 
        generateArtifact: generationApi.generateArtifact, 
        paths: makePaths(config)
    };
    return callback(null, api);
};
