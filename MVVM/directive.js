/**
 * 创建指令
 * @param {Object} descriptor 包含指令的解析结果
 *                 - {String} name
 *                 - {Object} def 真正的指令所定义的方法，包括update() bind()等等
 *                 - {String} expression 指令表达式
 *                 - {Array<Object>} [filters]
 *                 - {Object} [modifiers]
 *                 - {Boolean} literal
 *                 - {String} attr
 *                 - {String} arg
 *                 - {String} raw
 *                 - {String} [ref]
 *                 - {Array<Object>} [interp]
 *                 - {Boolean} [hasOneTime]
 * @param {Object} vm         上下文的ViewModel，Vue的实例独享
 * @param {Element} el        指令绑定的元素
 */
function Directive(descriptor, vm, el) {
	this.descriptor = descriptor;
	this.vm = vm;
	this.el = el;
	this.def = descriptor.def;
	this.expression = descriptor.expression;
	this._watcher;
	this._update;
}

/**
 * 在directive中创建watcher函数，并且绑定指令的update函数
 * @return {[type]} [description]
 */
Directive.prototype._bind = function() {
	extend(this, this.def);

	this._watcher = new Watcher(this.vm, this.expression, this.update.bind(this));
}

function extend(obj1, obj2) {
	Object.keys(obj2).forEach(key => {
		obj1[key] = obj2[key];
	});
}


var publicDirectives = {
	text:{

		update:function(newVal) {
			this.el['data'] = newVal;
		}
	},
	model: {
		
	}
}
