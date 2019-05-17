/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\npmjobs.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
const styleSheet = createStyleSheet('NpmJobs', theme => (
    {}));

class NpmJobs extends React.Component  {
    render() {
        const {
            classes
        } = this.props;
        return  (
                <h2>
                Hello from npm jobs
                </h2>
            )
        ;
    }
}

const NpmJobsStyled = withStyles(styleSheet)(NpmJobs)

;
export default NpmJobsStyled;
