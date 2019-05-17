/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\demos\sampleform.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Form from '../components/mui/Form';
import Control from '../components/mui/Control';
const metaForm = {
    controls: [
        {
            id: "float", 
            type: "select", 
            defaultValue: "right", 
            data: {
                options: [
                    'left', 
                    'right'
                ]
            }
        }, 
        {
            id: "checkbox", 
            type: "checkbox", 
            defaultValue: "false"
        }, 
        {
            id: "color", 
            type: "color", 
            defaultValue: "red"
        }, 
        {
            id: "data", 
            type: "date", 
            defaultValue: "10/3/1957"
        }, 
        {
            id: "datetime", 
            type: "datetime", 
            defaultValue: "10/3/1957"
        }, 
        {
            id: "datetimeLocal", 
            type: "datetime-local", 
            defaultValue: "10/3/1957"
        }, 
        {
            id: "email", 
            type: "email", 
            defaultValue: "sb@gmail.com"
        }, 
        {
            id: "file", 
            type: "file"
        }, 
        {
            id: "hidden", 
            type: "hidden", 
            defaultValue: "30"
        }, 
        {
            id: "month", 
            type: "month", 
            defaultValue: "1"
        }, 
        {
            id: "number", 
            type: "number", 
            defaultValue: "22"
        }, 
        {
            id: "password", 
            type: "password"
        }, 
        {
            id: "radio", 
            type: "radio"
        }, 
        {
            id: "range", 
            type: "range"
        }, 
        {
            id: "search", 
            type: "search"
        }, 
        {
            id: "tel", 
            type: "tel"
        }, 
        {
            id: "text", 
            type: "text"
        }, 
        {
            id: "time", 
            type: "time"
        }, 
        {
            id: "url", 
            type: "url"
        }, 
        {
            id: "week", 
            type: "week"
        }
    ]
};
const styleSheet = createStyleSheet('SampleForm', theme => (
    {
        styles: {
            border: '1px solid green', 
            padding: '30px'
        }
    }));

class SampleForm extends React.Component  {
    handleChangeValue = () => {
        console.log(arguments);
    }
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={classes.styles}>
                    <Typography type="title" colorInherit noWrap>
                    Sample form with all control types
                    </Typography>
                
                    <div className={classes.margin10}>
                        <Form id="test" caption="Edit controls" meta={metaForm} onChangeValues={this.handleChangeValue}>
                        </Form>
                    
                    </div>
                
                </div>
            )
        ;
    }
}

const SampleFormStyled = withStyles(styleSheet)(SampleForm)

;
export default SampleFormStyled;
