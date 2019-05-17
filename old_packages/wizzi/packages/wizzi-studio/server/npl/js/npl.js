/*
    artifact generator: C:\my\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\npl\src\ittf\server\npl\js\npl.js.ittf
    utc time: Mon, 16 Apr 2018 06:10:49 GMT
*/
'use strict';
$(document).ready(function() {
    $('#videos a').click(function() {
        var dataVideo = $(this).attr('data-video')
        ;
        $('#loader').append(videoHtml(dataVideo));
        $('#overlay').fadeIn(250);
    });
    $('#close').click(function() {
        $('#overlay').fadeOut(250, function() {
            $('#loader').html('');
        });
    });
});
function setModalSize() {
    var wh = $(window).height() / 100 * 80;
    var ww = $(window).width() / 100 * 80;
    $('.modal').css('margin-top', '-' + (wh / 2) + 'px');
    $('.modal').css('margin-left', '-' + (ww / 2) + 'px');
    $('.modal').css('height', wh + 'px');
    $('.modal').css('width', ww + 'px');
}
function videoHtml(src) {
    setModalSize();
    var wh = $(window).height() / 100 * 80;
    var ww = $(window).width() / 100 * 80;
    return '<video src="' + src + '"' + ' height="' + wh + 'px"' + ' width="' + ww + 'px"' + ' controls ' + ' autoplay="true"' + ' />';
}
