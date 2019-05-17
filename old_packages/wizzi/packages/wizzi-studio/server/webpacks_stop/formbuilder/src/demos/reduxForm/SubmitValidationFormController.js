/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\submitvalidationformcontroller.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SubmitValidationForm from './SubmitValidationForm';
const styleSheet = createStyleSheet('SubmitValidationFormController', theme => (
    {}));

class SubmitValidationFormController extends React.Component  {
    showResults = (values) => {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
    render() {
        return  (
                <div style={{
                    padding: 15
                }}>
                    <h2>
                    Submit validation form
                    </h2>
                
                    <ul>
                        <li>
                        Usernames that will pass validation:
                        </li>
                    
                    {' '}
                        <code>
                        john
                        </code>
                    
                    ,
                    {' '}
                        <code>
                        paul
                        </code>
                    
                    ,
                    {' '}
                        <code>
                        george
                        </code>
                    
                    , or
                    {' '}
                        <code>
                        ringo
                        </code>
                    
                    .
                        <li>
                        Valid password for all users:
                            <code>
                            redux-form
                            </code>
                        
                        </li>
                    
                    </ul>
                
                    <SubmitValidationForm onSubmit={this.showResults}>
                    </SubmitValidationForm>
                
                </div>
            )
        ;
    }
}

const SubmitValidationFormControllerStyled = withStyles(styleSheet)(SubmitValidationFormController)

;
export default SubmitValidationFormControllerStyled;
