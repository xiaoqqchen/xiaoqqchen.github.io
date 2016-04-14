/**
 * Created by PC on 2016/4/14.
 * 飞船类
 */
function SpaceShip(id,radius){
    this.id = id;
    this.radius = radius;
    this.Init();
}

//飞船初始化函数
SpaceShip.prototype.Init = function(){
    //飞船显示或隐藏
    this.show = false;
    //飞船飞行或停止
    this.status = 'stop';
    this.degree = 0;
    this.speed = 10/this.radius;
    this.node = document.querySelector('#spaceship'+this.id);
    this.node.firstElementChild.style.display = 'none';
    this.node.style.transform = 'rotate('+this.degree+'rad)';
};

SpaceShip.prototype.Start = function(){
    if(this.show){
        this.status = 'fly';
    }
};

SpaceShip.prototype.Stop = function(){
    if(this.show){
        this.status = 'stop';
    }
};

SpaceShip.prototype.Create = function(){
    if(!this.show){
        this.node.firstElementChild.style.display = 'block';
        this.show = true;
    }
};

SpaceShip.prototype.Destroy = function(){
    if(this.show) {
        this.Init();
        this.node.firstElementChild.style.display = 'none';
        this.show = false;
    }
};

SpaceShip.prototype.Fly = function(){
    if(this.status == 'fly'){
        this.degree += this.speed;
        this.node.style.transform = 'rotate('+this.degree+'rad)';
    }
};

SpaceShip.prototype.ReceiveCommand = function(cmd){
    switch (cmd){
        case "Start":
            this.Start();
            break;
        case "Stop":
            this.Stop();
            break;
        case "Create":
            this.Create();
            break;
        case "Destroy":
            this.Destroy();
            break;
    }
};


















