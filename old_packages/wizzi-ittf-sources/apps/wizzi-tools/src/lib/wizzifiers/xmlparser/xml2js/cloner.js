var verify = require('../../../util/verify');

function clone(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var ret = [];
        for (var i = 0; i < obj.length; i++) {
            var value = clone(obj[i]);
            if (value !== null) {
                ret.push(value);
            }
        }
        return ret;
    }
    else if (typeof (obj) == "object") {
        var ret = {};
        for (var prop in obj)
            if (obj.hasOwnProperty(prop)) {
                //var v = obj[prop];
                ////if (prop === 'parent')
                ////    ;
                ////else if (prop === 'tag' && v === 'title')
                ////    ret[prop] = '_title';
                ////else if (prop === 'tag' && v === 'style')
                ////    ret[prop] = '_style';
                ////else
                    ret[prop] = clone(obj[prop]);
            }
        return ret;
    }
    else
        return obj;
}

module.exports = function (ast) {
    return ast; // Not implemented
    //return clone(ast);
};

