var androidObj={callBack:function(e){window.webJsBridge.request(e)},addUrl:function(e){var t="";t="wx"==e.device&&""!=e.wxName?e.wxName+"邀请你一起抽大奖":"小花生邀请你一起抽大奖";var a=e.type+"title="+encodeURIComponent(t)+"&image_url="+encodeURIComponent(e.image)+"&url="+encodeURIComponent(shareCtx+e.url)+"&share="+encodeURIComponent(e.share);return a},shortcutWx:"huasheng://xcm/invitation/shortcutWx",shortcutFace:"huasheng://xcm/invitation/shortcutFace",shortcutFriend:"huasheng://xcm/invitation/shortcutFriend",shortcutWxAll:"huasheng://xcm/invitation/shortcutWxAll",shortcutQq:"huasheng://xcm/invitation/shortcutQq",shortcutDx:"huasheng://xcm/invitation/shortcutDx",invitaRuleActivity:"huasheng://xcm/system/start_activity?ui_name=InvitaRuleActivity",takeCashActivity:"huasheng://xcm/system/start_activity?ui_name=TakeCashActivity",userMoney:"huasheng://xcm/system/start_activity?ui_name=UserMoneyDetailActivity",friendListActivity:"huasheng://xcm/system/start_activity?ui_name=FriendListActivity",webCommonActivity:"huasheng://xcm/system/start_activity?ui_name=WebCommonActivity&url=",mainActivityTv:"huasheng://xcm/system/start_activity?ui_name=MainActivity&tab_index=1",mainActivityNew:"huasheng://xcm/system/start_activity?ui_name=MainActivity&tab_index=0",copy:"huasheng://xcm/system/copy?content=",shareFriend:"huasheng://xcm/share/friend?",shareWx:"huasheng://xcm/share/wx?",shareQq:"huasheng://xcm/share/qq?",shareZone:"huasheng://xcm/share/qq_zone?",getDeviceInfos:"huasheng://xcm/system/get_device_infos",getUserInfos:"huasheng://xcm/user/get_user_infos",loginActivity:"huasheng://xcm/system/start_activity?ui_name=LoginActivity",toast:"huasheng://xcm/system/toast?message=xxx",wxText:"huasheng://xcm/share/wx_text?text=",shareCall:[{url:"/share/wx",back:"shareTerrace"},{url:"/share/qq",back:"shareTerrace"},{url:"/share/qq_zone",back:"shareTerrace"},{url:"/share/friend",back:"shareTerrace"},{url:"/user/get_user_infos",back:"shareData"},{url:"/system/get_device_infos",back:"getDevice"}],shareTerrace:function(e){e()},shareData:function(e,t,a){t.tel_num=e.tel_num,t.wx_name=e.wx_name,a(e)},getDevice:function(e,t){t.local_ip=e.local_ip}};