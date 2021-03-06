/**
 * Created by PC on 2016/4/11.
 * 这道题很多没做出来...
 * 1.字符判断，正则表达式一定要写对;
 * 2.使用H5中的dataset属性
 * 3.事件绑定，事件冒泡
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {    "北京": 90,
    "上海": 40};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input').value;
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert('城市名必须为中英字符!');
        return;
    }

    var aqi = document.getElementById('aqi-value-input').value;
    if(!aqi.match(/^\d+$/)){
        alert('空气质量参数必须为正整数!');
        return;
    }
    aqiData[city]=aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    var text = '';
    for(var city in aqiData){
        //使用html5中的data-* 属性存储数据，通过dataset获取数据
        text+= '<tr><td>'+city+'</td><td>'+aqiData[city]+'</td><td><button data-city="'+city+'">删除</button></td></tr>'
    }
    table.innerHTML = text;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    delete aqiData[city];
    renderAqiList();
}

function init() {
    var add_btn = document.getElementById('add-btn');
    add_btn.addEventListener('click',addBtnHandle);

    var table = document.getElementById('aqi-table');
    table.addEventListener('click',function(e){
        if(e.target.nodeName == 'BUTTON')
            delBtnHandle(e.target.dataset.city);
    });

    renderAqiList();
}

init();