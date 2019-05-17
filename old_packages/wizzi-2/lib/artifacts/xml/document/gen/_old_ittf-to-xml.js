var myname = 'ittf-to-xml';
module.exports = function (ittf) {
    return toxml(ittf);
}
function toxml(model) {
    var ret = {
        tag: model.name,
        attribs: [],
        elements: []
    };
    model.childs.forEach(function (item) {
        if (item.name === '@') {
            ret.attribs.push(toattr(item.value));
        } else {
            ret.elements.push(toxml(item));
        }
    });
    return ret;
}
function toattr(text) {
    var ret = {
        name: '',
        value: ''
    }, state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i]
        if (state == 0 && (ch == ' ' || ch == '\t'))
            ;
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if (state == 1 && (ch == ' ' || ch == '\t'))
            state = 2;
        else if (state == 1) {
            ret.name += ch;
        }
        else if (state == 2) {
            ret.value += ch;
        }
    }
    return ret;
}
