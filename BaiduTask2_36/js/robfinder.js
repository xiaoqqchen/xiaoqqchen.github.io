/**
 * Created by PC on 2016/4/19.
 */
var RobotFinder = function(width,height,robMap){
    this.width = width;
    this.height = height;
    this.robMap = robMap;
    //获取墙体
    this.wall = [];
    //判断是否已经走过
    this.walked = [];
};

/**
 * 创建空的二维数组
 * @returns {Array}
 */
RobotFinder.prototype.createEmptyArray = function(){
    var arrays = [];
    for (i = 0; i < this.height; ++i) {
        arrays[i] = new Array(this.width);
        for (j = 0; j < this.width; ++j) {
            arrays[i][j] = 0;
        }
    }
    return arrays;
};

/**
 * 广度优先搜索
 * @param startX
 * @param startY
 * @param endX
 * @param endY
 * @constructor
 */
RobotFinder.prototype.BreadthFirstFinder = function(startX,startY,endX,endY){
    var openList = [], //需要遍历的队列
        startNode = new Node(startX,startY),
        endNode = new Node(endX,endY),
        neighbors, node;
    this.wall = this.robMap.getWall();
    this.walked = this.createEmptyArray();

    if(!this.isWalkAbleAt(endX,endY)){
        throw ('warning 终点不可到达');
    }

    openList.push(startNode);

    while(openList.length){
        node = openList.shift();
        if(this.walked[node.y][node.x] == 1){
            continue;
        }

        this.walked[node.y][node.x] = 1;

        if(node.x === endNode.x && node.y === endNode.y){
            return this.backtrace(node);
        }

        neighbors = this.getNeighbors(node);
        neighbors.forEach(function(neighbor){
            openList.push(neighbor);
            neighbor.parent = node;
        });
    }

    throw ('warning 无法找到路径');
};

/**
 * 获取Node相邻的网格
 * @param node
 * @returns {Array}
 */
RobotFinder.prototype.getNeighbors = function(node){
    var neighbors = [],
        x = node.x,
        y = node.y;

    if(this.isWalkAbleAt(x-1,y)){
        neighbors.push(new Node(x-1,y));
    }
    if(this.isWalkAbleAt(x+1,y)){
        neighbors.push(new Node(x+1,y));
    }
    if(this.isWalkAbleAt(x,y-1)){
        neighbors.push(new Node(x,y-1));
    }
    if(this.isWalkAbleAt(x,y+1)){
        neighbors.push(new Node(x,y+1));
    }

    return neighbors;
};

//判断是否可以走
RobotFinder.prototype.isWalkAbleAt = function(x,y){
    return !(x >= this.width || x < 0 || y >= this.height || y < 0 || this.wall[y][x] || this.walked[y][x]);
};

//回溯完整路径
RobotFinder.prototype.backtrace = function(node){
    var path = [[node.x, node.y]];
    while (node.parent) {
        node = node.parent;
        path.push([node.x, node.y]);
    }
    return path.reverse();
};

/**
 * 打印二维矩阵
 * @param data
 */
RobotFinder.prototype.print = function(data){
    var test = "";
    for(var i=0;i<20;i++){
        test += data[i].join(' ') + '\n';
    }
    console.log(test);
};

/**
 * 网格类
 * @constructor
 */
var Node = function(x,y){
    this.x = x;
    this.y = y;
};


























