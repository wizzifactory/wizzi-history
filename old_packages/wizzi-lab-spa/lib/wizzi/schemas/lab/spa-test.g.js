/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-lab-spa\node_modules\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 19:51:58 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var spaWizziModel = require('../../models/spa-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.spa.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var spamodelType = spaWizziModel[rootNode.n];
    if (!spamodelType) {
        var maptag = spaWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            spamodelType = spaWizziModel[maptag];
        }
        if (!spamodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + spa, filepath: ' + filepath);
        }
    }
    var spamodel = new spamodelType(rootNode.v);
    spamodel.loadContext = ittfModel.loadContext;
    try {
        spamodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for spa model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new spaWizziModel.spaContext();
    spamodel.wzInitialize(ctx);
    spamodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.spa.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.spa.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.spa.ittf.dump.prettify.html');
    if (spamodel.toJson) {
        // Export to json for test
        // console.log('spamodel.toJson', util.inspect(spamodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(spamodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(spamodel, null, 2)
        );
    }
});

