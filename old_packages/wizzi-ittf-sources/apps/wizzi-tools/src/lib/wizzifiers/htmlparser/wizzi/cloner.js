var util = require('util');
var verify = require('../../../util/verify');

function log(label, obj) {
    console.log(label, util.inspect(obj, { depth: 1 }));
}

function transform(node) {
    var ret = {
        tag: node.tag,
        name: node.name,
        attribs: node.attribs,
        lines: node.lines,
        children: []
    };
    if (ret.tag === 'title') {
        ret.tag = '@title';
    }
    else if (ret.tag === 'style') {
        ret.tag = '@style';
    }
    else if (ret.tag === 'ng-view') {
        ret.tag = '@ng-view';
    }
    else if (ret.tag === 'div' && ret.name.length === 0 && ret.attribs.class) {
        ret.tag = '.';
        ret.name = ret.attribs.class;
        delete ret.attribs.class;
    } else if (ret.tag === 'script' && ret.attribs.src) {
        ret.tag = 'js';
        ret.name = ret.attribs.src;
        ret.attribs = {};
    } else if (ret.tag === 'link' && ret.attribs.href === 'stylesheet') {
        ret.tag = 'css';
        ret.name = ret.attribs.href;
        ret.attribs = {};
    }
    node.children.forEach(function (item) {
        var child = transform(item);
        if (child) ret.children.push(child);
    });
    return ret;

    /*

    if (obj == null || typeof obj === 'undefined') return obj;
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        log('clone array', obj);
        var ret = [];
        for (var i = 0; i < obj.length; i++) {
            var value = clone(obj[i]);
            if (value !== null) {
                ret.push(value);
            }
        }
        // log('clone array', ret);
        return ret;
    }
    else if (typeof (obj) == "object") {
        log('clone object', obj);
        var ret = {};
        var del = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var v = obj[prop];
                log('has prop', prop, v);
                if (prop === 'parent')
                    ;
                else if (prop === 'tag' && v === 'title')
                    ret[prop] = '_title';
                else if (prop === 'tag' && v === 'style')
                    ret[prop] = '_style';
                else if (prop === 'tag' && v === 'ng-view')
                    ret[prop] = '_ng-view';
                else if (prop === 'tag' && v === 'div') {
                    if (obj.attribs.class) {
                        ret[prop] = '.';
                        ret['name'] = obj.attribs.class;
                        del.push('class');
                    } else {
                        ret[prop] = clone(obj[prop]);
                    }
                } else if (prop === 'tag' && v === 'script') {
                    if (obj.attribs.src) {
                        ret[prop] = 'js';
                        ret['name'] = obj.attribs.src;
                        del.push('src');
                        del.push('type');
                    } else {
                        ret[prop] = clone(obj[prop]);
                    }
                } else if (prop === 'tag' && v === 'link') {
                    if (obj.attribs.rel === 'stylesheet') {
                        ret[prop] = 'css';
                        ret['name'] = obj.attribs.href;
                        del.push('rel');
                        del.push('href');
                        del.push('type');
                    } else {
                        ret[prop] = clone(obj[prop]);
                    }
                } else 
                    ret[prop] = clone(obj[prop]);
            }
        }
        del.forEach(function (item) {
            if (ret['attribs'][item]) delete ret['attribs'][item];
        });
        log('clone ret', ret);
        return ret;
    }
    else
        return obj;
        */
}

module.exports = function (ast) {
    return transform(ast);
};

