// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:42 GMT
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var path = require('path');
var assert = require('assert');
var wizzi = require('../wizzi');
var ContextData = require('./ContextData');
var WizziJsContext = require('./wizziJsContext');
var interpolate = require('../ittf/ittfInterpolate');
var types = require('../util/types');
var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";
var WizziJsEvalHelper = (function () {
    function WizziJsEvalHelper(primaryModel) {
        _classCallCheck(this, WizziJsEvalHelper);
        this.loadContext = primaryModel.loadContext;
        this.textSep = work.textSep;
        if (typeof(wizzi.runnerServer) === 'object') {
            this.callApi = wizzi.runnerServer.callApi;
            this.loadWizziModel = wizzi.runnerServer.loadWizziModel;
        }
    }
    /**
         Set the wizziJsContext
         Must be the first method called in this object
    */
    WizziJsEvalHelper.prototype.setWizziJsContext = function(jsWizziContext) {
        this.jsWizziContext = jsWizziContext;
    }
    /**
         node tree buildup method
         supershort method name
         means set the WizziJsContext state to IttfModelEvalContext
    */
    WizziJsEvalHelper.prototype.s = function(modelKey) {
        // log 'WizziJsEvalHelper called $.s(' + modelKey +')'
        this.jsWizziContext.set_IttfModelEvalContext(modelKey);
    }
    /**
         node tree buildup method
         supershort method name
         means set the WizziJsContext state to NodeContext
    */
    WizziJsEvalHelper.prototype.n = function() {
        // log 'WizziJsEvalHelper called $.n()'
        this.jsWizziContext.set_NodeContext();
    }
    /**
         node tree buildup method
         supershort method name
         means set the WizziJsContext state to GlobalContext
    */
    WizziJsEvalHelper.prototype.g = function() {
        // log 'WizziJsEvalHelper called $.g()'
        this.jsWizziContext.set_GlobalContext();
    }
    /**
         node tree buildup method
         supershort method name
         means append a child node to a parent node
    */
    WizziJsEvalHelper.prototype.a = function(parent,node,line) {
        // log 'WizziJsEvalHelper called $.a(' + node.n + ',' + node.v + ')'
        assert(parent, "Error evalHelper. Parent undefined in add. At line " + line);
        node.parent = parent;
        if (typeof (parent.childs) === 'undefined') {
            parent.childs = [];
        }
        node.childs = [];
        parent.childs.push(node);
    }
    /**
         Interpolate
    */
    WizziJsEvalHelper.prototype.ip = function(modelKey,templ,type,line) {
        var ret;
        try {
            var save = this.jsWizziContext.get_currentIttfModelKey();
            this.jsWizziContext.set_IttfModelEvalContext(modelKey, line);
            // log ' *** WizziJsEvalHelper.ip templ', templ, 'modelKey', modelKey
            ret = interpolate(templ, this.jsWizziContext, {delimiter: '${}'});
            // log 'interpolated result', ret
            if (save === null) {
                this.jsWizziContext.set_NodeContext(modelKey);
            }
            else {
                this.jsWizziContext.set_IttfModelEvalContext(save);
            }
        } catch (ex) {
            var ittfModelData = this.loadContext.getIttfModelData(modelKey);
            var callerIttfModelData = this.loadContext.getIttfModelData(ittfModelData.ittfModel.$mixerModelKey);
            var callerUri = callerIttfModelData ? callerIttfModelData.ittfDocumentUri : 'root model';
            // log 'saved ip.currentIttfModelKey', save, 'ittfModelData.evalContext', ittfModelData.evalContext
            var message = "trying WizziJsEvalHelper.ip(" + templ + ")\n" +"modelKey: " + modelKey + ", uri: " + ittfModelData.ittfDocumentUri +", callerUri: " + callerUri +", type: " + type + ", line: " + line;
            // set message += ('\nJust before throw, this.jsWizziContext.values:\n' + util.inspect(this.jsWizziContext.getValues(), {depth: 2}))
            if (!(ex)) {
                ex = new Error(message);
            }
            else {
                ex.message += '\n' + message;
            }
            throw ex;
        }
        return types.objectify(ret, type, {
                row: line
            })
        ;
    }
    WizziJsEvalHelper.prototype.api = function() {
        if (this.callApi) {
            return this.callApi.apply(wizzi.runnerServer, arguments)
            ;
        }
        else {
            var error = new wizzi.errors.IttfLoadError('A wizzi.RunnerServer has not been started. You must create a wizzifile.js.', '');
        }
    }
    WizziJsEvalHelper.prototype.model = function() {
        if (this.loadWizziModel) {
            return this.loadWizziModel.apply(wizzi.runnerServer, arguments)
            ;
        }
        else {
            var error = new wizzi.errors.IttfLoadError('A wizzi.RunnerServer has not been started. You must create a wizzifile.js.', '');
        }
    }
    WizziJsEvalHelper.prototype.getIttfModelEvalContext = function(modelKey,line) {
        // retrieve from the loadContext
        // the ittfModelData for the given modelKey
        var ittfModelData = this.loadContext.getIttfModelData(modelKey);
        var evalContext;
        if (ittfModelData.evalContext != null) {
            // An evalContext object has already been created for this ittfModelData
            evalContext = ittfModelData.evalContext;
            this._refreshEvalContext(ittfModelData, evalContext);
        }
        else {
            evalContext = new ContextData(1, modelKey);
            // log 'WizziJsEvalHelper created evalContext for', modelKey, 'id', ittfModelData.ittfModel.id, ittfModelData.evalContext, ittfModelData.ittfDocumentUri
            evalContext.setValue('__dirname', path.dirname(ittfModelData.ittfDocumentUri));
            evalContext.setValue('__filename', ittfModelData.ittfDocumentUri);
            this._refreshEvalContext(ittfModelData, evalContext);
            ittfModelData.evalContext = evalContext;
        }
        return evalContext;
    }
    WizziJsEvalHelper.prototype._refreshEvalContext = function(ittfModelData,evalContext) {
        if (ittfModelData.ittfModel.$params) {
            var args = ittfModelData.ittfModel.$args;
            if (args && args.indexOf('${') > -1) {
                // mixin call arguments must be interpolated
                // ittfModelData.ittfModel.$mixerModelKey is the modelKey of the
                // calling node that mixed the ittfModelData.ittfModel
                // we must retrieve the calling node model context
                var callingNode_ModelContext = this.getIttfModelEvalContext(ittfModelData.ittfModel.$mixerModelKey)
                ;
                try {
                    var interpolateArgsContext = new WizziJsContext();
                    interpolateArgsContext.setValues(this.jsWizziContext.globalContext.getSettableValues());
                    interpolateArgsContext.setValues(callingNode_ModelContext.getValues());
                    args = interpolate(args, interpolateArgsContext, {delimiter: '${}'});
                    // log 'WizziJsEvalHelper interpolateArgs', ittfModelData.ittfModel.$args, args
                } catch (ex) {
                    ex.message += ("Error interpolating args: " + ittfModelData.ittfModel.$args);
                    wizzi.fail.warn(ex);
                    throw ex;
                }
            }
            var paramValues = ittfModelData.ittfModel.getParamValues(args)
            ;
            for (var item, i = 0; i < paramValues.length; i++) {
                item = paramValues[i];
                if (item.isByRef) {
                    var callingNode_ModelContext = this.getIttfModelEvalContext(ittfModelData.ittfModel.$mixerModelKey)
                    ;
                    evalContext.setValue(item.name, callingNode_ModelContext.getValue(item.name));
                    ittfModelData.byRefParams = (ittfModelData.byRefParams || []);
                    ittfModelData.byRefParams.push(item.name);
                }
                else {
                    evalContext.setValue(item.name, item.value);
                }
            }
        }
    }
    return WizziJsEvalHelper;
})();


module.exports = WizziJsEvalHelper;