/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\legacy\wizzi-legacy-v5\src\ittf\root\index.js.ittf
    utc time: Fri, 21 Dec 2018 13:16:09 GMT
*/
'use strict';
var path = require('path');
var verify = require('./lib/util/verify');
var vfile = require('./lib/util/fs/vfile');
var file = vfile();
var fail = require('./lib/util/fail');
var errors = require('./wf_errors');
var StringWriter = require('./lib/util/stringWriter');
var IttfDocumentStore = require('./lib/repo/ittfDocumentStore');
var loader = require('./lib/loader');
var GenContext = require('./lib/artifact/genContext');
var htmlFactory = require('./lib/wizzi/models/html-factory.g');
var htmlDocumentArtifact = require('./lib/artifacts/html/document/gen/main');
var jsFactory = require('./lib/wizzi/models/js-factory.g');
var jsModuleArtifact = require('./lib/artifacts/js/module/gen/main');
var md = module.exports = {};
md.jsModule = function(ittfDocumentUri, mtreeBrickBuildUpContext, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(ittfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
        ));
    }
    if (verify.isObject(mtreeBrickBuildUpContext) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mtreeBrickBuildUpContext', message: 'The mtreeBrickBuildUpContext parameter must be an object. Received: ' + mtreeBrickBuildUpContext }
        ));
    }
    console.log('jsModule created by legacy package in ', __dirname);
    var loadModel = jsFactory.createLoadModel({
        loadMTree: createLoadMTree(getCreateStore()), 
        file: file, 
        verify: verify, 
        errors: errors
    });
    loadModel(ittfDocumentUri, createRequestContext(mtreeBrickBuildUpContext), function(err, artifactModel) {
        if (err) {
            return callback(err);
        }
        var genContext = new GenContext({
            options: getProductionOptions(), 
            pman: createProductionManager()
        });
        jsModuleArtifact.gen(artifactModel, genContext, function(err, result) {
            if (err) {
                console.log('wizzi.legacy.jsModule', typeof(err), err.length, err.length && err.length > 0 && err[0]);
                return callback(error('ArtifactGenerationError', 'generateArtifact', 'Error in generation: js/Module. For artifactModel: ' + ittfDocumentUri + '. See inner error.', err));
            }
            var sw = new StringWriter();
            result.toStream(sw);
            callback(null, sw.toString());
        });
    });
};
/**
     expose the js types for next version bootstrap
*/
var jsModelTypeFile = path.join(__dirname, '/lib/wizzi/models/js-model.g.js');
if (file.exists(jsModelTypeFile)) {
    md.jsModelType = require('./lib/wizzi/models/js-model.g');
}
else {
    console.log('WARNING module ./lib/wizzi/models/js-model.g NOT FOUND. During current version bootstrap is OK');
}
md.htmlDocument = function(ittfDocumentUri, mtreeBrickBuildUpContext, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(ittfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
        ));
    }
    if (verify.isObject(mtreeBrickBuildUpContext) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mtreeBrickBuildUpContext', message: 'The mtreeBrickBuildUpContext parameter must be an object. Received: ' + mtreeBrickBuildUpContext }
        ));
    }
    console.log('htmlDocument created by legacy package in ', __dirname);
    var loadModel = htmlFactory.createLoadModel({
        loadMTree: createLoadMTree(getCreateStore()), 
        file: file, 
        verify: verify, 
        errors: errors
    });
    loadModel(ittfDocumentUri, createRequestContext(mtreeBrickBuildUpContext), function(err, artifactModel) {
        if (err) {
            return callback(err);
        }
        var genContext = new GenContext({
            options: getProductionOptions(), 
            pman: createProductionManager()
        });
        htmlDocumentArtifact.gen(artifactModel, genContext, function(err, result) {
            if (err) {
                console.log('wizzi.legacy.htmlDocument', typeof(err), err.length, err.length && err.length > 0 && err[0]);
                return callback(error('ArtifactGenerationError', 'generateArtifact', 'Error in generation: html/Document. For artifactModel: ' + ittfDocumentUri + '. See inner error.', err));
            }
            var sw = new StringWriter();
            result.toStream(sw);
            callback(null, sw.toString());
        });
    });
};
function createLoadMTree(createStore, options) {
    options = options || {};
    var useCache = options.useCache || false;
    var ittfDocumentStore;
    return function loadMTree(ittfDocumentUri, requestContext, callback) {
            if (!useCache || !ittfDocumentStore) {
                createStore(function(err, store) {
                    if (err) {
                        return callback(err);
                    }
                    ittfDocumentStore = store;
                    requestContext.__ittfDocumentStore = store;
                    loader.loadMTree(ittfDocumentUri, requestContext, callback);
                });
            }
            else {
                requestContext.__ittfDocumentStore = ittfDocumentStore;
                loader.loadMTree(ittfDocumentUri, requestContext, callback);
            }
        };
}
function getCreateStore() {
    return function createStore(callback) {
            var store = new IttfDocumentStore();
            store.init({
                storeKind: 'filesystem'
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, store);
            });
        };
}
function createRequestContext(mTreeBuildUpContext) {
    return {
            __productionManager: createProductionManager(), 
            mTreeBuildUpContext: mTreeBuildUpContext
        };
}
function createProductionManager() {
    return {
            wizziFactory: {}, 
            productionContext: createProductionContext(), 
            globalContext: function() {
            }
        };
}
function createProductionContext() {
    return {
            aclstat: {}, 
            ittfEvaluationScripts: {}, 
            setAclStat: function() {
            }, 
            addIttfDocument: function() {
            }, 
            addMTreeBuildUpScript: function(uri, ittfEvalScript) {
                this.ittfEvaluationScripts[uri] = {
                    uri: uri, 
                    ittfEvalScript: ittfEvalScript
                };
            }, 
            addMixedMTree: function() {
            }, 
            addEvaluatedMTree: function() {
            }, 
            addMTree: function() {
            }, 
            addWizziModel: function() {
            }, 
            addArtifact: function() {
            }, 
            raiseIttfEvaluationScriptError: function(uri, exception) {
                var script = this.ittfEvaluationScripts[uri];
                if (script && script.ittfEvalScript && exception && exception.lineNumber) {
                    var lines = script.ittfEvalScript.getErrorLines(exception).join('\n')
                    ;
                    exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
                }
                else {
                    exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
                }
                fail.warn(exception);
                throw exception;
            }
        };
}
function getProductionOptions() {
    return {
            isDebug: false, 
            CRLF: '\n', 
            indentSpaces: 4, 
            dotgExtensionPrefix: false, 
            dumps: {}
        };
}
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
        method: 'wizzi.legacy.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
