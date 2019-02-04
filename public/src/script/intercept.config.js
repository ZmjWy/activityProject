/**
 * 安卓方法回调
 * shortcutWx:微信邀请
 * shortcutFace:面对面邀请
 * shortcutFriend:朋友圈邀请
 * shortcutWxAll:微信群发
 * shortcutQq:好友邀请
 * shortcutDx:短信分享
 * invitaRuleActivity:跳转活动规则
 * takeCashActivity:跳转提现界面
 * userMoney:跳转累计零钱
 * friendListActivity:跳转好友列表
 * webCommonActivity:跳webview
 * mainActivityTv:跳转视频首页
 * mainActivityNew:跳转新闻首页
 * getDeviceInfos:获取设备信息
 * copy:复制123456
 * shareFriend:朋友圈分享
 * shareWx:微信好友分享
 * shareQq:QQ好友分享
 * shareZone:QQ空间分享
 * getUserInfos:获取数据
 * loginActivity:启动登录
 * toast:弹出系统Toast
 * wxText:微信分享（纯文本）
 */
var androidObj = {
    callBack: function(uri){
        window.webJsBridge.request(uri);
    },
    addUrl: function(obj){
        var newTitle = '';
        /**
         * device：判断qq 微信
         * wxName：判断是否绑定微信
         * type:分享类型
         * image：分享图片
         * url：分享链接
         * share：是否首次分享
         * androidObj.shareFriend + 'title=朋友圈分享&image_url=http://file.xcmad.com/appDetail/images/turn-share.jpg&url='+shareCtx +'/activePage/lottery.html?tel_num='+getString.tel_num + '&share='+data.share_today
         */
        if(obj.device == 'wx'){
            newTitle = obj.wxName!=''?(obj.wxName + '邀请你一起抽大奖') : '小花生邀请你一起抽大奖';
        }else{
            newTitle = '小花生邀请你一起抽大奖';
        }
        var url = obj.type + 'title=' + encodeURIComponent(newTitle) + '&image_url=' + encodeURIComponent(obj.image) + '&url='+ encodeURIComponent((shareCtx+obj.url)) + '&share='+ encodeURIComponent(obj.share);
        return url;
    },
    shortcutWx:'huasheng://xcm/invitation/shortcutWx',
    shortcutFace:'huasheng://xcm/invitation/shortcutFace',
    shortcutFriend:'huasheng://xcm/invitation/shortcutFriend',
    shortcutWxAll:'huasheng://xcm/invitation/shortcutWxAll',
    shortcutQq:'huasheng://xcm/invitation/shortcutQq',
    shortcutDx:'huasheng://xcm/invitation/shortcutDx',
    invitaRuleActivity: 'huasheng://xcm/system/start_activity?ui_name=InvitaRuleActivity',
    takeCashActivity:'huasheng://xcm/system/start_activity?ui_name=TakeCashActivity',
    userMoney: 'huasheng://xcm/system/start_activity?ui_name=UserMoneyDetailActivity',
    friendListActivity: 'huasheng://xcm/system/start_activity?ui_name=FriendListActivity',
    webCommonActivity:'huasheng://xcm/system/start_activity?ui_name=WebCommonActivity&url=',
    mainActivityTv:'huasheng://xcm/system/start_activity?ui_name=MainActivity&tab_index=1',
    mainActivityNew:'huasheng://xcm/system/start_activity?ui_name=MainActivity&tab_index=0',
    copy:'huasheng://xcm/system/copy?content=',
    shareFriend:'huasheng://xcm/share/friend?',
    shareWx:'huasheng://xcm/share/wx?',
    shareQq:'huasheng://xcm/share/qq?',
    shareZone: 'huasheng://xcm/share/qq_zone?',
    getDeviceInfos:'huasheng://xcm/system/get_device_infos',
    getUserInfos: 'huasheng://xcm/user/get_user_infos',
    loginActivity:'huasheng://xcm/system/start_activity?ui_name=LoginActivity',
    toast:'huasheng://xcm/system/toast?message=xxx',
    wxText:'huasheng://xcm/share/wx_text?text=',
    shareCall: [
        {
            url:'/share/wx',
            back: 'shareTerrace',
        },
        {
            url:'/share/qq',
            back: 'shareTerrace',
        },
        {
            url:'/share/qq_zone',
            back: 'shareTerrace',
        },
        {
            url:'/share/friend',
            back: 'shareTerrace',
        },
        {
            url:'/user/get_user_infos',
            back: 'shareData',
        },
        {
            url:'/system/get_device_infos',
            back: 'getDevice'
        }
    ],
    shareTerrace: function(back){
        back();
    },
    shareData: function (jsonMessage,obj,call){
        obj.tel_num = jsonMessage.tel_num;
        obj.wx_name = jsonMessage.wx_name;
        call(jsonMessage);
    },
    getDevice: function (jsonMessage,obj){
        obj.local_ip = jsonMessage.local_ip;
    },

}