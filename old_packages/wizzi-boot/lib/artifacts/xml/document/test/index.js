var glob = require("glob");
var file = require("wizzi-core").file;
var artifacts = require("wizzi-lab-artifacts");
glob("in/*.xml.ittf", {}, function (er, files) {
    files.forEach(function (item) {
        var outPath = 'out/' + item + '.xml';
        artifacts.xmlDocument(item, {}, function (err, result) {
            if (err) { console.log(err); return; }
            file.write(outPath, result);
        });
    });
})
