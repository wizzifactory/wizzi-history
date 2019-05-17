// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:48:49 GMT
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

