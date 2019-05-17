var errors = require('../errors');
var verify = require('../util/verify');
var log = require('../util/log')(module, { tofile: true });
var md = module.exports = {};
md.objectify = function (value, type, node, unquote) {
    if (value === '@@null') return null;
    if (value === '@@undefined') return undefined;
    var isTemplate = md.isTemplate(value);
    if (isTemplate) {
        return value;
    }
    if (type == null || typeof type === 'undefined' || type == 'string') {
        if (verify.isString(value)) {
            if (unquote)
                return verify.unquote(value); // calle from getArgValues
            else
                return value;
        }
        else return '';
    } else if (type == 'integer') {
        if (isNaN(value) == false) return parseInt(value, 10);
        else throw errors.NodeError('types.objectify. Cannot convert ' + value + ' to int', node);
    }
    else if (type == 'float') {
        if (isNaN(value) == false) return parseFloat(value);
        else throw errors.NodeError('types.objectify. Cannot convert ' + value + ' to float', node);
    }
    else if (type == 'boolean') {
        if (md.isBool(value)) return md.parseBool(value);
        else throw errors.NodeError('types.objectify. Cannot convert ' + value + ' to boolean', node);
    }
    else if (type == 'date') {
        if (md.isDate(value)) return md.parseDate(value);
        else throw errors.NodeError('types.objectify. Cannot convert ' + value + ' to date', node);
    }
    var msg = 'Invalid type name, expected (string, int, float, boolean, date) got ' + type;
    throw errors.NodeError(msg, node);
}
md.isTemplate = function (obj) {
    if (md.isString(obj) === false) return false;
    return obj.substr(0,2) === '${' && obj.substr(-1,1) === '}';
}
md.isDefined = function (obj) {
    return !(typeof obj === 'undefined');
}
md.isObject = function (obj) {
    return obj !== null && typeof obj === 'object';
}
md.isString = function (obj) {
    return obj !== null && typeof obj === 'string';
}
md.isBool = function (obj) {
    if (md.isString(obj)) return obj === 'true' || obj === 'false';
    return typeof obj === "boolean";
}
md.isDate = function (obj) {
    var parts = input.split('/');
    return parts.length == 3;
}
md.parseBool = function (obj) {
    return obj === 'true' ? true : false;
}
md.parseDate = function (obj) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
}
