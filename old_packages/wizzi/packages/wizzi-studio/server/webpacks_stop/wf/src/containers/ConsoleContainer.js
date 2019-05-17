/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\containers\consolecontainer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listConsole, getConsole, saveConsole, runConsole, changeView } from '../store/actions';
import Console from '../components/Console';

class ConsoleContainer extends React.Component  {
    state = {
        executing: false
    };
    componentDidMount() {
        const {
            handleListConsole
        } = this.props;
        handleListConsole();
    }
    render() {
        const {
            isRequestingList,
            isRequestingRun,
            jsmodels,
            listerror,
            content,
            selectedConsole,
            stdout,
            stderr,
            runerror,
            view,
            handleRefreshListConsole,
            handleGetConsole,
            handleCreateConsole,
            handleSaveConsole,
            handleRunRequest,
            handleChangeView
        } = this.props;
        console.log('render.state', this.state);
        return  (
                <Console isRequestingList={isRequestingList} isRequestingRun={isRequestingRun} jsmodels={jsmodels} listerror={listerror} selectedConsole={selectedConsole} content={content} stdout={stdout} stderr={stderr} runerror={runerror} view={view} onRefreshListConsole={handleRefreshListConsole} onGetConsole={handleGetConsole} onCreateConsole={handleCreateConsole} onSaveConsole={handleSaveConsole} onRunRequest={handleRunRequest} onChangeView={handleChangeView}>
                </Console>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            handleRefreshListConsole: () => {
                dispatch(listConsole(true)
                )
            }, 
            handleListConsole: () => {
                dispatch(listConsole())
            }, 
            handleGetConsole: (name) => {
                dispatch(getConsole(name)
                )
            }, 
            handleCreateConsole: (name) => {
                const ittfContent = 'module + \n\tkind react';
                console.log('handleSaveConsole', name, ittfContent);
                dispatch(saveConsole(name, ittfContent)
                )
            }, 
            handleSaveConsole: (name, ittfContent) => {
                console.log('handleSaveConsole', name, ittfContent);
                dispatch(saveConsole(name, ittfContent)
                )
            }, 
            handleRunRequest: (name) => {
                dispatch(runConsole(name)
                )
            }, 
            handleChangeView: (viewName) => {
                dispatch(changeView(viewName)
                )
            }
        };
};

const mapStateToProps = (state) => {
    return {
            isRequestingList: state.console.isRequestingList, 
            jsmodels: state.console.jsmodels, 
            isRequestingRun: state.console.isRequestingRun, 
            selectedConsole: state.console.selectedConsole, 
            content: state.console.content, 
            stdout: state.console.stdout, 
            stderr: state.console.stderr, 
            listerror: state.console.listerror, 
            runerror: state.console.runerror, 
            view: state.console.view
        };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {})
    ;
};

const ConsoleContainerConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConsoleContainer)

;
export default ConsoleContainerConnected;
