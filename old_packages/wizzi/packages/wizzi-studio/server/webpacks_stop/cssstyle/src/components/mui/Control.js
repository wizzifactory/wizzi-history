/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\mui\control.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import { Input, Select, Range } from './controlTypes';
import { Row, Col } from './grid';
class Control extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value) {
        const { id, onChangeValue } = this.props;
        if (onChangeValue) {
            console.log('Control.handleChange', id, value);
            onChangeValue(id, value, this.origValue);
        }
    }
    render() {
        const { id, label, type, value, layout, data } = this.props;
        const { onChange } = this.props;
        const ControlComponent = createComponent(type);
        return  (
                <Row>
                    <Col span={4}>
                    {label || id}
                    </Col>
                
                    <Col span={8}>
                        <ControlComponent id={id} value={value} data={data} onChange={this.handleChange}>
                        </ControlComponent>
                    
                    </Col>
                
                </Row>
            )
        ;
    }
}
function createComponent(type) {
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
        ret = Input('text');
    }
    // log 'createComponent.ret', ret
    return ret;
}
Control.propTypes = {
    id: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    onChangeValue: PropTypes.func.isRequired
};
export default Control;
