/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\jswizzi\jswizzievalhelper.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
// generated by wizzi.codegen.js.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('../util/verify');
var util = require('util');
var path = require('path');
var assert = require('assert');
var ContextData = require('./contextData');
var interpolate = require('../loader/ittfInterpolate');
var types = require('../util/types');
var JsWizziContext = null;
var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";
/**
     This helper instance is declared in the global context
     of the JsWizziContext and is in the global scope of the
     JsWizziRunner when it runs the mTreeBrickBuildupScript.
    
     The mTreeBuildupScript may call the methods of
     this instance for
     . Setting the evalContext: global, mTreeBuildup or mTreeBrick.
     . Adding nodes to the mTree that is been building.
     . Executing interpolation of expressions.
     . Calling api functions (declared in the wizzifile.js) on the runner server
     . Retrieving wizzi models (loaded in wizzifile.js) from the runner server
    
     The evalContext(s) of mTreeBrick(s) are stored in the
     the mTreeBrickDatas map of the wizzi.loader.loadContext.
     There are retrieved by the getMTreeBrickEvalContext method
     every time the active mTreeBrick context changes.
*/
var JsWizziEvalHelper = (function () {
    function JsWizziEvalHelper(jsWizziContext, primaryModel, productionContext) {
        _classCallCheck(this, JsWizziEvalHelper);
        if (verify.isObject(jsWizziContext) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'jsWizziContext', message: 'The jsWizziContext parameter must be an object. Received: ' + jsWizziContext }
            ));
        }
        if (verify.isObject(primaryModel) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'primaryModel', message: 'The primaryModel parameter must be an object. Received: ' + primaryModel }
            ));
        }
        if (verify.isObject(primaryModel.loadContext) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'primaryModel.loadContext', message: 'The primaryModel.loadContext parameter must be an object. Received: ' + primaryModel.loadContext }
            ));
        }
        if (verify.isObject(productionContext) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'productionContext', message: 'The productionContext parameter must be an object. Received: ' + productionContext }
            ));
        }
        this.jsWizziContext = jsWizziContext;
        this.primaryModel = primaryModel;
        this.loadContext = primaryModel.loadContext;
        this.productionContext = productionContext;
        this.textSep = work.textSep;
        if (productionContext.runnerServer) {
            this.callApi = productionContext.runnerServer.callApi;
            this.loadWizziModel = productionContext.runnerServer.loadWizziModel;
        }
    }
    /**
         mTree buildup method
         supershort method name
         Set the JsWizziContext state to MTreeBrickEvalContext
    */
    JsWizziEvalHelper.prototype.s = function(brickKey) {
        // log 'JsWizziEvalHelper called $.s(' + brickKey +')'
        var notUsed = this.jsWizziContext.set_MTreeBrickEvalContext(brickKey);
        if (notUsed && notUsed.__is_error) {
            return notUsed;
        }
    }
    /**
         mTree buildup method
         supershort method name
         Set the JsWizziContext state to NodeContext
    */
    JsWizziEvalHelper.prototype.n = function() {
        // log 'JsWizziEvalHelper called $.n()'
        this.jsWizziContext.set_NodeContext();
    }
    /**
         mTree buildup method
         supershort method name
         Set the JsWizziContext state to GlobalContext
    */
    JsWizziEvalHelper.prototype.g = function(brickKey) {
        // log 'JsWizziEvalHelper called $.g("brickKey")'
        this.jsWizziContext.set_GlobalContext(brickKey);
    }
    /**
         mTree buildup method
         supershort method name
         Append a child node to a parent node
    */
    JsWizziEvalHelper.prototype.a = function(parent, node, line) {
        // log 'JsWizziEvalHelper called $.a(' + node.n + ',' + node.v + ')'
        assert(parent, "wizzi-mtree.JsWizziEvalHelper error. Parent undefined in add. At line " + line);
        node.parent = parent;
        if (typeof (parent.children) === 'undefined') {
            parent.children = [];
        }
        node.children = [];
        parent.children.push(node);
    }
    /**
         Interpolate a templated node value
    */
    JsWizziEvalHelper.prototype.ip = function(brickKey, templatedValue, type, line, hasMacro) {
        var ret;
        try {
            var save = this.jsWizziContext.get_currentMTreeBrickKey();
            var notUsed = this.jsWizziContext.set_MTreeBrickEvalContext(brickKey, line);
            if (notUsed && notUsed.__is_error) {
                return notUsed;
            }
            // log ' *** JsWizziEvalHelper.ip templatedValue', templatedValue, 'brickKey', brickKey
            var ret = interpolate(templatedValue, this.jsWizziContext, {delimiter: '${}'});
            if (ret && ret.__is_error) {
                return ret;
            }
            // log 'interpolated result', ret
            // Stop 7/7/17 if hasMacro
            ret = remacro(ret);
            if (save === null) {
                this.jsWizziContext.set_NodeContext(brickKey);
            }
            else {
                var notUsed = this.jsWizziContext.set_MTreeBrickEvalContext(save);
                if (notUsed && notUsed.__is_error) {
                    return notUsed;
                }
            }
        } catch (ex) {
            var mTreeBrickData = this.loadContext.getMTreeBrickData(brickKey);
            var mixerMTreeBrickData = this.loadContext.getMTreeBrickData(mTreeBrickData.mTreeBrick.$mixerBrickKey);
            var mixerUri = mixerMTreeBrickData ? mixerMTreeBrickData.ittfDocumentUri : 'root model';
            // log 'saved ip.currentMTreeBrickKey', save, 'mTreeBrickData.evalContext', mTreeBrickData.evalContext
            // 'values.' + util.inspect(this.jsWizziContext.getValues(), {depth: 2}))
            var exMessage = ex ? ex.message : 'not available';
            var exStack = ex ? ex.stack : 'not available';
            return error('InterpolationError', 'ip', 'Exception interpolating: ' + templatedValue + ', line:' + line + ', type:' + type + ', brickKey:' + brickKey + ', mTreeBrick uri: ' + mTreeBrickData.ittfDocumentUri + ', mixerMTreeBrick uri: ' + mixerUri + ', ex message: ' + exMessage + ', stack: ' + exStack, ex)
            ;
        }
        var retObject = types.objectify(ret, type, {
            row: line
        })
        ;
        if (retObject && retObject.__is_error) {
            var mTreeBrickData = this.loadContext.getMTreeBrickData(brickKey);
            return error('InterpolationError', 'ip', 'Error interpolating: ' + templatedValue + ', line:' + line + ', mTreeBrick uri: ' + mTreeBrickData.ittfDocumentUri + ', mixerMTreeBrick uri: ' + mixerUri, retObject)
            ;
        }
        else {
            return retObject;
        }
    }
    JsWizziEvalHelper.prototype.api = function() {
        if (this.callApi) {
            return this.callApi.apply(this.productionContext.runnerServer, arguments)
            ;
        }
        else {
            return error('InvalidOperation', 'api', 'A RunnerServer has not been started. You must create a wizzifile.js.')
            ;
        }
    }
    JsWizziEvalHelper.prototype.model = function() {
        if (this.loadWizziModel) {
            return this.loadWizziModel.apply(this.productionContext.runnerServer, arguments)
            ;
        }
        else {
            return error('InvalidOperation', 'model', 'A wizzi.RunnerServer has not been started. You must create a wizzifile.js.')
            ;
        }
    }
    /**
         Helper method
         called by jswizzi.jsWizziContext.set_MTreeBrickEvalContext
         for retrieving the evaluation context of
         an mTreeBrick by its brickKey.
    */
    JsWizziEvalHelper.prototype.getMTreeBrickEvalContext = function(brickKey, line) {
        // mTreeBrick eval contexts are stored in the mTreeBrickDatas
        // map of the wizzi-mtree.loader.loadContext
        var mTreeBrickData = this.loadContext.getMTreeBrickData(brickKey);
        var mTreeBrick_EvalContext;
        if (mTreeBrickData.evalContext != null) {
            // An eval context object has already been created for this mTreeBrickData
            mTreeBrick_EvalContext = mTreeBrickData.evalContext;
            var notUsed = this._updateEvalContext(mTreeBrickData, mTreeBrick_EvalContext)
            ;
            if (notUsed && notUsed.__is_error) {
                return notUsed;
            }
        }
        else {
            mTreeBrick_EvalContext = new ContextData(1, brickKey);
            // log 'JsWizziEvalHelper created mTreeBrick_EvalContext for', brickKey, 'id', mTreeBrickData.mTreeBrick.id, mTreeBrickData.evalContext, mTreeBrickData.ittfDocumentUri
            mTreeBrick_EvalContext.setValue('__dirname', path.dirname(mTreeBrickData.ittfDocumentUri));
            mTreeBrick_EvalContext.setValue('__filename', mTreeBrickData.ittfDocumentUri);
            var notUsed = this._updateEvalContext(mTreeBrickData, mTreeBrick_EvalContext)
            ;
            if (notUsed && notUsed.__is_error) {
                return notUsed;
            }
            mTreeBrickData.evalContext = mTreeBrick_EvalContext;
        }
        return mTreeBrick_EvalContext;
    }
    /**
         A refresh could be need for these reasons
        
    */
    JsWizziEvalHelper.prototype._updateEvalContext = function(mTreeBrickData, mTreeBrick_EvalContext) {
        // If the mTreeBrick do not receives parameters
        // a refresh of the eval context is not required
        if (verify.isEmpty(mTreeBrickData.mTreeBrick.$params)) {
            return ;
        }
        var args = mTreeBrickData.mTreeBrick.$args;
        if (args && args.indexOf('${') > -1) {
            /**
                Mixin call arguments may contain IttfMacros,
                 in that case they must be interpolated.
                 mTreeBrickData.mTreeBrick.$mixerBrickKey is the brickKey of the
                 mixer mTreeBrick. We need its eval context for interpolation.
            */
            var mixer_mTreeBrick_EvalContext = this.getMTreeBrickEvalContext(mTreeBrickData.mTreeBrick.$mixerBrickKey)
            ;
            if (mixer_mTreeBrick_EvalContext && mixer_mTreeBrick_EvalContext.__is_error) {
                return mixer_mTreeBrick_EvalContext;
            }
            try {
                // Then we create a temporary JsWizziContext and load it with the
                // context values of both the global context and the mixer mTreeBrick
                // eval context.
                if (JsWizziContext == null) {
                    JsWizziContext = require('./jsWizziContext');
                }
                var interpolateArgsContext = new JsWizziContext();
                interpolateArgsContext.setValues(this.jsWizziContext.globalContext.getSettableValues());
                interpolateArgsContext.setValues(mixer_mTreeBrick_EvalContext.getValues());
                // TODO the values of the mixer can be modified by the mixed during interpolation
                // if so, what does it means? Needs investigation.
                // then we interpolate the arguments passed to the mixed mTree brick
                args = interpolate(args, interpolateArgsContext);
                // log 'JsWizziEvalHelper interpolateArgs', mTreeBrickData.mTreeBrick.$args, args
            } catch (ex) {
                var mixerMTreeBrickData = this.loadContext.getMTreeBrickData(mTreeBrickData.mTreeBrick.$mixerBrickKey);
                var mixerUri = mixerMTreeBrickData ? mixerMTreeBrickData.ittfDocumentUri : 'root model';
                var exMessage = ex ? ex.message : 'not available';
                var exStack = ex ? ex.stack : 'not available';
                return error('InterpolationError', '_updateEvalContext', 'Exception interpolating mixer args: ' + args + ', mTreeBrick uri: ' + mTreeBrickData.ittfDocumentUri + ', mixerMTreeBrick uri: ' + mixerUri + ', ex message: ' + exMessage + ', stack: ' + exStack, ex)
                ;
            }
        }
        /**
             With the interpolated values of the arguments we may now calculate the
             parameters received  by the mixed mTreeBrick, applying type conversions and default values
        */
        var calculatedParamValues = mTreeBrickData.mTreeBrick.calcParamValues(args)
        ;
        if (calculatedParamValues && calculatedParamValues.__is_error) {
            return calculatedParamValues;
        }
        // We have to load the calculated parameters on the eval context
        // of the mixed mTreeBrick brick
        var i, i_len=calculatedParamValues.length, item;
        for (i=0; i<i_len; i++) {
            item = calculatedParamValues[i];
            if (item.isByRef) {
                // The argument is passed by reference, so the parameter
                // value must be retrieved from the eval context of the mixer mTreeBrick
                // and then added to the mixed one.
                var mixer_mTreeBrick_EvalContext = this.getMTreeBrickEvalContext(mTreeBrickData.mTreeBrick.$mixerBrickKey)
                ;
                if (mixer_mTreeBrick_EvalContext && mixer_mTreeBrick_EvalContext.__is_error) {
                    return mixer_mTreeBrick_EvalContext;
                }
                mTreeBrick_EvalContext.setValue(item.name, mixer_mTreeBrick_EvalContext.getValue(item.name));
                // VIA set mTreeBrickData.byRefParams = (mTreeBrickData.byRefParams || [])
                // VIA _ mTreeBrickData.byRefParams.push
                // VIA 	@ item.name
            }
            else {
                // The argument is passed by value, so the calculated
                // parameter can be added to the eval context of the mixed mTreeBrick
                mTreeBrick_EvalContext.setValue(item.name, item.value);
            }
        }
    }
    return JsWizziEvalHelper;
})();

function remacro(value) {
    // Alt+146 = Æ
    return verify.replaceAll(value, "${", "${");
}
module.exports = JsWizziEvalHelper;
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
        method: 'wizzi-mtree.jsWizziEvalHelper.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}