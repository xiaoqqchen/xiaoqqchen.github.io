/**
 * Created by PC on 2016/4/14.
 */
Mediator = {
    ships:[],
    BroadCast:function(message){
        if(Math.random()>0.3){
            //将命令广播给所有飞船
            for(var i=0;i<this.ships.length;i++){
                setTimeout(this.ships[i].ReceiveCommand(message),1000);
            }
            util.Log(message,'green','命令传送成功');
        }else{
            util.Log(message,'#f00','命令传送失败');
        }
    }
};

util = {
    Draw:function(){
        for(var i=0;i<Mediator.ships.length;i++){
            Mediator.ships[i].Fly();
        }
    },
    Animation:function(){
        setInterval(this.Draw,100);
    },
    //记录日志
    Log:function(message,color,type){
        var logWindow = document.getElementById('log');
        var mes = document.createElement('P');
        mes.innerHTML =  '<span>'+this.GetNowTime()+":</span>  "+type+" "+message.command+" "+message.id+"号飞船";
        mes.style.color = color;
        logWindow.appendChild(mes);
        logWindow.scrollTop = logWindow.scrollHeight;
    },
    GetNowTime:function(){
        var dtCur = new Date();
        var yearCur = dtCur.getFullYear();
        var monCur = dtCur.getMonth() + 1;
        var dayCur = dtCur.getDate();
        var hCur = dtCur.getHours();
        var mCur = dtCur.getMinutes();
        var sCur = dtCur.getSeconds();
        timeCur = yearCur + "-" + (monCur < 10 ? "0" + monCur : monCur) + "-"
            + (dayCur < 10 ? "0" + dayCur : dayCur) + " " + (hCur < 10 ? "0" + hCur : hCur)
            + ":" + (mCur < 10 ? "0" + mCur : mCur) + ":" + (sCur < 10 ? "0" + sCur : sCur);
        //alert(timeCur);// 输出时间
        return timeCur;
    }

};