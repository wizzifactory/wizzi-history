/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-2\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 15:59:34 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var wizzischemaWizziModel = require('../../models/wizzischema-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.wizzischema.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var wizzischemamodelType = wizzischemaWizziModel[rootNode.n];
    if (!wizzischemamodelType) {
        var maptag = wizzischemaWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            wizzischemamodelType = wizzischemaWizziModel[maptag];
        }
        if (!wizzischemamodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + wizzischema, filepath: ' + filepath);
        }
    }
    var wizzischemamodel = new wizzischemamodelType(rootNode.v);
    wizzischemamodel.loadContext = ittfModel.loadContext;
    try {
        wizzischemamodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for wizzischema model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new wizzischemaWizziModel.wizzischemaContext();
    wizzischemamodel.wzInitialize(ctx);
    wizzischemamodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.wizzischema.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.wizzischema.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.wizzischema.ittf.dump.prettify.html');
    if (wizzischemamodel.toJson) {
        // Export to json for test
        // console.log('wizzischemamodel.toJson', util.inspect(wizzischemamodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(wizzischemamodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(wizzischemamodel, null, 2)
        );
    }
});

