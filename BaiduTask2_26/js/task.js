/**
 * Created by PC on 2016/4/14.
 */
//观察者模式
//观察者模式分为推送和拉动两类，推送模式是由发行商负责将消息通知给各个订阅者，以下为推送模式实例
var observer={//观察这对象
    addSubscriber:function(callback){
        this.subscribers[this.subscribers.length]=callback;
    },//添加订阅者
    removeSubscriber:function(callback){
        for(var i=0;i<this.subscribers.length;i++){
            if(this.subscribers[i]===callback){
                delete(this.subscribers[i]);
            }
        }
    },//移除订阅者
    publish:function(what){
        for(var i=0; i<this.subscribers.length;i++){
            if(typeof this.subscribers[i]==='function'){
                this.subscribers[i](what);//广播信息后会传给每个订阅者
            }
        }
    },//接受并传递数据给订阅者
    make:function(o){
        for(var i in this){
            o[i]=this[i];
            o.subscribers=[];
        }
    }//将任意对象转化为发行商，并赋予以上三种方法，即获取添加、移除订阅者功能以及推送消息功能
};

var blogger={
    writeBlogPost:function(){
        var content='Today is '+new Date();
        this.publish(content);//为成为发行商广播信息做准备的步骤
    }
};
observer.make(blogger);//构造blogger为发行商

var jack={
    read:function (what){
        console.log('I just read that '+what);
    }
};//准备一个潜在订阅者
blogger.addSubscriber(jack.read);//添加订阅者,注意传送的是函数，这样在订阅者publish函数中就能调用订阅者的函数
blogger.writeBlogPost();//发布信息给订阅者
blogger.removeSubscriber(jack.read);//移除订阅者