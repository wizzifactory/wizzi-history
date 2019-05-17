/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\wrapperpanel.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './MuiBuilder';
const styleSheet = createStyleSheet('WrapperPanel', theme => (
    {
        wrapper: {
            width: '100%', 
            minWidth: '320px'
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
        fixed: {
            height: '100%', 
            overflow: 'hidden'
        }
    }));

class WrapperPanel extends React.Component  {
    state = {
        fixed: false
    };
    componentDidMount() {
        const {
            data
        } = this.props;
        const { fixEvent } = data;
        if (fixEvent) {
            var that = this;
            this.fixEventHandler = builder.events.subscribe(fixEvent, function() {
                console.log('WrapperPanel received event ' + fixEvent);
                that.setState({
                    fixed: !that.state.fixed
                });
            })
            ;
        }
    }
    componentWillUnmount() {
        if (this.fixEventHandler) {
            this.fixEventHandler.remove();
        }
    }
    render() {
        const {
            classes,
            data
        } = this.props;
        const { id, flex, style: styleProp } = data;
        return  (
                <div id={ id } className={classNames(classes.wrapper, {
                    [classes.flex]: flex, 
                    [classes.flexColumn]: flex === 'column', 
                    [classes.fixed]: this.state.fixed
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

const WrapperPanelStyled = withStyles(styleSheet)(WrapperPanel)

;
export default WrapperPanelStyled;
