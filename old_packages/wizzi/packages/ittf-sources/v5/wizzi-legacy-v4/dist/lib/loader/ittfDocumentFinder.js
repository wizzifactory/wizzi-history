/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\loader\ittfdocumentfinder.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
// generated by wizzi.codegen.js.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('../util/verify');
var path = require('path');
/**
     TODO IttfBrickFinder would be a best name.
    
     Implements the path resolution strategy
     of the wizzi factory:
     . first try the absolute path
     . if not found search in 't' folders.
    
     The wizzi-repo.ittfDocumentStore instance used
     for locating documents is ctor iniected.
    
*/
var IttfDocumentFinder = (function () {
    function IttfDocumentFinder(store, schema) {
        _classCallCheck(this, IttfDocumentFinder);
        if (verify.isObject(store) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'store', message: 'The store parameter must be an object. Received: ' + store }
            ));
        }
        if (verify.isNotEmpty(schema) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'schema', message: 'The schema parameter must be a string. Received: ' + schema }
            ));
        }
        this.store = store;
        this.schema = schema;
    }
    /**
         param options {
         ittfDocumentUri:String
         |
         basedir:String
         relpath:String
         }
    */
    IttfDocumentFinder.prototype.resolvePath = function(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'resolvePath', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'resolvePath', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        var ittfDocumentUri = options.ittfDocumentUri,
            relpath = options.relpath;
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            var basedir = options.basedir;
            if (verify.isNotEmpty (basedir) === false || verify.isAbsolutePath(basedir) === false) {
                return callback(error('InvalidArgument', 'resolvePath', 'An "options.ittfDocumentUri" parameter or an "options.basedir" parameter with an absolute path is required to load an ITTF document. Received: ' + 'ittfDocumentUri: ' + options.ittfDocumentUri + ', basedir: ' + options.basedir + ', relpath: ' + options.relpath)
                    )
                ;
            }
            if ((verify.isNotEmpty(relpath) === false) || (relpath[0] === '/')) {
                return callback(error('InvalidArgument', 'resolvePath', 'An "options.ittfDocumentUri" parameter or an "options.relpath" parameter with a relative path is required to load an ITTF document. Received: ' + 'ittfDocumentUri: ' + options.ittfDocumentUri + ', basedir: ' + options.basedir + ', relpath: ' + options.relpath)
                    )
                ;
            }
            ittfDocumentUri = path.join(basedir, relpath);
        }
        var that = this;
        this.tryExists(ittfDocumentUri, this.schema, function(err, result) {
            if (err) {
                return callback(err)
                ;
            }
            if (result.found) {
                return callback(null, result.ittfDocumentUri)
                ;
            }
            else {
                if (verify.isNotEmpty(relpath) === false) {
                    return callback(error('IttfNotFound', 'resolvePath', {
                            parameter: 'ittfDocumentUri', 
                            message: 'Cannot resolve ittf document uri: ' + ittfDocumentUri
                        })
                        )
                    ;
                }
                that.resolvePathInTFolders(path.dirname(ittfDocumentUri), relpath, function(err, tresult) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    if (tresult.found) {
                        return callback(null, tresult.ittfDocumentUri)
                        ;
                    }
                    else {
                        console.log('IttfDocumentFinder.resolvePath options', options, that.schema);
                        return callback(error('IttfNotFound', 'resolvePath', 'Cannot find ittf document: ' + ittfDocumentUri)
                            )
                        ;
                    }
                });
            }
        });
    }
    IttfDocumentFinder.prototype.resolvePathInTFolders = function(basePath, relPath, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'resolvePathInTFolders', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(basePath) === false) {
            return callback(error(
                'InvalidArgument', 'resolvePathInTFolders', { parameter: 'basePath', message: 'The basePath parameter must be a string. Received: ' + basePath }
            ));
        }
        if (verify.isNotEmpty(relPath) === false) {
            return callback(error(
                'InvalidArgument', 'resolvePathInTFolders', { parameter: 'relPath', message: 'The relPath parameter must be a string. Received: ' + relPath }
            ));
        }
        var that = this;
        function recurserTFolder(basePath, relPath) {
            if (verify.isNotEmpty(basePath) === false) {
                return error(
                    'InvalidArgument', 'recurserTFolder', { parameter: 'basePath', message: 'The basePath parameter must be a string. Received: ' + basePath }
                );
            }
            if (verify.isNotEmpty(relPath) === false) {
                return error(
                    'InvalidArgument', 'recurserTFolder', { parameter: 'relPath', message: 'The relPath parameter must be a string. Received: ' + relPath }
                );
            }
            // log 'recurserTFolder enter', basePath, relPath
            return new Promise(function(resolve) {
                    var ittfDocumentUri = path.join(basePath, 't', relPath);
                    that.tryExists(ittfDocumentUri, that.schema, function(err, result) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        if (result.found) {
                            // return callback(null, result)
                            // log 'recurserTFolder resolve found', result
                            return resolve(result);
                        }
                        else {
                            basePath = path.dirname(basePath);
                            if (basePath.length > 3) {
                                // log 'recurserTFolder try parent', basePath
                                return recurserTFolder(basePath, relPath).then(function(result) {
                                        // log 'recurserTFolder transmit resolve result', basePath, result
                                        resolve(result);
                                    })
                                    
                                ;
                                // return that.resolvePathInTFolders(basePath, relPath, callback)
                            }
                            else {
                                // log 'recurserTFolder resolve not found', basePath
                                return resolve({
                                        found: false
                                    })
                                ;
                            }
                        }
                    });
                });
        }
        recurserTFolder(basePath, relPath).then(function(result) {
            return callback(null, result);
        })
        ;
    }
    IttfDocumentFinder.prototype.tryExists = function(test, schema, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'tryExists', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(test) === false) {
            return callback(error(
                'InvalidArgument', 'tryExists', { parameter: 'test', message: 'The test parameter must be a string. Received: ' + test }
            ));
        }
        var that = this;
        this.store.documentExists(test, function(err, result) {
            if (err) {
                return callback(err)
                ;
            }
            if (result) {
                return callback(null, {
                        found: true, 
                        ittfDocumentUri: test
                    })
                ;
            }
            else {
                if (test.toLowerCase().substr(-5, 5) !== '.ittf') {
                    if (schema) {
                        that.store.documentExists(test + '.' + schema + '.ittf', function(err, result) {
                            if (err) {
                                return callback(err)
                                ;
                            }
                            if (result) {
                                return callback(null, {
                                        found: true, 
                                        ittfDocumentUri: test + '.' + schema + '.ittf'
                                    })
                                ;
                            }
                            else {
                                that.store.documentExists(test + '.ittf', function(err, result) {
                                    if (err) {
                                        return callback(err)
                                        ;
                                    }
                                    if (result) {
                                        return callback(null, {
                                                found: true, 
                                                ittfDocumentUri: test + '.ittf'
                                            })
                                        ;
                                    }
                                    else {
                                        return callback(null, {
                                                found: false
                                            })
                                        ;
                                    }
                                });
                            }
                        });
                    }
                    else {
                        return callback(null, {
                                found: false
                            })
                        ;
                    }
                }
                else {
                    return callback(null, {
                            found: false
                        })
                    ;
                }
            }
        });
    }
    return IttfDocumentFinder;
})();

module.exports = IttfDocumentFinder;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-mtree.ittfDocumentFinder.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
