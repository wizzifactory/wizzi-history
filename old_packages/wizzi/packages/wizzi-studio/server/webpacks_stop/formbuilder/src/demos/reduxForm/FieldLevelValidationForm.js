/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\fieldlevelvalidationform.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
const required = value => value ? undefined : 'Required';
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>  value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined;
const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined;
const FieldLevelValidationForm = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting
    } = props;
    return  (
            <form onSubmit={handleSubmit} validate={[email]}>
                <Field name="username" label="Username" component={renderField} type="text" validate={[required, maxLength15]}>
                </Field>
            
                <Field name="email" label="Email" component={renderField} type="email">
                </Field>
            
                <Field name="age" label="Age" component={renderField} type="number" validate={[tooOld]}>
                </Field>
            
                <div>
                    <button type="submit" disabled={pristine || submitting}>
                    Submit
                    </button>
                
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                    </button>
                
                </div>
            
            </form>
        )
    ;
}

FieldLevelValidationForm.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool
}

export default reduxForm({
    form: 'FieldLevelValidationForm'
})(FieldLevelValidationForm)

;
