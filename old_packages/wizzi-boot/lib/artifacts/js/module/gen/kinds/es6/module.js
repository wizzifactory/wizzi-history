// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:39 GMT
'use strict';
var md = module.exports = {};
var myname = 'js.module.es2015.module';
md.gen = function(model,ctx) {
    var hasClasses = model.wzModelState.hasClasses,
        ecma = model.ecma;
    if (ecma === 'es5' && hasClasses) {
        ctx.w('// generated by ' + myname);
        ctx.w("function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }");
        ctx.w("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }");
        ctx.w("var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };");
        ctx.w();
    }
};