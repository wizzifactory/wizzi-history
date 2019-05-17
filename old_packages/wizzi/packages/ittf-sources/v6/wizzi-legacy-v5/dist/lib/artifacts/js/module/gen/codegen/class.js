/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-js\src\ittf\lib\artifacts\js\module\gen\codegen\class.js.ittf
*/
'use strict';
var statement = require('./statement');
var method = require('./method');
var html = require('./html');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.class';
md.gen = function(model, ctx, callback) {
    var zclass = model.wzName,
        zsuper = model.super,
        zsuperw = zsuper || '',
        ctor = model.findCtor(),
        ctorArgs = ctor == null ? '' : ctor.paramNames.join(', '),
        ctorBaseArgs = ctor == null ? '' : (ctor.getBaseArgs() || ''),
        superArgs = ctorBaseArgs.length > 0 ? ', ' + ctorBaseArgs : '';
    ctx.w('var ' + zclass + ' = (function (' + zsuperw + ') {');
    ctx.indent();
    if (zsuper) {
        ctx.w('_inherits(' + zclass + ', ' + zsuperw + ');');
    }
    ctx.w('function ' + zclass + '(' + ctorArgs + ') {');
    ctx.indent();
    if (zsuper) {
        ctx.w("_get(Object.getPrototypeOf(" + zclass + ".prototype), 'constructor', this).call(this" + superArgs + ");");
    }
    ctx.w('_classCallCheck(this, ' + zclass + ');');
    md.genCTor(ctor, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        // log 121, 'class'
        ctx.deindent();
        ctx.w('}');
        md.genMembers(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            // log 122, 'class'
            ctx.w('return ' + zclass + ';');
            ctx.deindent();
            ctx.w('})(' + zsuperw + ');');
            ctx.w('');
            return callback(null, null);
        });
    });
};
md.genCTor = function(ctor, ctx, callback) {
    if (ctor) {
        generateParamConstraints('ctor', ctor.constrainedParams, ctor.hasCallbackParam, ctor.hasOptionsCallbackParam, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            // log 123, 'class.genCTor'
            statement.genMany(ctor.statements, ctx, callback);
        });
    }
    else {
        return callback(null, null);
    }
};
md.genMembers = function(model, ctx, callback) {
    var generator;
    // log 161, 'class.genMembers'
    var len_1 = model.statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.statements[index_1];
        // log 163
        if (item_1.wzElement === 'ctor') {
            // done already
            generator = null;
        }
        else if (item_1.wzElement === 'method') {
            generator = method;
        }
        else if (item_1.wzElement === 'tohtml') {
            generator = html;
        }
        else {
            generator = statement;
        }
        if (generator) {
            generator.gen(item_1, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        else {
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        }
    }
    repeater_1(0);
    function next_1() {
        // log 162, 'class.genMembers'
        return callback(null, null);
    }
};
function generateParamConstraints(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
    if (hasCallback) {
        ctx.w("if (typeof(callback) !== 'function') {");
        ctx.w("    throw new Error(");
        ctx.w("        error('InvalidArgument', '" + methodName + "', 'The callback parameter must be a function. Received: ' + callback)");
        ctx.w("    );");
        ctx.w("};");
    }
    else if (hasOptionsCallback) {
        ctx.w("if (verify.isFunction(callback) === false && verify.isFunction(options) === true) {");
        ctx.indent();
        ctx.w("callback = options;");
        ctx.w("options = {};");
        ctx.deindent();
        ctx.w("}");
        ctx.w("if (verify.isFunction(callback) === false) {");
        ctx.w("    throw new Error(");
        ctx.w("        error('InvalidArgument', '" + methodName + "', 'The callback parameter must be a function. Received: ' + callback)");
        ctx.w("    );");
        ctx.w("};");
    }
    var i, i_items=parameters, i_len=parameters.length, p;
    for (i=0; i<i_len; i++) {
        p = parameters[i];
        var state = prmAnalizeParam(p);
        // log 'wizzi-codegen.js2.function.generateParamConstraints.state', state
        var j, j_items=state.candidates, j_len=state.candidates.length, item;
        for (j=0; j<j_len; j++) {
            item = state.candidates[j];
            var k, k_items=item.constraints, k_len=item.constraints.length, c;
            for (k=0; k<k_len; k++) {
                c = item.constraints[k];
                if (c.constraintType === 'required') {
                    if (c.paramType === 'string') {
                        ctx.w("if (verify.isNotEmpty(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a string', hasCallback, ctx);
                    }
                    else if (c.paramType === 'number') {
                        ctx.w("if (verify.isNumber(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a number', hasCallback, ctx);
                    }
                    else if (c.paramType === 'date') {
                        ctx.w("if (verify.isDate(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a date', hasCallback, ctx);
                    }
                    else if (c.paramType === 'boolean') {
                        ctx.w("if (verify.isBoolean(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a boolean', hasCallback, ctx);
                    }
                    else if (c.paramType === 'object') {
                        ctx.w("if (verify.isObject(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'an object', hasCallback, ctx);
                    }
                    else if (c.paramType === 'array') {
                        ctx.w("if (verify.isArray(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'an array', hasCallback, ctx);
                    }
                    else if (c.paramType === 'arrayOrObject') {
                        ctx.w("if (verify.isArrayOrObject(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'an array or an object', hasCallback, ctx);
                    }
                    else if (c.paramType === 'function') {
                        ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                    }
                    else if (c.paramType === 'any') {
                        // do nothing
                    }
                    else if (c.paramType === 'optionsCallback') {
                        // done already
                        // see above "if hasOptionsCallback" statement
                    }
                    else if (c.paramType === 'callback') {
                        // done already
                        // see above "if hasCallback" statement
                    }
                    else {
                        return callback(ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm));
                    }
                }
                if (c.constraintType === 'optional') {
                    if (c.paramType === 'string') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isNotEmpty(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a string', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'number') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isNumber(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a number', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'date') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isDate(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a date', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'boolean') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isBoolean(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a boolean', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'object') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isObject(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'an object', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'array') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isArray(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'an array', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'arrayOrObject') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isArrayOrObject(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'an array or an object', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'function') {
                        ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                        ctx.indent();
                        ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                        invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                        ctx.deindent();
                        ctx.w("}");
                    }
                    else if (c.paramType === 'any') {
                        // do nothing
                    }
                    else if (c.paramType === 'optionsCallback') {
                        // done already
                        // see above "if hasOptionsCallback" statement
                    }
                    else if (c.paramType === 'callback') {
                        // done already
                        // see above "if hasCallback" statement
                    }
                    else {
                        return callback(ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm));
                    }
                }
            }
        }
    }
    return callback(null, null);
}
function invalidParam(methodName, name, type, hasCallback, ctx) {
    // log 'wizzi-codegen.js2.function.invalidParam.methodName', methodName, name, type
    if (hasCallback) {
        ctx.w("    return callback(error(");
        ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
        ctx.w("    ));");
        ctx.w("}");
    }
    else if (methodName === 'ctor' || methodName === 'iife') {
        ctx.w("    throw new Error(error(");
        ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
        ctx.w("    ));");
        ctx.w("}");
    }
    else {
        ctx.w("    return error(");
        ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
        ctx.w("    );");
        ctx.w("}");
    }
}
function prmAnalizeParam(prm) {
    var state = {
        candidates: []
    };
    var candidate = {
        prm: prm, 
        accessPath: prm.wzName, 
        parent: null, 
        isRequired: false, 
        constraints: []
    };
    state.candidates.push(candidate);
    prmSelectAnalizer(candidate, state);
    return state;
}
function prmSelectAnalizer(candidate, state) {
    // log 'wizzi-codegen.js2.paramAnalizer.prmSelectAnalizer.candidate.name', candidate.prm.wzElement, candidate.prm.wzName
    if (candidate.prm.wzElement === 'objectParam') {
        prmAnalizeObject(candidate, state);
    }
    else if (candidate.prm.wzElement === 'arrayParam') {
        prmAnalizeArray(candidate, state);
    }
    else {
        prmAnalizeLeaf(candidate, state);
    }
}
function prmAnalizeObject(candidate, state) {
    prmAnalizeLeaf(candidate, state);
    // log 'wizzi-codegen.js2.paramAnalizer.prmAnalizeObject.candidate.name', candidate.prm.wzElement, candidate.prm.wzName
    var i, i_items=candidate.prm.params, i_len=candidate.prm.params.length, item;
    for (i=0; i<i_len; i++) {
        item = candidate.prm.params[i];
        var subcandidate = {
            prm: item, 
            accessPath: candidate.accessPath + '.' + item.wzName, 
            parent: candidate, 
            isRequired: false, 
            constraints: []
        };
        state.candidates.push(subcandidate);
        prmSelectAnalizer(subcandidate, state);
    }
}
function prmAnalizeArray(candidate, state) {
    prmAnalizeLeaf(candidate, state);
    if (candidate.prm.params.length == 1) {
        // TODO assume arrayOf ???
    }
}
function prmAnalizeLeaf(candidate, state) {
    // log 'wizzi-codegen.js2.paramAnalizer.prmAnalizeLeaf.candidate.name', candidate.prm.wzElement, candidate.prm.wzName, candidate.accessPath
    if (candidate.prm.isRequired || candidate.prm.isOptional) {
        candidate.constraints.push({
            constraintType: (candidate.prm.isRequired ? 'required' : 'optional'), 
            paramName: candidate.prm.wzName, 
            paramType: prmTypeFromElement(candidate.prm.wzElement), 
            accessPath: candidate.accessPath
        });
        candidate.isRequired = true;
        if (candidate.prm.isRequired) {
            requireParents(candidate);
        }
    }
}
function requireParents(candidate) {
    var ancestor = candidate.parent;
    while (ancestor) {
        if (!ancestor.isRequired) {
            ancestor.constraints.push({
                constraintType: 'required', 
                paramName: ancestor.prm.wzName, 
                paramType: prmTypeFromElement(ancestor.prm.wzElement), 
                accessPath: ancestor.accessPath
            });
            ancestor.isRequired = true;
        }
        ancestor = ancestor.parent;
    }
}
function prmTypeFromElement(wzElement) {
    if (wzElement === 'stringParam') {
        return 'string';
    }
    else if (wzElement === 'numberParam') {
        return 'number';
    }
    else if (wzElement === 'booleanParam') {
        return 'boolean';
    }
    else if (wzElement === 'anyParam') {
        return 'any';
    }
    else if (wzElement === 'functionParam') {
        return 'function';
    }
    else if (wzElement === 'objectParam') {
        return 'object';
    }
    else if (wzElement === 'arrayParam') {
        return 'array';
    }
    else if (wzElement === 'arrayOrObjectParam') {
        return 'arrayOrObject';
    }
    else if (wzElement === 'callbackParam') {
        return 'callback';
    }
    else if (wzElement === 'optionsCallbackParam') {
        return 'optionsCallback';
    }
}
