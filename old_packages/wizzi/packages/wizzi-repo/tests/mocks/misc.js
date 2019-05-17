/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-repo\src\ittf\tests\mocks\misc.js.ittf
*/
'use strict';
var path = require('path');
var file = require('wizzi-utils').file;
var IttfDocumentStore = require('../../lib/repo/ittfDocumentStore');
module.exports = {
    IttfDocumentStore: IttfDocumentStore, 
    ProductionManager: {
        productionContext: {
            aclstat: {}, 
            addIttfDocument: function(uri, content) {
            }, 
            addMixedIttfModel: function(uri, content) {
            }, 
            addEvaluatedIttfModel: function(uri, content) {
            }, 
            addIttfModelBuildUpScript: function(uri, jsScriptCoder) {
            }
        }
    }, 
    ProductionContext: {
        IttfDocumentStoreType: IttfDocumentStore, 
        dump: true, 
        addIttfDocument: function(uri, content) {
        }, 
        ittfModelBuildUpScripts: {}, 
        addIttfModelBuildUpScript: function(uri, jsScriptCoder) {
            var uri = uri;
            var script = jsScriptCoder.toCode();
            this.ittfModelBuildUpScripts[uri] = {
                uri: uri, 
                script: script
            };
            if (this.dump) {
                file.write(path.join(path.dirname(uri), '_debug', path.basename(uri) + '.js.dump'), script);
            }
        }, 
        raiseIttfEvaluationScriptError: function(uri, exception) {
            var uri = uri;
            var script = this.ittfModelBuildUpScripts[uri];
            if (script && script.ittfEvalScript && exception && exception.lineNumber) {
                var lines = script.ittfEvalScript.getErrorLines(exception).join('\n');
                exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
            }
            else {
                exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
            }
            // In case of --force proceed inside the try/catch flow
            throw exception;
        }
    }
};
