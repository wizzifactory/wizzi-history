/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\app.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './mui/MuiBuilder';
import layoutData from './layouts/Stu';
var MainComponent = builder.create(layoutData);
const styleSheet = createStyleSheet('App', theme => (
    {
        '@global': {
            ['< html, body']: {
                padding: 0, 
                margin: 0, 
                width: '100%', 
                height: '100%', 
                background: '#f1f2f3', 
                scrollBehavior: 'smooth'
            }
        }
    }));

class App extends React.Component  {
    render() {
        return  (
                <MainComponent data={ layoutData }>
                </MainComponent>
            )
        ;
    }
}

const AppStyled = withStyles(styleSheet)(App)

;
export default AppStyled;
