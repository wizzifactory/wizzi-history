var md = module.exports = {};
var myname = 'form.util';
md.datatypeFromKind = function (kind, model) {
    if (['text', 'color'].indexOf(kind) >= 0) {
        return 'string';
    } else if (kind === 'date') {
        return 'date';
    } else if (kind === 'number') {
        return 'int';
    } else if (kind === 'checkbox') {
        return 'boolean';
    }
    return 'string';
}
md.objectify = function (type, value, model) {
    if (type === 'string') {
        return value;
    } else if (type === 'boolean') {
        return value === 'true' ? true : false;
    } else if (type === 'int') {
        return parseInt(value, 10);
    } else if (type === 'date') {
        return md.parseDate(value, model.format);
    } else {
        return value;
    }
}
md.parseDate = function(input, format) {
    var d, parts = input.split('/');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    if (format === 'GMA')
        d = new Date(parts[2], parts[1] - 1, parts[0]);
    else
        d = new Date(parts[2], parts[0] - 1, parts[1]);
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    return d.getFullYear() + "-" + (month) + "-" + (day);
}
