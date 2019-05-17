/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-2\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 15:59:33 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var wfpackageWizziModel = require('../../models/wfpackage-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.wfpackage.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var wfpackagemodelType = wfpackageWizziModel[rootNode.n];
    if (!wfpackagemodelType) {
        var maptag = wfpackageWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            wfpackagemodelType = wfpackageWizziModel[maptag];
        }
        if (!wfpackagemodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + wfpackage, filepath: ' + filepath);
        }
    }
    var wfpackagemodel = new wfpackagemodelType(rootNode.v);
    wfpackagemodel.loadContext = ittfModel.loadContext;
    try {
        wfpackagemodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for wfpackage model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new wfpackageWizziModel.wfpackageContext();
    wfpackagemodel.wzInitialize(ctx);
    wfpackagemodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.wfpackage.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.wfpackage.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.wfpackage.ittf.dump.prettify.html');
    if (wfpackagemodel.toJson) {
        // Export to json for test
        // console.log('wfpackagemodel.toJson', util.inspect(wfpackagemodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(wfpackagemodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(wfpackagemodel, null, 2)
        );
    }
});

