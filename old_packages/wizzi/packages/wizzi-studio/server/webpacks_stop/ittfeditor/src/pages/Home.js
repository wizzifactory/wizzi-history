/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\pages\home.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Link from 'react-router/lib/Link';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import wfLogo from '../assets/images/wizzi-factory-logo.svg';
const styleSheet = createStyleSheet('Home', theme => (
    {
        root: {
            flex: '1 0 100%'
        }, 
        hero: {
            minHeight: '100vh', 
            flex: '0 0 auto', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: theme.palette.primary[500], 
            color: theme.palette.getContrastText(theme.palette.primary[500])
        }, 
        content: {
            padding: '60px 30px', 
            textAlign: 'center', 
            [theme.breakpoints.up('sm')]: {
                padding: '120px 30px'
            }
        }, 
        button: {
            marginTop: 20
        }, 
        logo: {
            margin: '20px -40%', 
            width: '100%', 
            height: '40vw', 
            maxHeight: 230
        }
    }));

class Home extends React.Component  {
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={classes.root}>
                    <div className={classes.hero}>
                        <div className={classes.content}>
                            <Typography type="display2" component="h1" color='inherit'>
                            {'Wizzi factory'}
                            </Typography>
                        
                            <Typography type="subheading" component="h2" color='inherit'>
                            {"A model driven artifacts generator."}
                            </Typography>
                        
                            <Button component={Link} className={classes.button} raised to="/getting-started/installation">
                            {'Get Started'}
                            </Button>
                        
                        </div>
                    
                    </div>
                
                </div>
            )
        ;
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

const HomeStyled = withStyles(styleSheet)(Home)
;
export default HomeStyled;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
