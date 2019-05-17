/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\lib\repo\mongodbstore.js.ittf
*/
'use strict';
// generated by wizzi.codegen.js4.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('wizzi-utils').verify;
var util = require('util');
var vfile = require('wizzi-utils').vfile;
var MongoFsImpl = require('../mongodb/mongoFsimpl');
var errors = require('./errors');
var MongoDbStore = (function () {
    function MongoDbStore() {
        _classCallCheck(this, MongoDbStore);
        this.storeKind = 'mongodb';
        this.fsimpl = null;
        this.file = null;
    }
    MongoDbStore.prototype.init = function(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'init', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'init', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        if (verify.isNotEmpty(options.mongoUri) === false) {
            return callback(error(
                'InvalidArgument', 'init', { parameter: 'options.mongoUri', message: 'The options.mongoUri parameter must be a string. Received: ' + options.mongoUri }
            ));
        }
        if (verify.isNotEmpty(options.mongodbBaseFolder) === false) {
            return callback(error(
                'InvalidArgument', 'init', { parameter: 'options.mongodbBaseFolder', message: 'The options.mongodbBaseFolder parameter must be a string. Received: ' + options.mongodbBaseFolder }
            ));
        }
        var that = this;
        this.fsimpl = new MongoFsImpl(options.mongoUri, options.mongodbBaseFolder);
        this.fsimpl.open(function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            vfile(that.fsimpl, function(err, file) {
                if (err) {
                    return callback(err);
                }
                that.file = file;
                return callback(null, file);
            });
        });
    }
    MongoDbStore.prototype.close = function() {
        if (this.fsimpl) {
            this.fsimpl.close();
        }
    }
    MongoDbStore.prototype.documentExists = function(documentPath, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'documentExists', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(documentPath) === false) {
            return callback(error(
                'InvalidArgument', 'documentExists', { parameter: 'documentPath', message: 'The documentPath parameter must be a string. Received: ' + documentPath }
            ));
        }
        this.file.isFile(documentPath, function(err, result) {
            if (err) {
                return callback(error('RepoIOError', 'documentExists', {
                        parameter: 'documentPath', 
                        message: 'Checking existence of document: ' + documentPath
                    }, err));
            }
            return callback(null, result);
        });
    }
    MongoDbStore.prototype.getModelContent = function(documentPath, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getModelContent', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(documentPath) === false) {
            return callback(error(
                'InvalidArgument', 'getModelContent', { parameter: 'documentPath', message: 'The documentPath parameter must be a string. Received: ' + documentPath }
            ));
        }
        this.file.read(documentPath, function(err, result) {
            if (err) {
                return callback(error('RepoIOError', 'getModelContent', {
                        parameter: 'documentPath', 
                        message: 'Getting content of document: ' + documentPath
                    }, err));
            }
            // log 'getModelContent.received', result
            return callback(null, result);
        });
    }
    return MongoDbStore;
})();

module.exports = MongoDbStore;
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
        method: 'wizzi-repo.mongoDbStore.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}