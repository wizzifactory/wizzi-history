/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\root\schemas.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

/**
     WizziModelTypes generation.
     Script for generating the WizziModelTypes
     of this WizziPackage.
*/

var util = require('util');
var path = require('path');
var schema = require('./schema');
var ProductionManager = require('./lib/production/manager');
var acl = require('./lib/acl');

var aclStat = new acl.AclStat('stefi', 'admin');
var pman = new ProductionManager({});
pman.aclStat(aclStat);
pman.globalContext({});

var packageName = 'wizzi';

var wizziSchemaFolder = path.join(__dirname, 'lib', 'wizzi', 'schemas');
var wizziSchemaLabFolder = path.join(__dirname, 'lib', 'wizzi', 'schemas', 'lab');
var wizziModelFolder = path.join(__dirname, 'lib', 'wizzi', 'models');

/**
     Launches the generation of the WizziModelTypes for a wizzischema of the this WizziPackage
*/
function generate(wizzischemaName) {
    var schemaIttfDocumentPath = path.join(wizziSchemaFolder, wizzischemaName + '.wizzischema.ittf');
    var modelPath = path.join(wizziModelFolder, wizzischemaName + '-model.g.js');
    var factoryPath = path.join(wizziModelFolder, wizzischemaName + '-factory.g.js');
    var labPath = path.join(wizziSchemaLabFolder, wizzischemaName + '-test.g.js');
    var jsondocsPath = path.join(wizziModelFolder, wizzischemaName + '-schema.g.json');
    var htmldocsPath = path.join(wizziModelFolder, wizzischemaName + '-schema.g.html');
    schema.executeWizziModelTypesGeneration(schemaIttfDocumentPath, modelPath, factoryPath, labPath, jsondocsPath, htmldocsPath, {
        __productionManager: pman
    }, function(err,result) {
        if (err) {
            throw new Error('Package: ' + packageName + '.WizziModelProduction error: ' + util.inspect(err, { depth: null }));
        }
    });
}


/**
     Expose the "execute" function
     containg the "generate" call to the "executeWizziModelTypesGeneration(wizzischema)" function
*/
var md = module.exports = {};
md.execute = function() {
    // In the root folder of every WizziPackage should be inserted an IttfDocument
    // for generating the WizziModelTypes of the package.
    // It should be named "schemas.js.ttf" and should contain the nodes:
    // > js/index/generate-schemas( < package-name > )
    // >     _ generate('<wizzischema 1>')
    // >     _ generate('<wizzischema 2>')
    // >     ...
    // >     _ generate('<wizzischema n>')
    // Those "_ generate(...)" nodes will replace this $hook
    generate('wizzischema');
    generate('wfjob');
    generate('npmpackage');
    generate('nools');
    generate('wfpackage');
    generate('wftest');
    generate('js');
    generate('html');
    generate('css');
};

// CLI execution
md.execute();
