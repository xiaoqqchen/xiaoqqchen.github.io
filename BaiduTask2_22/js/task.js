
//存储依次遍历的DIV
var state = [];
var IntervalId = 0;

//绘制DIV背景
function Render(){
    setColor(document.getElementById('wapper'));
    var dom = state.shift();
    if(dom!=undefined){
        dom.style.backgroundColor='#00f';
    }else{
        clearInterval(IntervalId);
        IntervalId = 0;
    }
}

//将所有的DIV背景设置为白色
function setColor(dom){
    dom.style.backgroundColor = '#fff';
    if(dom.childElementCount>=1){
        for(var i=0; i< dom.children.length;i++){
            setColor(dom.children[i]);
        }
    }
}
//前序
function preOrder(node){
    if(node!=null){
        state.push(node);
        preOrder(node.children[0]);
        preOrder(node.children[1]);
    }
}
//中序
function inOrder(node){
    if(node!=null){
        inOrder(node.children[0]);
        state.push(node);
        inOrder(node.children[1]);
    }
}
//后序
function postOrder(node){
    if(node!=null){
        postOrder(node.children[0]);
        postOrder(node.children[1]);
        state.push(node);
    }
}

function OrderEvent(order){
    if(IntervalId != 0){
        alert('正在遍历中！');
        return;
    }
    var root = document.getElementById('wapper');
    order(root);
    IntervalId = setInterval(Render,300);
}


function Init(){
    document.getElementById('pre-order').addEventListener('click',function(){
        OrderEvent(preOrder);
    });
    document.getElementById('in-order').addEventListener('click',function(){
        OrderEvent(inOrder);
    });
    document.getElementById('post-order').addEventListener('click',function(){
        OrderEvent(postOrder);
    });
}

Init();