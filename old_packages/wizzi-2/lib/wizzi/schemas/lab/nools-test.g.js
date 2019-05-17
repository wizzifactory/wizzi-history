/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-2\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 15:59:29 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var noolsWizziModel = require('../../models/nools-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.nools.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var noolsmodelType = noolsWizziModel[rootNode.n];
    if (!noolsmodelType) {
        var maptag = noolsWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            noolsmodelType = noolsWizziModel[maptag];
        }
        if (!noolsmodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + nools, filepath: ' + filepath);
        }
    }
    var noolsmodel = new noolsmodelType(rootNode.v);
    noolsmodel.loadContext = ittfModel.loadContext;
    try {
        noolsmodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for nools model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new noolsWizziModel.noolsContext();
    noolsmodel.wzInitialize(ctx);
    noolsmodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.nools.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.nools.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.nools.ittf.dump.prettify.html');
    if (noolsmodel.toJson) {
        // Export to json for test
        // console.log('noolsmodel.toJson', util.inspect(noolsmodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(noolsmodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(noolsmodel, null, 2)
        );
    }
});

