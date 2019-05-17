/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\styled.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { StyledElement } from './html';
const styleSheet = createStyleSheet('Styled', theme => (
    {
        styledPanel: {
            border: '1px solid green', 
            padding: '10px'
        }, 
        styled: {
            border: '1px solid darkred', 
            padding: '10px', 
            margin: '10px'
        }, 
        margin10: {
            margin: '10px'
        }
    }));

class Styled extends React.Component  {
    render() {
        const {
            classes,
            styledMeta,
            styledStyles
        } = this.props;
        return  (
                <div className={classes.styledPanel}>
                    <Typography type="title" color='inherit' noWrap>
                    Styled element
                    </Typography>
                
                    <div className={classes.styled}>
                        <StyledElement meta={styledMeta} styles={styledStyles}>
                        </StyledElement>
                    
                    </div>
                
                </div>
            )
        ;
    }
}

Styled.propTypes = {
    classes: PropTypes.object,
    styledMeta: PropTypes.object,
    styledStyles: PropTypes.object
}

const StyledStyled = withStyles(styleSheet)(Styled)

;
export default StyledStyled;
