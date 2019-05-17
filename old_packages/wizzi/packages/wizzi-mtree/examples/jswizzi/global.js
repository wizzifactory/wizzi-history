/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\examples\jswizzi\global.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var file = require('../../tests/util/file');
var mocks = require('../../tests/loader/mocks/misc');
var mTreeLoader = require('../../tests/loader/mocks/mTreeLoader');
module.exports = function() {
    var store,
        evaluatedModel;
    console.log(1);
    store = new mocks.IttfDocumentStore();
    console.log(2);
    store.init({
        storeKind: 'filesystem'
    }, function(err, notUsed) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log(3);
        var ittfPath = path.join(__dirname, 'ittf', 'global.tests.ittf');
        console.log(4);
        mTreeLoader(store, ittfPath, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log(5, result);
            evaluatedModel = result;
            var result = util.inspect(evaluatedModel, {
                depth: null
            });
            console.log('$global result', result);
            file.write(path.join(__dirname, 'outputs', 'global.tests.ittf'), evaluatedModel.toIttf());
        });
    });
};
