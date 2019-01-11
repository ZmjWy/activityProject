$(function(){
    function onRecord(){
        $('#record-animate').animate({marginTop:'-0.58rem'},1000,function(){
            $(this).css({marginTop:0});
            $(this).children().eq(0).appendTo($(this))
        })
    }
    setInterval(onRecord, 2500);

    var oPointer = document.getElementById("turntable-pointer");
    var oTurntable = document.getElementById("turntable-double");
    var cat = 45; //总共8个扇形区域，每个区域约45度
    var num = 0; //转圈结束后停留的度数
    var offOn = true; //是否正在抽奖
    var arr = [22+0*45,22+1*45,22+2*45,22+3*45,22+4*45,22+5*45,22+6*45,22+7*45,22+8*45];
    var btn = 0; //点击次数;
    oPointer.onclick = function () {
        if (offOn) {
            btn++;
            offOn = !offOn;
            ratating(arr[Math.floor(Math.random()*8)], btn);
        }
    }
//旋转
    function ratating(turn, btn) {
        var timer = null;
        var rdm = 0; //随机度数
        clearInterval(timer);
        timer = setInterval(function () {
            if (Math.floor(rdm / 360) < 3) {
                rdm = (btn * 0.5 * 3600) + turn;
            }else {
                if(num!=0){
                    oTurntable.style.transform = "rotate(" + (rdm + 360) + "deg)";
                }else{
                    oTurntable.style.transform = "rotate(" + rdm + "deg)";
                }
                clearInterval(timer);
                setTimeout(function () {
                    offOn = !offOn;
                    num = rdm % 360;
                    if (num <= cat * 1) { console.log("rdm=" + rdm + "，num=" + num + "，" + " 100金币"); }
                    else if (num <= cat * 2) {  console.log("rdm=" + rdm + "，num=" + num + "，" + "5万"); }
                    else if (num <= cat * 3) {  console.log("rdm=" + rdm + "，num=" + num + "，" + " 50金币"); }
                    else if (num <= cat * 4) {  console.log("rdm=" + rdm + "，num=" + num + "，" + "小米"); }
                    else if (num <= cat * 5) {  console.log("rdm=" + rdm + "，num=" + num + "，" + "300金币"); }
                    else if (num <= cat * 6) { console.log("rdm=" + rdm + "，num=" + num + "，" + "5000金币"); }
                    else if (num <= cat * 7) { console.log("rdm=" + rdm + "，num=" + num + "，" + "50金币 "); }
                    else if (num <= cat * 8) {  console.log("rdm=" + rdm + "，num=" + num + "，" + "256g"); }
                }, 4000);
            }
        }, 30);
    }
    //弹窗提示
    //window.createTurntable('activeEnd',{img:0,width:1.7,href:"ss://ddd",text:"查看更多赚金币方法",content:"今日抽奖机会已用完<br>明天继续吧"});
    //window.createTurntable('activeEnd',{img:0,width:1.7,href:"ss://ddd",text:"分享再抽一次",content:"今日奖品已领光<br/>送您300金币<br/>明天早点来吧"});
    //window.createTurntable('activeEnd',{img:1,width:2.3,href:"ss://ddd",text:"分享抽奖",content:"邀请好友参加活动<br/>可获得抽奖机会"});
    window.createTurntable('getMoney',{href:"ss://ddd",text:"分享再抽一次",content:"50000金币",title:'恭喜获得'});
});
(function($){
    function CreateModal() {};
    CreateModal.prototype.mBox = $('<div class="modal-box" style="display: block;position: fixed;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5);z-index: 999;top: 0;left: auto;"></div>');
    CreateModal.prototype.sBox = $('<div class="modal-content" style="position: relative;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;"></div>');
    CreateModal.prototype.content = $('<div style="width: 4.8rem;height: 5.08rem;background: url(dist/images/turntable-modal-bg_03.png) no-repeat scroll top center/100%;position: relative;"></div>');
    CreateModal.prototype.close = $('<img src="dist/images/turntable-modal-close_03.png" style="position: absolute;width: 0.28rem;top:0.3rem;right: 0.42rem;">')
    CreateModal.prototype.addMode = function(dome){
        var _this = this;
        this.content.append(dome)
        this.content.append(this.close);
        this.sBox.append(this.content);
        this.mBox.append(this.sBox);
        $('body').append(this.mBox);
        this.close.on('click', function(){
            _this.mBox.remove();
        })
    }
    CreateModal.prototype.activeEnd = function(obj){
        var _this = this;
        var img = ['dist/images/turntable-modal-2_03.png','dist/images/turntable-modal-1_03.png'];
        /**
         * img：【】
         * width：图片宽
         * href：拦截
         * text:按钮名称
         * content:内容
         * @type {*|jQuery|HTMLElement}
         */
        var dome = $('<div>' +
            '<img src="'+ img[obj.img]+'" style="width: '+ obj.width +'rem;display: block;margin: 0.3rem auto 0;" alt="">' +
            '<div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 2.2rem;">' +
            '<p style="font-size: 0.38rem;color: #c77a30;text-align: center;">'+obj.content+'</p>' +
            '</div>' +
            '<a class="share" href="'+obj.href+'" style="display: block;padding: 0 0.26rem;line-height: 0.68rem;height: 0.68rem;border-radius: 0.68rem;background: #fdba0d;color: #fff;font-size: 0.3rem;text-align: center;max-width: 3.22rem;text-decoration: none;margin: 0 auto;">'+obj.text+'</a>' +
            '</div>')
        this.addMode(dome);
        $(".share").on('click', function(){
            _this.mBox.remove();
        })
    };
    CreateModal.prototype.getMoney = function(obj){
        var _this = this;
        var dome = $('<div>' +
            '<div style="padding: 0.7rem 0 0;">' +
            '<p style="font-size: 0.38rem;color: #c77a30;text-align: center;padding-bottom: 0.1rem;">'+obj.title+'</p>' +
            '<p style="font-size: 0.52rem;color: #c77a30;text-align: center;font-weight: 800;">'+obj.content+'</p>' +
            '</div>' +
            '<img src="dist/images/turntable-modal-3_03.png" style="width:1.28rem;display: block;margin: 0.2rem auto 0.3rem;" alt="">' +
            '<a class="share" href="'+obj.href+'" style="display: block;padding: 0 0.26rem;line-height: 0.68rem;height: 0.68rem;border-radius: 0.68rem;background: #fdba0d;color: #fff;font-size: 0.3rem;text-align: center;max-width: 3.22rem;text-decoration: none;margin: 0 auto;">'+obj.text+'</a>' +
            '</div>')
        this.addMode(dome);
        $(".share").on('click', function(){
            _this.mBox.remove();
        })
    }
    function createTurntable(pro, obj){
        /**
         * activeEnd:活动结束
         * getMoney:金币
         * @type {CreateModal}
         */
        var modal = new CreateModal();
        modal[pro](obj);
    }
    window.createTurntable = createTurntable;
})(window.Zepto || window.jQuery);