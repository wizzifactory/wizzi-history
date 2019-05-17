/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\reduxform\wizardform.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
// TODO $param-constraint pages 2..4
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WizardForm1 from './WizardForm1';
import WizardForm2 from './WizardForm2';
import WizardForm3 from './WizardForm3';
class WizardForm extends React.Component  {
    state = {
        page: 1
    };
    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
    }
    previousPage = () => {
        this.setState({
            page: this.state.page - 1
        })
    }
    render() {
        const {
            onSubmit
        } = this.props;
        const { page } = this.state;
        return  (
                <div>
                {
                    page === 1
                     &&  (
                        <WizardForm1 onSubmit={this.nextPage}>
                        </WizardForm1>
                    )
                    
                }{
                    page === 2
                     &&  (
                        <WizardForm2 previousPage={this.previousPage} onSubmit={this.nextPage}>
                        </WizardForm2>
                    )
                    
                }{
                    page === 3
                     &&  (
                        <WizardForm3 previousPage={this.previousPage} onSubmit={onSubmit}>
                        </WizardForm3>
                    )
                    
                }</div>
            )
        ;
    }
}

WizardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
export default WizardForm;
