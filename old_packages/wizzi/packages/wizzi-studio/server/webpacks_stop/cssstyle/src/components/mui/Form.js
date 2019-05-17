/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\mui\form.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import Control from './Control';
class Form extends Component {
    constructor(props) {
        super(props);
        this.values = {};
        this.handleChangeValue = this.handleChangeValue.bind(this);
    }
    
    handleChangeValue(controlId,value,origValue) {
        this.values[controlId] = value;
        console.log('Form.handleChange', controlId, this.values);
        const { id, onChangeValues } = this.props;
        if (onChangeValues) {
            onChangeValues(id, this.values);
        }
    }
    createControls(meta,onChangeValue) {
        this.values = {};
        return meta.controls.map((c, i) => {
                const { id, type, data, value } = c;
                console.log('createControl', id, type, value);
                this.values[id] = value;
                return  (
                        <Control id={id} key={id} type={type} value={value} data={data} onChangeValue={onChangeValue}>
                        </Control>
                    )
                ;
            })
        ;
    }
    render() {
        const { id, type, caption, values, layout, meta } = this.props;
        const controls = this.createControls(meta, this.handleChangeValue);
        return  (
                <div className="form-vertical">
                    <h3>
                    {caption}
                    </h3>
                
                {controls}
                </div>
            )
        ;
    }
}
Form.propTypes = {};
export default Form;
