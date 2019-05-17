/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\function.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-codegen.js.statements.function';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.exportfunction = function(model, ctx) {
        var xdefault = model.__default ? 'default ' : '';
        var name = (model.__name || '');
        ctx.w('export ' + xdefault + 'function ' + name + '(' + model.paramNames.join(', ') + ') {');
        ctx.indent();
        generateParamConstraints(name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx);
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.deindent();
        ctx.write('}');
    };
    cnt.stm.xfunction = function(model, ctx) {
        var name = '',
            aster = ctx.__aster || '';
        if (model.paramNames && model.paramNames.length > 0) {
            name = model.wzName.trim();
        }
        else {
            var p = lineParser.parse(model.wzName, model)
            ;
            if (p.tokens.length > 0) {
                var state = 0;
                for (var i = 0; i < p.tokens.length; i++) {
                    var text = p.tokens[i].text;
                    if (text === '(') {
                        state = 1;
                    }
                    else if (text === ')') {
                        ;
                    }
                    else if (i == 0 && state == 0) {
                        name = text;
                        state = 1;
                    }
                    else {
                        model.paramNames.push(text);
                    }
                }
            }
        }
        var f,
            iifeInvoke,
            iife = model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'memberCall';
        if (iife) {
            f = '(' + (name.length > 0 ? ('function' + aster + ' ' + name) : 'function');
            iifeInvoke = model.statements[(model.statements.length - 1)];
            iifeInvoke.wzParent = {
                wzElement: 'call'
            };
            model.statements.splice((model.statements.length - 1), 1);
        }
        else {
            f = name.length > 0 ? ('function' + aster + ' ' + name) : 'function' + aster;
        }
        ctx.w(f + '(' + (model.paramNames ? model.paramNames.join(', ') : '') + ') {');
        // constraints
        ctx.indent();
        generateParamConstraints(iife ? 'iife' : aster + name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx);
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.deindent();
        ctx.write('}');
        if (iife) {
            cnt.genItems([
                iifeInvoke
            ], ctx, {
                indent: false
            });
            ctx.write(')');
        }
        if (u.isTopStatement(model)) {
            ctx.w('');
        }
    };
    cnt.stm.iife = function(model, ctx) {
        var invokeCall = null;
        if (model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'callOnValue') {
            invokeCall = model.statements[model.statements.length - 1];
            model.statements.splice(model.statements.length - 1, 1);
        }
        if (model.unary_prefix) {
            ctx.write(model.unary_prefix);
        }
        ctx.w('(function(' + model.paramNames.join(', ') + ') {');
        // constraints
        ctx.indent();
        generateParamConstraints('iife', model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx);
        cnt.genItems(model.statements, ctx, {
            indent: false
        });
        ctx.deindent();
        ctx.write('})');
        if (invokeCall) {
            cnt.genItem(invokeCall, ctx);
        }
        else {
            ctx.w('()');
        }
        ctx.w(';');
        return ;
        if (model.statements.length != 1 && model.statements[0].wzElement !== 'function') {
            var i = 0,
                test = model.statements[0].wzElement;
            while (test === 'comment') {
                i++;
                test = model.statements[i].wzElement;
            }
            if (test !== 'xfunction') {
                throw new Error(('First statement of a an iife node must be a function. Instead is ' + model.statements[0].wzElement));
            }
        }
        cnt.genItem(model.statements[0], ctx);
        ctx.write(')');
        if (model.statements.length === 2 && model.statements[1].wzElement === 'callOnValue') {
            cnt.genItem(model.statements[1], ctx);
        }
        else if ((model.wzName || '').length > 0) {
            ctx.write(u.encloseParen(model.wzName)
            );
        }
        else {
            ctx.write('(');
            var first = true;
            for (var i = 1; i < model.statements.length; i++) {
                item = model.statements[i];
                if (item.wzElement === 'callOnValue') {
                    ctx.write(')');
                    break;
                }
                if (! (first)) {
                    ctx.write(', ');
                }
                first = false;
                cnt.genItem(item, ctx);
            }
            ctx.write(')');
        }
        for (var i = 1; i < model.statements.length; i++) {
            item = model.statements[i];
            if (item.wzElement === 'callOnValue') {
                cnt.genItem(item, ctx);
            }
        }
        if (u.isTopStatement(model)) {
            ctx.w(';');
        }
    };
    cnt.stm.generatorfunction = function(model, ctx) {
        ctx.__aster = '*';
        cnt.stm.xfunction(model, ctx);
        ctx.__aster = null;
    };
    cnt.stm.xyield = function(model, ctx) {
        var name = model.wzName.trim();
        if (model.statements.length > 0) {
            ctx.write('yield ');
            cnt.genItems(model.statements, ctx);
        }
        else {
            ctx.w('yield ' + name + u.semicolon(name));
        }
    };
    cnt.stm.arrowfunction = function(model, ctx) {
        if (ctx.__is_react_class && model.wzParent.wzElement == 'reactComponent') {
            ctx.w(model.wzName + ' = (' + model.paramNames.join(', ') + ') => {');
            ctx.indent();
            generateParamConstraints(name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx);
            cnt.genItems(model.statements, ctx, {
                indent: false
            });
            ctx.deindent();
            ctx.w('}');
        }
        else if (u.onlyChildIs(model, 'callOnValue')) {
            ctx.w('(' + model.paramNames.join(', ') + ') => ');
            // TODO what if it needs generateParamConstraints ?
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
        }
        else {
            ctx.w('(' + model.paramNames.join(', ') + ') => {');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            ctx.write('}');
        }
    };
    cnt.stm.xreturn = function(model, ctx) {
        if (model.statements && model.statements.length > 0) {
            ctx.write('return ');
            cnt.genItems(model.statements, ctx, {
                indent: true
            });
            if (model.statements.length == 1) {
                ctx.w(';');
            }
        }
        else {
            ctx.w('return ' + (model.wzName || '') + u.semicolon(model.wzName));
        }
    };
    function generateParamConstraints(methodName, parameters, hasCallback, hasOptionsCallback, ctx) {
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
        if (!parameters) return;
        var i, i_len=parameters.length, p;
        for (i=0; i<i_len; i++) {
            p = parameters[i];
            var state = prmAnalizeParam(p);
            // log 'wizzi-codegen.js2.function.generateParamConstraints.state', state
            var j, j_len=state.candidates.length, item;
            for (j=0; j<j_len; j++) {
                item = state.candidates[j];
                var k, k_len=item.constraints.length, c;
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
                        else if (c.paramType === 'function') {
                            ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
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
                            throw ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm);
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
                        else if (c.paramType === 'function') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
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
                            throw ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm);
                        }
                    }
                }
            }
        }
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
        var i, i_len=candidate.prm.params.length, item;
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
        else if (wzElement === 'callbackParam') {
            return 'callback';
        }
        else if (wzElement === 'optionsCallbackParam') {
            return 'optionsCallback';
        }
    }
};
