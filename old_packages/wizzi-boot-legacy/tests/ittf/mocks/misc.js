// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:25 GMT
'use strict';
var path = require('path');
var wizzi = require('../../../lib/wizzi');
module.exports = {
    ProductionContext: {
        dump: true, 
        addIttfDocument: function(uri,content) {
        }, 
        ittfModelBuildUpScripts: {}, 
        addIttfModelBuildUpScript: function(primaryModel,jsScriptCoder) {
            var uri = primaryModel.uri;
            var script = jsScriptCoder.toCode();
            this.ittfModelBuildUpScripts[uri] = {
                uri: uri, 
                script: script
            };
            if (this.dump) {
                wizzi.file.write(path.join(path.dirname(uri), '_debug', path.basename(uri) + '.js.dump')
                , script);
            }
        }, 
        raiseIttfEvaluationScriptError: function(primaryModel,exception) {
            var uri = primaryModel.uri;
            var script = this.ittfModelBuildUpScripts[uri];
            if (script && script.ittfEvalScript && exception && exception.lineNumber) {
                var lines = script.ittfEvalScript.getErrorLines(exception).join('\n');
                exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
            }
            else {
                exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
            }
            // _ wizzi.fail.warn(exception)
            // In case of --force proceed inside the try/catch flow
            throw exception;
        }
    }
};
