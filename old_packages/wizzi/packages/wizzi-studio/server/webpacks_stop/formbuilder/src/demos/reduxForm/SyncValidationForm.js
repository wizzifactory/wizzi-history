/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\syncvalidationform.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.age) {
        errors.age = 'Required';
    }
    else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number';
    }
    else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old';
    }
    return errors;
};
const SyncValidationForm = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting
    } = props;
    return  (
            <form onSubmit={handleSubmit}>
                <Field name="username" label="Username" component={renderField} type="text">
                </Field>
            
                <Field name="email" label="Email" component={renderField} type="email">
                </Field>
            
                <Field name="age" label="Age" component={renderField} type="number">
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

SyncValidationForm.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool
}

export default reduxForm({
    form: 'SyncValidationForm', 
    validate: validate
})(SyncValidationForm)

;
