/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\mui\utils\createcontrolcomponent.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Input, Select, Range } from '../controlTypes';
export default function createControlComponent(type) {
    const inputTypes = [
        'checkbox', 
        'color', 
        'date', 
        'datetime', 
        'datetime-local', 
        'email', 
        'file', 
        'hidden', 
        'month', 
        'number', 
        'password', 
        'radio', 
        'range', 
        'search', 
        'tel', 
        'text', 
        'time', 
        'url', 
        'week'
    ];
    const inputButtons = [
        'button', 
        'reset', 
        'submit', 
        'image'
    ];
    var ret;
    if (inputTypes.indexOf(type) > -1) {
        ret = Input(type);
    }
    else if (type === 'select') {
        ret = Select();
    }
    else if (type === 'range') {
        ret = Range();
    }
    else {
        throw new Error('Control type not managed: ' + type);
    }
    // log 'createComponent.ret', ret
    return ret;
};
