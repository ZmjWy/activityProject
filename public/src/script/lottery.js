$(function(){
    var getting = new GetQueryString;
    var callNum = true; //调用次数
    /**
     * 获取本地ip
     */
    function getYourIP(){
        var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        if (RTCPeerConnection) {
            var rtc = new RTCPeerConnection({iceServers: []});
            if (1 || window.mozRTCPeerConnection) {
                rtc.createDataChannel('', {reliable: false});
            };
            rtc.onicecandidate = function (evt) {
                if (evt.candidate) {
                    var ip = evt.candidate.candidate.match(/(\d{1,3}\.)+\d{1,3}/g);
                    //判断ip是否相等
                    if( ip != getting.local_ip){
                        $.ajax({
                            type: 'POST',
                            url: ctxs + '/turntable/h5/saveTimes?tel_num='+ getting.tel_num + '&type=2'+ '&str='+ip[0].replace(/\./g,'') +  '&time='+ (+new Date()),
                            dataType: 'jsonp',
                            jsonp: 'callback',
                            jsonpCallback: 'shareNumIp',
                            success: function(data){
                                //alert(eval("("+data+")"));
                            },
                            error:function(data,type, err){
                                alert ("ajax错误类型："+type);
                                alert (err);
                            }
                        });
                    }
                };
            };
            rtc.createOffer(function (offerDesc) {
                rtc.setLocalDescription(offerDesc);
            }, function (e) {
                console.warn("offer failed", e);
            });
        }else{
            console.warn("请使用主流浏览器：chrome,firefox,opera,safari");
        }
    };
    getYourIP();


    /**
     * 前往花生
     */
    $('.show-lottery').on('click', function(){
        $(window).usrLoad();
    })
    /**
     * 刮奖
     * @type {Element}
     */
    var scratchArea = document.getElementById('scratch-area');
    var canvas = document.getElementById('lottery-canvas');
    canvas.width = scratchArea.offsetWidth;
    canvas.height = scratchArea.offsetHeight;
    canvas.style.height = canvas.height + "px";
    canvas.style.width = canvas.width+ "px";
    var context = canvas.getContext("2d");
    var w = scratchArea.offsetWidth;
    var h = scratchArea.offsetHeight;
    var imgs = new Image();
    imgs.src = 'dist/images/lottery-scratch-area.jpg';
    imgs.onload = function () {
        context.drawImage(imgs, 0, 0, w, h);
        context.globalCompositeOperation = 'destination-out';//设置刮过之处是透明
    }
// 调用接口
//    scratchArea.addEventListener('touchstart', shareNum, false);
// 鼠标按下 增加mousemove的事件监听
    canvas.addEventListener('mousedown', drawArcMouseHandle);
    canvas.addEventListener('mouseup', function(event) {
        // 鼠标抬起之后，把mousemove的事件监听撤销掉
        this.removeEventListener('mousemove', mousemoveHandle);
    });
// 根据鼠标的move画圆
    function drawArcMouseHandle(event) {
        event.preventDefault();
        event.target.addEventListener("mousemove", mousemoveHandle);
    }
// 为了能够移除movesemove的事件需要单独处理一下
    function mousemoveHandle(event) {
        event.preventDefault();
        drawArcByPoint(event.pageX, event.pageY);
    }
// 监听 touchmove
    canvas.addEventListener('touchmove', drawArcTouchHandle);
// 根据触摸点画圆
    function drawArcTouchHandle(event) {
        event.preventDefault();
        var touch = event.touches[0];
        drawArcByPoint(touch.pageX, touch.pageY);
    }
// 根据某个点在canvas上画圆
// x 坐标和 y 坐标 两个坐标是触摸点的坐标而不是画圆的圆心
// 圆心通过计算得出
    function drawArcByPoint(x, y) {
        context.beginPath();
        context.arc(x - canvas.offsetLeft, y - canvas.offsetTop, 20, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = '#dddddd';
        context.fill();
        checkComplete();
    }
// 判断是否完成刮奖 点数大于80%
    function checkComplete() {
        var imgData = context.getImageData(0, 0, w, h);
        var pxData = imgData.data; // 获取字节数据
        var len = pxData.length; // 获取字节长度
        var count = 0; // 记录透明点的个数
        // 主要的思想是 一个像素由四个数据组成，每个数据分别是 rgba() 所以第四个数据 a 表示alpha透明度
        for (var i = 0; i < len; i += 4) {
            var alpha = pxData[i + 3]; // 获取每个像素的透明度
            if (alpha < 10) {
                // 透明度小于10
                count++;
            }
        }
        var percent = count / (len / 4); // 计算百分比
        // 如果百分比大于0.8 则表示成功
        if (percent >= 0.4 && callNum) {
            callNum = false;
            showResult();
        }
    }
// 显示刮奖结果
    function showResult() {
        $('.scratch-area').addClass('area-relative');
        $('.show-lottery').show();
        $('#degree').text('0');
    }

})
