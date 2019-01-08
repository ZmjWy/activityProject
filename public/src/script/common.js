'use strict';

var toast = function toast(str) {
    var m = document.createElement('div');
    m.innerHTML = str;
    m.style.cssText = 'font-size:15px;width:70%; min-width:150px; background:#000; opacity:0.8; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:40%; left:15%; z-index:99999999; ';
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m);
        }, d * 1000);
    }, 2000);
};
//刷新提示
var newInfo = function newInfo(str) {
    var info = document.createElement('div');
    info.innerHTML = str;
    info.style.cssText = 'font-size:0.28rem;width:100%; background:rgba(221, 241, 255, 0.9);height:30px; color:#2a90d7; line-height:30px; text-align:center; position:fixed; top:80px; left:0; z-index:99999999; ';
    document.body.appendChild(info);
    setTimeout(function () {
        var d = 0.5;
        info.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        info.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(info);
        }, d * 500);
    }, 1000);
};
// 获取地址栏参数
var GetQueryString = function GetQueryString() {
    var value;
    var str = location.href;
    var num = str.indexOf('?');
    str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split('&'); // 各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            var name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
};
//下载唤起App
(function($){
    var isAndroid;
    var isIOS;
    $.fn.usrLoad = function(data){
        return new UsrLoad(this, data);
    }
    var UsrLoad = function(doucment,data){
        var ua = window.navigator.userAgent.toLowerCase();
        var u = navigator.userAgent;
        console.log(u)
        isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var micromessenger = ua.match(/MicroMessenger/i);
        var weixin = micromessenger == 'micromessenger'?true:false;
        // 判断是否是微信内置浏览器
        if (weixin) {
            // 跳转链接
            if(isAndroid){
                // window.location.href = 'downLoad.html';
                window.location.href = 'http://www.161914.com/a/2b0a16c0';
            }
        }
        // Safari 浏览器跳转IOS下载页
        if(/webkit/i.test(ua) &&!(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))){

            //苹果同事提供下载地址;
        }
        if(!weixin){
            //要监听的URL scheme协议
            if(isIOS){

            }else if(isAndroid){
                openApp('myapp://huasheng.com/openApp');
            }
        }

    }
    //判断手机上是否安装了app，如果安装直接打开，如果没安装，跳转到下载页面
    var openApp = function(url) {
        console.log('下载');
        if(isAndroid){
            var timeout, t = 1000, hasApp = true;
            var t1 = Date.now();
            var ifr = document.createElement("iframe");
            var openScript = setTimeout(function () {
                if (!hasApp) {
                    var durl = "http://file.xcmad.com/xcm_share_1.2.2.1.apk";
                    window.location.href=durl;
                }
                document.body.removeChild(ifr);
            }, 2000)
            ifr.setAttribute('src', url);
            ifr.setAttribute('style', 'display:none');
            document.body.appendChild(ifr);
            timeout = setTimeout(function () {
                var t2 = Date.now();
                if (!t1 || t2 - t1 < t + 100) {
                    hasApp = false;
                }
            }, t);
        }
        if(isIOS){
            console.log(url);
            window.location.href = url;
        }
    }
})(window.Zepto || window.jQuery);

