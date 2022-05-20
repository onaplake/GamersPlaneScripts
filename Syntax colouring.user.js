// ==UserScript==
// @name         Syntax colouring
// @namespace    http://tampermonkey.net/
// @version      0.25
// @updateURL    https://github.com/AdamDnd/GamersPlaneScripts/raw/main/Syntax%20colouring.user.js
// @downloadURL  https://github.com/AdamDnd/GamersPlaneScripts/raw/main/Syntax%20colouring.user.js
// @description  Add syntax colouring to Gamers' Plane BBCode entry
// @author       Adam
// @match        https://mapdm.com/forums/thread/*
// @match        https://mapdm.com/forums/post/*
// @match        https://mapdm.com/forums/editPost/*
// @match        https://mapdm.com/characters/custom/*
// @match        https://mapdm.com/forums/newThread/*
// @match        https://gamersplane.com/forums/thread/*
// @match        https://gamersplane.com/forums/post/*
// @match        https://gamersplane.com/forums/editPost/*
// @match        https://gamersplane.com/forums/newThread/*
// @match        https://gamersplane.com/characters/custom/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamersplane.com
// @grant        GM_addStyle
// ==/UserScript==
/* globals jQuery, $ */

(function() {
    'use strict';

    var css=`
.markitUpEditorContainer {
position: relative;
border: solid 1px #64656b;
border-radius: 0 0 6px 6px;
overflow:hidden;
}
.markitUpEditorContainer .markItUpEditor,
.markitUpEditorContainer .markItUpEditorSyntax {
margin: 0px;
padding: 10px;
border: 0;
font-size: 13px;
line-height: 1.3em;
tab-size: 2;
font-family: 'Lucida Grande',Verdana,Arial,Sans-Serif;
text-size-adjust:none;
letter-spacing:normal;
word-spacing:normal;
}
.markitUpEditorContainer .markItUpEditor{
position: relative;
z-index: 1;
color: transparent;
background: transparent;
}
.markitUpEditorContainer .markItUpEditorSyntax {
position: absolute;
top: 0;
left: 0;
bottom: 0;
overflow-y: auto;
width: 100%;
box-sizing: border-box;
white-space: pre-wrap;
z-index: 0;
background-color:#fff;
}

body.dark .markitUpEditorContainer .markItUpEditorSyntax{
background-color:#37393f
}

.markitUpEditorContainer .markItUpEditor {
caret-color: #000;
}

body.dark .markitUpEditorContainer .markItUpEditor {
caret-color: #fff;
}

/************************/
/* tag syntax colouring */
/************************/

.markitUpEditorContainer .markItUpEditorSyntax .miuHSTag {
color: #cc6600;
-webkit-text-stroke-width: 0;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSTableSep {
color: #cc6600;
-webkit-text-stroke: 0.5px #cc6600;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSTagb,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSTagi,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSTagu,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSTags,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSTaglinebreak {
color: blue;
}

body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTagb,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTagi,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTagu,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTags,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTaglinebreak {
color:#66f;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSTag_Var,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSTag_Calc {
color: red;
}
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTag_Var,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSTag_Calc {
color: #f55;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSTagabilities,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSTagf {
color: green;
}


/**************************/
/* block syntax colouring */
/**************************/

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockb {
-webkit-text-stroke: 0.5px #000;
}
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockb {
-webkit-text-stroke: 0.25px #fff;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockquote,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocknote,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockprivate {
color: #888;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocku {
text-decoration:underline;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocki {
text-decoration: overline dotted #aaa;
}

body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocki {
text-decoration: overline dotted #888;
}


.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocks {
text-decoration:line-through;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockAbilityHeading {
background-color: #fea;
}

body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockAbilityHeading {
color: #000;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockimg,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockmap,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockurl,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockpoll,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocknpc,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockzoommap{
background-color:#f2f2f2;
}
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockimg,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockmap,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockurl,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockpoll,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlocknpc,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockzoommap{
background-color:#242424;
}

.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockooc,
.markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockooc .miuHSTagooc{
color:#009;
}

body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockooc,
body.dark .markitUpEditorContainer .markItUpEditorSyntax .miuHSBlockooc .miuHSTagooc{
color:#77b;
}

/*****************************/
/* colour new editor buttons */

.markItUpHeader>ul>li.miuBtnBold>a::after,
.markItUpHeader>ul>li.miuBtnItalic>a::after,
.markItUpHeader>ul>li.miuBtnUnderline>a::after,
.markItUpHeader>ul>li.miuBtnStrikethrough>a::after,
.markItUpHeader>ul>li.miuBtnLinebreak>a::after {
color:blue;
}

.markItUpHeader>ul>li.miuBtnFormat>a::after{
color: green;
}

.markItUpHeader>ul>li.miuBtnTable>a::after,
.markItUpHeader>ul>li.miuBtnPoll>a::after,
.markItUpHeader>ul>li.miuBtnColor>a::after,
.markItUpHeader>ul>li.miuBtnImage>a::after,
.markItUpHeader>ul>li.miuBtnLink>a::after,
.markItUpHeader>ul>li.miuBtnQuote>a::after,
.markItUpHeader>ul>li.miuBtnNote>a::after,
.markItUpHeader>ul>li.miuBtnCode>a::after,
.markItUpHeader>ul>li.miuBtnOoc>a::after,
.markItUpHeader>ul>li.miuBtnSpoiler>a::after {
color:#c60;
}

/* not needed with new release */
.markItUpHeader ul li{
float:none;
display:inline-block;
}

body .markItUpHeader ul .markItUpSeparator{
vertical-align:top;
}

`;
    GM_addStyle(css);

    $('.markItUpEditor').each(function(){
        var textarea=$(this);
        if(textarea.closest('.markitUpEditorContainer').length==0){
            textarea.wrap("<div class='markitUpEditorContainer'></div>");
            var wrapper=textarea.closest('.markitUpEditorContainer');
            var syntaxHighlighter=$('<div class="markItUpEditorSyntax"></div>').appendTo(wrapper);

            textarea.on('input',function(){updateWrapper($(this).val());syncScroll($(this));});
            textarea.on('scroll',function(){syncScroll($(this));});

            var updateWrapper=function(text) {
                if(text[text.length-1] == "\n") {
                    text += " ";
                }
                text=text.replace(/\[b\](.*?)\[\/b\]/msg,"<span class='miuHSBlock miuHSBlockb'>$&</span>");
                text=text.replace(/\[u\](.*?)\[\/u\]/msg,"<span class='miuHSBlock miuHSBlocku'>$&</span>");
                text=text.replace(/\[s\](.*?)\[\/s\]/msg,"<span class='miuHSBlock miuHSBlocks'>$&</span>");
                text=text.replace(/\[i\](.*?)\[\/i\]/msg,"<span class='miuHSBlock miuHSBlocki'>$&</span>");
                text=text.replace(/\[quote(?:=\"?([^\"\]]+?)\"?)?\](.*?)\[\/quote\]/msg,"<span class='miuHSBlock miuHSBlockquote'>$&</span>");
                text=text.replace(/\[img\](.*?)\[\/img\]/msg,"<span class='miuHSBlock miuHSBlockimg'>$&</span>");
                text=text.replace(/\[map\](.*?)\[\/map\]/msg,"<span class='miuHSBlock miuHSBlockmap'>$&</span>");
                text=text.replace(/\[url\="?(.*?)"?\](.*?)\[\/url\]/ms,"<span class='miuHSBlock miuHSBlockurl'>$&</span>");
                text=text.replace(/\[url\](.*?)\[\/url\]/msg,"<span class='miuHSBlock miuHSBlockurl'>$&</span>");
                text=text.replace(/\[note="?(\w[\w\. +;,]+?)"?](.*?)\[\/note\]\s*/sg,"<span class='miuHSBlock miuHSBlocknote'>$&</span>");
                text=text.replace(/\[private="?(\w[\w\. +;,]+?)"?](.*?)\[\/private\]\s*/sg,"<span class='miuHSBlock miuHSBlockprivate'>$&</span>");
                text=text.replace(/\[poll=\"?(.*?)?\"([^\]]*)\](.*?)\[\/poll\]/msg,"<span class='miuHSBlock miuHSBlockpoll'>$&</span>");
                text=text.replace(/\[npc=\"?(.*?)\"?\](.*?)\[\/npc\]*/msg,"<span class='miuHSBlock miuHSBlocknpc'>$&</span>");
                text=text.replace(/\[zoommap\="?(.*?)"?\](.*?)\[\/zoommap\]/msg,"<span class='miuHSBlock miuHSBlockzoommap'>$&</span>");
                text=text.replace(/[\r\n]*\[ooc\](.*?)\[\/ooc\][\r\n]*/msg,"<span class='miuHSBlock miuHSBlockooc'>$&</span>");
                text=text.replace(/\[f=?"?\s*([^\"\]]*)\s*"?\]/ms,"<span class='miuHSBlock miuHSBlockf'>$&</span>");

                text=text.replace(/\[\/?([^\_\=\]\s]+)[^\]]*\]/gm,"<span class='miuHSTag miuHSTag$1'>$&</span>");
                text=text.replace(/\[_[\w_]*\$\=[^\]]*\]/g,"<span class='miuHSTag miuHSTag_Calc'>$&</span>");
                text=text.replace(/\[_[\w_]*\=[^\]]*\]/g,"<span class='miuHSTag miuHSTag_Var'>$&</span>");
                text=text.replace(/^[\s]*(#.*)/gm,"<span class='miuHSBlock miuHSBlockAbilityHeading'>$&</span>");
                text=text.replace(/\[table[^\]]*\](.*)\[\/table\]/gms,function(matches){return matches.replace(/\|/g,'<span class="miuHSTableSep">|</span>');});

                syntaxHighlighter.html(text);
            };

            var syncScroll=function (pThis) {
                syntaxHighlighter[0].scrollTop = pThis[0].scrollTop;
                syntaxHighlighter[0].scrollLeft = pThis[0].scrollLeft;
            };

            updateWrapper(textarea.val());
            syncScroll(textarea);
            $(document).on('gp.characterloaded',function(ev,params){
                updateWrapper(params.notes);
                syncScroll(textarea);
            });

        }
    });
})();