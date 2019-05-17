/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\containers\execfilescontainer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listExecFile, runExecFile, } from '../store/actions';
import ExecFiles from '../components/ExecFiles';

class ExecFilesContainer extends React.Component  {
    state = {
        executing: false
    };
    componentDidMount() {
        const {
            handleListExecFiles
        } = this.props;
        handleListExecFiles();
    }
    render() {
        const {
            isRequestingList,
            isRequestingRun,
            jobmodels,
            jobfiles,
            listerror,
            selectedExecFile,
            stdout,
            stderr,
            handleRunRequest
        } = this.props;
        console.log('render.state', this.state);
        return  (
                <ExecFiles isRequestingList={isRequestingList} isRequestingRun={isRequestingRun} jobmodels={jobmodels} jobfiles={jobfiles} listerror={listerror} selectedExecFile={selectedExecFile} stdout={stdout} stderr={stderr} onRunRequest={handleRunRequest}>
                </ExecFiles>
            )
        ;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
            handleListExecFiles: () => {
                dispatch(listExecFile())
            }, 
            handleRunRequest: (name) => {
                dispatch(runExecFile(name)
                )
            }
        };
};

const mapStateToProps = (state) => {
    return {
            isRequestingList: state.execfile.isRequestingList, 
            isRequestingRun: state.execfile.isRequestingRun, 
            jobmodels: state.execfile.jobmodels, 
            jobfiles: state.execfile.jobfiles, 
            selectedExecFile: state.execfile.selectedExecFile, 
            stdout: state.execfile.stdout, 
            stderr: state.execfile.stderr, 
            listerror: state.execfile.listerror
        };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log('DocumentEditor.mergeProps.stateProps', stateProps);
    console.log('DocumentEditor.mergeProps.dispatchProps', dispatchProps);
    console.log('DocumentEditor.mergeProps.ownProps', ownProps);
    return Object.assign({}, ownProps, stateProps, dispatchProps, {})
    ;
};

const ExecFilesContainerConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExecFilesContainer)

;
export default ExecFilesContainerConnected;
