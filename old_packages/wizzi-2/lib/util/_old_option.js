'use strict';
// The actual option data.
var data = {};
// Get or set an option value.
var option = module.exports = function (key, value) {
    var no = key.match(/^no-(.+)$/);
    if (arguments.length === 2) {
        return (data[key] = value);
    } else if (no) {
        return data[no[1]] === false;
    } else {
        return data[key];
    }
};
// Initialize option data.
option.init = function (obj) {
    return (data = obj || {});
};