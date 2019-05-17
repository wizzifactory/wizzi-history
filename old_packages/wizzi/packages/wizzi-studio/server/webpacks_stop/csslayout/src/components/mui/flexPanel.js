/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\flexpanel.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './MuiBuilder';
const styleSheet = createStyleSheet('FlexPanel', theme => (
    {
        flex: {
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between'
        }, 
        flexColumn: {
            flexDirection: 'column'
        }
    }));

class FlexPanel extends React.Component  {
    render() {
        const {
            classes,
            data
        } = this.props;
        const { id, direction, style: styleProp } = data;
        return  (
                <div id={ id } className={classNames(classes.flex, {
                    [classes.flexColumn]: direction === 'column'
                })
                } style={ styleProp }>
                {
                    data.panels.map((panel, index) => {
                        var PanelComponent = builder.create(panel);
                        return  (
                                <PanelComponent key={ index } data={ panel }>
                                </PanelComponent>
                            )
                        ;
                    })
                    
                }</div>
            )
        ;
    }
}

const FlexPanelStyled = withStyles(styleSheet)(FlexPanel)

;
export default FlexPanelStyled;
