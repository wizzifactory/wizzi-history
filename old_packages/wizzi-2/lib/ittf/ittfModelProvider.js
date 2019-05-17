/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\ittf\ittfModelProvider.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var path = require('path');
var url = require('url');

var errors = require('../errors');
var LoadContext = require('./loadContext').loadContext;
var IttfModel = require('./ittfModel').IttfModel;
var IttfDocumentStore = require('./repo/ittfDocumentStore');
var IttfDocumentFinder = require('./repo/ittfDocumentFinder');
var uriparser = require('./fs/uriparser');
/**
     Each IttfLoading process requires one instance of the IttfModelProvider
     To date there is no global cache for IttfModels, but only a cache for
     fragments used during a single loading.
*/
var IttfModelProvider = (function () {
    function IttfModelProvider() {
        _classCallCheck(this, IttfModelProvider);
        this.modelsCache = {};
        this.store = null;
        this.documentFinder = null;
        this.primaryIttfModel = null;
    }
    // Each IttfModelProvider has one primary IttfModel
    IttfModelProvider.prototype.getPrimaryIttfModel = function() {
        return this.primaryIttfModel;
    }
    /**
         params
         options {
         from: String [store|string]
         ittfDocumentUri: String
         include: Boolean // If true the IttfDocument will be included in the caller IttfModel
         // and its nodes will belong to the modelKey of the caller.
         // A $include command must have no arguments.
         // An included IttfDocument cannot have params (cannot have the $params command)
         includerModelKey: String
         basedir: String
         relpath: String
         }
         called from
         ./ittf.load
         ./includer
         ./mixer
        
    */
    IttfModelProvider.prototype.get = function(options,callback) {
        if (options.from === 'store') {
            return this.getFromStore(options, callback);
        }
        else {
            return this.getFromString(options, callback);
        }
    }
    IttfModelProvider.prototype.getFromStore = function(options,callback) {
        var loadContext = this.loadContext;
        var productionContext = this.productionContext;
        var that = this;
        this.documentFinder.resolvePath(options, function(err,uri) {
            if (err) {
                return callback(err)
                ;
            }
            // log 'path resolved', uri
            var ittfModelCloned = null;
            // check cache
            // log 'searching in cache', that.modelsCache, uri
            var cachedIttfModel = that.modelsCache[uri];
            if (cachedIttfModel) {
                // found in cache, clone it
                ittfModelCloned = cachedIttfModel.clone();
                // this is not superflous
                // the productionContext counts the cached used
                productionContext.addIttfDocument(uri, cachedIttfModel.inputContent);
                // adding the ittfModelCloned to the loadContext
                // generates the sourceKey and modelKey
                var ittfDocumentData = loadContext.addIttfModel(uri, that.schema, ittfModelCloned, options)
                ;
                ittfModelCloned.sourceKey = ittfDocumentData.sourceKey;
                ittfModelCloned.modelKey = ittfDocumentData.modelKey;
                ittfModelCloned.$schema = that.schema;
                return callback(null, ittfModelCloned);
            }
            else {
                // not found in cache, get the content from the store and cache it
                that.store.getModelContent(uri, function(err,documentTextContent) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    that.loadNewIttfModel(uri, options, documentTextContent, function(err,newIttfModelCloned) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        return callback(null, newIttfModelCloned);
                    });
                });
            }
        });
    }
    IttfModelProvider.prototype.loadNewIttfModel = function(uri,options,documentTextContent,callback) {
        this.productionContext.addIttfDocument(uri, documentTextContent);
        this.loadContext.addIttfDocument(uri, documentTextContent);
        // create the ittfDocumentData object passing
        // null in the ittfModel parameter
        // it will be added later if the parameter
        // options.include is false. TODO ??? why this
        var ittfDocumentData = this.loadContext.addIttfModel(uri, this.schema, null, options)
        ;
        var newIttfModel = new IttfModel(uri, this.loadContext);
        try {
            // parses the IttfDocument and loads the tree of the document nodes
            var notUsed = newIttfModel.load(documentTextContent, ittfDocumentData);
            if (notUsed && notUsed.__is_error) {
                console.log('__is_error ', notUsed);
                return callback(notUsed);
            }
            // log 'parsed newIttfModel', newIttfModel
        } catch (ex) {
            var error = new errors.RepoIOError(ex.message, uri, ex);
            return callback(error);
        }
        // caches the newIttfModel
        this.modelsCache[uri] = newIttfModel;
        // clone it
        var ittfModelCloned = newIttfModel.clone();
        // set keys
        ittfModelCloned.sourceKey = ittfDocumentData.sourceKey;
        ittfModelCloned.modelKey = ittfDocumentData.modelKey;
        ittfModelCloned.$schema = this.schema;
        
        if (!(options.include)) {
            ittfDocumentData.ittfModel = ittfModelCloned;
        }
        
        // log 'cloned newIttfModel', ittfModelCloned
        return callback(null, ittfModelCloned);
    }
    /**
        detects from uri:
         storeKind
         storeDB
         uri
    */
    IttfModelProvider.prototype.init = function(uri,context,callback) {
        var that = this;
        uriparser(uri, function(err,parsedUri) {
            if (err) {
                return callback(err)
                ;
            }
            // log 'parsedUri', parsedUri
            /**
                VIA
                var parsedUri = url.parse(uri);
                if (typeof(parsedUri.protocol) !== 'string') {
                    var error = new errors.InvalidRequestError("ittf.IttfProvider.init. uri must have a protocol (must be an absolute url) : " + uri, "ProtocolError");
                    return callback(error)
                    ;
                }
                var protocol = parsedUri.protocol.substr(-1, 1) === ':' ? parsedUri.protocol.substr(0, (parsedUri.protocol.length - 1)) : parsedUri.protocol;
                ;
                if (protocol.length === 1) {
                    this.storeKind = 'filesystem';
                    this.storeDB = null;
                    this.uri = uri;
                }
                else if (protocol === 'repo') {
                    this.storeKind = 'repo';
                    this.storeDB = parsedUri.host;
                    this.uri = parsedUri.path && parsedUri.path && parsedUri.path.length > 1 ? parsedUri.path.substr(1) : '';
                }
                else {
                    var error = new errors.InvalidRequestError('treemodel.IttfModelProvider.init. Unknown protocol: ' + protocol, "ProtocolError");
                    return callback(error)
                    ;
                }
                this.schema = this.inferSchema(uri)*/
            that.storeKind = parsedUri.storeKind;
            that.uri = parsedUri.uri;
            that.userId = parsedUri.userId;
            that.projectId = parsedUri.projectId;
            that.schema = parsedUri.schema;
            that.store = new IttfDocumentStore;
            that.store.init({
                storeKind: that.storeKind, 
                storeDB: that.storeDB
            }, function(err,result) {
                if (err) {
                    return callback(err)
                    ;
                }
                that.store.getModelContent(that.uri, function(err,documentTextContent) {
                    if (err) {
                        return callback(err)
                        ;
                    }
                    that.documentFinder = new IttfDocumentFinder(that.store, that.schema);
                    that.loadContext = new LoadContext();
                    that.productionContext = context.productionContext;
                    that.modelContext = context.modelContext;
                    // log 'documentTextContent', documentTextContent
                    that.loadNewIttfModel(that.uri, {}, documentTextContent, function(err,newIttfModelCloned) {
                        if (err) {
                            return callback(err)
                            ;
                        }
                        that.primaryIttfModel = newIttfModelCloned;
                        callback(null, that);
                    });
                });
            });
        });
    }
    /**
        VIA
        VIA.prototype.inferSchema = function(uri) {
            var name = path.basename(uri).toLowerCase()
            ;
            var parts = name.split('.');
            var schema = (parts.length > 1) && parts[(parts.length - 1)] === 'ittf' ? parts[(parts.length - 2)] : null;
            return schema;
        }
    */
    return IttfModelProvider;
})();


/**
     Creates an IttfModelProvider for loading
     an IttfDocucument
*/
IttfModelProvider.createFromUri = function(uri,context,callback) {
    var provider = new IttfModelProvider();
    provider.init(uri, context, function(err,result) {
        if (err) {
            return callback(err)
            ;
        }
        callback(null, provider);
    });
};
module.exports = IttfModelProvider;
