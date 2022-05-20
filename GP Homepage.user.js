// ==UserScript==
// @name         GP Homepage
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Format bookmarked games section
// @author       Adam
// @match        https://gamersplane.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamersplane.com
// @grant        GM_addStyle
// ==/UserScript==
/* globals jQuery, $, moment, API_HOST */

(function() {
    'use strict';

    moment.lang('en', {calendar: {lastDay: '[Yesterday ] HH:mm', sameDay: '[Today ] HH:mm', nextDay: '[Tomorrow ] HH:mm', lastWeek: '[last] dddd HH:mm', nextWeek: 'dddd [at] HH:mm', sameElse: 'D MMM HH:mm'}});

    GM_addStyle('.hilightGame{background-color:#ffffdd;} .hilightGame .td.lastPost a.username{font-weight:bold;} #yourGames .td.name a {white-space: nowrap;}');
    GM_addStyle('body.dark .hilightGame{background-color:#3e0700;}');

    $.ajax({type: 'post',url: API_HOST +'/users/getCurrentUser',xhrFields: {withCredentials: true},data:{},
            success:function (data) {
                if(data && data.userID){
                    //Highlight bookmarked games where I wasn't the last to post
                    $('#yourGames:eq(0) .tr:not(.favGame):not(:has(.td.lastPost a.username[href="/user/'+data.userID+'/"]))').addClass('hilightGame');
                }
            }
        });

    //change last posting date to human readable
    $('.convertTZ').each(function(){
        $(this).text(moment($(this).text(),'MMM D, YYYY h:mm a').calendar(null, {sameDay: '[Today]',nextWeek: 'dddd',lastDay: '[Yesterday]',lastWeek: '[Last] dddd',sameElse: 'MMM D, YYYY h:mm a'}));
    });

})();