/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\dialogs\contextmenu.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
function noop() {
}
const styles = theme => (
    {});

class ContextMenu extends React.Component {
    render() {
        const {
            classes,
            id,
            anchorEl,
            items,
            onClose
        } = this.props;
        console.log('ContextMenu.render.anchorEl', anchorEl);
        return  (
                <Menu id={id} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
                {
                    items.map((p, i) => {
                        return  (
                                <MenuItem key={i} onClick={p.onClick}>
                                {p.label}</MenuItem>
                            )
                        ;
                    })
                }</Menu>
            )
        ;
    }
}

ContextMenu.propTypes = {
    id: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    anchorEl: PropTypes.object,
    items: PropTypes.array.isRequired
}

ContextMenu.defaultProps  = {
    id: 'context-menu'
}
export default withStyles(styles)(ContextMenu)
;
