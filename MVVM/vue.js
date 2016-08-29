function installGlobalAPI(vue){
    Vue.option = {
        directives: publicDirectives
    }
}

function Vue(option) {
    this.option = option || {};

    this._data = option.data;

    this.el = option.el;
    this._initData(this._data);
}

Vue.prototype._initData = function(data) {
    Object.keys(data).forEach(key => {
        this._proxy(key);
    });
};

Vue.prototype._proxy = function(key) {
    var self = this;
    Object.defineProperty(this, key, {
        get: function proxyGetter() {
            return self._data[key];
        },
        set: function proxySetter(newVal) {
            self._data[key] = newVal;
        }
    })
};


function Observer(value) {
    this.value = value;

    this.walk(this.value);
}

Observer.prototype.walk = function(obj) {
    Object.keys(obj).forEach(key => {
        this.convert(key, obj[key]);
    });
}

Observer.prototype.convert = function(key, val) {
    defineReactive(this.value, key, val);
}

function defineReactive(obj, key, val) {

    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {

        },
        set: function reactiveSetter(newVal) {

        }
    })
}

function Dep(){
	
}