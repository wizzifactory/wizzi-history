/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\muibuilder.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import WrapperPanel from './WrapperPanel';
import SectionPanel from './SectionPanel';
import FlexPanel from './FlexPanel';
import SidePanel from './SidePanel';
import SlidePanel from './SlidePanel';
import InfoPanel from './InfoPanel';
import InfoLinks from './InfoLinks';
import MenuBar from './MenuBar';
import Toggler from './Toggler';
import Link from './Link';
import Paragraph from './Paragraph';
import Heading from './Heading';
export default {
    create: function(component) {
        const { kind } = component;
        if (kind === 'wrapper') {
            return WrapperPanel;
        }
        else if (kind === 'section') {
            return SectionPanel;
        }
        else if (kind === 'flex') {
            return FlexPanel;
        }
        else if (kind === 'side') {
            return SidePanel;
        }
        else if (kind === 'slide') {
            return SlidePanel;
        }
        else if (kind === 'info') {
            return InfoPanel;
        }
        else if (kind === 'infoLinks') {
            return InfoLinks;
        }
        else if (kind === 'menu') {
            return MenuBar;
        }
        else if (kind === 'toggler') {
            return Toggler;
        }
        else if (kind === 'link') {
            return Link;
        }
        else if (kind === 'p') {
            return Paragraph;
        }
        else if (kind === 'heading') {
            return Heading;
        }
        else {
            throw Error('Builder.create error, unknown component kind: ' + kind);
        }
    }, 
    events: (function() {
        var topics = {};
        var hOP = topics.hasOwnProperty;
        return {
                subscribe: function(topic, listener) {
                    if (! (hOP.call(topics, topic))) {
                        topics[topic] = [];
                    }
                    var index = (topics[topic].push(listener) - 1);
                    return {
                            remove: function() {
                                delete (topics[topic][index]);
                            }
                        };
                }, 
                publish: function(topic, info) {
                    if (! (hOP.call(topics, topic))) {
                        return ;
                    }
                    topics[topic].forEach(function(item) {
                        item(info != undefined ? info : {});
                    });
                }
            };
    })()
};
