/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\infolinks.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
const styleSheet = createStyleSheet('InfoLinks', theme => (
    {
        panel_p_text_a: {
            padding: '0 0 0 30px', 
            margin: '0 5%', 
            font: "400 16px/20px 'Open Sans', sans-serif", 
            color: '#333', 
            position: 'absolute', 
            left: '0', 
            bottom: '20px'
        }
    }));

class InfoLinks extends React.Component  {
    render() {
        const {
            classes,
            data
        } = this.props;
        const { id, format, links, style: styleProp } = data;
        const childLinks = links.map((link, index) => {
            const { label, href, text } = link;
            return  (
                    <span key={ index }>
                    { label }
                        <a href={ href }>
                        { text }
                        </a>
                    
                        <br>
                        </br>
                    
                    </span>
                )
            ;
        })
        ;
        if (format === 'p.[text.a]+') {
            return  (
                    <p className={classes.panel_p_text_a} style={ styleProp }>
                    {childLinks}
                    </p>
                )
            ;
        }
        else {
            return  (
                    <div>
                    { 'Unknown InfoLinks format ' + format }
                    </div>
                )
            ;
        }
    }
}

const InfoLinksStyled = withStyles(styleSheet)(InfoLinks)

;
export default InfoLinksStyled;
