/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\containers\stylesdata.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

class StylesData {
    constructor() {
        this.loadMetaPlay();
        this.loadStyled();
        this.applyStylesToMetaPlay(this.styledMeta.id);
        this.selectedStyledId = this.styledMeta.id;
    }
    
    loadMetaPlay() {
        var metaPlay = {
            controls: [
                {
                    id: "style", 
                    type: "text", 
                    defaultValue: "hello"
                }, 
                {
                    id: "backgroundColor", 
                    type: "color", 
                    defaultValue: "#ffffff"
                }, 
                {
                    id: "color", 
                    type: "color", 
                    defaultValue: "#000000"
                }, 
                {
                    id: "float", 
                    type: "select", 
                    defaultValue: "right", 
                    data: {
                        options: [
                            'left', 
                            'right'
                        ]
                    }
                }
            ]
        };
        this.metaPlay = metaPlay;
    }
    loadStyled() {
        const styledMeta = {
            id: "menu", 
            tag: "div", 
            children: [
                {
                    id: "menu_item_1", 
                    tag: "div", 
                    text: 'File'
                }, 
                {
                    id: "menu_item_2", 
                    tag: "div", 
                    text: 'Edit'
                }
            ]
        };
        const styledStyles = {
            menu: {
                backgroundColor: '#00ff00'
            }, 
            menu_item_1: {
                color: '#ff0000'
            }, 
            menu_item_2: {
                color: '#0000ff'
            }
        };
        this.styledMeta = styledMeta;
        this.styledStyles = styledStyles;
        this.maps = {
            styleds: [], 
            styledIds: []
        };
        this.analizeStyledMeta(this.styledMeta);
        var i, i_len=this.maps.styledIds.length, styleId;
        for (i=0; i<i_len; i++) {
            styleId = this.maps.styledIds[i];
            this.applyStylesToMetaPlay(styleId);
        }
    }
    analizeStyledMeta(styled) {
        if (styled && styled.id) {
            this.maps.styledIds.push(styled.id);
            this.maps.styleds.push(styled);
        }
        if (styled.children) {
            var i, i_len=styled.children.length, child;
            for (i=0; i<i_len; i++) {
                child = styled.children[i];
                this.analizeStyledMeta(child);
            }
        }
    }
    selectStyled(styledId) {
        this.applyStylesToMetaPlay(styledId);
        this.selectedStyledId = styledId;
    }
    updateStyles(values) {
        const styledId = this.selectedStyledId;
        console.log('StylesData.updateStyles.before', styledId, this.styledStyles[styledId]);
        this.styledStyles[styledId] = {
            ...this.styledStyles[styledId], 
            ...values
        };
        console.log('StylesData.updateStyles.after', styledId, this.styledStyles[styledId]);
        this.applyStylesToMetaPlay(styledId);
    }
    applyStylesToMetaPlay(styledId) {
        const styles = this.styledStyles[styledId];
        console.log('applyStylesToMetaPlay.styledId.styles', styledId, styles);
        var i, i_len=this.metaPlay.controls.length, item;
        for (i=0; i<i_len; i++) {
            item = this.metaPlay.controls[i];
            if (typeof(styles[item.id]) != "undefined") {
                item.value = styles[item.id];
            }
            else {
                item.value = item.defaultValue;
            }
        }
    }
}
export default StylesData;