// 广告应用
function addShow(domId, uId){ //搜狗广告补位
    return function(){
        $('#'+domId).addClass('build-adv-change');
        window.sogou_un.push({id: uId,ele:getId(domId)})
    }
}
function addBdShow(domId, uId) { //百度广告补位
    return function (){
        $.getScript("http://cbjs.baidu.com/js/m.js", function() {
            BAIDU_CLB_fillSlotAsync(uId,domId);
        });
    }
};
window.sogou_un = window.sogou_un || [];
function getId(id) {
    return document.getElementById(id);
}
// 公用模态
(function($){
    function CreateModal (){};
    CreateModal.prototype.create = function(title, titleWidth, text, url, urlText, status, callback){
        /**
         * img tittle模态图片/文字描述
         * imgWidth tittle图片宽度/文字大小
         * text 模态描述
         * url 跳转链接
         * urltext 按钮描述
         * status 自定义样式固定样式切换
         */
        var $modalBox = $('<div class="modal-box" style="display: none;position: fixed;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5);z-index: 999;top: 0;left: auto;"></div>');
        var $modalContent = $('<div class="modal-content" style="position: relative;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;"></div>');
        var $modalSmall;
        if(status == 1){
            $modalSmall = $('<div class="modal-small" style="width: 5.6rem;height: 3.82rem;text-align: right;position: relative;">' +
                '<img class="close-box" src="dist/images/modal-close_03.png" style="width: 0.5rem;height: 0.5rem;position: absolute;right: 0;top: -0.9rem;" alt="" />'+
                '<div style="width: 5.5rem;height: 3.82rem;background: #fff;border-radius:10px; ">' +
                '<div style="width: 100%;padding: 0.38rem 0;overflow: hidden;">' +
                '<img style="width: '+titleWidth+';display: block;margin: 0 auto;" src="'+ title +'" alt="" />'+
                '<p style="padding: 0.3rem 0;font-size: 0.4rem;text-align: center;">' + text + ' </p>'+
                '<a href="javascript:void(0);" class="modal-btn" style="margin:0 auto;font-size:0.46rem;color:#fff;width: 4.4rem;height: 0.8rem;display: block;text-align: center;line-height: 0.78rem;text-decoration: none;background-color: #fe233e;border-radius: 0.8rem; ">'+ urlText +'</a>'+
                '</div>'+
                '</div>'+
                '</div>');
        }else{
            $modalSmall = $('<div class="modal-small" style="width: 5.6rem;height: 3.82rem;text-align: right;position: relative;">' +
                '<img class="close-box" src="dist/images/modal-close_03.png" style="width: 0.5rem;height: 0.5rem;position: absolute;right: 0;top: -0.9rem;" alt="" />'+
                '<div style="width: 5.5rem;height: 3.82rem;background: #fff;border-radius:10px; ">' +
                '<div style="width: 100%;padding: 0.3rem 0;overflow: hidden;">' +
                '<p style="font-size: '+titleWidth+';text-align: center;margin:0;">'+ title+'</p>'+
                '<p style="padding: 0.1rem 0 0;font-size: 0.4rem;text-align: center;">' + text + ' </p>'+
                '<a href="javascript:void(0);" class="modal-btn" style="margin:0 auto;font-size:0.46rem;color:#fff;width: 4.4rem;height: 0.8rem;display: block;text-align: center;line-height: 0.78rem;text-decoration: none;background-color: #fe233e;border-radius: 0.8rem; ">'+ urlText +'</a>'+
                '</div>'+
                '</div>'+
                '</div>');
        }
        $modalContent.append($modalSmall);
        $modalBox.append($modalContent);
        $('body').append($modalBox);
        $('body').on('click','.close-box',function(){
            $('.modal-box').remove();
        });
        $('.modal-btn').on('click', function (){
            if(!!url){
                window.location.href =url;
            }
            if(typeof callback === "function"){
                callback();
            }
            $('.modal-box').remove();
        })
    }
    // 固定样式调用
    CreateModal.prototype.show = function(title, titleWidth, text, url, urlText){
       this.create(title, titleWidth, text, url, urlText, 1);
        $('.modal-box').show();
    }
    // 自定义样式调用
    CreateModal.prototype.showCustom = function (title, titleWidth, text, url, urlText, callback){
        this.create(title, titleWidth, text, url, urlText, 2, callback);
        $('.modal-box').show();
    }
    window.createModal = new CreateModal();
})(window.Zepto || window.jQuery)
// 快捷邀请
function shortcut(){
    var $shirtcut = $( '<div class="shortcut-share-all">\n' +
        '            <div>\n' +
        '                <div>\n' +
        '                    <ul class="clearFix">\n' +
        '                        <li>\n' +
        '                            <a href="invitation://shortcutWx">\n' +
        '                                <img src="dist/images/shortcut-share-ong_03.jpg" alt="">\n' +
        '                                <p>微信邀请</p>\n' +
        '                            </a>\n' +
        '                        </li>\n' +
        '                        <li>\n' +
        '                            <a href="invitation://shortcutFace">\n' +
        '                                <img src="dist/images/shortcut-share-two_05.jpg" alt="">\n' +
        '                                <p>面对面邀请</p>\n' +
        '                            </a>\n' +
        '                        </li>\n' +
        '                    </ul>\n' +
        '                    <ul class="clearFix">\n' +
        '                        <li>\n' +
        '                            <a href="invitation://shortcutFriend">\n' +
        '                                <img src="dist/images/shortcut-share-three_10.jpg" alt="">\n' +
        '                                <p>朋友圈邀请</p>\n' +
        '                            </a>\n' +
        '                        </li>\n' +
        '                        <li>\n' +
        '                            <a href="invitation://shortcutWxAll">\n' +
        '                                <img src="dist/images/shortcut-share-four_10.jpg" alt="">\n' +
        '                                <p>微信群发</p>\n' +
        '                            </a>\n' +
        '                        </li>\n' +
        '                        <li>\n' +
        '                            <a href="invitation://shortcutQq">\n' +
        '                                <img src="dist/images/shortcut-share-five_10.jpg" alt="">\n' +
        '                                <p>QQ好友</p>\n' +
        '                            </a>\n' +
        '                        </li>\n' +
        '                        <li>\n' +
        '                            <a href="invitation://shortcutDx">\n' +
        '                                <img src="dist/images/shortcut-share-six_10.jpg" alt="">\n' +
        '                                <p>短信邀请</p>\n' +
        '                            </a>\n' +
        '                        </li>\n' +
        '                    </ul>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>');
    $('body').append($shirtcut);
    $('.shortcut-share-all').on('click',function(){
        $(this).remove();
    })
}