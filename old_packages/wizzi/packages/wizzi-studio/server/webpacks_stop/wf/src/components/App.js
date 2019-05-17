/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\app.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';
var readme = require('../readme.md');
import MarkdownElement from './muidocs/MarkdownElement';
const styleSheet = createStyleSheet('App', theme => (
    {
        '@global': {
            html: {
                boxSizing: 'border-box'
            }, 
            '*, *:before, *:after': {
                boxSizing: 'inherit'
            }, 
            body: {
                margin: 0, 
                background: theme.palette.background.default, 
                color: theme.palette.text.primary, 
                lineHeight: '1.2', 
                overflowX: 'hidden', 
                WebkitFontSmoothing: 'antialiased', 
                MozOsxFontSmoothing: 'grayscale'
            }, 
            img: {
                maxWidth: '100%', 
                height: 'auto', 
                width: 'auto'
            }
        }, 
        appFrame: {
            display: 'flex', 
            alignItems: 'stretch', 
            minHeight: '100vh', 
            width: '100%'
        }, 
        container: {
            paddingTop: '80px'
        }
    }));

class App extends React.Component  {
    state = {
        showReadme: false
    };
    render() {
        const {
            classes
        } = this.props;
        console.log('render.state', this.state);
        return  (
                <div className={classes.appFrame}>
                    <AppBar>
                        <Toolbar>
                            <Typography type="title" colorInherit noWrap>
                            Form builder
                            </Typography>
                        
                        </Toolbar>
                    
                    </AppBar>
                
                    <div className={classes.container}>
                        <Button onClick={() => {
                            this.setState({
                                ...this.state, 
                                showReadme: !this.state.showReadme
                            })
                        }}>
                        Readme
                        </Button>
                    
                        <Collapse in={this.state.showReadme} transitionDuration="auto" unmountOnExit>
                            <MarkdownElement text={readme}>
                            </MarkdownElement>
                        
                        </Collapse>
                    
                    </div>
                
                </div>
            )
        ;
    }
}

const AppStyled = withStyles(styleSheet)(App)

;
export default AppStyled;
