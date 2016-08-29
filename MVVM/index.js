function Vue(option) {
    this.option = option || {};
    this._data = option.data;
    this.el = option.el;
    this._directives = [];
    observer(this._data);

    Object.keys(this._data).forEach((function(key) {
        this._proxy(key);
    }).bind(this));

    this._compile(this.el);
}

Vue.prototype.$watch = function(expOrFn, cb) {
    new Watcher(this, expOrFn, cb);
}

/**
 * [_proxy 为_data的每个元素设置代理，并且将其提升至vue实例中]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
Vue.prototype._proxy = function(key) {
    Object.defineProperty(this, key, {
        get: function getProxy() {
            return this._data[key];
        },
        set: function setProxy(newVal) {
            this._data[key] = newVal;
        }
    });
}

Vue.prototype._compile = function(el){
	compile(this.el, this);
}

Vue.prototype._bindDir = function(token, node) {
    var directive = new Directive(token.descriptor, this, node);
    directive._bind();

    this._directives.push(directive);
};

function Observer(value) {
    this.value = value;
    this.walk(value);
}

Observer.prototype.walk = function(value) {
    var that = this;
    Object.keys(value).forEach(function(key) {
        that.convert(that.value, key, that.value[key]);
    });
}

Observer.prototype.convert = function(vm, key, value) {
    defineReactive(vm, key, value);
}

function observer(value) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
}

function defineReactive(vm, key, value) {
    var dep = new Dep(); //每一个value都有watcher管理器，存放在闭包中
    var childOb = observer(value);

    Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: true,
        get: function getReactive() {
            console.log('get value');
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return value;
        },
        set: function setReactive(newVal) {
            console.log('set value');

            if (newVal === value) {
                return;
            }

            childOb = observer(newVal);
            value = newVal;

            dep.notify();
        }
    })
}

function Dep() {
    this.sub = [];
}

Dep.prototype.addSub = function(watcher) {
    this.sub.push(watcher);
}

Dep.prototype.notify = function() {
    this.sub.forEach(function(s) {
        s.update();
    });
}

function Watcher(vm, expOrFn, cb) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.value = this.get();
    this.run();
}

Watcher.prototype.update = function() {
    this.run();
}

Watcher.prototype.run = function() {
    var oldValue = this.value;
    this.value = this.get();

    this.cb.call(this.vm, this.value, oldValue);
}

Watcher.prototype.get = function() {
    Dep.target = this;

    //调用get方法，将watcher绑定到Observer上
    var value = this.vm[this.expOrFn];
    Dep.target = null;

    return value;
}

