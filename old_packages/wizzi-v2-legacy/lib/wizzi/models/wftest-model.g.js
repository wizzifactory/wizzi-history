/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi\lib\artifacts\wizzischema\model\gen\ittf\wizzischema-model.js.ittf
    utc time: Tue, 11 Jul 2017 18:43:42 GMT
*/
'use strict';
// generated by js.module.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var path = require('path');
var _ = require('lodash');

var md = module.exports = {};

var wzSourceLineInfo = (function () {
    function wzSourceLineInfo(row,col,sourceKey) {
        _classCallCheck(this, wzSourceLineInfo);
        this.row = row;
        this.col = col;
        this.sourceKey = sourceKey;
    }
    wzSourceLineInfo.prototype.toString = function(instance) {
        if (instance) {
            return 'row: ' + this.row + ', col: ' + this.col + ', file: ' + instance.wzSourceFilepath(this.sourceKey);
        }
        else {
            return 'row: ' + this.row + ', col: ' + this.col + ', sourceKey: ' + this.sourceKey;
        }
    }
    return wzSourceLineInfo;
})();


md.wzSourceLineInfo = wzSourceLineInfo;
var wftestBase = (function () {
    function wftestBase(name,sourceLineInfo) {
        _classCallCheck(this, wftestBase);
        this.wzName = name || '';
        this.wzParent = null;
        this.wzSourceLineInfo = sourceLineInfo;
        this.wzChildren = [];
    }
    wftestBase.prototype.wzRoot = function() {
        return this.wzParent == null ? this : this.wzParent.wzRoot();
    }
    wftestBase.prototype.wzSourceFilepath = function(sourceKey) {
        return this.wzRoot().loadContext.getIttfDocumentUri(sourceKey);
    }
    wftestBase.prototype.wzVerify = function() {
    }
    wftestBase.prototype.wzInitialize = function() {
    }
    wftestBase.prototype.wzInitializeAsync = function(ctx,callback) {
        callback(null);
    }
    wftestBase.prototype.wzAddChild = function(node) {
        node.wzParent = this;
        this.wzChildren.push(node);
    }
    wftestBase.prototype.wzLoadToChildColl = function(child,type,coll) {
        var item = new type(child.v, new wzSourceLineInfo(child.r, child.c, child.u));
        item.wzTag = child.n;
        item.wzParent = this;
        coll.push(item);
        if (item.loadFromNode) {
            item.loadFromNode(child);
        }
        return true;
    }
    wftestBase.prototype.wzLoadToChildren = function(child,type) {
        var item = new type(child.v, new wzSourceLineInfo(child.r, child.c, child.u));
        item.wzTag = child.n;
        item.wzParent = this;
        this.wzChildren.push(item);
        if (item.loadFromNode) {
            item.loadFromNode(child);
        }
        return true;
    }
    wftestBase.prototype.wzLoadOneToOne = function(child,type,fieldName) {
        var item = new type(child.v, new wzSourceLineInfo(child.r, child.c, child.u));
        item.wzParent = this;
        this[fieldName] = item;
        if (item.loadFromNode) {
            item.loadFromNode(child);
        }
        return true;
    }
    wftestBase.prototype.error = function(message,node) {
        throw new md.wftestException(message, node, this);
    }
    return wftestBase;
})();


md.wftestBase = wftestBase;

