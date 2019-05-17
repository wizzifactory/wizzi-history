/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\webpacks\home\src\pages\home.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Link from 'react-router/lib/Link';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import wfLogo from '../assets/images/wizzi-factory-logo.svg';
const styleSheet = createStyleSheet('Home', (theme) => {
    return {
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
        };
});
function Home(props) {
    const classes = props.classes;
    return  (
            <div className={classes.root}>
                <div className={classes.hero}>
                    <div className={classes.content}>
                        <img src={wfLogo} alt="Material UI Logo" className={classes.logo}>
                        </img>
                    
                        <Typography type="display2" component="h1" colorInherit>
                        {'Material-UI'}</Typography>
                    
                        <Typography type="subheading" component="h2" colorInherit>
                        {"A React component library implementing Google's Material Design"}</Typography>
                    
                        <Button component={Link} className={classes.button} raised to="/getting-started/installation">
                        {'Get Started'}</Button>
                    
                    </div>
                
                </div>
            
            </div>
        )
    ;
}
Home.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styleSheet)(Home)
;
