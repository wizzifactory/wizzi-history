var path = require('path');
var util = require('util');
var async = require('async');
var file = require('../util/file');
var log = require('../util/log')(module);
function logme() {
    if (false) console.log.apply(console, arguments);
}
var ArtifactPersister = function (artifactInfo) {
    this.artifactInfo = artifactInfo;
    log.setLevel(artifactInfo.___state.pman.options.verbose);
}
ArtifactPersister.prototype.toFile = function (callback) {
    async.map(this.artifactInfo.getItemsToPersistToFile(), AsyncArtifactFilePersister.persist, function (err, result) {
        if (err) return callback(err, null);
        callback(null, null);
    });
}
ArtifactPersister.prototype.toTest = function () {
    var ret = [];
    var items = this.artifactInfo.getItemsToPersistToFile();
    items.forEach(function (item) {
        ret.push({
            filepath: item.filepath,
            content: item.genWriter.getContent()
        });
    });
    return ret;
}
var AsyncArtifactFilePersister = {
    persist: function (genInfo, callback) {
        logme('AsyncArtifactFilePersister.persist', genInfo.filepath, genInfo.genWriter.getContent());
        file.openWrite(genInfo.filepath, function (err, stream) {
            if (err) return callback(err, null);
            genInfo.genWriter.toStream(stream);
            stream.end();
            log.warn('Written to file: ' + genInfo.filepath);
            callback(null, null);
        });
    }
}
module.exports = ArtifactPersister;
