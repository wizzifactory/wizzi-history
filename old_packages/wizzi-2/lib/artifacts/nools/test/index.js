var path = require("path");
var glob = require("glob");
var wizzi = require("wizzi-core").wizzi;
var wizziPackage = require('../../../../index');
glob(__dirname + "/in/*.nools.ittf", {}, function (er, files) {
    files.forEach(function (item) {
        wizziPackage.noolsFlowDsl(item, {}, function (err, result) {
            if (err) { return console.log(err); }
            var basePath = wizzi.verify.replaceAll(__dirname, '\\', '/');
            console.log(basePath);
            console.log(item);
            var outfile = wizzi.verify.replaceAll(item, basePath, '');
            var outPath = __dirname + '/out/' + outfile.substr(0, item.length - 5) + '.nools';
            wizzi.file.write(outPath, result);
        });
    });
})
