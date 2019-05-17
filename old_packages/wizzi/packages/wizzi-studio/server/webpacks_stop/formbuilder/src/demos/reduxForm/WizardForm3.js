/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\wizardform3.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
import WizardFormValidate from './WizardFormValidate';
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
const WizardForm3 = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        previousPage
    } = props;
    return  (
            <form onSubmit={handleSubmit}>
                <Field name="favoriteColor" id="favoriteColor" label="Favorite Color" type="select" component={renderField} options={colors} emptyOption={'Select a color...'}>
                </Field>
            
                <Field name="employed" label="Employed" component={renderField} type="checkbox">
                </Field>
            
                <Field name="notes" id="notes" label="Notes" value="bla bla" type="textarea" component={renderField}>
                </Field>
            
                <div>
                    <button type="button" className="previous" onClick={previousPage}>
                    </button>
                
                    <button type="submit" className="next">
                    Submit
                    </button>
                
                </div>
            
            </form>
        )
    ;
}

WizardForm3.propTypes = {
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
})(WizardForm3)

;
