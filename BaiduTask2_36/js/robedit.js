/**
 * Created by PC on 2016/4/19.
 * 编辑器
 */
var RobotEdit = function(){
    this.cmdArea = document.querySelector('.cmd-area');
    this.cmdLines = document.querySelector('.cmd-lines');
    //光标所在的行数
    this.lineNum = -1;

    this.cmdArea.addEventListener('input',this.changLineStyle.bind(this));
    this.cmdArea.addEventListener('keyup',this.changLineStyle.bind(this));
    this.cmdArea.addEventListener('mouseup',this.changLineStyle.bind(this));
    this.cmdArea.addEventListener('scroll',this.scroll.bind(this));
    this.cmdLines.addEventListener('mousemove',this.showTip.bind(this));
    this.cmdLines.addEventListener('mouseout',this.closeTip.bind(this));
    this.updateLine();
};

RobotEdit.prototype.changLineStyle = function(){

    var textArea = event.target;
    //获取光标所在的行数
    var lineNum = textArea.value.substr(0, textArea.selectionStart).split("\n").length -1;
    if(lineNum>= 0 && this.lineNum != lineNum){
        this.updateLine();
        this.cmdLines.children[lineNum].style.color = '#fff';
        this.cmdLines.children[lineNum].style.backgroundColor = '#888';
        this.lineNum = lineNum;
    }
};

RobotEdit.prototype.updateLine = function(){
    var html = '';
    var codes = this.cmdArea.value;
    var lines = codes.match(/\n/g);
    lines = lines ? lines.length + 1 : 1;

    for (var l = 1; l <= lines; l++) {
        html += '<div>' + l + '.</div>';
    }

    this.cmdLines.innerHTML = html;
};

RobotEdit.prototype.scroll = function(){
    this.cmdLines.style.top = -event.target.scrollTop + 'px';
};

RobotEdit.prototype.setFlag =function(i,flag,msg){
    this.cmdLines.children[i].dataset.flag = flag;
    this.cmdLines.children[i].dataset.msg = msg;
    this.cmdLines.children[i].className = flag;
};

RobotEdit.prototype.clearPreFlag =function(pre){
    for(var i=0;i<pre;i++){
        var flag = this.cmdLines.children[i].dataset.flag;
        if(flag === 'success'){
            this.cmdLines.children[i].className = '';
        }
    }
};

//获取所有代码，并且进行预处理
RobotEdit.prototype.getCodes = function(){
    return codes = this.cmdArea.value.split(/\n/)
                    .map(function(c){return c.trim();});
};

RobotEdit.prototype.showTip = function(){
    var cmdLine = event.target;
    if(cmdLine.dataset.flag === 'error' || cmdLine.dataset.flag === 'warning'){
        var tip = document.querySelector('.tips');
        tip.innerText = cmdLine.dataset.msg;
        tip.left = event.target.style.left;
        tip.top = event.target.style.top;
        tip.style.display = 'block';
    }
};

RobotEdit.prototype.closeTip = function(){
    var cmdLine = event.target;
    if(cmdLine.dataset.flag === 'error' || cmdLine.dataset.flag === 'warning'){
        var tip = document.querySelector('.tips');
        tip.style.display = 'none';
    }
};















