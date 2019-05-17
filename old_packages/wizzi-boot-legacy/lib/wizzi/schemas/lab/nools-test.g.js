// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:49 GMT
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

