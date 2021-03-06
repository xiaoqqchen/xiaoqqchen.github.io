/**
 * Created by PC on 2016/4/12.
 */


var queue = [];
//保存排序的临时变量
var state = [];

function getRandomNum(){
    queue = [];
    while(queue.length<40){
        var temp = Math.floor(Math.random()*100);
        if(temp<10){
            continue;
        }
        queue.push(temp);
    }
    Render();
}

function Render(){
    var dom = document.getElementsByClassName('outer')[0];
    dom.innerHTML = "";
    var data = state.shift() || queue;
    for(var i=0;i<data.length;i++){
        var div = document.createElement('DIV');
        div.innerText = data[i];
        div.style.height = data[i] + '%';
        div.style.left = i*20 + 'px';
        div.style.backgroundColor = setColor(data[i]);
        dom.appendChild(div);
    }
}

function setColor(num){
    var color = "";
    if(num<15){
        color = '#79b800';
    }else if(num<30){
        color = '#ffbb17';
    }else if(num<45){
        color = '#c67901';
    }else if(num<60){
        color = '#eb111b';
    }else if(num<80){
        color = '#b3065b';
    }else{
        color = '#600202';
    }
    return color;
}

function getNum(){
    var dom = document.getElementById('number');
    return dom.value;
}

function leftIn(){
    var value = getNum();
    if(!value.match(/^100|[1-9][0-9]$/)){
        alert('必须输入10-100内数字！');
        return;
    }
    if(queue.length>60){
        alert('至多60个数字');
        return;
    }
    queue.unshift(Number(value));
    Render();
}

function rightIn(){
    var value = getNum();
    if(!value.match(/^100|[1-9][0-9]$/)){
        alert('必须输入10-100内数字！');
        return;
    }
    if(queue.length>60){
        alert('至多60个数字');
        return;
    }
    queue.push(Number(value));
    Render();
}

function leftOut(){
    queue.shift();
    Render();
}

function rightOut(){
    queue.pop();
    Render();
}

function clickOut(index){
    queue.splice(index,1);
    Render();
}

function bubbleSort(){
    for(var i=0;i<queue.length;i++){
        for(var j=i+1;j<queue.length;j++){
            if(queue[i]>queue[j]){
                var temp =  queue[i];
                queue[i] = queue[j];
                queue[j] = temp;
                state.push(JSON.parse(JSON.stringify(queue)));
            }
        }
    }
}

function Init(){
    //生成随机数据
    getRandomNum();

    //事件绑定
    document.getElementById('left-in').addEventListener('click',leftIn);
    document.getElementById('right-in').addEventListener('click',rightIn);
    document.getElementById('left-out').addEventListener('click',leftOut);
    document.getElementById('right-out').addEventListener('click',rightOut);
    document.getElementsByClassName('outer')[0].addEventListener('click',function(e){
        var node = e.target;
        if(!node.className.match('outer')){
            clickOut(Array.prototype.indexOf.call(node.parentNode.childNodes,node));
        }
    });
    document.getElementById('random').addEventListener('click',getRandomNum);
    document.getElementById('sort').addEventListener('click',function(){
        bubbleSort();
        setInterval(Render,50);
    });
    Render();
}

Init();