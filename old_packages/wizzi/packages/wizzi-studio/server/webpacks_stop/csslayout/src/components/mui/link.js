/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\link.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
const styleSheet = createStyleSheet('Link', theme => (
    {
        ul_li: {
            font: "700 25px/55px 'Open Sans', sans-serif"
        }, 
        ul_li_a: {
            transition: '0.3s', 
            position: 'relative', 
            marginLeft: 30, 
            color: '#333', 
            textDecoration: 'none', 
            '&:hover': {
                color: '#2ab'
            }
        }, 
        div_a_i: {
            transition: '0.2s', 
            margin: '5px', 
            color: '#888', 
            fontSize: '20px', 
            display: 'inline-block', 
            '&:hover': {
                color: '#666'
            }
        }
    }));

class Link extends React.Component  {
    render() {
        const {
            classes,
            item,
            format,
            data
        } = this.props;
        var xitem, xformat;
        if (!item) {
            xitem = data;
            xformat = data.format;
        }
        else {
            xitem = item;
            xformat = format;
        }
        const { text, href, src, class: classProp, img_style } = xitem;
        if (xformat === 'ul.li.a') {
            return  (
                    <li className={ classes.ul_li }>
                        <a href={ href } className={ classes.ul_li_a }>
                        { text }
                        </a>
                    
                    </li>
                )
            ;
        }
        else if (xformat === 'div.a.i') {
            return  (
                    <a href={ href } className={ classes.div_a_i }>
                        <i className={ classProp }>
                        </i>
                    
                    </a>
                )
            ;
        }
        else if (xformat === 'a.img') {
            return  (
                    <a href={ href }>
                        <img src={ src } style={ img_style }>
                        </img>
                    
                    </a>
                )
            ;
        }
        else {
            return  (
                    <div>
                    { 'Unknown Link format ' + xformat }
                    </div>
                )
            ;
        }
    }
}

const LinkStyled = withStyles(styleSheet)(Link)

;
export default LinkStyled;
