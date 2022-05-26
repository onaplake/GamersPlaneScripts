// ==UserScript==
// @name         Copy DnDBeyond class abilities
// @namespace    http://tampermonkey.net/
// @version      0.1
// @updateURL    https://github.com/AdamDnd/GamersPlaneScripts/raw/main/Copy%20DnDBeyond%20class%20abilities.user.js
// @downloadURL  https://github.com/AdamDnd/GamersPlaneScripts/raw/main/Copy%20DnDBeyond%20class%20abilities.user.js
// @description  Copy class abilities in BBCode format
// @author       Adam
// @match        https://www.dndbeyond.com/classes/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dndbeyond.com
// @grant        none
// ==/UserScript==
/* globals jQuery, $ */

(function() {
    'use strict';

    var notify=function(text){
          $("<div style='position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(255,255,255,0.9);z-index: 60000;text-align: center;padding-top: 300px;font-size: 300%;font-weight: bold;'>"+text+"<br/><small style='font-size:50%;'>Paste into your Gamers' Plane character sheet</small></div>")
          .appendTo('body')
          .fadeTo(1000,1.0, function(){
                $(this).fadeOut(1000, function(){
                    $(this).remove();
                });
          });
    };

    $('<span style="cursor:pointer;" class="copyGpBBCode">📋 </span>').prependTo($('.content-container h4'));
    $('.content-container h4').on('click','.copyGpBBCode',function(){
        var h4=$(this).closest('h4');
        var abilityBlocks=h4.nextUntil('h4');
        var title='# '+h4.text().replaceAll('📋','')+'\r\n';
        var dummyBlock=$('<div></div>')
        abilityBlocks.clone().appendTo(dummyBlock);
        $('<div>[table="compact ht"]</div>').insertBefore($('table',dummyBlock));
        $('<div>[CRNL][/table]</div>').insertAfter($('table',dummyBlock));
        $('table tr',dummyBlock).each(function(){
            $('<span> | </span>').prependTo($('td:not(:first()),th:not(:first())',this));
            $('<span>[CRNL]</span>').prependTo($('td:first(),th:first()',this));
        });
        $('<span>[CRNL]</span>').prependTo($('br',dummyBlock));
        $('<span>* </span>').prependTo($('li',dummyBlock));
        $('<span>[CRNL]</span>').appendTo($('li',dummyBlock));
        $('<span>[size="120"][b]</span>').prependTo($('h5',dummyBlock));
        $('<span>[/b][/size]</span>').appendTo($('h5',dummyBlock));
        $('<span>[CRNL]</span>').prependTo(dummyBlock.children());
        $('<span>[b]</span>').prependTo($('strong',dummyBlock));
        $('<span>[/b]</span>').appendTo($('strong',dummyBlock));
        $('<span>[i]</span>').prependTo($('em',dummyBlock));
        $('<span>[/i]</span>').appendTo($('em',dummyBlock));
        var body=dummyBlock.text();
        body=body.replace(/[\s]+/g, ' ');
        body=body.replaceAll('[CRNL]', '\r\n');
        body=body.replaceAll('\r\n\r\n', '\r\n');
        body=$.trim(body);

        navigator.clipboard.writeText(title+body).then(function() {
            notify('Copied');
        });
    });

})();