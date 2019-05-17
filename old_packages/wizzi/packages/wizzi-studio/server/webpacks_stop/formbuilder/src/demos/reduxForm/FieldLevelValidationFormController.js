/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\fieldlevelvalidationformcontroller.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import FieldLevelValidationForm from './FieldLevelValidationForm';
const styleSheet = createStyleSheet('FieldLevelValidationFormController', theme => (
    {}));

class FieldLevelValidationFormController extends React.Component  {
    showResults = (values) => {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
    render() {
        return  (
                <div style={{
                    padding: 15
                }}>
                    <h2>
                    Field level validation form
                    </h2>
                
                    <FieldLevelValidationForm onSubmit={this.showResults}>
                    </FieldLevelValidationForm>
                
                </div>
            )
        ;
    }
}

const FieldLevelValidationFormControllerStyled = withStyles(styleSheet)(FieldLevelValidationFormController)

;
export default FieldLevelValidationFormControllerStyled;
