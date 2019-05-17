/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\simpleform.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
const SimpleForm = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting
    } = props;
    return  (
            <form onSubmit={handleSubmit}>
                <Field name="firstName" label="First Name" component={renderField} type="text">
                </Field>
            
                <Field name="lastName" label="Last Name" component={renderField} type="text">
                </Field>
            
                <Field name="email" label="Email" component={renderField} type="email">
                </Field>
            
                <div>
                    <label>
                    Sex
                    </label>
                
                    <div>
                        <Field name="sex" label="Male" value="male" type="radio" component={renderField}>
                        </Field>
                    
                        <Field name="sex" label="Female" value="female" type="radio" component={renderField}>
                        </Field>
                    
                    </div>
                
                </div>
            
                <Field name="favoriteColor" id="favoriteColor" label="Favorite Color" type="select" component={renderField}>
                    <option>
                    </option>
                
                    <option value="ff0000">
                    Red
                    </option>
                
                    <option value="00ff00">
                    Green
                    </option>
                
                    <option value="0000ff">
                    Blue
                    </option>
                
                </Field>
            
                <Field name="employed" label="Employed" component={renderField} type="checkbox">
                </Field>
            
                <Field name="notes" id="notes" label="Notes" value type="textarea" component={renderField}>
                </Field>
            
            bla bla
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

SimpleForm.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool
}

export default reduxForm({
    form: 'SimpleForm'
})(SimpleForm)

;