/**
    element wftest
     The root tag of the test schema.
*/
var wftest = (function (wftestBase) {
    _inherits(wftest, wftestBase);
    function wftest(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(wftest.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, wftest);
        this.wzElement = "wftest";
        // relation table
        this.tables = [];
        // relation site
        this.sites = [];
    }
    wftest.prototype.addTable = function(name,sourceLineInfo) {
        var retval = new md.table(name, sourceLineInfo);
        retval.wzParent = this;
        this.tables.push(retval);
        return retval;
    }
    wftest.prototype.getTable = function(name) {
        var found = null;
        this.tables.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
        });
        return found;
    }
    wftest.prototype.addSite = function(name,sourceLineInfo) {
        var retval = new md.site(name, sourceLineInfo);
        retval.wzParent = this;
        this.sites.push(retval);
        return retval;
    }
    wftest.prototype.getSite = function(name) {
        var found = null;
        this.sites.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
        });
        return found;
    }
    wftest.prototype.loadChild = function(child) {
        // Make test case insensitive
        var item,
            ok = false,
            name = child.n.toLowerCase(),
            _l = name.length,
            _ch = name[0];
        if (_l == 4 && _ch == 's') {
            if (name === 'site') {
                return this.wzLoadToChildColl(child, md.site, this.sites);
            }
        }
        if (_l == 5 && _ch == 't') {
            if (name === 'table') {
                return this.wzLoadToChildColl(child, md.table, this.tables);
            }
        }
        return ok;
    }
    wftest.prototype.loadFromNode = function(node) {
        var loaded = false;
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            loaded = this.loadChild(item);
            if (!loaded) {
                throw new md.wftestException("Tag not recognized: " + item.n, item, this);
            }
        }
    }
    wftest.prototype.wzVerify = function(ctx) {
        var i, i_len=this.tables.length, item;
        for (i=0; i<i_len; i++) {
            item = this.tables[i];
            item.wzVerify(ctx);
        }
        var i, i_len=this.sites.length, item;
        for (i=0; i<i_len; i++) {
            item = this.sites[i];
            item.wzVerify(ctx);
        }
        md.wftestBase.prototype.wzVerify.call(this, ctx);
    }
    wftest.prototype.wzInitialize = function(ctx) {
        var i, i_len=this.tables.length, item;
        for (i=0; i<i_len; i++) {
            item = this.tables[i];
            item.wzInitialize(ctx);
        }
        var i, i_len=this.sites.length, item;
        for (i=0; i<i_len; i++) {
            item = this.sites[i];
            item.wzInitialize(ctx);
        }
        md.wftestBase.prototype.wzInitialize.call(this, ctx);
    }
    return wftest;
})(wftestBase);


md.wftest = wftest;
/**
    element site
     The root element of the site schema.
*/
var site = (function (wftestBase) {
    _inherits(site, wftestBase);
    function site(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(site.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, site);
        this.allowedKINDS = [ "one", "two"];
        this.KIND_ONE = "one";
        this.KIND_TWO = "two";
        this.wzElement = "site";
        this.kind = "one";
        // relation item
        this.items = [];
    }
    site.KIND_ONE = "one";
    site.KIND_TWO = "two";
    site.prototype.addItem = function(name,sourceLineInfo) {
        var retval = new md.item(name, sourceLineInfo);
        retval.wzParent = this;
        this.items.push(retval);
        return retval;
    }
    site.prototype.getItem = function(name) {
        var found = null;
        this.items.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
        });
        return found;
    }
    site.prototype.loadChild = function(child) {
        // Make test case insensitive
        var item,
            ok = false,
            name = child.n.toLowerCase(),
            _l = name.length,
            _ch = name[0];
        if (_l == 4 && _ch == 'i') {
            if (name === 'item') {
                return this.wzLoadToChildColl(child, md.item, this.items);
            }
        }
        if (_l == 4 && _ch == 'k') {
            if (name === 'kind') {
                this.kind = child.v; return true;
            }
        }
        if (_l == 4 && _ch == 'm') {
            if (name === 'menu') {
                return this.wzLoadToChildColl(child, md.menu, this.items);
            }
        }
        if (_l == 8 && _ch == 'm') {
            if (name === 'menuitem') {
                return this.wzLoadToChildColl(child, md.menuitem, this.items);
            }
        }
        return ok;
    }
    site.prototype.loadFromNode = function(node) {
        var loaded = false;
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            loaded = this.loadChild(item);
            if (!loaded) {
                throw new md.wftestException("Tag not recognized: " + item.n, item, this);
            }
        }
    }
    site.prototype.wzVerify = function(ctx) {
        ctx.verifyEnum("site", "kind", this.kind, this.allowedKINDS, this);
        var i, i_len=this.items.length, item;
        for (i=0; i<i_len; i++) {
            item = this.items[i];
            item.wzVerify(ctx);
        }
        md.wftestBase.prototype.wzVerify.call(this, ctx);
    }
    site.prototype.wzInitialize = function(ctx) {
        var i, i_len=this.items.length, item;
        for (i=0; i<i_len; i++) {
            item = this.items[i];
            item.wzInitialize(ctx);
        }
        md.wftestBase.prototype.wzInitialize.call(this, ctx);
    }
    site.prototype.getMenus = function() {
        if (!this.menus) {
            this.menus = _.filter(this.items, { wzElement: 'menu' });
        }
        return this.menus;
    }
    site.prototype.getMenu = function(name) {
        var menu = _.find(this.getMenus(), { wzName: name });
        return menu;
    }
    return site;
})(wftestBase);


