/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\html.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

import React, { Component, PropTypes } from 'react';
const StyledElement = ({ meta, styles }) => {
    // log "meta", meta
    var children = [];
    if (meta.text && meta.text.length > 0) {
        children.push(meta.text);
    }
    if (meta.children && meta.children.length > 0) {
        var i, i_len=meta.children.length, metaChild;
        for (i=0; i<i_len; i++) {
            metaChild = meta.children[i];
            children.push(React.createElement(StyledElement, {
                meta: metaChild, 
                styles: styles, 
                key: "k" + i
            })
            );
        }
    }
    var modStyles = {};
    if (styles) {
        for (var k in styles) {
            if (k === meta.id) {
                for (var z in styles[k]) {
                    modStyles[z] = styles[k][z];
                }
            }
        }
    }
    const htmlProps = meta.htmlProps || {};
    return React.createElement(meta.tag, {
            ...htmlProps, 
            style: {
                ...modStyles
            }
        }, children)
    ;
};

StyledElement.propTypes = {
    meta: PropTypes.object.isRequired, 
    styles: PropTypes.object.isRequired
};
const StyledHtml = () => {
};

module.exports = {
    StyledElement: StyledElement,
    StyledHtml: StyledHtml
};
