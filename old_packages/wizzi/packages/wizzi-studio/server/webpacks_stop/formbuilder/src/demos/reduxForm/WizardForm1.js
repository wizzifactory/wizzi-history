/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\wizardform1.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
import WizardFormValidate from './WizardFormValidate';
const WizardForm1 = (props) => {
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
            
                <div>
                    <button type="submit" className="next">
                    Next
                    </button>
                
                </div>
            
            </form>
        )
    ;
}

WizardForm1.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool
}

export default reduxForm({
    form: 'wizard', 
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
    validate: WizardFormValidate
})(WizardForm1)

;