md.site = site;
// element item
var item = (function (wftestBase) {
    _inherits(item, wftestBase);
    function item(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(item.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, item);
        this.wzElement = "item";
        // relation item
        this.items = [];
    }
    item.prototype.addItem = function(name,sourceLineInfo) {
        var retval = new md.item(name, sourceLineInfo);
        retval.wzParent = this;
        this.items.push(retval);
        return retval;
    }
    item.prototype.getItem = function(name) {
        var found = null;
        this.items.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
        });
        return found;
    }
    item.prototype.loadChild = function(child) {
        // Make test case insensitive
        var item,
            ok = false,
            name = child.n.toLowerCase(),
            _l = name.length,
            _ch = name[0];
        if (_l == 4 && _ch == 'i') {
            if (name === 'item') {
                return this.wzLoadToChildColl(child, md.item, this.items);
            }
        }
        if (_l == 4 && _ch == 'm') {
            if (name === 'menu') {
                return this.wzLoadToChildColl(child, md.menu, this.items);
            }
        }
        if (_l == 8 && _ch == 'm') {
            if (name === 'menuitem') {
                return this.wzLoadToChildColl(child, md.menuitem, this.items);
            }
        }
        return ok;
    }
    item.prototype.loadFromNode = function(node) {
        var loaded = false;
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            loaded = this.loadChild(item);
            if (!loaded) {
                throw new md.wftestException("Tag not recognized: " + item.n, item, this);
            }
        }
    }
    item.prototype.wzVerify = function(ctx) {
        var i, i_len=this.items.length, item;
        for (i=0; i<i_len; i++) {
            item = this.items[i];
            item.wzVerify(ctx);
        }
        md.wftestBase.prototype.wzVerify.call(this, ctx);
    }
    item.prototype.wzInitialize = function(ctx) {
        var i, i_len=this.items.length, item;
        for (i=0; i<i_len; i++) {
            item = this.items[i];
            item.wzInitialize(ctx);
        }
        md.wftestBase.prototype.wzInitialize.call(this, ctx);
    }
    return item;
})(wftestBase);


md.item = item;
// element menuitem
var menuitem = (function (item) {
    _inherits(menuitem, item);
    function menuitem(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(menuitem.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, menuitem);
        this.wzElement = "menuitem";
        // TODO avoid this declaration, attributes should be tested for undefined not null
        // set this.href = null
    }
    menuitem.prototype.loadChild = function(child) {
        // Make test case insensitive
        var item,
            ok = false,
            name = child.n.toLowerCase(),
            _l = name.length,
            _ch = name[0];
        if (_l == 4 && _ch == 'h') {
            if (name === 'href') {
                this.href = child.v; return true;
            }
        }
        ok = md.item.prototype.loadChild.call(this, child);
        return ok;
    }
    menuitem.prototype.loadFromNode = function(node) {
        var loaded = false;
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            loaded = this.loadChild(item);
            if (!loaded) {
                throw new md.wftestException("Tag not recognized: " + item.n, item, this);
            }
        }
    }
    return menuitem;
})(item);


md.menuitem = menuitem;
// element menu
var menu = (function (item) {
    _inherits(menu, item);
    function menu(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(menu.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, menu);
        this.wzElement = "menu";
    }
    return menu;
})(item);


