/**
 * Created by PC on 2016/5/4.
 */
define(['require','./Control'],function(require){
    var Control = require('./Control');

    var SortTable = function(){

    };

    SortTable.prototype = {
        constructor:"SortTable",
        test:function(){
            console.log(this.constructor.toString());
        }
    };

    return SortTable;
});