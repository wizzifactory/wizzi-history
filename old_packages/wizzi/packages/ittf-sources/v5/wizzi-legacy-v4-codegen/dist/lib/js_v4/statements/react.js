/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js_v4\statements\react.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var method;

var myname = 'wizzi-codegen.js.statements.react';
var md = module.exports = {};

md.load = function(cnt) {
    cnt.stm.reactComponent = function(model, ctx) {
        var childrenInfo = extractReactChildren(model);
        if (childrenInfo.style != null) {
            ctx.w("const styleSheet = createStyleSheet('" + model.wzName + "', theme => (");
            ctx.indent();
            childrenInfo.style.wzElement = 'jsObject';
            cnt.genItem(childrenInfo.style, ctx);
            childrenInfo.style.wzElement = 'style';
            ctx.deindent();
            ctx.w("));");
            ctx.w();
        }
        ctx.w('class ' + model.wzName + ' extends React.Component  {');
        ctx.indent();
        var i, i_len=model.statements.length, s;
        for (i=0; i<i_len; i++) {
            s = model.statements[i];
            console.log('reactComponent, s.wzElement', s.wzElement);
            if (s.wzElement == 'state') {
                ctx.write('state = ');
                s.wzElement = 'jsObject';
                cnt.genItem(s, ctx);
                s.wzElement = 'state';
                ctx.w(';');
            }
            else if (s.wzElement == 'ctor') {
                ctx.w('constructor(props) {');
                ctx.indent();
                ctx.w('super(props);');
                writeMethodProps(s, ctx);
                ctx.deindent();
                writeIndented(s.statements, ctx, cnt);
                ctx.w('}');
            }
            else if (s.wzElement == 'willMount') {
                writeMethod('componentWillMount', s, ctx, cnt);
            }
            else if (s.wzElement == 'didMount') {
                writeMethod('componentDidMount', s, ctx, cnt);
            }
            else if (s.wzElement == 'willUnmount') {
                writeMethod('componentWillUnmount', s, ctx, cnt);
            }
            else if (s.wzElement == 'shouldUpdate') {
                writeMethod('shouldComponentUpdate', s, ctx, cnt);
            }
            else if (s.wzElement == 'willUpdate') {
                writeMethod('componentWillUpdate', s, ctx, cnt);
            }
            else if (s.wzElement == 'didUpdate') {
                writeMethod('componentDidUpdate', s, ctx, cnt);
            }
            else if (s.wzElement == 'willReceiveProps') {
                ctx.w('componentWillReceiveProps(nextProps) {');
                ctx.indent();
                writeMethodProps(s, ctx);
                ctx.deindent();
                writeIndented(s.statements, ctx, cnt);
                ctx.w('}');
            }
            else if (s.wzElement == 'render') {
                writeMethod('render', s, ctx, cnt);
            }
            else if (s.wzElement == 'method') {
                if (!method) {
                    method = require('../method');
                }
                ctx.__is_react_class = true;
                new method.gen(s, ctx);
                ctx.__is_react_class = false;
            }
            else if (s.wzElement == 'arrowfunction') {
                ctx.__is_react_class = true;
                ctx.w(s.wzName + ' = (' + s.paramNames.join(', ') + ') => {');
                ctx.indent();
                generateParamConstraints(s.wzName, s.constrainedParams, s.hasCallbackParam, s.hasOptionsCallbackParam, ctx);
                writeMethodProps(s, ctx);
                ctx.deindent();
                writeIndented(s.statements, ctx, cnt);
                ctx.w('}');
                ctx.__is_react_class = false;
            }
            else if (s.wzElement == 'prop' || s.wzElement == 'style') {
                // already done
            }
            else {
                cnt.genItem(s, ctx);
            }
        }
        ctx.deindent();
        ctx.w('}');
        if (childrenInfo.items.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.propTypes = {');
            ctx.indent();
            var open = false;
            var i, i_len=childrenInfo.items.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.items[i];
                if (open) {
                    ctx.w(',');
                }
                genReactPropType(p, ctx, cnt);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
        if (childrenInfo.itemsWithDefault.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.defaultProps  = {');
            ctx.indent();
            var open = false;
            var i, i_len=childrenInfo.itemsWithDefault.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.itemsWithDefault[i];
                if (open) {
                    ctx.w(',');
                }
                ctx.write(p.wzName + ': ' + p.defaultValue);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
    };
    cnt.stm.reactFunction = function(model, ctx) {
        var childrenInfo = extractReactChildren(model);
        ctx.w('const ' + model.wzName + ' = (props) => {');
        ctx.indent();
        if (childrenInfo.items.length > 0) {
            var props = childrenInfo.items;
            ctx.w('const {');
            ctx.indent();
            var comma;
            var i, i_len=props.length, item;
            for (i=0; i<i_len; i++) {
                item = props[i];
                comma = i < props.length - 1 ? ',' : '';
                ctx.w(item.wzName + comma);
            }
            ctx.deindent();
            ctx.w('} = props;');
        }
        ctx.__is_react_class = true;
        var i, i_len=model.statements.length, s;
        for (i=0; i<i_len; i++) {
            s = model.statements[i];
            if (s.wzElement == 'prop') {
                // already done
            }
            else {
                cnt.genItem(s, ctx);
            }
        }
        ctx.__is_react_class = false;
        ctx.deindent();
        ctx.w('}');
        writePropTypes(model, childrenInfo, ctx);
    };
    function writeMethod(name, m, ctx, cnt) {
        ctx.w(name + '() {');
        ctx.indent();
        writeMethodProps(m, ctx);
        ctx.deindent();
        writeIndented(m.statements, ctx, cnt);
        ctx.w('}');
    }
    function writeIndented(statements, ctx, cnt) {
        ctx.indent();
        var i, i_len=statements.length, item;
        for (i=0; i<i_len; i++) {
            item = statements[i];
            console.log('writeIndented', item.wzElement);
            if (item.wzElement == 'prop') {
                // done in writeMethodProps
            }
            else {
                cnt.genItem(item, ctx);
            }
        }
        ctx.deindent();
    }
    function extractReactChildren(react) {
        var ret = {
            items: [], 
            itemsWithDefault: [], 
            style: null
        };
        var i, i_len=react.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = react.statements[i];
            if (item.wzElement == 'prop') {
                ret.items.push(item);
                console.log('item.defaultValue', item.defaultValue);
                if (item.defaultValue) {
                    ret.itemsWithDefault.push(item);
                }
            }
            if (item.wzElement == 'style') {
                if (ret.style == null) {
                    ret.style = item;
                }
                else {
                    var j, j_len=item.statements.length, s;
                    for (j=0; j<j_len; j++) {
                        s = item.statements[j];
                        s.wzParent = ret.style;
                        ret.style.statements.push(s);
                    }
                }
            }
        }
        return ret;
    }
    function writeMethodProps(m, ctx) {
        var props = extractMethodProps(m);
        if (props.length > 0) {
            ctx.w('const {');
            ctx.indent();
            var comma;
            var i, i_len=props.length, item;
            for (i=0; i<i_len; i++) {
                item = props[i];
                comma = i < props.length - 1 ? ',' : '';
                ctx.w(item.wzName + comma);
            }
            ctx.deindent();
            ctx.w('} = this.props;');
        }
    }
    function extractMethodProps(m) {
        var ret = [];
        var i, i_len=m.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = m.statements[i];
            if (item.wzElement == 'prop') {
                ret.push(item);
            }
        }
        return ret;
    }
    function writePropTypes(model, childrenInfo, ctx) {
        if (childrenInfo.items.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.propTypes = {');
            ctx.indent();
            var open = false;
            var i, i_len=childrenInfo.items.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.items[i];
                if (open) {
                    ctx.w(',');
                }
                genReactPropType(p, ctx, cnt);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
        if (childrenInfo.itemsWithDefault.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.defaultProps  = {');
            ctx.indent();
            var open = false;
            var i, i_len=childrenInfo.itemsWithDefault.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.itemsWithDefault[i];
                if (open) {
                    ctx.w(',');
                }
                ctx.write(p.wzName + ': ' + p.defaultValue);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
    }
    var genReactPropType = (function() {
        var lc = {};
        lc.oneOf = function(model, ctx, cnt) {
            var ptype = model.statements[0];
            ctx.w(model.wzName + ': PropTypes.oneOf(');
            ctx.indent();
            cnt.genItemAs(ptype, 'jsArray', ctx);
            ctx.deindent();
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.arrayOf = function(model, ctx, cnt) {
            var ptype = model.statements[0];
            ctx.write(model.wzName + ': PropTypes.arrayOf(');
            cnt.genItems(ptype.statements, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.instanceOf = function(model, ctx, cnt) {
            var ptype = model.statements[0];
            ctx.write(model.wzName + ': PropTypes.instanceOf(');
            cnt.genItems(ptype.statements, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.objectOf = function(model, ctx, cnt) {
            var ptype = model.statements[0];
            ctx.write(model.wzName + ': PropTypes.objectOf(');
            cnt.genItems(ptype.statements, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.oneOfType = function(model, ctx, cnt) {
            var ptype = model.statements[0];
            ctx.w(model.wzName + ': PropTypes.oneOfType(');
            ctx.indent();
            cnt.genItemAs(ptype, 'jsArray', ctx);
            ctx.deindent();
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.shape = function(model, ctx, cnt) {
            var ptype = model.statements[0];
            ctx.w(model.wzName + ': PropTypes.shape(');
            ctx.indent();
            cnt.genItemAs(ptype, 'jsObject', ctx);
            ctx.deindent();
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        return function genReactPropType(prop, ctx, cnt) {
                if (prop.statements.length < 1) {
                    // default to string
                    ctx.write(prop.wzName + ': PropTypes.string');
                    if (prop.isRequired) {
                        ctx.write('.isRequired');
                    }
                }
                else {
                    var ptype = prop.statements[0];
                    console.log('prop', ptype.wzElement, lc[ptype.wzElement]);
                    if (lc[ptype.wzElement]) {
                        lc[ptype.wzElement](prop, ctx, cnt);
                    }
                    else {
                        ctx.write(prop.wzName + ': PropTypes.' + ptype.wzElement);
                        if (prop.isRequired) {
                            ctx.write('.isRequired');
                        }
                    }
                }
            };
    })()
    ;
    ;
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
