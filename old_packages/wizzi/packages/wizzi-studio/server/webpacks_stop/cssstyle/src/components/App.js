/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\app.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
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
import Styled from '../components/Styled';
import Styles from '../components/Styles';
import { Row, Col } from '../components/mui/grid';
var readme = require('../readme.md');
import MarkdownElement from './muidocs/MarkdownElement';
const styleSheet = createStyleSheet('App', theme => (
    {
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
            classes,
            selectedStyledId,
            styledIds,
            onStyledChange,
            metaForm,
            onStyleChange,
            styledMeta,
            styledStyles
        } = this.props;
        console.log('render.state', this.state);
        return  (
                <div>
                    <AppBar>
                        <Toolbar>
                            <Typography type="title" color='inherit' noWrap>
                            Styles builder
                            </Typography>
                        
                        </Toolbar>
                    
                    </AppBar>
                
                    <div className={classes.container}>
                        <Row>
                            <Col span={7}>
                                <Styles selectedStyledId={selectedStyledId} styledIds={styledIds} onStyledChange={onStyledChange} metaForm={metaForm} onStyleChange={onStyleChange}>
                                </Styles>
                            
                            </Col>
                        
                            <Col span={5}>
                                <Styled styledMeta={styledMeta} styledStyles={styledStyles}>
                                </Styled>
                            
                            </Col>
                        
                        </Row>
                    
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
