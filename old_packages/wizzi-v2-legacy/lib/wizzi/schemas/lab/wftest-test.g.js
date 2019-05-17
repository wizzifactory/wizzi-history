/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 18:43:43 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var wftestWizziModel = require('../../models/wftest-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.wftest.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var wftestmodelType = wftestWizziModel[rootNode.n];
    if (!wftestmodelType) {
        var maptag = wftestWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            wftestmodelType = wftestWizziModel[maptag];
        }
        if (!wftestmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + wftest, filepath: ' + filepath);
        }
    }
    var wftestmodel = new wftestmodelType(rootNode.v);
    wftestmodel.loadContext = ittfModel.loadContext;
    try {
        wftestmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for wftest model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new wftestWizziModel.wftestContext();
    wftestmodel.wzInitialize(ctx);
    wftestmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.wftest.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.wftest.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.wftest.ittf.dump.prettify.html');
    if (wftestmodel.toJson) {
        // Export to json for test
        // console.log('wftestmodel.toJson', util.inspect(wftestmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(wftestmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(wftestmodel, null, 2)
        );
    }
});

