/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-meta\src\ittf\tests\mocks\index.js.ittf
*/
'use strict';

var loader = require('./basicloader');
var file = require('./basicloader/file');
var errors = require('./errors');

var md = module.exports = {};
md.genContext = require('./artifact/genContext');
md.basicLoader = loader;
md.file = file;
md.jsNode = require('./jsmodel/jsnode');
md.verify = require('./util/verify');
md.getFactoryWizziObject = function() {
    return {
            loadMTree: loader.loadMTree, 
            file: file, 
            verify: md.verify, 
            errors: errors
        };
};
md.getProductionManager = function() {
    return {
            wizziFactory: {}, 
            productionContext: createProductionContext(), 
            globalContext: function() {
            }
        };
};
function createProductionContext() {
    return {
            aclstat: {}, 
            ittfEvaluationScripts: {}, 
            setAclStat: function() {
            }, 
            addIttfDocument: function() {
            }, 
            addMTreeBuildUpScript: function(uri, ittfEvalScript) {
                this.ittfEvaluationScripts[uri] = {
                    uri: uri, 
                    ittfEvalScript: ittfEvalScript
                };
            }, 
            addMixedMTree: function() {
            }, 
            addEvaluatedMTree: function() {
            }, 
            addMTree: function() {
            }, 
            addWizziModel: function() {
            }, 
            addArtifact: function() {
            }, 
            raiseIttfEvaluationScriptError: function(uri, exception) {
                var script = this.ittfEvaluationScripts[uri];
                if (script && script.ittfEvalScript && exception && exception.lineNumber) {
                    var lines = script.ittfEvalScript.getErrorLines(exception).join('\n')
                    ;
                    exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
                }
                else {
                    exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
                }
                fail.warn(exception);
                throw exception;
            }
        };
}
