var u = require('./util');
var xclass;
var xclass_es6;
var xclass_react;
var method;
var html;
var md = module.exports = {};
md.load = function (cnt) {
    cnt.stm.xclass = function (model, ctx) {
        if (ctx.__jskind === 'react') {
            if (!xclass_react) {
                xclass_react = require('../kinds/react/class');
            }
            xclass_react.gen(model, ctx)
        } else if (ctx.__ecma === 'es6') {
            if (!xclass_es6) {
                xclass_es6 = require('../kinds/es6/class');
            }
            xclass_es6.gen(model, ctx)
        } else {
            if (!xclass) {
                xclass = require('../class');
            }
            new xclass.gen(model, ctx)
        }
    }
    cnt.stm.ctor = function (model, ctx) {
        ; // done by zclass
    }
    cnt.stm.method = function (model, ctx) {
        if (!method) method = require('../method');
        new method.gen(model, ctx);
    }
    cnt.stm.tohtml = function (model, ctx) {
        if (!html) html = require('../html');
        new html.gen(model, ctx);
    }
}
