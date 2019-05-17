/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\packages\wizzi-lab-spa\node_modules\wizzi\lib\artifacts\wizzischema\test\gen\ittf\wizzischema-test.js.ittf
    utc time: Tue, 11 Jul 2017 19:51:57 GMT
*/
'use strict';
var util = require('util');
var path = require('path');

var wizzi = require('wizzi-core').wizzi;

var stringify = require('json-stringify-safe');
var file = wizzi.file;
var ittf = wizzi.ittf;
var siteWizziModel = require('../../models/site-model.g');
var ittfContext = {
    s1: 'alpha', 
    s2: 'beta', 
    a1: ['gamma 1', 'gamma 2', 'gamma 3'], 
    a2: ['omega 10', 'omega 20', 'omega 30']
};
var filepath = path.join(__dirname, 'ittf', 'test.site.ittf');
ittf.loadModel(filepath, ittfContext, function(err,ittfModel) {
    if (err) {
        throw new Error(err);
    }
    var rootNode = ittfModel.nodes[0];
    var sitemodelType = siteWizziModel[rootNode.n];
    if (!sitemodelType) {
        var maptag = siteWizziModel.__tagElementMapping[rootNode.n];
        if (typeof maptag === 'string') {
            sitemodelType = siteWizziModel[maptag];
        }
        if (!sitemodelType) {
            throw new Error('Cannot map root node ' + rootNode.n + ' to any entity of schema + site, filepath: ' + filepath);
        }
    }
    var sitemodel = new sitemodelType(rootNode.v);
    sitemodel.loadContext = ittfModel.loadContext;
    try {
        sitemodel.loadFromNode(rootNode);
    } catch (ex) {
        throw new Error('Error loading wmt model for site model ' + filepath + '.\n' + ex.message + '\n' + ex.stack);
    }
    var ctx = new siteWizziModel.siteContext();
    sitemodel.wzInitialize(ctx);
    sitemodel.wzVerify(ctx);
    var filepathdump = path.join(__dirname, 'ittf', 'test.site.ittf.dump.json');
    var filepathdumpxml = path.join(__dirname, 'ittf', 'test.site.ittf.dump.xml');
    var filepathdumpprettify = path.join(__dirname, 'ittf', 'test.site.ittf.dump.prettify.html');
    if (sitemodel.toJson) {
        // Export to json for test
        // console.log('sitemodel.toJson', util.inspect(sitemodel.toJson(), { depth: null }));
        file.write(filepathdump, stringify(sitemodel.toJson(), null, 2)
        );
    }
    else {
        // Dump moduel using json-stringify-safe
        file.write(filepathdump, stringify(sitemodel, null, 2)
        );
    }
});

