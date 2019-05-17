/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\lib\services\runnerserver.js.ittf
*/
'use strict';
// generated by wizzi.codegen.js4.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('wizzi-utils').verify;
var _ = require('lodash');
var async = require('async');
var chalk = require('chalk');
var errors = require('../errors');
var wizziFactory = require('./wizziFactory');
var RunnerServer = (function () {
    function RunnerServer(cwd, user, role) {
        _classCallCheck(this, RunnerServer);
        if (verify.isNotEmpty(cwd) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'cwd', message: 'The cwd parameter must be a string. Received: ' + cwd }
            ));
        }
        this.cwd = cwd;
        this.user = user;
        this.role = role;
        this.wizziFactoryDatas = [];
        this.apis = {};
        this.models = {};
        this.registeredPlugins = [];
        this.globalContext = {};
    }
    RunnerServer.prototype.registerPlugin = function(pluginName) {
        if (verify.isNotEmpty(pluginName) === false) {
            return error(
                'InvalidArgument', 'registerPlugin', { parameter: 'pluginName', message: 'The pluginName parameter must be a string. Received: ' + pluginName }
            );
        }
        if (this.wizziFactory != null) {
            throw new Error('wizzi/runnerServer/registerPlugin error: Cannot register a plugin. The WizziFactory has been already initialized.');
        }
        this.registeredPlugins.push(pluginName);
    }
    RunnerServer.prototype.registerGlobalContext = function(context) {
        if (verify.isObject(context) === false) {
            return error(
                'InvalidArgument', 'registerGlobalContext', { parameter: 'context', message: 'The context parameter must be an object. Received: ' + context }
            );
        }
        if (this.wizziFactory != null) {
            throw new Error('wizzi/runnerServer/registerPlugin error: Cannot register a global context. The WizziFactory has been already initialized.');
        }
        this.globalContext = _.merge(this.globalContext, context);
    }
    RunnerServer.prototype.registerFsNoAclFactory = function(name, options) {
        if (verify.isNotEmpty(name) === false) {
            return error(
                'InvalidArgument', 'registerFsNoAclFactory', { parameter: 'name', message: 'The name parameter must be a string. Received: ' + name }
            );
        }
        if (verify.isObject(options) === false) {
            return error(
                'InvalidArgument', 'registerFsNoAclFactory', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            );
        }
        if (verify.isObject(options.plugins) === false) {
            return error(
                'InvalidArgument', 'registerFsNoAclFactory', { parameter: 'options.plugins', message: 'The options.plugins parameter must be an object. Received: ' + options.plugins }
            );
        }
        if (verify.isArray(options.plugins.items) === false) {
            return error(
                'InvalidArgument', 'registerFsNoAclFactory', { parameter: 'options.plugins.items', message: 'The options.plugins.items parameter must be an array. Received: ' + options.plugins.items }
            );
        }
        if (this.prepared) {
            throw new Error('wizzi/runnerServer/registerFsNoAclFactory error: Cannot register a factory. The RunnerServer has been already prepared.');
        }
        options.user = 'stefi';
        options.role = 'admin';
        options.repo = {
            storeKind: 'filesystem'
        };
        this.registerFactory(name, options);
    }
    RunnerServer.prototype.registerFactory = function(name, options) {
        if (verify.isNotEmpty(name) === false) {
            return error(
                'InvalidArgument', 'registerFactory', { parameter: 'name', message: 'The name parameter must be a string. Received: ' + name }
            );
        }
        if (verify.isObject(options) === false) {
            return error(
                'InvalidArgument', 'registerFactory', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            );
        }
        if (this.prepared) {
            throw new Error('wizzi/runnerServer/registerFactory error: Cannot register a factory. The RunnerServer has been already prepared.');
        }
        this.wizziFactoryDatas.push({
            name: name, 
            options: options
        });
        console.log(chalk.yellow('WIZZI RunnerServer. Registered factory: ' + name));
    }
    RunnerServer.prototype.getWizziFactory = function(name) {
        var i, i_items=this.wizziFactoryDatas, i_len=this.wizziFactoryDatas.length, wfData;
        for (i=0; i<i_len; i++) {
            wfData = this.wizziFactoryDatas[i];
            if (wfData.name === name) {
                return wfData.instance;
            }
        }
        return null;
    }
    RunnerServer.prototype.callOnPrepare = function(wizzifile, wizziConfig, callback) {
        var that = this;
        async.map(this.wizziFactoryDatas, function(item, callback) {
            wizziFactory.createFactory(item.options, function(err, wf) {
                if (err) {
                    return callback(err);
                }
                item.instance = wf;
                wizzifile.onPrepare(item.name, that, wizziConfig, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, null);
                });
            });
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, null);
        });
    }
    RunnerServer.prototype.loadModel = function(factoryName, modelTicket, schemaName, ittfDocumentUri, loadContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadModel', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(factoryName) === false) {
            return callback(error(
                'InvalidArgument', 'loadModel', { parameter: 'factoryName', message: 'The factoryName parameter must be a string. Received: ' + factoryName }
            ));
        }
        if (verify.isNotEmpty(modelTicket) === false) {
            return callback(error(
                'InvalidArgument', 'loadModel', { parameter: 'modelTicket', message: 'The modelTicket parameter must be a string. Received: ' + modelTicket }
            ));
        }
        if (verify.isNotEmpty(schemaName) === false) {
            return callback(error(
                'InvalidArgument', 'loadModel', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            ));
        }
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadModel', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(loadContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadModel', { parameter: 'loadContext', message: 'The loadContext parameter must be an object. Received: ' + loadContext }
            ));
        }
        var wf = this.getWizziFactory(factoryName);
        var that = this;
        wf.loadModel(schemaName, ittfDocumentUri, loadContext, function(err, wizziModel) {
            if (err) {
                return callback(err);
            }
            that.models[modelTicket] = wizziModel;
            console.log(chalk.yellow('WIZZI RunnerServer. Loaded model: ' + modelTicket));
            return callback(null, wizziModel);
        });
    }
    RunnerServer.prototype.transformModel = function(factoryName, modelTicket, transformerName, model, context, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'transformModel', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(factoryName) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'factoryName', message: 'The factoryName parameter must be a string. Received: ' + factoryName }
            ));
        }
        if (verify.isNotEmpty(modelTicket) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'modelTicket', message: 'The modelTicket parameter must be a string. Received: ' + modelTicket }
            ));
        }
        if (verify.isNotEmpty(transformerName) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'transformerName', message: 'The transformerName parameter must be a string. Received: ' + transformerName }
            ));
        }
        if (verify.isObject(model) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
            ));
        }
        if (verify.isNullOrUndefined(context) === false) {
            if (verify.isObject(context) === false) {
                return callback(error(
                    'InvalidArgument', 'transformModel', { parameter: 'context', message: 'The context parameter must be an object. Received: ' + context }
                ));
            }
        }
        var wf = this.getWizziFactory(factoryName);
        var that = this;
        wf.transformModel(transformerName, model, context, function(err, transformedModel) {
            if (err) {
                return callback(err);
            }
            that.models[modelTicket] = transformedModel;
            console.log(chalk.yellow('WIZZI RunnerServer. Loaded transformed model: ' + modelTicket));
            return callback(null, wizziModel);
        });
    }
    RunnerServer.prototype.getModel = function(modelTicket) {
        return this.models[modelTicket];
    }
    RunnerServer.prototype.registerApi = function(apiName, apiFunction) {
        if (verify.isNotEmpty(apiName) === false) {
            return error(
                'InvalidArgument', 'registerApi', { parameter: 'apiName', message: 'The apiName parameter must be a string. Received: ' + apiName }
            );
        }
        if (verify.isFunction(apiFunction) === false) {
            return error(
                'InvalidArgument', 'registerApi', { parameter: 'apiFunction', message: 'The apiFunction parameter must be a function. Received: ' + apiFunction }
            );
        }
        this.apis[apiName] = apiFunction;
        console.log(chalk.yellow('WIZZI RunnerServer. Registered Api: ' + apiName));
    }
    RunnerServer.prototype.callApi = function(apiName) {
        if (verify.isNotEmpty(apiName) === false) {
            return error(
                'InvalidArgument', 'callApi', { parameter: 'apiName', message: 'The apiName parameter must be a string. Received: ' + apiName }
            );
        }
        var args;
        var apiFunction = this.apis[apiName];
        if (_.isFunction(apiFunction) == false) {
            apiFunction = this.apis['default'];
            if (_.isFunction(apiFunction) == false) {
                return error('InvalidArgument', 'callApi', 'apiName: "' + apiName + '" is not a function');
            }
            else {
                args = arguments;
            }
        }
        else {
            args = Array.prototype.slice.call(arguments, 1);
        }
        try {
            return apiFunction.apply(this, args);
        } catch (ex) {
            return error('OperationError', 'callApi', 'apiName "' + apiName + '" exception: ' + ex.message, ex);
        }
    }
    return RunnerServer;
})();

module.exports = {
    instance: null, 
    init: function(cwd, user, role) {
        if (this.instance != null) {
            throw new Error('wizzi/services/runnerServer/init error: The runner server has already been instantiated.');
        }
        this.instance = new RunnerServer(cwd, user, role);
    }
};
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
        method: 'wizzi.runnerServer.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
