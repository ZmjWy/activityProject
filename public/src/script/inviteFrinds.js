$(function () {
    var getString = new GetQueryString;
    var imgList = ['red-16', 'red-25.5', 'red-90', 'red-142.5', 'red-200', 'red-525', 'red-1100', 'red-3450', 'red-61200'];
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
                    $('#invate_code').text(data.invate_code);
                    $('#inviteF').text(data.invite_friends);
                    $('#validF').text(data.effective_friends);
                    $('#income').text(data.yaoqing_money);
                    schedule(data.yaoqing_speed_of_progress);
                    rewardShow(data.yaoqing_num_speed_of_progress);
                }
            },
            error: function (err) {
            }
        })
    };
    getData();
    /**
     * 奖励区间
     * @param num
     */
    function schedule(num) {
        var r = num == 1 ? '5%' : (num - 1) * 25 + '%';
        $('.schedule-ratio').css({width: r});
        $('.schedule-logo li').eq(num - 1).children().attr('src', 'dist/images/invitefriends-jincheng-02.png').css({width: '0.35rem'});
        for (var i = num; i >= 2; i--) {
            $('.schedule-logo li').eq(i - 2).children().attr('src', 'dist/images/invitefriends-jincheng_01.png')
        }
    }


    /**
     * 奖励区间展示
     * @param num
     */
    function rewardShow(num) {
        for (var i = num; i >= 1; i--) {
            $('.bonus-section-list li').eq(i - 1).css({
                'background': 'url(dist/images/' + imgList[i - 1] + '.png) no-repeat top center/100%'
            })
        }
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
})