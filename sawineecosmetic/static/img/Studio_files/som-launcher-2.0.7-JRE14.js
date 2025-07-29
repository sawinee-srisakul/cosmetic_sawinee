/*Copyright (c) 2002 JSON.org - Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. The Software shall be used for Good, not Evil. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function quote(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,f,u,p=gap,a=e[t];switch(a&&"object"==typeof a&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),typeof a){case"string":return quote(a);case"number":return isFinite(a)?a+"":"null";case"boolean":case"null":return a+"";case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(f=a.length,r=0;f>r;r+=1)u[r]=str(r,a)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+p+"]":"["+u.join(",")+"]",gap=p,o}if(rep&&"object"==typeof rep)for(f=rep.length,r=0;f>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,a),o&&u.push(quote(n)+(gap?": ":":")+o));else for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(o=str(n,a),o&&u.push(quote(n)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+p+"}":"{"+u.join(",")+"}",gap=p,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(t,e,o)}var j;if(text+="",cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

// Copyright (c) 2021 Big Nerd Software, LLC
// ALL RIGHTS RESERVED
//

window.SOMLauncherJRE14 = (function (window) {
    var som = {};

    var markInstallName = "mark-installed";

    var protocol = "screen-recorder-launcher-JRE14";

    var b = navigator.userAgent.toLowerCase();
    var isWin = b.indexOf("windows")>0;
    var isMac = b.indexOf("mac")>0 && b.indexOf("iphone")==-1 && b.indexOf("ipad")==-1 && b.indexOf("ipod")==-1;
    var isIE = b.indexOf("msie")>0 || !!navigator.userAgent.match(/Trident\//);
    var isFireFox = b.indexOf("firefox")>0;
    var isChrome = b.indexOf("chrome")>0;
    var isEdge = b.indexOf("edge")>0;
    var isSafari = !isChrome && b.indexOf("safari")>0;
    var isMacTooOld = (
         (b.indexOf("mac os x 10_4")>0 || b.indexOf("mac os x 10.4")>0) ||
         (b.indexOf("mac os x 10_5")>0 || b.indexOf("mac os x 10.5")>0) ||
         (b.indexOf("mac os x 10_6")>0 || b.indexOf("mac os x 10.6")>0)
    );

    var launchOrder = {
        win: ['protocol'],
        mac: ['protocol']
    };

    var launchTimeouts = {
        protocol: 10
    };

    var launchFunctions = {
        protocol: tryProtocol
    };

    som.setMarkInstall = function() {
        putState(markInstallName, new Date().getTime());
    };

    som.clearMarkInstall = function() {
        putState(markInstallName, 0);
    };

    som.isMarkInstallSet = function() {
        if (getSuccessForType('protocol'))
            return true;

        var s = getState(markInstallName);
        return s && parseInt(s)!=0;
    };

    som.launch = function(options) {
        var launchResult = {
            type: undefined,
            launchType: undefined,
            protocolInstalled: undefined,
            protocolUserCancelled: undefined,
            unsupportedType: undefined,
            error: undefined,

            // internally used...
            options: options,
            remoteStatus: undefined
        };

        if (isMacTooOld || (!isWin && !isMac)) {
            setTimeout(function(){
                launchResult.type = 'unsupported';
                if (isMacTooOld)
                    launchResult.unsupportedType = "oldMac";
                else
                    launchResult.unsupportedType = "notWinOrMac";

                options.callback(launchResult);
            },100);
            return;
        }

        var isRunningCallback = function(result) {
            if (result) {
                launchResult.type = 'already';
                options.callback(launchResult);
                return;
            }

            if (options.order==undefined)
                options.order = launchOrder;

            if (options.timeouts==undefined)
                options.timeouts = launchTimeouts;

            var launchTypes = options.order[osType()];
            if (launchTypes==undefined)
                launchTypes = ['protocol'];

            // Clone array since we might reorder...
            launchTypes = launchTypes.slice();

            // Reorder this if we've seen success before with one of the protocols...
            reorderIfPriorSuccess(launchTypes,'protocol');

            tryLaunch(launchResult, launchTypes, function(result, launchType) {
                // If we've already made a callback then don't do it again.
                if (launchResult.type != undefined)
                    return;

                launchResult.type = result?'success':'failed';
                launchResult.launchType = launchType;

                if (launchResult.remoteStatus=='already') {
                    launchResult.type = 'already';
                }

                options.callback(launchResult);
            });
        };

        // We can only do this check if we are tracking status locally...
        if (!options.remoteStatusService)
            isRunning(0,isRunningCallback);
        else
            isRunningCallback(false);
    };

    som.isAlreadyRunning = function(callback) {
        isRunning(0,callback);
    };

    som.keepListening = function(callback) {
        isRunning(-1,function(result) {
            if (result) callback();
        });
    };

    function reorderIfPriorSuccess(launchTypes,type) {
        if (getSuccessForType(type)) {
            if (removeString(launchTypes,type)) {
                launchTypes.unshift(type);
            }
        }
    }

    function getSuccessForType(type) {
        return getState(type+'-success')=='true';
    }

    function setSuccessForType(type,value) {
        putState(type+'-success',value)
    }

    function getState(name) {
        if(typeof(Storage) !== "undefined") {
            // suffix all state with JRE14 to make sure it doesn't find old values
            return localStorage.getItem(name+'-JRE14');
        } else {
            // This must be a really old browser which we don't support
            return undefined;
        }
    }

    function putState(name,value) {
        if(typeof(Storage) !== "undefined") {
            // suffix all state with JRE14 to make sure it doesn't find old values
            localStorage.setItem(name+'-JRE14', value);
        } else {
            // This must be a really old browser which we don't support
        }
    }

    function removeString(array, value) {
        var didremove = false;
        for (var i=array.length-1; i>=0; i--) {
            if (array[i] === value) {
                if (array.splice(i, 1).length>0)
                    didremove = true;
            }
        }
        return didremove;
    }

    function osType() {
        return isWin ? 'win' : 'mac';
    }

    function buildUrl(type, options) {
        var url = protocol +"://ScreenRecorder?";
        if (options.request) {
            url = protocol +"://" + options.request;

            url += (url.indexOf("?")==-1) ? "?" : "&";

            url += "rl=" + (new Date().getTime());

            url += "&al=true";
        }
        else {
            var allJars = options.jars['all'];
            if (allJars==undefined)
                allJars = options.jars['default'];

            url += "p=" + encodeLaunchURL(type, options.partner.id) + "," + encodeLaunchURL(type, options.partner.site) + "," + encodeLaunchURL(type, options.partner.key);
            if (options.partner.expires)
                url += "," + options.partner.expires;

            url += "&jh=" + encodeLaunchURL(type, options.jarHostPath);

            url += "&jl=" + allJars.concat(options.jars[osType()] ? options.jars[osType()] : []).join(',');

            url += "&rl=" + (new Date().getTime());

            url += "&al=true";

            url += "&som.*.encoder.url="+encodeLaunchURL(type, options.jarHostPath+"/")+"som-com-OS-encoder-v4.3.1.zip";

            url += "&som.*.encoder.name=som_com_encoder_4_3_1";
        }

        if (options.captureId)
            url+="&som.*.recorderbody.captureId="+options.captureId;

        for (var name in options.properties) {
            url += "&"+encodeLaunchURL(type, name)+"="+encodeLaunchURL(type, options.properties[name]);
        }

        if (isEdge)
            url += "&browser=edge";
        else if (isChrome)
            url += "&browser=chrome";
        else if (isFireFox)
            url += "&browser=firefox";
        else if (isWin && isIE)
            url += "&browser=ie";
        else if (isMac && isSafari)
            url += "&browser=safari";

        if (options.remoteStatusService && options.remoteStatusService.updateStatus) {
            url += "&updateStatus="+encodeLaunchURL(type, options.remoteStatusService.updateStatus);
        }

        if (options.proxyCheckUrl)
            url += "&pc="+encodeLaunchURL(type, options.proxyCheckUrl);

        return url;
    }

    function encodeLaunchURL(type, v) {
        if (!isIE || (typeof(navigator)!=="undefined" && typeof(navigator.msLaunchUri)==="function"))
            return encodeURIComponent(v);

        return encodeURIComponent(encodeURIComponent(v));
    }

    function tryLaunch(launchResult, types, callback) {
        if (types.length==0) {
            callback(false);
            return;
        }

        var type = types.shift();
        var timeoutMS = launchResult.options.timeouts[type] * 1000;

        if (getSuccessForType(type)) {
            var timoutAfterSuccessSec = launchResult.options.timeouts[type+"AfterSuccess"];
            if (timoutAfterSuccessSec)
                timeoutMS = timoutAfterSuccessSec*1000;
        }

        tryLaunchType(launchResult, type, timeoutMS, function(result) {
            setSuccessForType(type,result);

            if (result && type=='protocol')
                som.setMarkInstall();

            if (result) {
                callback(result,type);
            }
            else if (launchResult.remoteStatus) {
                callback(false);
            }
            else {
                tryLaunch(launchResult, types, callback);
            }
        });
    }

    function tryLaunchType(launchResult, type, timeoutMS, callback) {
        var func = launchFunctions[type];
        if (func==undefined) {
            callback(false);
            return;
        }

        url = buildUrl(type, launchResult.options);

        func(launchResult, url, timeoutMS, callback);
    }

    function tryProtocol(launchResult, url, timeoutMS, callback) {
        launchResult.protocolUrl = url;

        if(!isEdge && typeof(navigator)!=="undefined" && typeof(navigator.msLaunchUri)==="function"){
            // msLaunchUri will stop processing javascript while showing the prompt to "Allow" or "Cancel" the
            // custom protocol so this timeout will only be called if the user clicks cancel
            var isCancelledTimeout = setTimeout(function() {
                launchResult.protocolInstalled = true;
                launchResult.protocolUserCancelled = true;
                callback(false);
            }, 1000);

            // Reminder: msLaunchUri won't call back either function if the protocol IS installed BUT they click cancel!
            navigator.msLaunchUri(url,
                function(){
                    // Success callback (only called if protocol is installed AND user accepts it).
                    launchResult.protocolInstalled = true;
                    launchResult.protocolUserCancelled = false;
                    clearTimeout(isCancelledTimeout);
                    callback(true);
                },
                function(){
                    // Failed callback (only called if protocol is NOT installed.)
                    launchResult.protocolInstalled = false;
                    clearTimeout(isCancelledTimeout);
                    callback(false);
                }
            );

            return;
        }

        if (launchResult.options.checkInstallMark && !som.isMarkInstallSet()) {
            launchResult.protocolNoInstallMarked = true;
            callback(false);
            return;
        }

        if (isChrome) {
            addFrameWithBlurCheck(url,function(isInstalled) {
                if (isInstalled)
                    launchResult.protocolInstalled = true;
                checkIfProtocolLaunchSuccess(launchResult,timeoutMS,callback);
            });
        }
        else {
            addFrame(url);
            checkIfProtocolLaunchSuccess(launchResult,timeoutMS,callback);
        }
    }

    function addFrame(url) {
        var frame = document.getElementById("somTryProtocolFrame");
        if (frame!=null)
            frame.parentNode.removeChild(frame);

        frame = document.createElement("iframe");
        frame.id = "somTryProtocolFrame";
        frame.style.width="0";
        frame.style.height="0";
        frame.frameBorder="0";
        if (url)
            frame.src = url;
        document.body.appendChild(frame);
        
        return frame;
    }

    function addFrameWithBlurCheck(url, callback) {
        var inputHtml = '<input id="somBlurCheck" style="display:none;position:absolute;z-index:9999;width:1px;height:1px;max-width:1px;max-height:1px;top:0;left:0;border:0;"/>';
        var div = document.getElementById("somBlurCheckDiv");
        if (div!=null) div.parentNode.removeChild(div);
        div = document.createElement("div");
        div.id = "somBlurCheckDiv";
        div.innerHTML = inputHtml;
        document.body.appendChild(div);

        var blurHappened = false;
        var blurResultTimeout = null;
        var input = document.getElementById("somBlurCheck");

        function showInput() { input.style.display='block'; }
        function hideInput() { input.style.display='none'; }
        function focusInput() { input.focus(); }
        function addInputBlurListener(func) { input.addEventListener('blur',func); }
        function removeInputBlurListener(func) { input.removeEventListener('blur',func); }

        function fireOnBlur() {
            removeInputBlurListener(fireOnBlur);
            hideInput();
            if (document.hidden) {
                document.addEventListener("visibilitychange", blurWaitForVisible);
            } else {
                blurHappened = true;
                if (blurResultTimeout) {
                    window.clearTimeout(blurResultTimeout);
                    blurResultTimeout = null
                }
                blurCheckDone();
            }
        }

        function blurCheckDone() {
            removeInputBlurListener(fireOnBlur);
            hideInput();
            callback(blurHappened);
        }

        function blurWaitForVisible() {
            if (!document.hidden) {
                document.removeEventListener("visibilitychange", blurWaitForVisible);
                addBlurWatch();
            }
        }

        function addBlurWatch() {
            if (document.hidden) {
                document.addEventListener("visibilitychange", blurWaitForVisible);
            } else {
                showInput();
                focusInput();
                addInputBlurListener(fireOnBlur);
                addFrame(url);
                blurResultTimeout = setTimeout(function() {
                    if (document.hidden) {
                        document.addEventListener("visibilitychange", blurWaitForVisible);
                    } else {
                        blurCheckDone();
                    }
                }, (isMac ? 5000 : 2000))
            }
        }

        window.setTimeout(addBlurWatch, 300);
    }

    function checkIfProtocolLaunchSuccess(launchResult,timeoutMS,callback) {
        if (!launchResult.options.remoteStatusService) {
            isRunning(timeoutMS,callback);
        }
        else {
            checkRemoteStatus(launchResult,timeoutMS,(new Date().getTime()),callback);
        }
    }

    function checkRemoteStatus(launchResult,timeoutMS,startTimeMS,callback) {
        if (timeoutMS<=1000) {
            callback(false);
            return;
        }

        var pollStatus = launchResult.options.remoteStatusService.pollStatus;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", pollStatus, true);
        xhr.timeout = timeoutMS;
        xhr.responseType = "text";
        xhr.onload = function(){
            if (xhr.status!=200) {
                launchResult.error = 'Remote status check resulted in non-200 response: '+xhr.status;
                callback(false);
                return;
            }

            // Parse JSON...
            var response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                launchResult.error = 'Failed to parse JSON for remote status check: (error: "'+e+'" responseText: "'+xhr.responseText+'")';
                callback(false);
                return;
            }

            // Check status...
            launchResult.remoteStatus = response.status;

            if (launchResult.remoteStatus=="already") {
                callback(false);
            }
            else if (launchResult.remoteStatus=='error') {
                launchResult.error = 'Recorder reported error status.';
                callback(false);
            }
            else if (launchResult.remoteStatus=='started') {
                callback(true);
            }
            else if (launchResult.remoteStatus=='') {
                // no status yet so restart
                var pollInterval = response.pollingInterval;

                if (pollInterval==undefined)
                    pollInterval = 5;

                setTimeout(function() {
                    var timeElapsedMS =  (new Date().getTime()) - startTimeMS;
                    checkRemoteStatus(launchResult,timeoutMS-timeElapsedMS,(new Date().getTime()),callback);
                }, parseInt(pollInterval)*1000);
            }
            else {
                // We don't understand status!
                launchResult.error = 'Recorder reported unexpected status: "'+launchResult.remoteStatus+'"';
                callback(false);
            }
        }
        xhr.ontimeout = function(){
            // Recorder didn't respond in time so we assume it didn't launch
            callback(false);
        }
        xhr.onerror = function(){
            launchResult.error = 'Error while checking remote status.';
            callback(false);
        }
        xhr.send();
    }

    function isRunning(timeoutMS, callback) {
        checkIsRunning(timeoutMS, (new Date().getTime()), callback);
    }

    function checkIsRunning(timeoutMS, startTimeMS, callback) {
        var ports = [64321, 62345, 52345, 58765, 53456];

        var div = document.getElementById('somIsRunningDiv');
        if (!div) {
            div = document.createElement('div');
            div.id = 'somIsRunningDiv';
            document.body.appendChild(div);
        }

        div.innerHTML="";

        for (var i=0; i<ports.length; i++) {
            var imgElement = document.createElement('img');

            // Get function scope so img can be called in onerror
            (function(img){
                img.style.width="1px";
                img.style.height="1px";
                img.src = 'http://127.0.0.1:'+ports[i]+'/unique-'+(new Date().getTime())+'/hello';
                img.onerror=function() {
                    div.removeChild(img);
                    if (div.childNodes.length==0) {
                        var timeElapsedMS =  (new Date().getTime()) - startTimeMS;

                        if (timeoutMS>=0 && timeElapsedMS>=timeoutMS)
                            callback(false);
                        else
                            checkIsRunning(timeoutMS,startTimeMS,callback);
                    }
                };
                img.onload=function() {
                    callback(true);
                }
            })(imgElement);


            div.appendChild(imgElement);
        }
    }

    return som;
}(window));

if ("object" !== typeof window.SOMLauncher)
    window.SOMLauncher = window.SOMLauncherJRE14;
