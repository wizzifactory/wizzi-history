/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\submitvalidationformsubmit.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import { SubmissionError } from 'redux-form';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function SubmitValidationFormSubmit(values) {
    return sleep(1000).then(() => {
            if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
                throw new SubmissionError({
                        username: 'User does not exist', 
                        _error: 'Login failed!'
                    });
            }
            else if (values.password !== 'redux-form') {
                throw new SubmissionError({
                        password: 'Wrong password', 
                        _error: 'Login failed!'
                    });
            }
            else {
                window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
            }
        })
        
    ;
}
export default SubmitValidationFormSubmit;
