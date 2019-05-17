/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\slidepanel.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './MuiBuilder';
const percWidth = 100;
const styleSheet = createStyleSheet('SlidePanel', theme => (
    {
        panel: {
            width: (percWidth + '%'), 
            height: '100%', 
            top: 0, 
            left: ('-' + percWidth + '%'), 
            position: 'fixed', 
            zIndex: '10', 
            background: '#fff', 
            transition: '0.3s'
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
        visible: {
            left: 0
        }
    }));

class SlidePanel extends React.Component  {
    state = {
        visible: false
    };
    componentDidMount() {
        const {
            data
        } = this.props;
        const { toggleEvent, visibleOnStart } = data;
        this.setState({
            visible: visibleOnStart
        });
        if (toggleEvent) {
            var that = this;
            this.toggleEventHandler = builder.events.subscribe(toggleEvent, function() {
                console.log('WrapperPanel received event ' + toggleEvent);
                that.setState({
                    visible: !that.state.visible
                });
            })
            ;
        }
    }
    componentWillUnmount() {
        if (this.toggleEventHandler) {
            this.toggleEventHandler.remove();
        }
    }
    render() {
        const {
            classes,
            data
        } = this.props;
        const { id, percWidth, flex, style: styleProp } = data;
        return  (
                <div id={ id } className={classNames(classes.panel, {
                    [classes.flex]: flex, 
                    [classes.flexColumn]: flex === 'column', 
                    [classes.visible]: this.state.visible
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

const SlidePanelStyled = withStyles(styleSheet)(SlidePanel)

;
export default SlidePanelStyled;
