/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\wizardform2.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
import WizardFormValidate from './WizardFormValidate';
const renderError = ({ meta: { touched, error } }) => {
    return touched && error ?  (
                <span>
                {error}
                </span>
            )
         : false;
};
const WizardForm2 = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        previousPage
    } = props;
    return  (
            <form onSubmit={handleSubmit}>
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
                    
                        <Field name="sex" component={renderError}>
                        </Field>
                    
                    </div>
                
                </div>
            
                <div>
                    <button type="button" className="previous" onClick={previousPage}>
                    </button>
                
                    <button type="submit" className="next">
                    Next
                    </button>
                
                </div>
            
            </form>
        )
    ;
}

WizardForm2.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    previousPage: PropTypes.func
}

export default reduxForm({
    form: 'wizard', 
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
    validate: WizardFormValidate
})(WizardForm2)

;
