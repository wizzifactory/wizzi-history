/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\layouts\stu.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
const p_style = {
    padding: 0, 
    margin: '20px 5%', 
    font: "300 16px/22px 'Open Sans', sans-serif", 
    color: '#333'
};
var StuLayout = {
    kind: 'wrapper', 
    id: 'wrapper', 
    fixEvent: 'toggle-mainmenu', 
    flex: 'row', 
    panels: [
        {
            kind: 'section', 
            id: 'header', 
            style: {
                order: 1, 
                width: '100%', 
                backgroundColor: '#fff', 
                marginBottom: '20px', 
                borderBottom: '1px solid #ccc', 
                position: 'relative'
            }, 
            panels: [
                {
                    kind: 'link', 
                    format: 'a.img', 
                    href: 'https://search.google.com/search-console/mobile-friendly?id=-qDOe1JWk0myCaSmUtHC9A', 
                    src: "/static/images/react/mobile-friendly.jpg", 
                    title: "Google Mobile-Friendly Tested", 
                    img_style: {
                        display: 'block', 
                        height: '110px', 
                        position: 'absolute', 
                        left: '10px', 
                        top: '4px'
                    }
                }, 
                {
                    kind: 'heading', 
                    format: 'h1.span', 
                    text: 'Legoland ', 
                    span: "Photographs", 
                    style: {
                        h1: {
                            textAlign: 'center', 
                            font: "700 45px/60px 'Open Sans', sans-serif", 
                            color: '#2ab'
                        }, 
                        span: {
                            color: '#333', 
                            font: "300 45px/60px 'Open Sans', sans-serif", 
                            textAlign: 'center'
                        }
                    }
                }, 
                {
                    kind: 'toggler', 
                    id: 'menuPanel', 
                    event: 'toggle-mainmenu'
                }, 
                {
                    kind: 'slide', 
                    id: 'menuBox', 
                    flex: 'row', 
                    percWidth: 100, 
                    toggleEvent: 'toggle-mainmenu', 
                    visibleOnStart: false, 
                    style: {
                        width: '100%', 
                        height: '100%', 
                        backgroundCololr: '#fff', 
                        position: 'fixed', 
                        top: '0', 
                        // zIndex '10'
                        transition: '0.3s'
                    }, 
                    panels: [
                        {
                            kind: 'side', 
                            id: 'menuLeft', 
                            panels: [
                                {
                                    kind: 'menu', 
                                    format: 'div.a.i', 
                                    items: [
                                        {
                                            class: 'fa fa-facebook social', 
                                            href: '#url1'
                                        }, 
                                        {
                                            class: 'fa fa-twitter social', 
                                            href: '#url2'
                                        }, 
                                        {
                                            class: 'fa fa-linkedin social', 
                                            href: '#url3'
                                        }, 
                                        {
                                            class: 'fa fa-google-plus social', 
                                            href: '#url4'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'side', 
                            id: 'menuRight', 
                            panels: [
                                {
                                    kind: 'menu', 
                                    format: 'ul.li.a', 
                                    items: [
                                        {
                                            text: 'link 1', 
                                            href: '#url1'
                                        }, 
                                        {
                                            text: 'link 2', 
                                            href: '#url2'
                                        }, 
                                        {
                                            text: 'link 3', 
                                            href: '#url3'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }, 
        {
            kind: 'info', 
            format: 'h2.p+', 
            id: 'infoPanel', 
            flex: 'column', 
            heading: 'Flexbox Layout', 
            style: {
                order: 2, 
                width: 'calc(66% * 0.98)', 
                margin: '0 auto 20px auto', 
                border: '1px solid #ccc', 
                backgroundColor: '#fff', 
                paddingBottom: '20px'
            }, 
            p_style: {
                padding: '5px 20px', 
                margin: '0', 
                font: "400 16px/20px 'Open Sans', sans-serif", 
                color: '#333'
            }, 
            panels: [
                {
                    kind: 'p', 
                    text: '19th January 2017 - for all the latest browsers and OS'
                }, 
                {
                    kind: 'p', 
                    text: 'A simple CSS only layout using flexbox to organise and position the various panels.'
                }, 
                {
                    kind: 'p', 
                    text: 'No javascript or jQuery has been used in this layout'
                }, 
                {
                    kind: 'p', 
                    text: 'If you are viewing on a PC then you can see the panels resize and reflow as the browser window size changes.'
                }, 
                {
                    kind: 'p', 
                    text: 'The layout can be viewed on tablets and mobiles and the navigation resizes to suit.'
                }, 
                {
                    kind: 'p', 
                    text: 'The photograph panels with will always be the same height in each row'
                }, 
                {
                    kind: 'p', 
                    text: 'If you are using Firefox then the "Top of Page" arrow in the footer will give a smooth scroll back to the top of the page'
                }
            ]
        }, 
        {
            kind: 'flex', 
            direction: 'row', 
            id: 'content', 
            style: {
                order: 2, 
                width: '98%', 
                maxWidth: '1900px', 
                margin: '0 auto'
            }, 
            panels: [
                {
                    kind: 'flex', 
                    direction: 'row', 
                    id: 'centerPanel', 
                    style: {
                        order: 3, 
                        width: '66%'
                    }, 
                    panels: [
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z1.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z2.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z3.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z4.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z5.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z6.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z7.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z8.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            kind: 'info', 
                            format: 'a.img', 
                            src: '/static/images/react/layout/z9.jpg', 
                            href: '#url', 
                            text: "Legoland model of St. Pauls Cathedral with 'Big Ben' in the background.", 
                            p_style: p_style, 
                            panels: [
                                {
                                    kind: 'infoLinks', 
                                    format: 'p.[text.a]+', 
                                    links: [
                                        {
                                            label: 'Photo ', 
                                            text: 'Stu Nicholls', 
                                            href: '#url'
                                        }, 
                                        {
                                            label: 'Date 16/01/2017 | ', 
                                            text: 'Set 1', 
                                            href: '#url'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, 
                {
                    kind: 'info', 
                    format: 'h2.p+', 
                    id: 'leftPanel', 
                    heading: 'Legoland', 
                    style: {
                        order: 1, 
                        width: '16%', 
                        background: '#fff', 
                        marginBottom: '20px', 
                        border: '1px solid #ccc'
                    }, 
                    panels: [
                        {
                            kind: 'p', 
                            text: 'Legoland (trademark in uppercase as LEGOLAND&reg;) is a chain of Lego-themed children"s/family theme parks.'
                        }, 
                        {
                            kind: 'p', 
                            text: 'They are not fully owned by Lego Group itself; rather they are owned and operated by the British theme park company Merlin Entertainments.'
                        }, 
                        {
                            kind: 'p', 
                            text: 'It has over 55 interactive rides'
                        }
                    ]
                }, 
                {
                    kind: 'info', 
                    format: 'h2.p+', 
                    id: 'rightPanel', 
                    heading: 'Attractions', 
                    style: {
                        order: 3, 
                        width: '16%', 
                        background: '#fff', 
                        marginBottom: '20px', 
                        border: '1px solid #ccc'
                    }, 
                    panels: [
                        {
                            kind: 'p', 
                            text: 'The parks are marketed to families with younger children (11 and under)'
                        }, 
                        {
                            kind: 'p', 
                            text: 'Legoland parks are split into various areas'
                        }
                    ]
                }
            ]
        }
    ]
};
export default StuLayout;
