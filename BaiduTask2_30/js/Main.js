/**
 * Created by PC on 2016/4/15.
 */

function Init(){

    var inputCtls = [];
    inputCtls.push(new ValControl('name'));
    inputCtls.push(new ValControl('password'));
    inputCtls.push(new ValControl('repassword'));
    inputCtls.push(new ValControl('email'));
    inputCtls.push(new ValControl('mobile'));

    var submitBtn = document.getElementById('validate');
    submitBtn.addEventListener('click',function(){
        var result = true;
        for(var i =0;i<inputCtls.length;i++){
            inputCtls[i].inputCtl.focus();
            inputCtls[i].inputCtl.blur();
            result = result && inputCtls[i].getResult();
        }
        if(result){
            alert('提交成功');
        }else{
            alert('提交失败');
        }
    });

}

Init();