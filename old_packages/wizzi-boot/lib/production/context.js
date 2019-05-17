var path = require('path');
var util = require('util');
var file = require('../util/file');
var fail = require('../util/fail');
// ProductionContext class
ProductionContext = function () {
    this.dump = true;
    this.ittfDocuments = {};
    this.ittfEvaluationScripts = {};
    this.ittfModels = {};
    this.wizziModels = {};
    this.artifacts = [];
}
ProductionContext.prototype.addIttfDocument = function (uri, content) {
    if (this.ittfDocuments[uri]) {
        this.ittfDocuments[uri].cacheCount++;
    }
    else {
        this.ittfDocuments[uri] = {
            uri: uri,
            content: content,
            cacheCount: 0
        };
    }
}
ProductionContext.prototype.addIttfModelBuildUpScript = function (uri, ittfEvalScript) {
    this.ittfEvaluationScripts[uri] = {
        uri: uri,
        ittfEvalScript: ittfEvalScript
    };
    if (this.dump) {
        file.write(
            path.join(path.dirname(uri), '_debug', path.basename(uri) + '.js.dump'),
            ittfEvalScript.toCode()
            );
    }
}
ProductionContext.prototype.addMixedIttfModel = function (uri, ittfModel) {
    /* TODO
    this.mixedIttfModels[uri] = {
        uri: uri,
        ittfModel: ittfModel
    }; */
    if (this.dump) {
        file.write(
            path.join(path.dirname(uri), '_debug', path.basename(uri) + '.mixed.ittfModel.dump'),
            ittfModel.dump()
            );
    }
}
ProductionContext.prototype.addEvaluatedIttfModel = function (uri, ittfModel) {
    /* TODO
    this.evaluatedIttfModels[uri] = {
        uri: uri,
        ittfModel: ittfModel
    }; */
    if (this.dump) {
        file.write(
            path.join(path.dirname(uri), '_debug', path.basename(uri) + '.evaluated.ittfModel.dump'),
            ittfModel.dump(true)
            );
    }
}
ProductionContext.prototype.addIttfModel = function (uri, loadContext) {
    this.ittfModels[uri] = {
        uri: uri,
        loadContext: loadContext
    };
}
ProductionContext.prototype.addWizziModel = function (uri, wizziModel) {
    this.wizziModels[uri] = {
        uri: uri,
        wizziModel: wizziModel
    };
}
ProductionContext.prototype.addArtifact = function (artifact) {
    this.artifacts.push(artifact);
}
ProductionContext.prototype.raiseIttfEvaluationScriptError = function (uri, exception) {
    var script = this.ittfEvaluationScripts[uri];
    if (script && script.ittfEvalScript && exception && exception.lineNumber) {
        var lines = script.ittfEvalScript.getErrorLines(exception).join('\n');
        exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
    }
    else {
        exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
    }
    fail.warn(exception);
    // In case of --force proceed inside the try/catch flow
    throw exception;
}
ProductionContext.prototype.raiseError = function () {
}
module.exports = ProductionContext;
