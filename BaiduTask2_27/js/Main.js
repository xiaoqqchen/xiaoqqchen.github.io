/**
 * Created by PC on 2016/4/14.
 */

function Init(){
    //Mediator.Make(Commander);
    BUS.Make(Commander);
    Commander.Init();
    Util.Animation();
}

Init();