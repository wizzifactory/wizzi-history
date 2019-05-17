var htmlparser = require('../parser');

var input = "<html lang='en'>Hello <!-- bye comment -- --> '<a>' <!zz </html>"

var parser = new htmlparser.Parser({
    onopentag: function (tag) {
        log('onopentag', tag);
    },
    onclosetag: function (tagname) {
        log('onclosetag', tagname);
    },
    ontext: function (text) {
        log('ontext', text);
    },
    oncomment: function (text) {
        log('oncomment', text);
    },
});
parser.write(input);
parser.end();