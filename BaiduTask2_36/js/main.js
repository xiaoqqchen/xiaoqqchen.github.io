/**
 * Created by PC on 2016/4/18.
 */

var rob = new Robot();
var edit = new RobotEdit();

function Init(){
    var startBtn = document.getElementById('start');
    startBtn.addEventListener('click',function(){
        var prev = 0;
        var codes = edit.getCodes();
        edit.updateLine();

        codes.forEach((function(code,i){
            if (code) {
                rob.exec(code,{
                    success: (function () {
                        edit.setFlag(i, 'success');
                        prev = i;
                        edit.clearPreFlag(prev);
                    }).bind(this),
                    fail: (function (err) {
                        console.log(err);
                        if(err && err.match('warning')){
                            edit.setFlag(i, 'warning',err);
                        }else{
                            edit.setFlag(i, 'error',err);
                        }
                    }).bind(this)
                });
            }
        }).bind(this));
    });
}


Init();