/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\artifacts\xml\document\gen\ittf_to_xml.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
var myname = 'ittf_to_xml';
module.exports = function(ittf) {
    return toxml(ittf);
};
function toxml(model) {
    var ret = {
        tag: model.n, 
        attribs: [], 
        elements: []
    };
    var i, i_len=model.childs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.childs[i];
        if (item.n === '@') {
            ret.attribs.push(toattr(item.v)
            );
        }
        else {
            ret.elements.push(toxml(item));
        }
    }
    return ret;
}

function toattr(text) {
    var ret = {
        name: '', 
        value: ''
    },
        state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (state == 0 && (ch == ' ' || ch == '\t')) {
            ;
        }
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if (state == 1 && (ch == ' ' || ch == '\t')) {
            state = 2;
        }
        else if (state == 1) {
            ret.name += ch;
        }
        else if (state == 2) {
            ret.value += ch;
        }
    }
    return ret;
}

