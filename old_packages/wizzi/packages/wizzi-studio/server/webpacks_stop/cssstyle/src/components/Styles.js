/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\styles.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Form from './mui/Form';
import Control from './mui/Control';
const styleSheet = createStyleSheet('Styles', theme => (
    {
        styles: {
            border: '1px solid green'
        }
    }));

class Styles extends React.Component  {
    render() {
        const {
            classes,
            selectedStyledId,
            styledIds,
            onStyledChange,
            metaForm,
            onStyleChange
        } = this.props;
        return  (
                <div className={classes.styles}>
                    <Typography type="title" color='inherit' noWrap>
                    Styles
                    </Typography>
                
                    <div className={classes.margin10}>
                        <Control id="styledId" key="styledId" type="select" label="Select styled" value={selectedStyledId} data={{
                            options: styledIds
                        }} onChangeValue={onStyledChange}>
                        </Control>
                    
                    </div>
                
                    <Form id="test" caption="Styles Form" meta={metaForm} onChangeValues={onStyleChange}>
                    </Form>
                
                </div>
            )
        ;
    }
}

Styles.propTypes = {
    classes: PropTypes.object,
    selectedStyledId: PropTypes.string,
    styledIds: PropTypes.array,
    onStyledChange: PropTypes.func,
    onStyleChange: PropTypes.func.isRequired,
    metaForm: PropTypes.object.isRequired
}

const StylesStyled = withStyles(styleSheet)(Styles)

;
export default StylesStyled;
