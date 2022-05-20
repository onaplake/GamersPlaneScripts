// ==UserScript==
// @name         Game forums ordered by creation date
// @namespace    http://tampermonkey.net/
// @version      0.1
// @updateURL    https://github.com/AdamDnd/GamersPlaneScripts/raw/main/Game%20forums%20ordered%20by%20id.user.js
// @downloadURL  https://github.com/AdamDnd/GamersPlaneScripts/raw/main/Game%20forums%20ordered%20by%20id.user.js
// @description  Order game forum list by creation date
// @author       Adam
// @match        https://gamersplane.com/forums/
// @match        https://gamersplane.com/forums/2
// @match        https://gamersplane.com/forums/0
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamersplane.com
// @grant        none
// ==/UserScript==
/* globals jQuery, $, moment, API_HOST */
(function() {
    'use strict';

    var table=$('.tableDiv:has(.forum-root-2) .sudoTable');
    if(table.length==0){
        table=$('.tableDiv .sudoTable');
    }

    var result = $('.tr:has(.td.name a)',table).sort(function (a, b) {
      var forumIdA =parseInt( $('.td.name a',a).attr('href').replace(/[^0-9]+/g, ''));
      var forumIdB =parseInt( $('.td.name a',b).attr('href').replace(/[^0-9]+/g, ''));
      return (forumIdA < forumIdB) ? -1 : (forumIdA > forumIdB) ? 1 : 0;
   }).appendTo(table);

})();