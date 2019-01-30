$(function () {
    var getString = new GetQueryString;
    var imgList = ['red-16', 'red-25.5', 'red-90', 'red-142.5', 'red-200', 'red-525', 'red-1100', 'red-3450', 'red-61200'];
    var moneyList = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
    var code = '';
    //调用公用分享
    function getData() {
        $.ajax({
            type: 'GET',
            url: ctxs + '/index/h5/getFriendNews?tel_num=' + getString.tel_num,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'getData',
            success: function (data) {
                if (data.status == 100) {
                    console.log(data)
                    code = data.invate_code;
                    $('#invate_code').text(data.invate_code);
                    $('#inviteF').text(data.invite_friends);
                    $('#validF').text(data.effective_friends);
                    $('#income').text(data.yaoqing_money);
                    rewardShow(data.yaoqing_num_speed_of_progress);
                    $('#withdraw-money').text('￥'+ getFloatStr(data.money_balance));
                    data.money_balance>0&&($('.withdraw-cash-btn').css({background:'#ffdb01',color:'#e10a08'}),$('.withdraw-cash-btn').on('click', function(){
                        androidObj.callBack(androidObj.takeCashActivity);
                    }))
                }
            },
            error: function (err) {
            }
        })
    };
    getData();
    /**
     * 奖励区间展示
     * @param
     * num：循环展示区间上限
     */
    function rewardShow(num) {
        for (var i=1; i<=num; i++) {
            if(i != 9){
                $('.bonus-unit-1').eq(i - 1).css({
                    'background': 'linear-gradient(to right,#c30404,#df2121)'
                })
            } else { //第九个变背景图
                $('.unit-61200').css({
                    'background': 'url("dist/images/bonus-unit-61200-bg-red.png")  no-repeat scroll top center/100% 100%'
                }),
                $('.bonus-unit-4 p').css({
                    'color': '#fff'
                })
            }
        }
        $('#show_money').text(moneyList[num-1]);
    }

    //将传入数据转换为字符串,并清除字符串中非数字与.的字符
    //按数字格式补全字符串
    var getFloatStr = function (num) {
        num += '';
        num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符
        if (/^0+/) //清除字符串开头的0
            num = num.replace(/^0+/, '');
        if (!/\./.test(num)) //为整数字符串在末尾添加.00
            num += '.00';
        if (/^\./.test(num)) //字符以.开头时,在开头添加0
            num = '0' + num;
        num += '00';        //在字符串末尾补零
        num = num.match(/\d+\.\d{2}/)[0];
        return num;
    };
    $('.rules').on('click', function(){
        androidObj.callBack(androidObj.invitaRuleActivity);
    })
    $('.friendlist').on('click', function(){
        androidObj.callBack(androidObj.friendListActivity);
    })
    $('#copy-invite').on('click', function(){
        androidObj.callBack(androidObj.copy + code);
    })

})