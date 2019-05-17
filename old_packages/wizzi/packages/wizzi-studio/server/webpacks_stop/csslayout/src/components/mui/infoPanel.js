/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\infopanel.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './MuiBuilder';
const styleSheet = createStyleSheet('InfoPanel', theme => (
    {
        panel: {
            width: '32%', 
            backgroundColor: '#fff', 
            marginBottom: '20px', 
            paddingBottom: '60px', 
            border: '1px solid #ccc', 
            position: 'relative'
        }, 
        flex: {
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between'
        }, 
        flexColumn: {
            flexDirection: 'column'
        }, 
        img: {
            display: 'block', 
            width: '100%'
        }, 
        h2: {
            font: "700 25px/40px 'Open Sans', sans-serif", 
            color: '#2ab', 
            padding: '0 20px', 
            margin: '0'
        }
    }));

class InfoPanel extends React.Component  {
    render() {
        const {
            classes,
            data
        } = this.props;
        const { id, format, text, href, src, heading, flex, style: styleProp, p_style } = data;
        const childPanels = data.panels.map((panel, index) => {
            panel.p_style = panel.p_style || p_style;
            var PanelComponent = builder.create(panel);
            return  (
                    <PanelComponent key={ index } data={ panel }>
                    </PanelComponent>
                )
            ;
        })
        ;
        if (format === 'a.img') {
            return  (
                    <div id={ id } className={classNames(classes.panel, {
                        [classes.flex]: flex, 
                        [classes.flexColumn]: flex === 'column'
                    })
                    } style={ styleProp }>
                        <a href={ href }>
                            <img src={ src } className={ classes.img }>
                            </img>
                        
                        </a>
                    
                        <p style={ data.p_style }>
                        { text }
                        </p>
                    
                    { childPanels }
                    </div>
                )
            ;
        }
        else if (format === 'h2.p+') {
            return  (
                    <div id={ id } className={classNames(classes.panel, {
                        [classes.flex]: flex, 
                        [classes.flexColumn]: flex === 'column'
                    })
                    } style={ styleProp }>
                        <h2 className={ classes.h2 }>
                        { heading }
                        </h2>
                    
                    { childPanels }
                    </div>
                )
            ;
        }
        else {
            return  (
                    <div>
                    { 'Unknown InfoPanel format ' + format }
                    </div>
                )
            ;
        }
    }
}

const InfoPanelStyled = withStyles(styleSheet)(InfoPanel)

;
export default InfoPanelStyled;