md.menu = menu;
// element table
var table = (function (wftestBase) {
    _inherits(table, wftestBase);
    function table(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(table.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, table);
        this.wzElement = "table";
        // relation tableColumm
        this.tableColumms = [];
    }
    table.prototype.addTableColumm = function(name,sourceLineInfo) {
        var retval = new md.tableColumm(name, sourceLineInfo);
        retval.wzParent = this;
        this.tableColumms.push(retval);
        return retval;
    }
    table.prototype.getTableColumm = function(name) {
        var found = null;
        this.tableColumms.forEach(function(item) {
            found = found || (item.wzName === name ? item : null);
        });
        return found;
    }
    table.prototype.loadChild = function(child) {
        // Make test case insensitive
        var item,
            ok = false,
            name = child.n.toLowerCase(),
            _l = name.length,
            _ch = name[0];
        if (_l == 1 && _ch == 'c') {
            if (name === 'c') {
                return this.wzLoadToChildColl(child, md.tableColumm, this.tableColumms);
            }
        }
        return ok;
    }
    table.prototype.loadFromNode = function(node) {
        var loaded = false;
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            loaded = this.loadChild(item);
            if (!loaded) {
                throw new md.wftestException("Tag not recognized: " + item.n, item, this);
            }
        }
    }
    table.prototype.wzVerify = function(ctx) {
        var i, i_len=this.tableColumms.length, item;
        for (i=0; i<i_len; i++) {
            item = this.tableColumms[i];
            item.wzVerify(ctx);
        }
        md.wftestBase.prototype.wzVerify.call(this, ctx);
    }
    table.prototype.wzInitialize = function(ctx) {
        var i, i_len=this.tableColumms.length, item;
        for (i=0; i<i_len; i++) {
            item = this.tableColumms[i];
            item.wzInitialize(ctx);
        }
        md.wftestBase.prototype.wzInitialize.call(this, ctx);
    }
    return table;
})(wftestBase);


md.table = table;
// element tableColumm
var tableColumm = (function (wftestBase) {
    _inherits(tableColumm, wftestBase);
    function tableColumm(name,sourceLineInfo) {
        _get(Object.getPrototypeOf(tableColumm.prototype), 'constructor', this).call(this, name,sourceLineInfo);
        _classCallCheck(this, tableColumm);
        this.wzElement = "tableColumm";
        // TODO avoid this declaration, attributes should be tested for undefined not null
        // set this.type = null
    }
    tableColumm.prototype.loadChild = function(child) {
        // Make test case insensitive
        var item,
            ok = false,
            name = child.n.toLowerCase(),
            _l = name.length,
            _ch = name[0];
        if (_l == 4 && _ch == 't') {
            if (name === 'type') {
                this.type = child.v; return true;
            }
        }
        return ok;
    }
    tableColumm.prototype.loadFromNode = function(node) {
        var loaded = false;
        var i, i_len=node.childs.length, item;
        for (i=0; i<i_len; i++) {
            item = node.childs[i];
            loaded = this.loadChild(item);
            if (!loaded) {
                throw new md.wftestException("Tag not recognized: " + item.n, item, this);
            }
        }
    }
    return tableColumm;
})(wftestBase);


md.tableColumm = tableColumm;
md.__tagElementMapping = { 'c': 'tableColumm' };
var wftestException = (function () {
    function wftestException(message,node,instance) {
        _classCallCheck(this, wftestException);
        // TODO node seems superflous
        if (node && instance) {
            this.message = message + ', row:' + node.r + ', col:' + node.c + ', source:' + instance.wzSourceFilepath(node.u);
        }
        else if (instance) {
            this.message = message + instance.wzSourceLineInfo.toString(instance);
        }
        else {
            this.message = message;
        }
        this.stack = new Error().stack;
        this.node = node;
    }
    return wftestException;
})();


md.wftestException = wftestException;
var wftestContext = (function () {
    function wftestContext() {
        _classCallCheck(this, wftestContext);
        this.validationErrors = [];
    }
    wftestContext.prototype.schemaIsValid = function() {
        return this.validationErrors.length == 0;
    }
    wftestContext.prototype.addError = function(message,node) {
        var at = node ? ' At ' + node.wzSourceLineInfo.toString(node) : '';
        this.validationErrors.push(message + at);
    }
    wftestContext.prototype.verifyEnum = function(valueType,valueName,value,allowed,node) {
        if (value && allowed.indexOf(value) < 0) {
            var allowedStr = 'allowed: ' + allowed.join(', ');
            this.validationErrors.push(valueType + ' ' + valueName + ' has an invalid value: ' + value + ' ' + allowedStr + '. At ' + (node.wzSourceLineInfo ? node.wzSourceLineInfo.toString(node) : 'location unavailable'));
        }
    }
    return wftestContext;
})();


md.wftestContext = wftestContext;
function parsestring(value,defaultValue,node) {
    if (isEmpty( value )) {
        return defaultValue;
    }
    return value;
}

function isString(value) {
    return (typeof value === 'string' || value instanceof String);
}

function isEmpty(value) {
    return !isString( value ) || value.length === 0;
}

function isBoolean(value) {
    return value === 'true' || value === 'false';
}

