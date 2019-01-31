$(function () {
    var getString = new GetQueryString();
    var times = null;
    var writeInfo = true;
    var scrollNum = 1; //翻页
    var typeNum = 1; //类型
    var trNum = 0; //列表索引
    var bonusNotes = ['有效好友：任意一天阅读满120金币','邀请好友：下载花生头条，填写您的邀请码','不活跃好友：7天内有4天阅读奖励少于120金币'];

    // 列表切换
    $('.option-items').on('click', function () {
        //清空回调
        clearTimeout(times);
        var index = $(this).index();
        $('#bonus_notes').text(bonusNotes[index]);
        $('.info-show').eq(index).show().siblings().hide();
        $(this).css('color','#ff5337').siblings().css('color','#000');
        scrollNum = 1;
        if(index == 0){
            $('#romanceActive').children().remove();
            $('#option-speed').css('left','0%');
            typeNum = 1;
        }else if(index == 1){
            $('#inviteFriends').children().remove();
            $('#option-speed').css('left','33.3333%');
            typeNum = 2;
        }else{
            $('#option-speed').css('left','66.6666%');
            $('#inaction').children().remove();
            typeNum = 0;
        }
        dropload.resetload();
        times = setTimeout(function(){
            friendList("", typeNum, scrollNum);
        },1000);

    });

    // 唤醒模态框
    $('.modal-close').on('click', function(){
        $(this).hide();
        $('.talk-modal-box').hide();
    })

    // 渲染活跃好友
    function romanceActive(data){
        var info;
        data.map(function(list, i){
            info = '<tr class="clearFix">\n' +
                '                            <td>\n' +
                '                                <p>\n' +
                list.nickName +
                '                                </p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                '                                <p>\n' +
                list.todayGold +
                '                                </p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                '                                <p>'+list.allGold+'</p>\n' +
                '                            </td>\n' +
                '                        </tr>';
            $('#romanceActive').append(info);
        })
    }

    //邀请好友
    function inviteFriends(data){
        var awaken;
        var prompt = '';
        data.map(function (list, i) {
            if(list.wakeAlready == 0){
                prompt = '<p class="option-prompt">提醒Ta</p>';
            }else{
                prompt = '<p class="option-prompt-style">已提醒</p>';
            }
            awaken = '<tr class="trNum clearFix">\n' +
                '                            <td>\n' +
                '                                <p>\n' +
                list.nickName +
                '                                </p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                '                                <p>'+list.loginDate+'</p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                prompt
                +
                '                                <div class="talk-modal-box" style="display: none;">\n' +
                '                                    <div class="talk-modal">\n' +
                '                                        <div class="clearFix">\n' +
                '                                            <a href="javascript:void(0);" class="remind-dx" data-dx="'+list.uid+'">\n' +
                '                                                <img src="http://file.xcmad.com/dist/images/friend-m-dx_03.jpg" alt="">\n' +
                '                                                <p style="color:#000;">短信提醒</p>\n' +
                '                                            </a>\n' +
                '                                            <span></span>\n' +
                '                                            <a href="javascript:void(0);" class="remind-wx">\n' +
                '                                                <img src="http://file.xcmad.com/dist/images/friend-m-wx_03.jpg" alt="">\n' +
                '                                                <p style="color:#000;">微信提醒</p>\n' +
                '                                            </a>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </td>\n' +
                '                        </tr>';
            $('#inviteFriends').append(awaken);
        })

        //唤起分享弹框
        $('.option-prompt').on('click', function () {
            $(this).next().show();
            $('.modal-close').show();
            // $(this).unbind('click');
            trNum = $(this).parents('tr').index();
        });

        //发送短信邀请好友
        $('.remind-dx').on('click', function () {
            var dx = $(this).attr('data-dx');
            sendDx(dx);
        })

        //微信唤醒好友
        $('.remind-wx').on('click', function () {
            var $that = $(this);
            $('.modal-close').hide();
            $('.talk-modal-box').hide();
            androidObj.callBack(androidObj.shortcutWx);
            setTimeout(function(){
                $that.parents('.talk-modal-box').prev().addClass('option-prompt-style').text('已提醒').unbind('click');
            },5000)

        })
    }
    // 渲染不活跃好友
    function onInaction(data) {
        var awaken;
        var prompt = '';
        data.map(function (list, i) {
            if(list.wakeAlready == 0){
                prompt = '<p class="option-prompt">提醒Ta</p>';
            }else{
                prompt = '<p class="option-prompt-style">已提醒</p>';
            }
            awaken = '<tr class="trNum clearFix">\n' +
                '                            <td>\n' +
                '                                <p>\n' +
                list.nickName +
                '                                </p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                '                                <p>'+list.loginDate+'</p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                '                                <p>'+list.allGold+'</p>\n' +
                '                            </td>\n' +
                '                            <td>\n' +
                prompt
                +
                '                                <div class="talk-modal-box" style="display: none;">\n' +
                '                                    <div class="talk-modal">\n' +
                '                                        <div class="clearFix">\n' +
                '                                            <a href="javascript:void(0);" class="remind-dx" data-dx="'+list.uid+'">\n' +
                '                                                <img src="http://file.xcmad.com/dist/images/friend-m-dx_03.jpg" alt="">\n' +
                '                                                <p>短信提醒</p>\n' +
                '                                            </a>\n' +
                '                                            <span></span>\n' +
                '                                            <a href="javascript:void(0);" class="remind-wx">\n' +
                '                                                <img src="http://file.xcmad.com/dist/images/friend-m-wx_03.jpg" alt="">\n' +
                '                                                <p>微信提醒</p>\n' +
                '                                            </a>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </td>\n' +
                '                        </tr>';
            $('#inaction').append(awaken);
        })

        //唤起分享弹框
        $('.option-prompt').on('click', function () {
            $(this).next().show();
            $('.modal-close').show();
            // $(this).unbind('click');
            trNum = $(this).parents('tr').index();
        });

        //发送短信邀请好友
        $('.remind-dx').on('click', function () {
            var dx = $(this).attr('data-dx');
            sendDx(dx);
        })

        //微信唤醒好友
        $('.remind-wx').on('click', function () {
            var $that = $(this);
            $('.modal-close').hide();
            $('.talk-modal-box').hide();
            androidObj.callBack(androidObj.shortcutWx);
            setTimeout(function(){
                $that.parents('.talk-modal-box').prev().addClass('option-prompt-style').text('已提醒').unbind('click');
            },5000)

        })
    }

    //发送短信接口
    function sendDx(dx) {
        $.ajax({
            url: ctxs + '/act/h5/wakeFriendStatus?tel_num='+ getString.tel_num,
            type: 'GET',
            dataType:'jsonp',
            jsonp:'callback',
            jsonpCallback: 'send',
            success: function(data){
                if(data.status == 0){
                    goldCoin(dx,'限时免费', '，活动期间'+'<span style="color: #fe233e;">免费</span>'+'发短信', '免费短信唤醒好友');
                }else if(data.status == 1){
                    goldCoin(dx,'唤醒好友得金币','','花费400金币发短信');
                }else if(data.status == 202){
                    toast('请勿重复操作');
                }else{
                    toast(data.status);
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    //扣除四百金币
    function goldCoin(dx, title, add, btn){
        window.createModal.showCustom(title,'0.36rem','<span style="color: #9a9a9a;font-size: 0.3rem;display: block;width: 4.78rem;text-align: left;margin: 0 auto 0.2rem;">花400金币唤醒好友（系统代发短信）\n' +
            '好友重新使用花生头条并签到一次，\n' +
            '您将获得'+'<span style="color: #fe233e;">3000金币</span>'+'奖励'+ add +'。</span>', '','<span style="font-size: 0.44rem;">'+btn+'</span>',function(){
            // 短信唤起
            $.ajax({
                url: ctxs + '/act/sp/h5/wakeFriendSpring?tel_num='+ getString.tel_num +'&friendUid='+ dx +'&type=1',
                type: 'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'wake',
                success:function(data){
                    if(data.status == 0){
                        toast('短信发送成功');
                        // 唤醒置灰
                        $('.trNum').eq(trNum).find('.option-prompt').addClass('option-prompt-style').text('已提醒').unbind('click');
                    }else{
                        toast(data.msg);
                    };
                },
                error: function(err){
                    consoloe.log(err);
                }
            });
            $('.modal-close').hide();
            $('.talk-modal-box').hide();
        });
    }
    //好友列表接口
    function friendList(me, type, num){
        /*
         * type 类型
         * num 页数
         * */
        $.ajax({
            url: ctxs + '/act/sp/h5/friendListSpring?tel_num='+getString.tel_num+'&isActive='+type+'&page='+ num,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'friendList'+ Math.random().toString().substr(2),
            success: function(data){
                if(data.status == 0){
                    if(writeInfo){
                        $('#allGold').text(data.response.allGold);
                        $('#friendCount').text(data.response.invitive_friendCount);
                        $('#todayGold').text(data.response.effective_friendCount);
                    }
                    writeInfo = false;
                    if(data.response.list.length>0){
                        if(type == 1){
                            $('#info-active').hide();
                            $('.info-active').show();
                            romanceActive(data.response.list);

                        }else if(type == 2){
                            $('#info-awaken').hide();
                            $('.info-awaken').show();
                            inviteFriends(data.response.list);
                        }else{
                            $('#inaction-awaken').hide();
                            $('.inaction-awaken').show();
                            onInaction(data.response.list);
                        }
                        if(me !== ''){
                            me.resetload();
                        }
                    }else{
                        if(me !== ''){
                            me.noData(true);
                            me.resetload();
                        }
                    }
                }else{
                    if(me !== ''){
                        me.resetload();
                    }
                }
            },
            error:function (err) {
                if(me !== ''){
                    me.resetload();
                }
            }
        })
    }
    //直接调用
    friendList("", 1, scrollNum);

    //上划刷新
    var dropload = $('.friend-container').dropload({
        scrollArea: window,
        distance: 30,
        autoLoad: false,
        domDown: {
            domClass: 'dropload-down',
            domRefresh:  '<div class="dropload-load" style="display: none;"><span class="loading"></span></div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">暂无数据</div>'
        },
        scrollRange: function(me) {
        },
        loadDownFn: function (me) {
            clearTimeout(times );
            times = setTimeout(function(){
                scrollNum++;
                friendList(me, typeNum, scrollNum);
            },1000);
        },
    });
    //分享模态
    $('.invitation-friend').on('click', function () {
        $('.invitation-shortcut-share').show();
    })
    // 快捷分享
    $('.invitation-shortcut-share').on('click', function () {
        $(this).hide();
    })
    //进入邀请页面
    $('#my_invite').on('click', function(){
        androidObj.callBack(androidObj.friendListActivity);
    })
})