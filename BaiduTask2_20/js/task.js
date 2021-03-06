/**
 * Created by PC on 2016/4/12.
 */


var data = [];

function Render(str){
    document.getElementsByClassName('outer')[0].innerHTML=
        data.map(function(d){
                //构造
                if(str != null && str.length>0){
                    d = d.replace(new RegExp(str, "g"),'<span>'+str+'</span>')
                }
                return '<div>'+d+'</div>';
            }
        ).join('');
}

function insertText(){
    var text = document.getElementById('insert-text').value;
    var arr = text.split(/\s|,|，|、/);
    data = data.concat(arr);
    Render();
}

function search(){
    var str  =  document.getElementById('search-text').value.trim();
    Render(str);
}

function Init(){
    //事件绑定
    document.getElementById('insert').addEventListener('click',insertText);
    document.getElementById('search').addEventListener('click',search);

    Render();
}

Init();