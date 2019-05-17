/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\mui\controltypes.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
import React, { Component, PropTypes } from 'react';
function Input(type) {
    return ({ id, value, onChange }) => {
            return  (
                    <input id={id} type={type} value={value} onChange={(e) => {
                        onChange(e.target.value);
                    }}>
                    </input>
                )
            ;
        };
}
function Select() {
    return ({ id, value, data, onChange }) => {
            const { options } = data;
            const nroptions = normalizeOptions(options, value);
            var optionTags = nroptions.map((o, i) => {
                return  (
                        <option key={o.key} value={o.value}>
                        {o.text}
                        </option>
                    )
                ;
            })
            ;
            // log 'select', id, value, data, options, nroptions, optionTags
            return  (
                    <select id={id} value={value} onChange={(e) => {
                        onChange(e.target.value);
                    }}>
                    {optionTags}
                    </select>
                )
            ;
        };
}
function normalizeOptions(options, value) {
    var j = 0;
    if (!options) {
        return [];
    }
    return options.map((o, i) => {
            if (o != null && typeof o === 'object' && Array.isArray(o) === false) {
                return {
                        key: 'k' + (++j), 
                        value: getValue(o), 
                        text: getText(o), 
                        selected: getValue(o) === value
                    };
            }
            else {
                return {
                        key: 'k' + (++j), 
                        value: o, 
                        text: o, 
                        selected: o === value
                    };
            }
        })
    ;
}
function getValue(o) {
    if (o.val) {
        return o.val;
    }
    else if (o.id) {
        return o.id;
    }
    else if (o.key) {
        return o.key;
    }
    return o.value;
}
function getText(o) {
    if (o.label) {
        return o.label;
    }
    else if (o.name) {
        return o.name;
    }
    else if (o.key) {
        return o.key;
    }
    return o.text;
}
function Range() {
    return ({ id, value, min, max, step, onChange }) => {
            return  (
                    <input id={id} type="range" value={value} min={min} max={max} step={step} onChange={(e) => {
                        onChange(e.target.value);
                    }}>
                    </input>
                )
            ;
        };
}

module.exports = {
    Input: Input,
    Select: Select,
    Range: Range
};
