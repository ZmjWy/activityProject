$(function(){function e(){$.ajax({type:"GET",url:ctxs+"/index/h5/getFriendNews?tel_num="+t.tel_num,dataType:"jsonp",jsonp:"callback",jsonpCallback:"getData",success:function(e){100==e.status&&(a=e.invate_code,$("#invate_code").text(e.invate_code),$("#inviteF").text(e.invite_friends),$("#validF").text(e.effective_friends),$("#income").text(e.yaoqing_money),i(e.yaoqing_speed_of_progress),n(e.yaoqing_num_speed_of_progress),$("#withdraw-money").text("￥"+d(e.money_balance)),e.money_balance>0&&($(".withdraw-cash-btn").css({background:"#ffdb01",color:"#e10a08"}),$(".withdraw-cash-btn").on("click",function(){androidObj.callBack(androidObj.takeCashActivity)})))},error:function(e){}})}function i(e){var i="";i=1==e?"6%":2==e?25*(e-1)+3+"%":4==e?"100%":25*(e-1)+"%",$(".schedule-ratio").css({width:i}),e>0&&$(".schedule-logo li").eq(e-1).children().attr("src","http://file.xcmad.com/dist/images/invitefriends-jincheng-02.png").css({width:"0.35rem"});for(var n=e;n>=2;n--)4==e?($(".schedule-logo li").eq(n-1).children().attr("src","http://file.xcmad.com/dist/images/invitefriends-jincheng_01.png"),$(".schedule-logo li").eq(n).children().attr("src","http://file.xcmad.com/dist/images/invitefriends-jincheng_01.png")):$(".schedule-logo li").eq(n-2).children().attr("src","http://file.xcmad.com/dist/images/invitefriends-jincheng_01.png")}function n(e){for(var i=e;i>=1;i--)$(".bonus-section-list li").eq(i-1).css({background:"url(http://file.xcmad.com/dist/images/"+c[i-1]+".png) no-repeat top center/100%"})}var t=new GetQueryString,c=["red-16","red-25.5","red-90","red-142.5","red-200","red-525","red-1100","red-3450","red-61200"],a="";e();var d=function(e){return e+="",e=e.replace(/[^0-9|\.]/g,""),e=e.replace(/^0+/,""),/\./.test(e)||(e+=".00"),/^\./.test(e)&&(e="0"+e),e+="00",e=e.match(/\d+\.\d{2}/)[0]};$(".rules").on("click",function(){androidObj.callBack(androidObj.invitaRuleActivity)}),$(".friendlist").on("click",function(){androidObj.callBack(androidObj.friendListActivity)}),$("#copy-invite").on("click",function(){androidObj.callBack(androidObj.copy+a)})});