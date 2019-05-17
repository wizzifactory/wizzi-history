/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schemadoc\flags.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
const Flags = (props) => {
    const {
        flags
    } = props;
    if (!flags || !flags.length) {
        return null;
    }
    else {
        return  (
                <span>
                {flags}
                </span>
            )
        ;
    }
}

Flags.propTypes = {
    flags: PropTypes.string
}

export default Flags;
