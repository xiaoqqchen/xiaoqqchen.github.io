//这个代码有点烂...感觉问题太多了


var state = [], //存储依次遍历的DIV
    IntervalId = 0,
    text='', //存储搜索关键字
    searchResult = [], //存储搜索结果
    selectNode = null, //存储选择的节点
    wrapNode = document.getElementById('wrap'); //DOM树根节点

//绘制DIV背景
function Render(){
    setBgColor(wrapNode);
    var node = state.shift();
    if(node!=undefined){
        node.style.backgroundColor='#00f';
        //查找该元素是否为搜索结果中的元素
        if(!searchResult.every(function(sr){
                return sr!= node;
            })){
            node.style.color = '#f00';
            if(node.style.display == 'none'){
                var parentNode = node.parentNode;
                for(var i=0;i<parentNode.children.length;i++){
                    parentNode.children[i].style.display = 'block';
                }
                parentNode.style.backgroundImage = 'url(img/箭头1.png)';
            }
        }
    }else{
        clearInterval(IntervalId);
        IntervalId = 0;

        if(searchResult.length==0 && text!=""){
            alert('未找到该元素！');
        }
        //清空搜索结果
        searchResult.length = 0;
        text = "";
    }
}

//将所有的DIV背景设置为白色
function setBgColor(node){
    node.style.backgroundColor = '#fff';
    if(node!=null){
        for(var i=0; i< node.children.length;i++){
            setBgColor(node.children[i]);
        }
    }
}

//将所有的字体颜色为黑色，叶子节点背景图片为空
function setColor(node){
    node.style.color = '#000';
    if(node.children.length == 0){
        node.style.backgroundImage = 'none';
    }
    if(node!=null){
        for(var i=0; i< node.children.length;i++){
            setColor(node.children[i]);
        }
    }
}

//深度优先搜索
function dfOrder(node,text){
    if(node!=null){
        state.push(node);

        if(node.firstChild != null &&
            node.firstChild.textContent.trim() == text) {
            searchResult.push(node);
        }
        for(var i=0; i< node.children.length;i++){
            this.dfOrder(node.children[i],text);
        }
    }
}

function OrderEvent(order,text){
    if(IntervalId != 0){
        alert('正在遍历中！');
        return;
    }

    order(wrapNode,text);

    setColor(wrapNode);
    IntervalId = setInterval(Render,300);
}

function addNode(){
    if(selectNode == null){
        alert('请选择元素！');
        return;
    }

    var text = document.getElementById('node-text').value.trim();
    var node = document.createElement('DIV');
    node.innerText = text;
    selectNode.appendChild(node);
}

function delNode(){
    if(selectNode == null){
        alert('请选择元素！');
        return;
    }
    selectNode.parentNode.removeChild(selectNode);
    selectNode = null;
}

function Init(){
    document.getElementById('order').addEventListener('click',function(){
        OrderEvent(dfOrder);
    });
    document.getElementById('search').addEventListener('click',function(){
        text = document.getElementById('search-text').value.trim();
        if(text!=""){
            OrderEvent(dfOrder,text);
        }
    });
    wrapNode.addEventListener('click',function(){
        selectNode = event.target;
        setBgColor(wrapNode);
        selectNode.style.backgroundColor = '#fe0';
        if(selectNode.children !==  null){
            for(var i=0;i< selectNode.children.length;i++){
                var child = selectNode.children[i];
                if(child.style.display !== 'none'){
                    child.style.display = 'none';
                    selectNode.style.backgroundImage = 'url(img/箭头2.png)';
                }else{
                    child.style.display = 'block';
                    selectNode.style.backgroundImage = 'url(img/箭头1.png)';
                }
            }

        }
    });

    document.getElementById('del-node').addEventListener('click',delNode);
    document.getElementById('add-node').addEventListener('click',addNode);

    setColor(wrapNode);
    setBgColor(wrapNode);
}

Init();