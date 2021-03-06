/**
 * Created by PC on 2016/4/15.
 */

function Validate(){
    var nameInput = document.getElementById('name');
    var info = document.getElementById('info');

    var name = nameInput.value.trim();
    var length = getLength(name);
    //验证是否为空
    if(length === 0){
        nameInput.style.borderColor = '#DB061E';
        info.style.color = "#DB061E";
        nameInput.onfocus = function(){
            nameInput.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(219, 6, 30, 0.6)";
        };
        info.innerText = '姓名不能为空';
    }else if(length>=4 && length<=16){
        nameInput.style.borderColor = '#63B94D';
        info.style.color = "#63B94D";
        nameInput.onfocus = function(){
            nameInput.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(99, 185, 77, 0.6)";
        };

        info.innerText = '名称格式正确';
    }else{
        nameInput.style.borderColor = '#DB061E';
        info.style.color = "#DB061E";
        nameInput.onfocus = function(){
            nameInput.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(219, 6, 30, 0.6)";
        };
        info.innerText = '必填，长度为4~16个字符';
    }
    nameInput.onblur = function(){
        nameInput.style.boxShadow = "inset 0 1px 1px rgba(0,0,0,.075)";
    };

}

function getLength(str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}