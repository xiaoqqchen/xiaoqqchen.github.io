/**
 * Created by PC on 2016/4/14.
 */

function Init(){
    Commander.Init();
    var ship1 = new SpaceShip(1,150);
    var ship2 = new SpaceShip(2,200);
    var ship3 = new SpaceShip(3,250);
    var ship4 = new SpaceShip(4,300);
    Mediator.ships.push(ship1);
    Mediator.ships.push(ship2);
    Mediator.ships.push(ship3);
    Mediator.ships.push(ship4);
    util.Animation();
}

Init();