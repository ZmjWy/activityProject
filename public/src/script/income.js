function goChart(dataArr){

    // 声明所需变量
    var canvas,ctx;
    // 图表属性
    var cWidth, cHeight, cMargin, cSpace;
    // 饼状图属性
    var radius,ox,oy;//半径 圆心
    var tWidth, tHeight;//图例宽高
    var posX, posY, textX, textY;
    var startAngle, endAngle;
    var totleNb;
    // 运动相关变量
    var ctr, numctr, speed;
    //鼠标移动
    var mousePosition = {};

    //线条和文字
    var lineStartAngle,line,textPadding,textMoveDis;

    // 获得canvas上下文
    canvas = document.getElementById("chartArc");
    if(canvas && canvas.getContext){
        ctx = canvas.getContext("2d");
    }
    initChart();

    // 图表初始化
    function initChart(){
        // 图表信息
        cMargin = 20;
        cSpace = 40;

        // canvas.width = canvas.parentNode.getAttribute("width") ;
        // canvas.height = canvas.parentNode.getAttribute("height");
        canvas.width = document.getElementById('chartBox').offsetWidth*2;
        canvas.height = document.getElementById('chartBox').offsetHeight*2;
        canvas.style.height = canvas.height/2 + "px";
        canvas.style.width = canvas.width/2+ "px";
        cHeight = canvas.height - cMargin*2;
        cWidth = canvas.width - cMargin*2;

        //饼状图信息
        radius = cHeight*2/6;  //半径  高度的2/6
        ox = canvas.width/2 ;  //圆心
        oy = canvas.height/2;
        tWidth = 60; //图例宽和高
        tHeight = 20;
        posX = cMargin;
        posY = cMargin;   //
        textX = posX + tWidth + 15
        textY = posY + 18;
        startAngle = endAngle = 90*Math.PI/180; //起始弧度 结束弧度
        rotateAngle = 0; //整体旋转的弧度

        //将传入的数据转化百分比
        totleNb = 0;
        new_data_arr = [];
        for (var i = 0; i < dataArr.length; i++){
            totleNb += dataArr[i][0];
        }
        for (var i = 0; i < dataArr.length; i++){
            new_data_arr.push( dataArr[i][0]/totleNb );
        }
        totalYNomber = 10;
        // 运动相关
        ctr = 1;//初始步骤
        numctr = 50;//步骤
        speed = 1.2; //毫秒 timer速度

        //指示线 和 文字
        lineStartAngle = -startAngle;
        line=50;         //画线的时候超出半径的一段线长
        textPadding=15;  //文字与线之间的间距
        textMoveDis = 200; //文字运动开始的间距
    }

    //绘制动画
    pieDraw();
    function pieDraw(mouseMove){

        for (var n = 0; n < dataArr.length; n++){
            ctx.fillStyle = ctx.strokeStyle = dataArr[n][1];
            ctx.lineWidth=1;
            var step = new_data_arr[n]* Math.PI * 2; //旋转弧度
            var lineAngle = lineStartAngle+step/2;   //计算线的角度
            lineStartAngle += step;//结束弧度
            console.log(lineAngle)
            ctx.beginPath();
            var  x0=ox+(radius+10)*Math.cos(lineAngle);//圆弧上线与圆相交点的x坐标
            var   y0=oy+(radius+10)*Math.sin(lineAngle);//圆弧上线与圆相交点的y坐标
            // 绘制起始点
            ctx.arc(x0,y0,3,0,2*Math.PI);
            ctx.fillStyle = dataArr[n][1];
            ctx.fill();
            var   x1=ox+(radius+line)*Math.cos(lineAngle);//圆弧上线与圆相交点的x坐标
            var   y1=oy+(radius+line)*Math.sin(lineAngle);//圆弧上线与圆相交点的y坐标
            //判断重叠重置弧度
            if(new_data_arr[n] < 0.06){
                if(x1>=x0 && n>0){
                    x1=ox+(radius+(30+n*7))*Math.cos(lineAngle+0.5);//圆弧上线与圆相交点的x坐标
                    y1=oy+(radius+(30+n*7))*Math.sin(lineAngle+(n*0.3));//圆弧上线与圆相交点的y坐标
                }else if(x1<=x0 && n<(new_data_arr.length-1)){
                    x1=ox+(radius+(30+n*7))*Math.cos(lineAngle-0.5);//圆弧上线与圆相交点的x坐标
                    y1=oy+(radius+(30+n*7))*Math.sin(lineAngle-(1.2-n*0.3));//圆弧上线与圆相交点的y坐标
                }

            }
            var   x2=x1;//转折点的x坐标
            var   y2=y1;
            var   linePadding=ctx.measureText(dataArr[n][2]).width+30; //获取文本长度来确定折线的长度
            ctx.moveTo(x0,y0);
            //对x1/y1进行处理，来实现折线的运动
            yMove = y0+(y1-y0)*ctr/numctr;
            ctx.lineTo(x1,yMove);
            ctx.font="24px Microsoft YaHei";
            if(x1<=x0){
                x2 -= 20;
                ctx.textAlign="right";
                ctx.lineTo(x2-linePadding,yMove);
                ctx.fillText(dataArr[n][2],x2-textPadding-textMoveDis*(numctr-ctr)/numctr,y2-textPadding);
                ctx.fillText(dataArr[n][0],x2-textPadding-textMoveDis*(numctr-ctr)/numctr,y2+30);
            }else{
                x2 += 20;
                ctx.textAlign="left";
                ctx.lineTo(x2+linePadding,yMove);
                ctx.fillText(dataArr[n][2],x2+textPadding+textMoveDis*(numctr-ctr)/numctr,y2-textPadding);
                ctx.fillText(dataArr[n][0],x2+textPadding+textMoveDis*(numctr-ctr)/numctr,y2+30);
            }
            ctx.stroke();
        }

        //设置旋转
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate('3.1415926');

        for (var j = 0; j < dataArr.length; j++){

            //绘制饼图
            endAngle = endAngle + new_data_arr[j]* ctr/numctr * Math.PI * 2; //结束弧度

            ctx.beginPath();
            ctx.moveTo(0,0); //移动到到圆心
            ctx.arc(0, 0, radius*ctr/numctr, startAngle, endAngle, false); //绘制圆弧

            ctx.fillStyle = dataArr[j][1];
            if(mouseMove && ctx.isPointInPath(mousePosition.x*2, mousePosition.y*2)){
                ctx.globalAlpha = 0.8;
            }

            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;

            startAngle = endAngle; //设置起始弧度
            if( j == dataArr.length-1 ){
                startAngle = endAngle = 90*Math.PI/180; //起始弧度 结束弧度
            }
        }
        pieSmall();
        ctx.restore();

        if(ctr<numctr){
            ctr++;
            setTimeout(function(){
                //ctx.clearRect(-canvas.width,-canvas.width,canvas.width*2, canvas.height*2);
                ctx.clearRect(-canvas.width, -canvas.height,canvas.width*2, canvas.height*2);
                pieDraw();
            }, speed*=1.085);
        }
    }
    function pieSmall(){
        //绘制小圆
        ctx.rotate(1*Math.PI);
        ctx.beginPath();
        ctx.arc(0, 0, radius/2, 0, 2*Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
        // 填充文本
        ctx.fillStyle = '#8d8d8d';
        ctx.font="26px Microsoft YaHei";
        ctx.textAlign="center";
        ctx.fillText("预期金币",0,(0-radius/12));
        ctx.fillStyle = '#000';
        ctx.font="26px Microsoft YaHei";
        ctx.fillText(totleNb,0,(0+radius/6));
        ctx.restore();

    }

    //监听鼠标移动
    var mouseTimer = null;
    canvas.addEventListener("mousemove",function(e){
        e = e || window.event;
        if( e.offsetX || e.offsetX==0 ){
            mousePosition.x = e.offsetX;
            mousePosition.y = e.offsetY;
        }else if( e.layerX || e.layerX==0 ){
            mousePosition.x = e.layerX;
            mousePosition.y = e.layerY;
        }

        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            pieDraw(true);
        },10);
    });

}