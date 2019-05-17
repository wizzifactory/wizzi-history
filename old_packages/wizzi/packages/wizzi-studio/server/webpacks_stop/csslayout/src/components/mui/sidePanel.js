/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\sidepanel.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './MuiBuilder';
const styleSheet = createStyleSheet('SidePanel', theme => (
    {}));

class SidePanel extends React.Component  {
    render() {
        const {
            data
        } = this.props;
        const { id, style: styleProp, panels } = data;
        return  (
                <div id={ id } style={ styleProp }>
                {
                    panels.map((panel, index) => {
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

const SidePanelStyled = withStyles(styleSheet)(SidePanel)

;
export default SidePanelStyled;
