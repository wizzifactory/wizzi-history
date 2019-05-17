/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\fieldarrayform.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderField from './renderField';
import { FieldArray } from 'redux-form';
const validate = (values) => {
    const errors = {};
    if (!values.clubName) {
        errors.clubName = 'Required';
    }
    if (!values.members || !values.members.length) {
        errors.members = { _error: 'At least one member must be entered' };
    }
    else {
        const membersArrayErrors = [];
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.firstName) {
                memberErrors.firstName = 'Required';
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.lastName) {
                memberErrors.lastName = 'Required';
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (member && member.hobbies && member.hobbies.length) {
                const hobbyArrayErrors = [];
                member.hobbies.forEach((hobby, hobbyIndex) => {
                    if (!hobby || !hobby.length) {
                        hobbyArrayErrors[hobbyIndex] = 'Required';
                    }
                });
                if (hobbyArrayErrors.length) {
                    memberErrors.hobbies = hobbyArrayErrors;
                    membersArrayErrors[memberIndex] = memberErrors;
                }
                if (member.hobbies.length > 5) {
                    if (!memberErrors.hobbies) {
                        memberErrors.hobbies = [];
                    }
                    memberErrors.hobbies._error = 'No more than five hobbies allowed';
                    membersArrayErrors[memberIndex] = memberErrors;
                }
            }
        });
        if (membersArrayErrors.length) {
            errors.members = membersArrayErrors;
        }
    }
    return errors;
};
const renderHobbies = ({ fields, meta: { error } }) => {
    return  (
            <ul>
                <li>
                    <button type="button" onClick={() => {
                        fields.push();
                    }}>
                    Add Hobby
                    </button>
                
                </li>
            
            {
                fields.map((hobby, index) => {
                    return  (
                            <li key={index}>
                                <button type="button" title="Remove Hobby" onClick={() => {
                                    fields.remove(index);
                                }}>
                                </button>
                            
                                <Field name={hobby} label={`Hobby #${index + 1}`} component={renderField} type="text">
                                </Field>
                            
                            </li>
                        )
                    ;
                })
                
            }{
                error
                 &&  (
                    <li className="error">
                    {error}
                    </li>
                )
                
            }</ul>
        )
    ;
};
const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => {
    return  (
            <ul>
                <li>
                    <button type="button" onClick={() => {
                        fields.push({})
                    }}>
                    Add Member
                    </button>
                
                {
                    (touched || submitFailed) && error
                     &&  (
                        <span>
                        {error}
                        </span>
                    )
                    
                }</li>
            
            {
                fields.map((member, index) => {
                    return  (
                            <li key={index}>
                                <button type="button" title="Remove Member" onClick={() => {
                                    fields.remove(index);
                                }}>
                                </button>
                            
                                <h4>
                                Member #{index + 1}
                                </h4>
                            
                                <Field name={`${member}.firstName`} label="First Name" component={renderField} type="text">
                                </Field>
                            
                                <Field name={`${member}.lastName`} label="Last Name" component={renderField} type="text">
                                </Field>
                            
                                <FieldArray name={`${member}.hobbies`} component={renderHobbies}>
                                </FieldArray>
                            
                            </li>
                        )
                    ;
                })
                
            }</ul>
        )
    ;
};
const FieldArrayForm = (props) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting
    } = props;
    return  (
            <form onSubmit={handleSubmit}>
                <Field name="clubName" label="Club Name" component={renderField} type="text">
                </Field>
            
                <FieldArray name="members" component={renderMembers}>
                </FieldArray>
            
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

FieldArrayForm.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool
}

export default reduxForm({
    form: 'FieldArrayForm', 
    validate: validate
})(FieldArrayForm)

;
