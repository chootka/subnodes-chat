(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function r(r){return null!=r&&""!==r}function n(e){return Array.isArray(e)?e.map(n).filter(r).join(" "):e}var e={};return e.merge=function t(n,e){if(1===arguments.length){for(var a=n[0],s=1;s<n.length;s++)a=t(a,n[s]);return a}var i=n["class"],l=e["class"];(i||l)&&(i=i||[],l=l||[],Array.isArray(i)||(i=[i]),Array.isArray(l)||(l=[l]),n["class"]=i.concat(l).filter(r));for(var o in e)"class"!=o&&(n[o]=e[o]);return n},e.joinClasses=n,e.cls=function(r,t){for(var a=[],s=0;s<r.length;s++)a.push(t&&t[s]?e.escape(n([r[s]])):n(r[s]));var i=n(a);return i.length?' class="'+i+'"':""},e.attr=function(r,n,t,a){return"boolean"==typeof n||null==n?n?" "+(a?r:r+'="'+r+'"'):"":0==r.indexOf("data")&&"string"!=typeof n?" "+r+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'":t?" "+r+'="'+e.escape(n)+'"':" "+r+'="'+n+'"'},e.attrs=function(r,t){var a=[],s=Object.keys(r);if(s.length)for(var i=0;i<s.length;++i){var l=s[i],o=r[l];"class"==l?(o=n(o))&&a.push(" "+l+'="'+o+'"'):a.push(e.attr(l,o,!1,t))}return a.join("")},e.escape=function(r){var n=String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+r?r:n},e.rethrow=function a(r,n,e,t){if(!(r instanceof Error))throw r;if(!("undefined"==typeof window&&n||t))throw r.message+=" on line "+e,r;try{t=t||require("fs").readFileSync(n,"utf8")}catch(s){a(r,null,e)}var i=3,l=t.split("\n"),o=Math.max(e-i,0),c=Math.min(l.length,e+i),i=l.slice(o,c).map(function(r,n){var t=n+o+1;return(t==e?"  > ":"    ")+t+"| "+r}).join("\n");throw r.path=n,r.message=(n||"Jade")+":"+e+"\n"+i+"\n\n"+r.message,r},e}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">Hot Probs</a></div><ul class="nav navbar-nav"><li><a href="/">home</a></li><li><a href="/chat">chat</a></li></ul></div></nav><div class="container"><main data-hook="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<!DOCTYPE html><html><head><title>HOT PROBS</title><meta name="HandheldFriendly" content="True"><meta name="MobileOptimized" content="320"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><meta name="apple-mobile-web-app-capable" content="yes"><meta http-equiv="cleartype" content="on"><meta name="apple-mobile-web-app-capable" content="yes"><link rel="apple-touch-icon" href="/img/apple-touch-icon.png"><link rel="shortcut icon" href="/img/apple-touch-icon.png"></head></html>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/message.jade compiled template
    templatizer["includes"]["message"] = function tmpl_includes_message() {
        return '<li class="message list-group-item"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><p data-hook="message"></p></li>';
    };

    // pages/chat.jade compiled template
    templatizer["pages"]["chat"] = function tmpl_pages_chat() {
        return '<section class="page chat"><div id="chat"><div id="conversation"><div id="incoming"></div></div><div id="sendMessage"><textarea rows="1" name="msg" id="msg"></textarea></div></div></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><div id="login"><p>enter a screen name:</p><div id="screenname" contenteditable="true" spellcheck="false" required="true" class="singleLine"></div><div id="buttonWrapper"><button id="joinButton">JOIN MAIN CHAT ROOM</button></div></div><div id="about"><p>HOT PROBS is a free and anonymous network. Log on for local chat with others in your immediate area. All communication takes place offline and anonymously, so go ahead and say what you really feel.<br/><br/>HOT PROBS is built on top of Subnodes (http://subnod.es), an open source project that enables people to easily set up portable local area networks for anonymous, local communication.</p></div></section>';
    };

    return templatizer;
}));