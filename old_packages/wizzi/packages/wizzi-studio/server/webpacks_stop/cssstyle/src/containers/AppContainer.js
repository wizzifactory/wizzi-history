/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\containers\appcontainer.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sizeMe from 'react-sizeme';
import dhQuery from 'dom-helpers/query';
import App from '../components/App';
import StylesData from './StylesData';

class AppContainer extends React.Component  {
    state = {
        selectedStyledId: null, 
        styledStyles: null, 
        metaPlay: null
    };
    componentWillMount() {
        this.stylesData = new StylesData();
        console.log('componentDidMount.this.stylesData', this.stylesData);
        this.refreshStylesState(() => {
            this.updateDimensions();
        });
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    updateDimensions = () => {
        this.setState({
            ...this.state, 
            width: dhQuery.width(window), 
            height: dhQuery.height(window)
        })
    }
    handleStyledChange = (id, value) => {
        console.log('handleStyledChange', arguments);
        this.stylesData.selectStyled(value);
        this.refreshStylesState();
    }
    handleStyleChange = (id, values) => {
        this.stylesData.updateStyles(values);
        this.refreshStylesState();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    refreshStylesState(callback) {
        console.log('refreshStylesState.stylesData', this.stylesData);
        this.setState({
            ...this.state, 
            selectedStyledId: this.stylesData.selectedStyledId, 
            styledStyles: this.stylesData.styledStyles, 
            metaPlay: this.stylesData.metaPlay
        }, () => {
            console.log('refreshStylesState', this.state);
            if (callback) {
                callback();
            }
        });
    }
    render() {
        const {
            width,
            height
        } = this.props;
        console.log('render.state', this.state);
        const { metaPlay, styledStyles } = this.state;
        const { styledMeta } = this.stylesData;
        const styledIds = this.stylesData.maps.styledIds || [];
        return  (
                <div>
                    <App selectedStyledId={this.state.selectedStyledId} styledIds={styledIds} onStyledChange={this.handleStyledChange} metaForm={metaPlay} onStyleChange={this.handleStyleChange} styledMeta={styledMeta} styledStyles={styledStyles}>
                    </App>
                
                    <div>
                    App size: {width}px x {height}px
                    </div>
                
                    <div>
                    Window size: {this.state.width}px x {this.state.height}px
                    </div>
                
                </div>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state) => {
    return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {})
    ;
};

const AppContainerConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AppContainer)

;
export default sizeMe({
    monitorHeight: true, 
    monitorPosition: true
})(AppContainerConnected)

;
