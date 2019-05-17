/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\mui\form.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import buildFormControls from './utils/buildFormControls';
const styleSheet = createStyleSheet('Form', theme => (
    {}));

class Form extends React.Component  {
    state = {
        values: {}
    };
    updateValue(controlId,value) {
        const values = this.state.values;
        if (values[controlId] === value) {
            return null;
        }
        values[controlId] = value;
        this.setState({
            ...this.state, 
            values: values
        });
        return values;
    }
    componentWillMount() {
        const {
            meta
        } = this.props;
        var result = buildFormControls(meta, this.handleOnChange)
        ;
        this.setState({
            ...this.state, 
            values: result.originalValues, 
            controls: result.controls
        });
    }
    handleOnChange = (controlId, value, origValue) => {
        var newValues = this.updateValue(controlId, value)
        ;
        if (newValues) {
            const { id, onChangeValues } = this.props;
            if (onChangeValues) {
                onChangeValues(id, newValues);
            }
        }
    }
    render() {
        const {
            id,
            type,
            caption,
            values,
            layout,
            meta
        } = this.props;
        const {controls} = this.state;
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

Form.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    caption: PropTypes.string,
    values: PropTypes.object,
    layout: PropTypes.object,
    meta: PropTypes.object,
    onChangeValues: PropTypes.func
}

const FormStyled = withStyles(styleSheet)(Form)

;
export default FormStyled;
