var verify = require('../util/verify');
module.exports = function (userdefaults, genoptions) {
    // console.log('genoptions', genoptions);
    // hardcoded
    var options = {
        isDebug: false,
        CRLF: '\n',
        indentSpaces: 4,
        dotgExtensionPrefix: false  // generated file hello.js becomes hello.g.js
    };
    // user defaults
    if (verify.isObject(userdefaults)) {
        for (key in userdefaults) {
            options[key] = userdefaults[key];
        }
    }
    // single generation options
    if (verify.isObject(genoptions)) {
        for (key in genoptions) {
            options[key] = genoptions[key];
        }
    }
    return options;
}
