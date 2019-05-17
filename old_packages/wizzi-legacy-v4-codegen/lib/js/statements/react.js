/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\lib\js\statements\react.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';
var util = require('util');
var u = require('../util/stm');
var method;

var myname = 'wizzi.codegen.js.statements.react';
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
                var prms = s.getParams();
                ctx.__is_react_class = true;
                ctx.w(s.wzName + ' = (' + prms.join(', ') + ') => {');
                ctx.indent();
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
};
