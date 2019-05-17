/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\toggler.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import builder from './MuiBuilder';
const styleSheet = createStyleSheet('Toggler', theme => (
    {
        panel: {
            display: 'block', 
            width: '41px', 
            height: '41px', 
            background: '#333', 
            position: 'absolute', 
            right: '20px', 
            top: '20px', 
            cursor: 'pointer', 
            zIndex: 20
        }, 
        spanBase: {
            display: 'block', 
            width: '17px', 
            height: '3px', 
            background: '#fff', 
            position: 'absolute', 
            transition: '0.3s'
        }, 
        span: {
            left: '12px', 
            top: '19px', 
            background: '#fff', 
            transition: 'background 0.3s'
        }, 
        spanBefore: {
            left: '12px', 
            top: '13px', 
            transformOrigin: 'left top'
        }, 
        spanBeforeToggled: {
            transform: 'rotate(45deg)', 
            width: '18px', 
            left: '14px'
        }, 
        spanToggled: {
            background: 'transparent'
        }, 
        spanAfter: {
            left: '12px', 
            top: '25px', 
            transformOrigin: 'left bottom'
        }, 
        spanAfterToggled: {
            transform: 'rotate(-45deg)', 
            width: '18px', 
            left: '14px'
        }
    }));

class Toggler extends React.Component  {
    state = {
        toggled: false
    };
    componentDidMount() {
        const { data } = this.props;
        const { event } = data;
        this.event = event;
    }
    onClick = () => {
        this.setState({
            toggled: !this.state.toggled
        })
        builder.events.publish(this.event, this.state.toggled)
    }
    render() {
        const {
            classes
        } = this.props;
        return  (
                <span className={classes.panel} onClick={ this.onClick }>
                    <span className={classNames(classes.spanBase, classes.spanBefore, {
                        [classes.spanBeforeToggled]: this.state.toggled
                    })
                    }>
                    { ' ' }
                    </span>
                
                    <span className={classNames(classes.spanBase, classes.span, {
                        [classes.spanToggled]: this.state.toggled
                    })
                    }>
                    { ' ' }
                    </span>
                
                    <span className={classNames(classes.spanBase, classes.spanAfter, {
                        [classes.spanAfterToggled]: this.state.toggled
                    })
                    }>
                    { ' ' }
                    </span>
                
                </span>
            )
        ;
    }
}

const TogglerStyled = withStyles(styleSheet)(Toggler)

;
export default TogglerStyled;
