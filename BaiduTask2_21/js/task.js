/**
 * Created by PC on 2016/4/12.
 */


var tag = [];
var hobby = [];

function renderTag(){
    document.getElementById('tag').innerHTML=
        tag.map(function(d){return '<div>'+d+'</div>';}).join('');
}

function insertTag(){
    if(event.target.value.match(/\s|,/) || event.keyCode==13){
        var arr = event.target.value.split(/\s|,/);
        //去除数组的空格和空元素
        arr = arr.map(function(a){return a.trim();}).filter(function (a) {
            return a!="";
        });
        tag = tag.concat(arr);

        //删除数组中的空元素，并且只取后十个元素，把前面元素删除
        var temp ={};
        var length = 0;
        for(var i=tag.length-1;i>=0;i--){
            if(typeof(temp[tag[i]])== 'undefined'){
                temp[tag[i]] = length++;
                if(length>=10){
                    break;
                }
            }
        }
        tag = [];
        for(var t in temp){
            tag.push(t);
        }
        tag = tag.reverse();

        renderTag();
        event.target.value = '';
    }
}

function mouseOverTag(){
    var node = event.target;
    if(node &&!node.className.match('outer')){
        node.innerText = '点击删除'+node.innerText;
        node.style.backgroundColor = "#f00";
    }
}

function mouseOutTag(){
    var node = event.target;
    if(node && !node.className.match('outer')){
        node.innerText= node.innerText.replace('点击删除',"");
        node.style.backgroundColor = "";
    }
}

function clickTag(){
    var node = event.target;
    if(node && !node.className.match('outer')){
        var index = [].indexOf.call(node.parentNode.childNodes,node);
        tag.splice(index,1);
        renderTag()
    }
}

function renderHobby(){
    document.getElementById('hobby').innerHTML=
        hobby.map(function(d){return '<div>'+d+'</div>';}).join('');
}


function insertHobby(){
        var node = document.getElementById('hobby-text');

        var arr = node.value.split(/\s|,|，|、/);
        //去除数组的空格和空元素
        arr = arr.map(function(a){return a.trim();}).filter(function (a) {
            return a!="";
        });
        hobby = hobby.concat(arr);

        //删除数组中的空元素，并且只取后十个元素，把前面元素删除
        var temp ={};
        var length = 0;
        for(var i=hobby.length-1;i>=0;i--){
            if(typeof(temp[hobby[i]])== 'undefined'){
                temp[hobby[i]] = length++;
                if(length>=10){
                    break;
                }
            }
        }
        hobby = [];
        for(var t in temp){
            hobby.push(t);
        }
        hobby = hobby.reverse();

        renderHobby();
        node.value = '';
}

function Init(){
    //事件绑定
    document.getElementById('tag-text').addEventListener('keyup',insertTag);
    document.getElementById('tag').addEventListener('mouseover',mouseOverTag);
    document.getElementById('tag').addEventListener('mouseout',mouseOutTag);
    document.getElementById('tag').addEventListener('click',clickTag);
    document.getElementById('hobby-insert').addEventListener('click',insertHobby);

}

Init();