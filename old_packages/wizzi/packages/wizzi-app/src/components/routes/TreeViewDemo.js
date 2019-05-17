/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\treeviewdemo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CollapseListItem from '../mui/CollapseListItem';
const item_data = {
    name: 'root', 
    children: [
        {
            name: 'leaf 1'
        }, 
        {
            name: 'leaf 2'
        }, 
        {
            name: 'branch 1', 
            children: [
                {
                    name: 'leaf 1.1'
                }, 
                {
                    name: 'leaf 1.2'
                }
            ]
        }, 
        {
            name: 'branch 2', 
            children: [
                {
                    name: 'leaf 2.1'
                }, 
                {
                    name: 'leaf 2.2'
                }, 
                {
                    name: 'leaf 2.3'
                }
            ]
        }
    ]
};
const styles = theme => (
    {});

class TreeViewDemo extends React.Component {
    handleSelect = (item) => {
        console.log('TreeViewDemo.handleSelect.item', item);
    }
    render() {
        return  (
                <ul>
                    <CollapseListItem item={item_data} onSelect={this.handleSelect}>
                    </CollapseListItem>
                
                </ul>
            )
        ;
    }
}
export default withStyles(styles)(TreeViewDemo)
;
