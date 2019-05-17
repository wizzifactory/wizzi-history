/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\fs\repo.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var uriparser = require('./uriparser');
var repoFS = null;
function verifyFS(callback) {
    if (repoFS == null) {
        repoFS = require('wizzi-mongodb').Filesystem;
    }
    if (repoFS && repoFS.isMounted) {
        return callback(null);
    }
    else {
        callback('Module lib/ittf/fs/repo. MongoDB wizzi repo database not mounted. Review your wizzi instance starter.');
    }
}

var md = module.exports = {};
md.exists = function(parsed_path_string,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.exists(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, callback);
    });
};
md.isFile = function(parsed_path_string,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.isFile(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, callback);
    });
};
md.isDirectory = function(parsed_path_string,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.isFolder(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, callback);
    });
};
md.mkdir = function(parsed_path_string,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.mkdir(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, callback);
    });
};
md.read = function(parsed_path_string,options,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.readFile(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, callback);
    });
};
md.getGlobbedFiles = function(parsed_path_string,options,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.glob(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, callback);
    });
};
md.write = function(parsed_path_string,content,options,callback) {
    verifyFS(function(err,notUsed) {
        if (err) {
            return callback(err)
            ;
        }
        repoFS.writeFile(parsed_path_string.userId, parsed_path_string.projectId, parsed_path_string.path, content, callback);
    });
};
md.copy = function(parsed_source_path_string,dest_path_string,callback) {
    uriparser(String(dest_path_string), function(err,parsed_dest_path_string) {
        if (err) {
            return callback(err)
            ;
        }
        if (parsed_dest_path_string.storeKind !== 'repo') {
            return callback(error('Destination uri must have schema = "repo", instead it is : ' + dest_path_string, "copy")
                )
            ;
        }
        else if (parsed_dest_path_string.userId !== parsed_source_path_string.userId) {
            return callback(error('Copy of documents between different users is not implemented : ' + parsed_source_path_string.userId + '/' + parsed_dest_path_string.userId, "copy")
                )
            ;
        }
        repoFS.copyFile(parsed_source_path_string.userId, parsed_source_path_string.projectId, parsed_source_path_string.path, parsed_dest_path_string.projectId, parsed_dest_path_string.path, function(err,notUsed) {
            if (err) {
                return callback(err)
                ;
            }
            return callback(null, true)
            ;
        });
    });
};
