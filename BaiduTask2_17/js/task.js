/**
 * Created by PC on 2016/4/11.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementsByClassName('aqi-chart-wrap')[0];
    chart.innerHTML = [];
    var lineWidth = 0;
    var borderWidth = 1;
    if(pageState.nowGraTime=='day'){
        lineWidth = 1/91;
    }else if(pageState.nowGraTime=='week'){
        lineWidth = 1/14;
        borderWidth = 5;
    }else if(pageState.nowGraTime=='month'){
        lineWidth = 1/3;
        borderWidth = 50;
    }
    var count=0;
    for(var data  in chartData){
        var div = document.createElement('DIV');
        div.style.height=chartData[data]/600*100+"%";
        div.style.width =lineWidth*100+"%";
        div.style.left = lineWidth*100*count+"%";
        div.style.borderWidth = borderWidth;
        div.style.borderBottomWidth=0;
        div.style.backgroundColor = setColor(chartData[data]);
        div.title =data+ ":"+chartData[data];
        chart.appendChild(div);
        count++;
    }
}

/**
 * 根据aqi显示颜色
 */
function setColor(aqi){
    var color = "";
    if(aqi<50){
        color = '#79b800';
    }else if(aqi<100){
        color = '#ffbb17';
    }else if(aqi<150){
        color = '#c67901';
    }else if(aqi<200){
        color = '#eb111b';
    }else if(aqi<300){
        color = '#b3065b';
    }else{
        color = '#600202';
    }
    return color;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(graTime) {
    // 确定是否选项发生了变化
    if(graTime ==pageState.nowGraTime){
        return;
    }

    // 设置对应数据
    pageState.nowGraTime =graTime;
    initAqiChartData();

    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化
    if(pageState.nowSelectCity==city){
        return;
    }
    // 设置对应数据
    pageState.nowSelectCity = city;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var dom = document.getElementsByName('gra-time');
    for(var i=0;i<dom.length;i++){
        var d = dom[i];
        d.addEventListener('click',function(e){
            graTimeChange(e.target.value);


        });
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var text = '';
    for(var city in aqiSourceData){
        text += '<option>'+city+'</option>'
    }
    var select = document.getElementById('city-select');
    select.innerHTML =text;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.addEventListener('change',function(e){
        citySelectChange(e.target.value);
    });
}

/*
 * 求数组的平均值
 */
function avg(arr){
    var sum = arr.reduce(function(previous, current){
        current += previous;
        return current;
    });
    return Math.floor(sum / arr.length);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = [];
    var nowData = aqiSourceData[pageState.nowSelectCity];

    //存储第n周/月
    var count = 0;
    //存储周/月临时数据
    var tempData = [];
    //星期n/第几个月
    var index=0;
    var day;

    if(pageState.nowGraTime == 'day'){
        chartData = nowData;
    }else if(pageState.nowGraTime == 'week'){
        //计算周平均
        for(day  in nowData){
            index = new Date(day).getDay();
            //是否为周日
            if(index == 0){
                chartData["第"+(count+1)+"周"] = avg(tempData);
                count++;
                tempData = [];
                tempData.push(nowData[day]);
            }else{
                tempData.push(nowData[day]);
            }
        }

        if(tempData.length!=0){
            chartData["第"+(count+1)+"周"] = avg(tempData);
        }
    }else if(pageState.nowGraTime == 'month'){
        //计算月平均
        for(day  in nowData){
            index = new Date(day).getMonth();
            if(index != count){
                chartData["第"+(count+1)+"月"] = avg(tempData);
                count++;
                tempData = [];
                tempData.push(nowData[day]);
            }else{
                tempData.push(nowData[day]);
            }
        }
        if(tempData.length!=0){
            chartData["第"+(count+1)+"月"] = avg(tempData);
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();















