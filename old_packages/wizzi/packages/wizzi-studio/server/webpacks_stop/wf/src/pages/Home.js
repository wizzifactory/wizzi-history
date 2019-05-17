/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\pages\home.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
var routesBasepath = '/app/wf';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Link from 'react-router/lib/Link';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
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
                            <Typography type="display2" component="h1" colorInherit>
                            {'Wizzi factory'}
                            </Typography>
                        
                            <Typography type="subheading" component="h2" colorInherit>
                            {"Wizzi factory jobs and tools"}
                            </Typography>
                        
                            <Button component={Link} className={classes.button} raised to={routesBasepath + "/getting-started/installation"}>
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
