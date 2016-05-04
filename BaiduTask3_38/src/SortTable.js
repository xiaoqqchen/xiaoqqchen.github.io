/**
 * Created by PC on 2016/5/4.
 */
define(function(require){
    var T = baidu;
    var Control = require('./Control');

    /**
     * ��a��arr�е�index�������п��ﻯ
     * @param arr
     * @returns {Function}
     */
    function index(arr){
        return function(a){
            var contain = arr.map(function(h){
                return h.name === a;
            });

            return contain.indexOf(true);
        };
    }


    /**
     * ����aqi��ʾ��ɫ
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

    var SortTable = function(){
        this.constructor.superClass.constructor.apply(this, arguments);
    };

    SortTable.prototype = {
        type:"SortTable",

        options: {

            main: '',

            data : [],
            header:[]
        },

        binds: 'onClick',

        init: function (options) {
            options = this.setOptions(options);

            //����һ�������������ֶ����ƣ������ֶ���header�ж�Ӧ��index
            options.indexOf = index(options.header);

            //����������ѡ���õ�header�ж�Ӧ������
            options.data = options.data.map(function(aqi){
                var arr = [];
                for(var a in aqi){
                    var index = options.indexOf(a);
                    if(index>=0){
                        arr[index] = aqi[a];
                    }
                }
                return arr;
            });

            this.disabled  = options.disabled;
            this.main = options.main && T.g(options.main);
            T.on(this.main, 'click', this.onClick);
        },

        render: function(){
            if (!this.main) {
                throw new Error('invalid main');
            }

            var main = this.main;
            main.innerHTML = this.build();
        },

        build: function(){
            var options = this.options;
            var data    = options.data; //ԭʼ����
            var header  = options.header; //����

            var thead   = header.map(function(h){
                var pre ="";
                if(h.sort ===undefined){
                    pre  = "<th data-name ="+h.name+">";
                }else{
                    pre  = "<th data-name ="+h.name+" data-sort="+h.sort+">";
                }

                return pre + h.label + "</th>";
            }).join('');
            thead = "<thead>" + thead + '</thead>';

            var tbody = data.map(function(d){
                if(d){
                    var aqiIndex = options.indexOf('aqi');
                    var color = setColor(d[aqiIndex]);


                    return "<tr style='background:"+color+"'><td>" + d.join('</td><td>') + "</td></tr>";
                }
            }).join('');

            return "<table>" + thead+ tbody + "</table>";
        },

        fill:function(value){
            var option = this.options;
            var data = value.map(function(aqi){
                var arr = [];
                for(var a in aqi){
                    var index = option.indexOf(a);
                    if(index>=0){
                        arr[index] = aqi[a];
                    }
                }
                return arr;
            });

            this.options.data = this.options.data.concat(data);
        },

        onClick: function (e) {
            var target = T.event.getTarget(e);
            if(target.tagName !== 'TH' || target.dataset.sort ===undefined){
                return;
            }

            var options = this.options;
            var data    = options.data;
            var header  = options.header;
            var sort    = target.dataset.sort;
            var indexOf = options.indexOf;
            var index   = indexOf(target.dataset.name);

            data.sort(function(d1,d2){
                return (d1[index] - d2[index])*sort;
            });

            header[index].sort *= -1;
            console.log(target);
            this.render();
        }

    };

    T.inherits(SortTable, Control);

    return SortTable;
});