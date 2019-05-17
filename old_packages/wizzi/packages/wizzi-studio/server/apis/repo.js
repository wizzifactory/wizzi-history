/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\apis\repo.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Api: Repo
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
var repoFS;
function makeFsApi(config) {
    var paths = makePaths(config);
    return {
            getUserRoot: function(userId, callback) {
                repoFS.readDir(userId, null, null, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    var items = [];
                    var i, i_items=result, i_len=result.length, f;
                    for (i=0; i<i_len; i++) {
                        f = result[i];
                        const parentPath = userId;
                        items.push({
                            basename: f.basename, 
                            parentFullPath: parentPath, 
                            fullPath: parentPath + '/' + f.basename, 
                            parentFolderPath: null, 
                            folderPath: null, 
                            kind: f.kind
                        });
                    }
                    return callback(null, {
                            status: success('Project folders retrieved for user ' + userId), 
                            data: {
                                kind: 0, 
                                userId: userId, 
                                projectId: null, 
                                folderPath: null, 
                                items: items
                            }
                        });
                });
            }, 
            getProjectRoot: function(userId, projectId, callback) {
                repoFS.readDir(userId, projectId, null, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    var items = [];
                    var i, i_items=result, i_len=result.length, f;
                    for (i=0; i<i_len; i++) {
                        f = result[i];
                        const parentPath = userId + '/' + projectId;
                        const fileItem = {
                            basename: f.basename, 
                            parentFullPath: parentPath, 
                            fullPath: parentPath + '/' + f.basename, 
                            parentFolderPath: null, 
                            folderPath: f.basename, 
                            kind: f.kind
                        };
                        if (f.kind == 1) {
                            const ss = f.basename.split('.');
                            fileItem.isIttfDocument = ss.length > 0 && ss.pop() === 'ittf';
                            fileItem.schema = fileItem.isIttfDocument && ss.length > 1 ? ss[ss.length-1] : null;
                            fileItem.isFragment = (parentPath + '/' + f.basename).indexOf('/t/') > - 1;
                        }
                        items.push(fileItem);
                    }
                    return callback(null, {
                            status: success('Folder retrieved for project ' + userId + '/' + projectId), 
                            data: {
                                kind: 0, 
                                userId: userId, 
                                projectId: projectId, 
                                folderPath: null, 
                                items: items
                            }
                        });
                });
            }, 
            getFolderOrFile: function(userId, projectId, itemPath, callback) {
                const fullPath = userId + '/' + projectId + '/' + itemPath;
                var itemPathParts = itemPath.split('/');
                var basename = itemPathParts[itemPathParts.length-1];
                repoFS.isFile(userId, projectId, itemPath, function(err, isfile) {
                    if (err) {
                        return callback(err);
                    }
                    if (isfile) {
                        const fullPathForHash = repoFS.fullPathForHash(userId, projectId, itemPath);
                        const ss = basename.split('.');
                        const isIttfDocument = ss.length > 0 && ss.pop() === 'ittf';
                        const schema = isIttfDocument && ss.length > 1 ? ss[ss.length-1] : null;
                        repoFS.readFile(userId, projectId, itemPath, function(err, result) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('File retrieved ' + userId + '/' + projectId + '/' + itemPath), 
                                    data: {
                                        kind: 1, 
                                        userId: userId, 
                                        projectId: projectId, 
                                        folderPath: itemPath, 
                                        basename: basename, 
                                        content: result, 
                                        isIttfDocument: isIttfDocument, 
                                        schema: schema, 
                                        isFragment: (fullPath).indexOf('/t/') > - 1, 
                                        hash: hashEncrypt(fullPathForHash)
                                    }
                                });
                        });
                    }
                    else {
                        const parentPath = fullPath;
                        repoFS.readDir(userId, projectId, itemPath, function(err, result) {
                            if (err) {
                                return callback(err);
                            }
                            var items = [];
                            var i, i_items=result, i_len=result.length, f;
                            for (i=0; i<i_len; i++) {
                                f = result[i];
                                const fileItem = {
                                    basename: f.basename, 
                                    parentFullPath: parentPath, 
                                    fullPath: parentPath + '/' + f.basename, 
                                    parentFolderPath: itemPath, 
                                    folderPath: itemPath + '/' + f.basename, 
                                    kind: f.kind
                                };
                                if (f.kind == 1) {
                                    const ss = f.basename.split('.');
                                    fileItem.isIttfDocument = ss.length > 0 && ss.pop() === 'ittf';
                                    fileItem.schema = fileItem.isIttfDocument && ss.length > 1 ? ss[ss.length-1] : null;
                                    fileItem.isFragment = (parentPath + '/' + f.basename).indexOf('/t/') > - 1;
                                }
                                items.push(fileItem);
                            }
                            return callback(null, {
                                    status: success('Folder retrieved ' + userId + '/' + projectId + '/' + itemPath), 
                                    data: {
                                        kind: 0, 
                                        userId: userId, 
                                        projectId: projectId, 
                                        folderPath: itemPath, 
                                        basename: basename, 
                                        items: items
                                    }
                                });
                        });
                    }
                });
            }, 
            createDocument: function(userId, projectId, itemPath, content, callback) {
                var that = this;
                repoFS.exists(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result) {
                        return callback(error('Document already exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.writeFile(userId, projectId, itemPath, content, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document created: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document created: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            updateDocument: function(userId, projectId, itemPath, content, callback) {
                repoFS.exists(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Document does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.writeFile(userId, projectId, itemPath, content, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, {
                                status: success('Document updated: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                data: {}
                            });
                    });
                });
            }, 
            deleteDocument: function(userId, projectId, itemPath, callback) {
                var that = this;
                repoFS.isFile(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Document does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.deleteFile(userId, projectId, itemPath, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document deleted: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document deleted: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            duplicateDocument: function(userId, projectId, itemPath, newName, callback) {
                var that = this;
                repoFS.isFile(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Document does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.duplicateFile(userId, projectId, itemPath, newName, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document duplicated: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document duplicated: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            renameDocument: function(userId, projectId, itemPath, newName, callback) {
                var that = this;
                repoFS.isFile(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Document does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.renameFile(userId, projectId, itemPath, newName, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document renamed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Document renamed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            createFolder: function(userId, projectId, itemPath, callback) {
                var that = this;
                repoFS.exists(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result) {
                        return callback(error('Folder already exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.mkdir(userId, projectId, itemPath, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder created: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder created: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            deleteFolder: function(userId, projectId, itemPath, callback) {
                var that = this;
                repoFS.isFolder(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Folder does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.deleteFolder(userId, projectId, itemPath, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder deleted: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder deleted: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            duplicateFolder: function(userId, projectId, itemPath, newName, callback) {
                var that = this;
                repoFS.isFolder(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Folder does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.duplicateFolder(userId, projectId, itemPath, newName, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder duplicated: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder duplicated: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            renameFolder: function(userId, projectId, itemPath, newName, callback) {
                var that = this;
                repoFS.isFolder(userId, projectId, itemPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result == false) {
                        return callback(error('Folder does not exists: ' + userId + '/'  + projectId + '/'  + itemPath));
                    }
                    repoFS.renameFolder(userId, projectId, itemPath, newName, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        if (itemPath.indexOf('/') > -1) {
                            const parentFolder = itemPath.substr(0, itemPath.lastIndexOf('/'));
                            that.getFolderOrFile(userId, projectId, parentFolder, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder renamed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                        else {
                            that.getProjectRoot(userId, projectId, function(err, getResult) {
                                if (err) {
                                    return callback(err);
                                }
                                return callback(null, {
                                        status: success('Folder renamed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                        data: {
                                            folderRefresh: getResult.data
                                        }
                                    });
                            });
                        }
                    });
                });
            }, 
            copyPasteFsItems: function(userId, projectId, itemPath, fsItems, callback) {
                var actions = [];
                var i, i_items=fsItems, i_len=fsItems.length, item;
                for (i=0; i<i_len; i++) {
                    item = fsItems[i];
                    var basename = item.itemPath.substr(item.itemPath.lastIndexOf('/') + 1);
                    actions.push({
                        actionType: 'copy', 
                        itemKind: item.kind, 
                        userId: item.userId, 
                        sourceProjectId: item.projectId, 
                        sourceItemPath: item.itemPath, 
                        destProjectId: projectId, 
                        destItemPath: itemPath + '/' + basename
                    });
                }
                var dummy = '';
                var that = this;
                repoFS.batch(userId, actions, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (itemPath && itemPath.length > 0) {
                        that.getFolderOrFile(userId, projectId, itemPath, function(err, getResult) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('Copy - paste executed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                    data: {
                                        folderRefresh: getResult.data, 
                                        result: actions
                                    }
                                });
                        });
                    }
                    else {
                        that.getProjectRoot(userId, projectId, function(err, getResult) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('Copy - paste executed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                    data: {
                                        folderRefresh: getResult.data, 
                                        result: actions
                                    }
                                });
                        });
                    }
                    // r_cb_success( 'Copy - paste executed' + dummy
                    // @ result actions
                });
            }, 
            cutPasteFsItems: function(userId, projectId, itemPath, fsItems, callback) {
                var actions = [];
                var i, i_items=fsItems, i_len=fsItems.length, item;
                for (i=0; i<i_len; i++) {
                    item = fsItems[i];
                    var basename = item.itemPath.substr(item.itemPath.lastIndexOf('/') + 1);
                    actions.push({
                        actionType: 'move', 
                        itemKind: item.kind, 
                        userId: item.userId, 
                        sourceProjectId: item.projectId, 
                        sourceItemPath: item.itemPath, 
                        destProjectId: projectId, 
                        destItemPath: itemPath + '/' + basename
                    });
                }
                var dummy = '';
                var that = this;
                repoFS.batch(userId, actions, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (itemPath && itemPath.length > 0) {
                        that.getFolderOrFile(userId, projectId, itemPath, function(err, getResult) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('Cut - paste executed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                    data: {
                                        folderRefresh: getResult.data, 
                                        result: actions
                                    }
                                });
                        });
                    }
                    else {
                        that.getProjectRoot(userId, projectId, function(err, getResult) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('Cut - paste executed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                    data: {
                                        folderRefresh: getResult.data, 
                                        result: actions
                                    }
                                });
                        });
                    }
                    // r_cb_success( 'Cut - paste executed ' + dummy
                    // @ result actions
                });
            }, 
            deleteFsItems: function(fsItems, currentPath, callback) {
                console.log('apis.repo.deleteFsItems', 'currentPath', currentPath, 'fsItems', fsItems);
                var actions = [];
                var i, i_items=fsItems, i_len=fsItems.length, item;
                for (i=0; i<i_len; i++) {
                    item = fsItems[i];
                    actions.push({
                        actionType: 'delete', 
                        itemKind: item.kind, 
                        userId: item.userId, 
                        projectId: item.projectId, 
                        itemPath: item.itemPath
                    });
                }
                var that = this;
                repoFS.batch(null, actions, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    const userId = currentPath.userId;
                    const projectId = currentPath.projectId;
                    const itemPath = currentPath.itemPath;
                    if (itemPath && itemPath.length > 0) {
                        that.getFolderOrFile(userId, projectId, itemPath, function(err, getResult) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('Delete items executed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                    data: {
                                        folderRefresh: getResult.data, 
                                        result: actions
                                    }
                                });
                        });
                    }
                    else {
                        that.getProjectRoot(userId, projectId, function(err, getResult) {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, {
                                    status: success('Delete items executed: ' + userId + '/'  + projectId + '/'  + itemPath), 
                                    data: {
                                        folderRefresh: getResult.data, 
                                        result: actions
                                    }
                                });
                        });
                    }
                });
            }
        };
}
function makePaths(config) {
    return {
            normalize: function(filepath) {
                return verify.replaceAll(filepath, '\\', '/');
            }
        };
}
function mount_cb(config, api, callback) {
    return function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            console.log(chalk.yellow('REPO DB CONNECTED on uri: ' + config.repoUri + ' - repoBaseFolderUri: ' + config.repoBaseFolderUri));
            var fsApi = makeFsApi(config);
            api.repo = {
                getUserRoot: fsApi.getUserRoot, 
                getProjectRoot: fsApi.getProjectRoot, 
                getFolderOrFile: fsApi.getFolderOrFile, 
                createDocument: fsApi.createDocument, 
                updateDocument: fsApi.updateDocument, 
                deleteDocument: fsApi.deleteDocument, 
                duplicateDocument: fsApi.duplicateDocument, 
                renameDocument: fsApi.renameDocument, 
                createFolder: fsApi.createFolder, 
                deleteFolder: fsApi.deleteFolder, 
                duplicateFolder: fsApi.duplicateFolder, 
                renameFolder: fsApi.renameFolder, 
                copyPasteFsItems: fsApi.copyPasteFsItems, 
                cutPasteFsItems: fsApi.cutPasteFsItems, 
                deleteFsItems: fsApi.deleteFsItems
            };
            return callback(null, api);
        };
}
module.exports = function(app, config, api, callback) {
    globalApi = api;
    globalConfig = config;
    assert.ok( typeof(config.repoUri) === 'string' );
    assert.ok( typeof(config.repoBaseFolderUri) === 'string' );
    if (config.repoUri === 'file://') {
        repoFS = require('wizzi').Filesystem;
        repoFS.mount(config.repoBaseFolderUri, mount_cb(config, api, callback));
    }
    else {
        repoFS = require('wizzi-mongodb').Filesystem;
        repoFS.mount(config.repoUri, config.repoBaseFolderUri, mount_cb(config, api, callback));
    }
};
