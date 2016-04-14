/**
 * Created by PC on 2016/4/14.
 */

Commander = {
    Init:function(){
        var controls = document.getElementById('control');
        controls.addEventListener('click',function(){
            var node = event.target;
            if(node.tagName.toLowerCase() == "input"){
                Mediator.BroadCast({
                    id:node.parentNode.dataset.id,
                    command:node.dataset.cmd
                });
            }
        });
    }
};