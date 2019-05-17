/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\mui\utils\buildformcontrols.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import Control from '../Control';
export default function buildFormControls(meta, handleOnChange) {
    var originalValues = {};
    var controls = meta.controls.map((c, i) => {
        const { id, type, data, value } = c;
        console.log('buildFormControls.createdControl', id, type, data, value);
        originalValues[id] = value;
        return  (
                <Control id={id} key={id} type={type} value={value} data={data} onChangeValue={handleOnChange}>
                </Control>
            )
        ;
    })
    ;
    return {
            originalValues: originalValues, 
            controls: controls
        };
};
