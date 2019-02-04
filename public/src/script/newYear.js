$(function(){
    var pageList = {
        text: '',
        code:''
    };
    androidObj.callBack(androidObj.getUserInfos);
    //getCode('18733595931');
    window.onReceiveMessage = function(json){
        var jsonMessage = JSON.parse(json);
        var path = jsonMessage.path;
        androidObj.shareCall.map(function(data, i){
            data.url == path && (data.back == 'shareTerrace'?androidObj[data.back]():androidObj[data.back](jsonMessage,pageList,function(info){
                getCode(info.tel_num);
            }));
        })
    }
    //调用祝福语接口
    function newYearCall(){
        $.ajax({
            type:'GET',
            url: ctxs + '/index/bainian',
            dataType: 'json',
            success: function(data){
                if(data.status = 100){
                    pageList.text = data.msg;
                    $('#text_area').attr({placeholder:data.msg});
                }else{
                    toast(data.msg);
                }
            },
            error: function(err){

            }
        })
    }
    newYearCall();
    //
    //获取邀请码
    function getCode(tel){
        $.ajax({
            type: 'GET',
            url: ctxs + '/user/getInvCode?tel_num='+ tel,
            dataType: 'json',
            success: function(data){
                if(data.status = 100){
                    pageList.code = data.invitecode;
                }
            },
            error: function(err){

            }
        })
    }
    //分享拦截
    $('#share_btn').on('click', function(){
        var txt = '';
        var wxName = pageList.wx_name !=''? pageList.wx_name : '';
        var val = $('#text_area').val();
        if(val !=''){
            txt = val;
        }else{
            txt = pageList.text;
        }
        androidObj.callBack(androidObj.wxText + encodeURIComponent( wxName+'祝您：'+ txt + '!登录【花生】领红包，输入邀请码：'+pageList.code+'，每天赚20元！点我赚钱：http://www.161914.com/a/2b0a16c0'));
    })
    //规则跳转
    $('#rule_btn').on('click', function(){
        window.location.href = 'http://wap.zizhengjiankang.com/activePage/inviteFriends.html?tel_num=' + pageList.tel_num;
    })
})
