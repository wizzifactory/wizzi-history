/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\menubar.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Link from './Link';
const styleSheet = createStyleSheet('MenuBar', theme => (
    {
        ul: {
            width: '200px', 
            padding: '0', 
            listStyle: 'none', 
            margin: '0 auto'
        }, 
        li: {
            font: "700 25px/55px 'Open Sans', sans-serif"
        }
    }));

class MenuBar extends React.Component  {
    render() {
        const {
            classes,
            data
        } = this.props;
        const { items, format } = data;
        var menuItems = items.map((item, index) => {
            return  (
                    <Link key={ index } format={ format } item={ item }>
                    </Link>
                )
            ;
        })
        ;
        if (format === 'ul.li.a') {
            return  (
                    <div>
                        <ul className={classes.ul}>
                        { menuItems }
                        </ul>
                    
                    </div>
                )
            ;
        }
        else if (format === 'div.a.i') {
            return  (
                    <div className={classes.ul}>
                    { menuItems }
                    </div>
                )
            ;
        }
        else {
            return  (
                    <div>
                    unknown menu format: { format }
                    </div>
                )
            ;
        }
    }
}

const MenuBarStyled = withStyles(styleSheet)(MenuBar)

;
export default MenuBarStyled;
