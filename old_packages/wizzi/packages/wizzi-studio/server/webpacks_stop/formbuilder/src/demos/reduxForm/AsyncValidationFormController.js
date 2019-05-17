/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\asyncvalidationformcontroller.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AsyncValidationForm from './AsyncValidationForm';
const styleSheet = createStyleSheet('AsyncValidationFormController', theme => (
    {}));

class AsyncValidationFormController extends React.Component  {
    showResults = (values) => {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
    render() {
        return  (
                <div style={{
                    padding: 15
                }}>
                    <h2>
                    Async validation form
                    </h2>
                
                    <ul>
                        <li>
                        Usernames that will fail validation (already taken):
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
                        Every password is ok
                        </li>
                    
                    </ul>
                
                    <AsyncValidationForm onSubmit={this.showResults}>
                    </AsyncValidationForm>
                
                </div>
            )
        ;
    }
}

const AsyncValidationFormControllerStyled = withStyles(styleSheet)(AsyncValidationFormController)

;
export default AsyncValidationFormControllerStyled;
