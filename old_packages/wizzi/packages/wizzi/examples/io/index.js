/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\examples\io\index.js.ittf
*/
'use strict';
var path = require('path');
var index = require('../../index');
var verify = require('wizzi-utils').verify;
var wfs = index.Filesystem;
var userId = 'stefi';
var projectId = 'example';
wfs.mount(path.join(__dirname, 'io_fs'), function(err, notUsed) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    wfs.mkdir(userId, projectId, 'folderA', function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        wfs.mkdir(userId, projectId, 'folderB', function(err, notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            wfs.mkdir(userId, projectId, 'folderC', function(err, notUsed) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                wfs.mkdir(userId, projectId, 'folderD', function(err, notUsed) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    wfs.mkdir(userId, projectId, 'folderToDelete/folder1', function(err, notUsed) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        createExampleFiles();
                    });
                });
            });
        });
    });
});
function createExampleFiles() {
    wfs.writeFile(userId, projectId, 'folderA/docA1.js.ittf', 'module\n\t kind react', function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        wfs.writeFile(userId, projectId, 'folderA/docA2.js.ittf', 'module\n\t kind jsfile', function(err, notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            wfs.writeFile(userId, projectId, 'folderB/docB1.js.ittf', 'module\n\t kind es6', function(err, notUsed) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                wfs.writeFile(userId, projectId, 'folderC/docC1.js.ittf', 'module\n\t kind es6', function(err, notUsed) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    wfs.writeFile(userId, projectId, 'folderC/docC2.js.ittf', 'module\n\t kind es6', function(err, notUsed) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        wfs.writeFile(userId, projectId, 'folderToDelete/folder1/docToDel1.js.ittf', 'module\n\t kind es6', function(err, notUsed) {
                            if (err) {
                                console.log('err', err);
                                throw new Error(err.message);
                            }
                            executeCopyMove();
                        });
                    });
                });
            });
        });
    });
}
function executeCopyMove() {
    wfs.copyFolder(userId, projectId, 'folderA', projectId, 'folderA_copied', function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        wfs.moveFolder(userId, projectId, 'folderB', projectId, 'folderB_moved', function(err, notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            wfs.copyFile(userId, projectId, 'folderC/docC1.js.ittf', projectId, 'folderD/docC1.js.ittf', function(err, notUsed) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                wfs.moveFile(userId, projectId, 'folderC/docC2.js.ittf', projectId, 'folderD/docC2.js.ittf', function(err, notUsed) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    executeBatch();
                });
            });
        });
    });
}
function executeBatch() {
    wfs.batch(userId, [
        {
            actionType: 'copy', 
            itemKind: 0, 
            sourceProjectId: projectId, 
            sourceItemPath: 'folderB_moved', 
            destProjectId: projectId, 
            destItemPath: 'folderE_batch'
        }, 
        {
            actionType: 'move', 
            itemKind: 0, 
            sourceProjectId: projectId, 
            sourceItemPath: 'folderToDelete', 
            destProjectId: projectId, 
            destItemPath: 'folderF_batch'
        }, 
        {
            actionType: 'delete', 
            userId: userId, 
            itemKind: 0, 
            projectId: projectId, 
            itemPath: 'folderF_batch'
        }, 
        {
            actionType: 'copy', 
            itemKind: 1, 
            sourceProjectId: projectId, 
            sourceItemPath: 'folderC/docC1.js.ittf', 
            destProjectId: projectId, 
            destItemPath: 'folderG_batch/docC1.js.ittf'
        }, 
        {
            actionType: 'move', 
            itemKind: 1, 
            sourceProjectId: projectId, 
            sourceItemPath: 'folderC/docC1.js.ittf', 
            destProjectId: projectId, 
            destItemPath: 'folderH_batch/docC1.js.ittf'
        }, 
        {
            actionType: 'delete', 
            itemKind: 1, 
            userId: userId, 
            projectId: projectId, 
            itemPath: 'folderA/docA1.js.ittf'
        }
    ], function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
    });
}
