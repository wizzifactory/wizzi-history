'use strict';
var util = require('util');
var path = require('path');
var storage = require('node-persist');
var wizzi = require('wizzi');
var file = wizzi.file;

var store, storeFolder = null;
module.exports = function (storeRelPath) {
    console.log('storeRelPath', storeRelPath);
    storeFolder = path.resolve(__dirname, storeRelPath);
    file.mkdir(storeFolder);
    store = storage.create({ dir: storeFolder });
    return {
        put: put,
        get: get
    }
};

function put(itemName, itemValue) {
    console.log('put', itemName);
    store.setItem(itemName, itemValue);
}

function get(itemName, callback) {
    console.log('get', itemName);
    var data = store.getItem(itemName);
    if (data) callback(null, data);
    else callback("not found");
}

