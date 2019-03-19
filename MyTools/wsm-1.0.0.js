

(function (wsm) {
    /**
     * Author: Hengshuai.Wei
     * Date Created: 2019/03/10
     * Completion date: ing...
     * 
     * Name: wsm-1.0.0.js
     * version: 1.0.0
     * Description: General framework base on jQuery
     * Attention: All rights reserved
     * CDN: http://www.usword.cn/api/wsm.html
     * 
     * WebURL: @http://www.usword.cn
     */





    var $$ = function () { };

    // 框架基本骨架
    $$.prototype = {

        version: '1.0.0',

        // 封装缓存 -内存篇
        cache: function () { },
        // 封装cookie
        cookie: function () { },
        //封装本地储存框架
        store: function () { },
        // 封装canvas框架
        drawBoard: {},
        //简单的数据绑定formateString
        formateString: function (str, data) {
            return str.replace(/@\((\w+)\)/g, function (match, key) {
                return typeof data[key] === "undefined" ? '' : data[key]
            });
        },
        //给一个对象扩充功能
        extendMany: function () {
            var key, i = 0, len = arguments.length, target = null, copy;
            if (len === 0) {
                return;
            } else if (len === 1) {
                target = this;
            } else {
                i++;
                target = arguments[0];
            }
            for (; i < len; i++) {
                for (key in arguments[i]) {
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
        },
        // 封装Ajax
        Ajax: function (URL, fn) {
            var xhr = createXHR();  //返回来一个对象,这个对象IE6兼容
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        fn(xhr.responseText)
                    } else {
                        throw new Error("file error!");
                    }
                }
            };
            xhr.open("get", URL, true);
            xhr.send();
            // 闭包形式,因为这个函数只服务于ajax函数,所以放在这里
            function createXHR() {
                // 函数来自于<<JavaScript高级程序设计 第三版>>
                if (typeof XMLHttpRequest != "undefined") {
                    return new XMLHttpRequest();
                } else if (typeof ActiveXObject != "undefined") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                        i, len;
                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (error) {
                            //...
                        }
                    }
                    return new ActiveXObject(arguments.callee.activeXString);
                } else {
                    throw new Error("No XHR object available.");
                }
            }
        },
        // 数据类型检测
        isNumber: function (val) {
            return typeof val === 'number' && isFinite(val);
        },
        isBoolean: function (val) {
            return typeof val === 'boolean';
        },
        isString: function (val) {
            return typeof val === 'string';
        },
        isUndefined: function (val) {
            return typeof val === 'undefined';
        },
        isObject: function (val) {
            if (val === null || typeof val === 'undefined') {
                return false;
            }
            return typeof val === 'object';
        },
        isNull: function (val) {
            return val === null;
        },
        isArray: function (arr) {
            if (arr === null || typeof arr === 'undefined') {
                return false;
            }
            return arr.constructor === Array;
        },
        // 去除空白字符
        trim: function (val) {
            return val.replace(/(^\s*)|(\s*$)/g, '');
        },
        ltrim: function (val) {
            return val.replace(/(^\s*)/g, '');
        },
        rtrim: function (val) {
            return val.replace(/(\s*$)/g, '');
        },
        // 扩展方法
        extend: function (tar, source) {
            for (var i in source) {
                tar[i] = source[i];
            }
        },
        // 随机字母,颜色等等
        randomColor: function () {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        randomWord: function () {
            var Word = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
            var num = Math.floor(Math.random() * 52);
            return Word[num];
        },
        randomNumber: function () {
            var Number = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
            var num = Math.floor(Math.random() * 10);
            return Number[num];
        },
        // 格式化日期  eg:  $$.Date("yyyy-MM-dd HH:mm:ss")
        Date: function (format) {
            var date = new Date();
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "H+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "f+": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        },
    }
    // 实例化
    $$ = new $$();

    // 封装选择器框架
    $$.extend($$, {
        // id选择器
        id: function (id) {
            return document.querySelector("#" + id) ? document.querySelector("#" + id) : document.getElementById(id);
        },
        // class选择器
        class: function (className, context) {
            var i = 0, len, dom = [], arr = [];
            // 如果传过来的是字符串,则转换为对象
            if ($$.isString(context)) {
                context = document.getElementById(context);
            } else {
                context = document;
            }
            // 如果兼容getElementsByClassName
            if (context.getElementsByClassName) {
                return context.getElementsByClassName(className);
            } else {
                // 如果浏览器版本不支持语法
                dom = context.getElementsByTagName("*");
                for (i; len = dom.length, i < len; i++) {
                    if (dom[i].className) {
                        arr.push(dom[i]);
                    }
                }
            }
            return arr;
        },
        // tag标签选择器
        tag: function (tag, context) {
            if (typeof context == 'string') {
                context = $$.id(context);
            }
            if (context) {
                return context.getElementsByTagName(tag);
            } else {
                return document.getElementsByTagName(tag);
            }
        },
        // 分组选择器
        group: function (content) {
            var result = [], doms = [];
            var arr = $$.trim(content).split(",");
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = $$.trim(arr[i]);
                var logo = item.charAt(0);   //获取选择器第一个字符判断是不是.或#
                var logoIndex = item.indexOf(logo);
                if (logo === '.') {
                    doms = $$.class(item.slice(logoIndex + 1));
                    pushArray(doms, result);
                } else if (logo === '#') {
                    doms = [$$.id(item.slice(logoIndex + 1))];
                    pushArray(doms, result);
                } else {
                    doms = $$.tag(item);
                    pushArray(doms, result);
                }
            }
            return result;
            // 封装重复代码
            function pushArray(doms, result) {
                for (var j = 0, domlen = doms.length; j < domlen; j++) {
                    result.push(doms[j]);
                }
            }
        },
        // 层次选择器
        layer: function (selector) {
            var sel = $$.trim(selector).split(' ');
            var result = [];
            var context = [];
            for (var i = 0, len = sel.length; i < len; i++) {
                result = [];
                var item = $$.trim(sel[i]);
                var first = sel[i].charAt(0)
                var index = item.indexOf(first)
                if (first === '#') {
                    //如果是#，找到该元素，
                    pushArray([$$.id(item.slice(index + 1))]);
                    context = result;
                } else if (first === '.') {
                    //如果是.
                    //如果是.
                    //找到context中所有的class为【s-1】的元素 --context是个集合
                    if (context.length) {
                        for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                            pushArray($$.class(item.slice(index + 1), context[j]));
                        }
                    } else {
                        pushArray($$.class(item.slice(index + 1)));
                    }
                    context = result;
                } else {
                    //如果是标签
                    //遍历父亲，找到父亲中的元素==父亲都存在context中
                    if (context.length) {
                        for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                            pushArray($$.tag(item, context[j]));
                        }
                    } else {
                        pushArray($$.tag(item));
                    }
                    context = result;
                }
            }
            return context;
            //封装重复的代码
            function pushArray(doms) {
                for (var j = 0, domlen = doms.length; j < domlen; j++) {
                    result.push(doms[j])
                }
            }
        },
        //多组+层次
        select: function (str) {
            var result = [];
            var item = $$.trim(str).split(',');
            for (var i = 0, glen = item.length; i < glen; i++) {
                var select = $$.trim(item[i]);
                var context = [];
                context = $$.layer(select);
                pushArray(context);
            };
            return result;
            //封装重复的代码
            function pushArray(doms) {
                for (var j = 0, domlen = doms.length; j < domlen; j++) {
                    result.push(doms[j])
                }
            }
        },
        //html5实现的选择器
        all: function (selector, context) {
            context = context || document;
            return context.querySelectorAll(selector);
        },
    });


    // 封装基本事件
    $$.extend($$, {
        // 不同选择器匹配正则
        regID: /^#\S/,
        regClass: /^\.\S/,
        regTag: /^[a-zA-Z]|[0-9]/,

        // on事件
        on: function (selector, type, fn) {
            try {
                if (this.regID.test(selector)) {
                    var dom = document.querySelector(selector) ? document.querySelector(selector) : document.getElementById(selector.split('#')[1].trim());
                    if (dom.addEventListener) {
                        dom.addEventListener(type, fn, false);
                    } else if (dom.attachEvent) {
                        dom.attachEvent('on' + type, fn);
                    }
                } else if (this.regClass.test(selector)) {
                    var dom = document.querySelectorAll(selector) ? document.querySelectorAll(selector) : document.getElementsByClassName(selector);
                    classAndTag(dom);
                } else if (this.regTag.test(selector)) {
                    var dom = $$.isString(selector) ? document.getElementsByTagName(selector) : selector;
                    classAndTag(dom);
                } else {
                    var dom = $$.isString(selector) ? document.getElementById(selector) : selector;
                    if (dom.addEventListener) {
                        dom.addEventListener(type, fn, false);
                    } else if (dom.attachEvent) {
                        dom.attachEvent('on' + type, fn);
                    }
                }
            } catch (error) {
                throw new Error(selector + ' is not defined');
            }
            // 封装重复的代码
            function classAndTag(dom) {
                if (dom[0].addEventListener) {
                    for (var i = 0; i < dom.length; i++) {
                        dom[i].addEventListener(type, fn, false);
                    }
                } else if (dom.attachEvent) {
                    dom[0].attachEvent('on' + type, fn);
                }
            }
        },
        // un事件
        un: function (selector, type, fn) {
            try {
                if (this.regID.test(selector)) {
                    var dom = document.querySelector(selector) ? document.querySelector(selector) : document.getElementById(selector.split('#')[1].trim());
                    if (dom.removeEventListener) {
                        dom.removeEventListener(type, fn);
                    } else if (dom.detachEvent) {
                        dom.detachEvent(type, fn);
                    }
                } else {
                    var dom = selector;
                    if (dom.removeEventListener) {
                        dom.removeEventListener(type, fn);
                    } else if (dom.detachEvent) {
                        dom.detachEvent(type, fn);
                    }
                }
            } catch (error) {
                throw new Error(selector + ' is not defined');
            }
        },
        // hover事件
        hover: function (selector, fnenter, fnleave) {
            if (fnenter) {
                $$.on(selector, "mouseenter", fnenter);
            }
            if (fnleave) {
                $$.on(selector, "mouseleave", fnleave);
            }
        },
        // trigger事件
        trigger: function (selector, type) {
            try {
                if (this.regID.test(selector)) {
                    var dom = document.querySelector(selector) ? document.querySelector(selector) : document.getElementById(selector.split('#')[1].trim());
                    if (dom.dispatchEvent) {
                        // 创建事件
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent(type, true, true);
                        dom.dispatchEvent(evt);
                    } else {  //IE浏览器
                        dom.fireEvent("on" + type);
                    }
                } else {
                    var dom = selector;
                    if (dom.dispatchEvent) {
                        // 创建事件
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent(type, true, true);
                        dom.dispatchEvent(evt);
                    } else {  //IE浏览器
                        dom.fireEvent("on" + type);
                    }
                }
            } catch (error) {
                throw new Error(selector + ' is not defined');
            }
        },
        // 事件基础
        getEvent: function (event) {
            return event ? event : window.event;
        },
        // 获取目标
        getTarget: function (event) {
            return $$.getEvent(event).target || $$.getEvent(event).srcElement;
        },
        // 阻止默认行为
        preventDefault: function (event) {
            var event = $$.getEvent(event);
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 阻止冒泡
        stopPropagation: function (event) {
            var event = $$.getEvent(event);
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

    });


    // 封装常用功能的函数集合
    $$.extend($$, {
        // 拖拽功能
        draft: function (elem, partOne, partTwo) {
            var elem = $$.isString(elem) ? document.querySelector(elem) : elem;
            var disX, disY;
            addEvent(elem, 'mousedown', function (e) {
                if (partOne) {
                    partOne.style.cursor = 'move';
                }
                if (partTwo) {
                    partTwo.style.cursor = 'move';
                }
                elem.style.position = 'absolute';
                elem.style.cursor = 'move';
                disX = e.pageX - parseInt(getStyle(elem, 'left'));
                disY = e.pageY - parseInt(getStyle(elem, 'top'));
                addEvent(document, 'mousemove', mouseMove);
                addEvent(document, 'mouseup', mouseUp);
            });
            function mouseMove(e) {
                var e = e || window.event;
                elem.style.left = e.pageX - disX + 'px';
                elem.style.top = e.pageY - disY + 'px';
            }
            function mouseUp(e) {
                removeEvent(document, 'mousemove', mouseMove);
                elem.style.cursor = 'default';
                if (partOne) {
                    partOne.style.cursor = 'default';
                }
                if (partTwo) {
                    partTwo.style.cursor = 'default';
                }
            }
            function addEvent(elem, type, func) {
                if (elem.addEventListener) {
                    elem.addEventListener(type, func, false)
                } else if (elem.attachEvent) {
                    elem.attachEvent('on' + type, function () {
                        func.call(elem);
                    });
                } else {
                    elem['on' + type] = func;
                }
            }
            function removeEvent(elem, type, func) {
                if (elem.addEventListener) {
                    elem.removeEventListener(type, func, false)
                } else if (elem.attachEvent) {
                    elem.detachEvent('on' + type, function () {
                        func.call(elem);
                    });
                }
            }
            function getStyle(ele, prop) {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(ele, null)[prop];
                } else {
                    return ele.currentStyle[prop];
                }
            }
        },
        // 判断鼠标进出方向
        judgeDirection: function (selector, e) {
            var selector = $$.isString(selector) ? document.querySelector(selector) : selector;
            var w = selector.offsetWidth; // 得到盒子宽度
            var h = selector.offsetHeight;// 得到盒子高度
            var x = (e.clientX - selector.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
            // 获取x值
            var y = (e.clientY - selector.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
            // 获取y值
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
            // 将点的坐标对应的弧度值换算成角度度数值
            var dirName = new Array('On the top side ', 'On the right side ', 'On the bottom side ', 'On the left side ');
            //   对应的值分别是:        0                   1                       2                      3
            if (e.type == 'mouseenter') {
                return (dirName[direction] + 'in');
            } else {
                return (dirName[direction] + 'out');
            }
        },


    });


    // 封装css框架
    $$.extend($$, {
        // 不同选择器匹配正则
        regID: /^#\S/,
        regClass: /^\.\S/,
        regTag: /^[a-zA-Z]|[0-9]/,
        // 样式
        css: function (content, key, value) {
            var dom = $$.isString(content) ? $$.all(content) : content;
            try {
                if (dom.length) {
                    if (value) {
                        for (var i = dom.length - 1; i >= 0; i--) {
                            setStyle(dom[i], key, value);
                        }
                    } else {
                        return getStyle[dom[0]];
                    }
                } else {
                    dom = $$.isString(dom) ? document.querySelector(selector) : dom;
                    if (value) {
                        setStyle(dom, key, value);
                    } else {
                        return getStyle(dom);
                    }
                }
            } catch (error) {
                throw new Error('param is null');
            }
            function getStyle(dom) {
                if (dom.currentStyle) {
                    return dom.currentStyle[key];
                } else {
                    return getComputedStyle(dom, null)[key];
                }
            }
            function setStyle(dom, key, value) {
                dom.style[key] = value;
            }
        },
        // 显示
        show: function (selector) {
            var dom = $$.isString(selector) ? document.querySelector(selector) : selector;
            $$.css(dom, 'display', 'block');
        },
        // 隐藏
        hide: function (selector) {
            var dom = $$.isString(selector) ? document.querySelector(selector) : selector;
            $$.css(dom, 'display', 'none');
        },
        // 元素的高度和宽度
        width: function (selector) {
            return ($$.isString(selector) ? document.querySelector(selector) : selector).clientWidth;
        },
        height: function (selector) {
            return ($$.isString(selector) ? document.querySelector(selector) : selector).clientHeight;
        },
        // 获取元素的滚动高度和宽度
        scrollWidth: function (selector) {
            return ($$.isString(selector) ? document.querySelector(selector) : selector).scrollWidth;
        },
        scrollHeight: function (selector) {
            return ($$.isString(selector) ? document.querySelector(selector) : selector).scrollHeight;
        },
        // 获取元素出现滚动条时相对于边界的上偏移量和左偏移量
        scrollTop: function (selector) {
            return ($$.isString(selector) ? document.querySelector(selector) : selector).scrollTop;
        },
        scrollLeft: function (selector) {
            return ($$.isString(selector) ? document.querySelector(selector) : selector).scrollLeft;
        },
        // 获取屏幕的宽度和高度
        screenHeight: function () {
            return window.screen.height;
        },
        screenWidth: function () {
            return window.screen.width;
        },
        // 获取文档可视窗口的高度和宽度
        documentWidth: function () {
            return document.documentElement.clientWidth;
        },
        documentHeight: function () {
            return document.documentElement.clientHeight;
        },
        // 获取文档的整体高度和宽度
        documentAllWidth: function () {
            return document.body.scrollWidth;
        },
        documentAllHeight: function () {
            return document.body.scrollHeight;
        },
        // 获取文档滚动条相对于顶部和左部的偏移量
        documentScrollTop: function () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop;
        },
        documentScrollLeft: function () {
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            return scrollLeft;
        }
    });


    // 封装属性和Class框架
    $$.extend($$, {
        // 设置属性或获取属性
        attr: function (content, key, value) {
            var dom = $$.isString(content) ? $$.all(content) : content;
            try {
                if (dom.length) {
                    if (value) {
                        for (var i = dom.length - 1; i >= 0; i--) {
                            dom[i].setAttribute(key, value);
                        }
                    } else {
                        return dom[0].getAttribute(key);
                    }
                } else {
                    dom = $$.isString(dom) ? document.querySelector(selector) : dom;
                    if (value) {
                        dom.setAttribute(key, value);
                    } else {
                        return dom.getAttribute(key);
                    }
                }
            } catch (error) {
                throw new Error('param is null');
            }
        },
        //动态添加和移除class
        addClass: function (content, name) {
            var doms = $$.isString(content) ? $$.all(content) : content;
            try {
                //如果获取的是集合
                if (doms.length) {
                    for (var i = 0, len = doms.length; i < len; i++) {
                        addName(doms[i]);
                    }
                    //如果获取的不是集合
                } else {
                    doms = $$.isString(content) ? document.querySelector(content) : content;
                    addName(doms);
                }
            } catch (error) {
                throw new Error('param is null');
            }
            function addName(dom) {
                dom.className = dom.className + ' ' + name;
            }
        },
        removeClass: function (content, name) {
            var doms = $$.isString(content) ? $$.all(content) : content;
            try {
                if (doms.length) {
                    for (var i = 0, len = doms.length; i < len; i++) {
                        removeName(doms[i]);
                    }
                } else {
                    doms = $$.isString(content) ? document.querySelector(content) : content;
                    removeName(doms);
                }
            } catch (error) {
                throw new Error('param is null');
            }
            function removeName(dom) {
                dom.className = dom.className.replace(name, '');
            }
        },
        // 判断是否有该Class
        hasClass: function (content, name) {
            var doms = $$.isString(content) ? $$.all(content) : content;
            try {
                var flag = true;
                if (doms.length) {
                    for (var i = 0, len = doms.length; i < len; i++) {
                        flag = flag && check(doms[i], name);
                    }
                } else {
                    doms = $$.isString(content) ? document.querySelector(content) : content;
                    flag = flag && check(doms, name);
                }
                return flag;
            } catch (error) {
                throw new Error('param is null');
            }
            //判断单个元素
            function check(element, name) {
                return -1 < (" " + element.className + " ").indexOf(" " + name + " ");
            }
        },
        // 获取元素所有的class
        getClass: function (content) {
            var doms = $$.isString(content) ? $$.all(content) : content;
            if (doms.length) {
                return $$.trim(doms[0].className).split(" ");
            } else {
                doms = $$.isString(content) ? document.querySelector(content) : content;
                return $$.trim(doms.className).split(" ");
            }
        },

    });


    // 封装内容框架
    $$.extend($$, {
        // innerHTML函数版本
        html: function (content, value) {
            var doms = $$.isString(content) ? $$.all(content) : content;
            try {
                if (doms.length) {
                    if (value) {
                        for (var i = 0, len = doms.length; i < len; i++) {
                            doms[i].innerHTML = value;
                        }
                    } else {
                        return doms[0].innerHTML;
                    }
                } else {
                    doms = $$.isString(content) ? document.querySelector(content) : content;
                    if (value) {
                        doms.innerHTML = value;
                    } else {
                        return doms.innerHTML;
                    }
                }
            } catch (error) {
                throw new Error('param is null');
            }
        },
        // innerText函数版本
        text: function (content, value) {
            var doms = $$.isString(content) ? $$.all(content) : content;
            try {
                if (doms.length) {
                    if (value) {
                        for (var i = 0, len = doms.length; i < len; i++) {
                            doms[i].innerText = value;
                        }
                    } else {
                        return doms[0].innerText;
                    }
                } else {
                    doms = $$.isString(content) ? document.querySelector(content) : content;
                    if (value) {
                        doms.innerText = value;
                    } else {
                        return doms.innerText;
                    }
                }
            } catch (error) {
                throw new Error('param is null');
            }
        },
    });


    //封装json框架
    $$.extend($$, {
        // 将json数据转换成字符串
        sjson: function (json) {
            return JSON.stringify(json);
        },
        // 将字符串转换成json数据
        json: function (json) {
            return JSON.parse(json);
        }
    });


    // 封装缓存框架  -内存篇
    $$.cache = {
        data: [],
        get: function (key) {
            var value = null;
            for (var i = 0, len = this.data.length; i < len; i++) {
                var item = this.data[i]
                if (key == item.key) {
                    value = item.value;
                }
            }
            return value;
        },
        add: function (key, value) {
            var json = { key: key, value: value };
            this.data.push(json);
        },
        delete: function (key) {
            var status = false;
            for (var i = 0, len = this.data.length; i < len; i++) {
                var item = this.data[i]
                // 循环数组元素
                if (item.key.trim() == key) {
                    this.data.splice(i, 1);//开始位置,删除个数
                    status = true;
                    break;
                }
            }
            return status;
        },
        update: function (key, value) {
            var status = false;
            // 循环数组元素
            for (var i = 0, len = this.data.length; i < len; i++) {
                var item = this.data[i]
                if (item.key.trim() === key.trim()) {
                    item.value = value.trim();
                    status = true;
                    break;
                }
            }
            return status;
        },
        isExist: function (key) {
            for (var i = 0, len = this.data.length; i < len; i++) {
                var item = this.data[i]
                if (key === item.key) {
                    return true;
                } else {
                    return false;
                }
            }
        },

    };


    //cookie框架
    $$.cookie = {
        //设置coolie
        setCookie: function (name, value, days, path) {
            var name = escape(name);
            var value = escape(value);
            var expires = new Date();
            expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
            path = path == "" ? "" : ";path=" + path;
            _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
            document.cookie = name + "=" + value + _expires + path;
        },
        //获取cookie值
        getCookie: function (name) {
            var name = escape(name);
            //读cookie属性，这将返回文档的所有cookie
            var allcookies = document.cookie;
            //查找名为name的cookie的开始位置
            name += "=";
            var pos = allcookies.indexOf(name);
            //如果找到了具有该名字的cookie，那么提取并使用它的值
            if (pos != -1) {                                             //如果pos值为-1则说明搜索"version="失败
                var start = pos + name.length;                  //cookie值开始的位置
                var end = allcookies.indexOf(";", start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
                if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
                var value = allcookies.substring(start, end);  //提取cookie的值
                return unescape(value);                           //对它解码
            }
            else return "";                                             //搜索失败，返回空字符串
        },
        //删除cookie
        deleteCookie: function (name, path) {
            var name = escape(name);
            var expires = new Date(0);
            path = path == "" ? "" : ";path=" + path;
            document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
        }
    }

    //本地存储框架
    $$.store = (function () {
        var api = {},
            win = window,
            doc = win.document,
            localStorageName = 'localStorage',
            globalStorageName = 'globalStorage',
            storage;

        api.set = function (key, value) { };
        api.get = function (key) { };
        api.remove = function (key) { };
        api.clear = function () { };

        if (localStorageName in win && win[localStorageName]) {
            storage = win[localStorageName];
            api.set = function (key, val) { storage.setItem(key, val) };
            api.get = function (key) { return storage.getItem(key) };
            api.remove = function (key) { storage.removeItem(key) };
            api.clear = function () { storage.clear() };

        } else if (globalStorageName in win && win[globalStorageName]) {
            storage = win[globalStorageName][win.location.hostname];
            api.set = function (key, val) { storage[key] = val };
            api.get = function (key) { return storage[key] && storage[key].value };
            api.remove = function (key) { delete storage[key] };
            api.clear = function () { for (var key in storage) { delete storage[key] } };

        } else if (doc.documentElement.addBehavior) {
            function getStorage() {
                if (storage) { return storage }
                storage = doc.body.appendChild(doc.createElement('div'));
                storage.style.display = 'none';
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storage.addBehavior('#default#userData');
                storage.load(localStorageName);
                return storage;
            }
            api.set = function (key, val) {
                var storage = getStorage();
                storage.setAttribute(key, val);
                storage.save(localStorageName);
            };
            api.get = function (key) {
                var storage = getStorage();
                return storage.getAttribute(key);
            };
            api.remove = function (key) {
                var storage = getStorage();
                storage.removeAttribute(key);
                storage.save(localStorageName);
            }
            api.clear = function () {
                var storage = getStorage();
                var attributes = storage.XMLDocument.documentElement.attributes;;
                storage.load(localStorageName);
                for (var i = 0, attr; attr = attributes[i]; i++) {
                    storage.removeAttribute(attr.name);
                }
                storage.save(localStorageName);
            }
        }
        return api;
    })();


    // 封装canvas框架
    $$.drawBoard = {
        // 封装矩形
        wsmRect: function (json) {
            _init(json);
            function _init(json) {
                this.ctx = json.ctx === null ? null : json.ctx;
                this.x = json.x === 0 ? 0 : json.x || 10;
                this.y = json.y === 0 ? 0 : json.y || 10;
                this.w = json.w || 100;
                this.h = json.h || 100;
                this.strokeColor = json.strokeColor || '#000';
                this.fillColor = json.fillColor || 'lightblue';
                this.rotate = json.rotate || 0;
                this.scaleX = json.scaleX || 1;
                this.scaleY = json.scaleY || 1;
                this.opacity = json.opacity === 0 ? 0 : json.opacity || 1;
                this.aroundSelf = json.aroundSelf || false; //旋转时是否围绕自己
                this.perClear = json.perClear || false;  //是否清空画板.
                // 进行画布渲染
                render();
            };
            function render() {
                if (this.ctx) {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.perClear == true ? this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height) : this.ctx.clearRect(0, 0, 0, 0);
                    this.ctx.scale(this.scaleX, this.scaleY);
                    this.ctx.rotate(this.rotate * Math.PI / 180);
                    this.ctx.globalAlpha = this.opacity;
                    this.ctx.scale(this.scaleX, this.scaleY);
                    this.aroundSelf == true ? this.ctx.rect(0, 0, this.w, this.h) : this.ctx.rect(this.x, this.y, this.w, this.h);
                    // this.ctx.rect(this.x, this.y, this.w, this.h);
                    this.ctx.strokeStyle = this.strokeColor;
                    this.ctx.stroke();
                    this.ctx.fillStyle = this.fillColor;
                    this.ctx.fill();
                    this.ctx.restore();
                } else {
                    throw new Error('ctx is undefined');
                }
            };
        },
        // 封装圆形
        wsmCircle: function (json) {
            _init(json);
            function _init(json) {
                this.ctx = json.ctx === null ? null : json.ctx;
                this.x = json.x === 0 ? 0 : json.x || 100;
                this.y = json.y === 0 ? 0 : json.y || 100;
                this.r = json.r || 100;
                this.startAngle = (json.startAngle <= 0) ? json.startAngle : json.startAngle || -90;
                this.endAngle = (json.endAngle <= 0) ? json.endAngle : json.endAngle || 30;
                this.strokeColor = json.strokeColor || '#000';
                this.fillColor = json.fillColor || 'lightblue';
                this.scaleX = json.scaleX || 1;
                this.scaleY = json.scaleY || 1;
                this.opacity = json.opacity === 0 ? 0 : json.opacity || 1;
                this.perClear = json.perClear || false;  //是否清空画板
                this.isStroke = json.isStroke || false;   //是否描边
                // 进行画布渲染
                render();
            };
            function render() {
                this.ctx.save();
                this.ctx.scale(this.scaleX, this.scaleY);
                this.ctx.globalAlpha = this.opacity;
                this.ctx.moveTo(this.x, this.y);
                this.ctx.arc(this.x, this.y, this.r, this.startAngle * Math.PI / 180, this.endAngle * Math.PI / 180);
                if (this.isStroke) {
                    this.ctx.strokeStyle = this.strokeColor;
                    this.ctx.stroke();
                }
                this.ctx.fillStyle = this.fillColor
                this.ctx.fill();
                this.ctx.closePath();
                this.ctx.restore();
            };
        },


    }



    wsm.$$ = $$;












    /**
     * 作者: 卫恒帅
     * 创建日期: 2019/03/10
     * 完成日期: ing...
     *
     * 名字: wsm-1.0.0.js
     * 版本: 1.0.0
     * 描述: 基于jQuery的通用框架
     * 注意: 版权所有 违权必究
     * CDN: http://www.usword.cn/api/wsm.html
     * 
     * 网站: http://www.usword.cn
     */


})(window);