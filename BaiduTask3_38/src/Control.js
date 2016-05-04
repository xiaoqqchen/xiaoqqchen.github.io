/**
 * ZXUI (Zhixin UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file �ؼ�����
 * @author chris(wfsr@foxmail.com)
 */

define(function (require) {

    var T = baidu;
    var EVENT = T.event;

    /**
     * ��ȡĿ��Ԫ��ָ��Ԫ��className���������Ԫ��
     * @name baidu.dom.getAncestorByClass
     * @function
     * @grammar baidu.dom.getAncestorByClass(element, className)
     * @param {(HTMLElement | string)} element Ŀ��Ԫ�ػ�Ŀ��Ԫ�ص�id
     * @param {string} className ����Ԫ�ص�class��ֻ֧�ֵ���class
     * @remark ʹ����Ӧ��֤�ṩ��className�Ϸ��ԣ���Ӧ�������Ϸ��ַ���
     * className�Ϸ��ַ��ο���http://www.w3.org/TR/CSS2/syndata.html��
     * @see baidu.dom.getAncestorBy,baidu.dom.getAncestorByTag
     *
     * @returns {(HTMLElement | null)} ָ��Ԫ��className���������Ԫ�أ�
     * ���Ҳ���ʱ����null
     */
    T.dom.getAncestorByClass = T.dom.getAncestorByClass
        || function (element, className) {
            // from Tangram 1.5.2.2
            element = baidu.dom.g(element);
            className = new RegExp(
                '(^|\\s)'
                + baidu.string.trim(className)
                + '(\\s|\x24)'
            );

            while ((element = element.parentNode) && element.nodeType === 1) {
                if (className.test(element.className)) {
                    return element;
                }
            }

            return null;
        };

    var eventFilter = EVENT._eventFilter = EVENT._eventFilter || {};



    /**
     * �¼�����������/�뿪Ԫ�����򴥷�һ�Σ��������Ԫ�������ڲ��ƶ���ʱ�򲻻ᴥ����
     * ����Ϊ��IE��������mouseleave/mouseenter֧�֡�
     *
     * @name baidu.event._eventFilter._crossElementBoundary
     * @function
     * @param {Function} listener   Ҫ�����ĺ���
     * @param {DOMEvent} e          DOM�¼�
     */
    eventFilter._crossElementBoundary = eventFilter._crossElementBoundary
        || function (listener, e) {
            var related = e.relatedTarget,
                current = e.currentTarget;
            if (related === false
                    // ���current��related����body��contains�����᷵��false
                || current === related
                    // Firefox��ʱ���XULԪ����ΪrelatedTarget
                    // ��ЩԪ�ز��ܷ���parentNode����
                    // thanks jquery & mootools
                || (related && (related.prefix === 'xul'
                    //���current����related��˵��û�о���current�ı߽�
                || baidu.dom.contains(current, related)))
            ) {
                return;
            }
            return listener.call(current, e);
        };


    /**
     * Ϊ����󶨷�����������
     *
     * @name baidu.fn.bind
     * @function
     * @param {(Function | string)} handler Ҫ�󶨵ĺ���������һ�����������¿��õĺ�����
     * @param {Object} obj ִ������ʱthis�����������������ʱthisΪ��������
     * @param {...*} args ����ִ��ʱ���ӵ�ִ��ʱ����ǰ��Ĳ���
     * @version 1.3
     *
     * @returns {Function} ��װ��ĺ���
     */
    T.fn.bind = T.fn.bind
        || function (func, scope) {
            var xargs = arguments.length > 2
                ? [].slice.call(arguments, 2) : null;

            return function () {
                var fn = baidu.lang.isString(func) ? scope[func] : func;
                var args = (xargs)
                    ? xargs.concat([].slice.call(arguments, 0))
                    : arguments;
                return fn.apply(scope || fn, args);
            };
        };



    /**
     * ����Ϊ��IE��������mouseenter��֧��;
     * mouseenter�¼�����������Ԫ�����򴥷�һ��,
     * �������Ԫ���ڲ��ƶ���ʱ�򲻻��δ���.
     */
    eventFilter.mouseenter = window.attachEvent
        ? null
        : eventFilter.mouseenter
    || function (element, type, listener) {
        return {
            type: 'mouseover',
            listener: baidu.fn.bind(
                eventFilter._crossElementBoundary,
                this,
                listener
            )
        };
    };



    /**
     * ����Ϊ��IE��������mouseleave��֧��;
     * mouseleave�¼���������Ƴ�Ԫ�����򴥷�һ��,
     * �������Ԫ�������ڲ��ƶ���ʱ�򲻻ᴥ��.
     */
    eventFilter.mouseleave = window.attachEvent
        ? null
        : eventFilter.mouseleave || function (element, type, listener) {
        return {
            type: 'mouseout',
            listener: baidu.fn.bind(
                EVENT._eventFilter._crossElementBoundary,
                this,
                listener
            )
        };
    };


    /**
     * ��ȡ���������
     *
     * @return {number} ���������
     */
    T.page.getScrollLeft = T.page.getScrollLeft || function () {
            var d = document;
            return (window.pageXOffset
            || d.documentElement.scrollLeft
            || d.body.scrollLeft);
        };
    /**
     * ��ѯ������ָ��Ԫ�ص�����λ��
     *
     * @private
     * @param {Array} source ��Ҫ��ѯ������
     * @param {*} match ��ѯ��
     * @returns {number} ָ��Ԫ�ص�����λ�ã���ѯ����ʱ����-1
     */
    var indexOf = function (source, target) {
        var index = -1;

        for (var i = 0, l = source.length; i < l; i++) {
            if (source[i] === target) {
                index = i;
                break;
            }
        }

        return index;
    };

    if (!T.array.indexOf) {
        T.array.indexOf = indexOf;
    }



    /**
     * �ؼ�����
     *
     * ֻ�ɼ̳У�����ʵ����
     * @constructor
     * @exports Control
     * @fires module:Control#beforeinit
     * @fires module:Control#afterinit
     */
    var Control = function () {

        this.children = [];
        this._listners = {};

        /**
         * @event module:Control#beforeinit
         */
        this.fire('beforeinit');

        this.bindEvents(this.binds);
        this.init.apply(this, arguments);

        /**
         * @event module:Control#beforeinit
         */
        this.fire('afterinit');

    };


    Control.prototype = {

        constructor: Control,

        /**
         * �ؼ����ͱ�ʶ
         *
         * @private
         * @type {string}
         */
        type: 'Control',

        /**
         * �ؼ�����״̬
         *
         * @type {boolean}
         */
        disabled: false,

        /**
         * ���ÿ�������
         *
         * @protected
         * @param {Object} options ������
         * @return {Object} �ϲ����º��������
         */
        setOptions: function (options) {
            if (!options) {
                return this.options;
            }

            var TO           = T.object;
            var thisOptions  = this.options = TO.clone(this.options);
            var eventNameReg = /^on[A-Z]/;
            var me           = this;
            var extend       = TO.extend;

            this.srcOptions = options;

            TO.each(options, function (val, name) {

                // �����������е��¼�
                if (eventNameReg.test(name) && typeof val === 'function') {

                    // �Ƴ�onǰ׺����ת����3���ַ�ΪСд���õ��¼�����
                    var type = name.charAt(2).toLowerCase() + name.substr(3);
                    me.on(type, val);

                    delete options[name];
                }
                else if (name in thisOptions) {

                    // ����ʵ����������ܣ�ֻ����һ�㣬�ǵݹ鴦��
                    thisOptions[name] = TO.isPlain(val)
                        ? extend(thisOptions[name] || {}, val)
                        : val;
                }
            });

            return thisOptions;
        },

        /**
         * ��ʵ�������� this
         *
         * @protected
         * @param {(Array.<string> | string)} events �෽��������
         */
        bindEvents: function (events) {
            var me = this;

            if (!events || !events.length) {
                return;
            }

            if (typeof events === 'string') {
                events = events.split(/\s*,\s*/);
            }

            T.each(
                events,
                function (name, fn) {
                    fn = name && me[name];
                    if (fn) {
                        me[name] = function () {
                            return fn.apply(me, arguments);
                        };
                    }
                }
            );
        },


        /**
         * �ؼ���ʼ��
         *
         * @abstract
         * @protected
         */
        init: function () {
            throw new Error('not implement init');
        },


        /**
         * ��Ⱦ�ؼ�
         *
         * @abstract
         * @protected
         * @return {module:Control} ��ǰʵ��
         */
        render: function () {
            throw new Error('not implement render');
        },

        /**
         * ���ؼ���ӵ�ҳ���ĳ��Ԫ����
         *
         * @public
         * @param {HTMLElement} wrap ����ӵ���ҳ��Ԫ��
         */
        appendTo: function (wrap) {
            this.main = wrap || this.main;
            this.render();
        },

        /**
         * ͨ�� className ���ҿؼ������ڵ�Ԫ��
         *
         * @public
         * @see baidu.dom.q
         * @param {string} className Ԫ�ص�class��ֻ��ָ����һ��class��
         * ���Ϊ���ַ������ߴ��հ׵��ַ��������ؿ����顣
         * @param {?string=} tagName Ҫ���Ƶı�ǩ����Ĭ�ϲ�����
         * @return {Array} ��ȡ��Ԫ�ؼ��ϣ����Ҳ�����className��������ʱ���ؿ�����
         */
        query: function (className, tagName) {
            return T.q(className, this.main, tagName);
        },

        /**
         * ���ÿؼ�״̬Ϊ����
         *
         * @public
         * @fires module:Control#disable
         */
        disable: function () {
            this.disabled = true;

            /**
             * @event module:Control#disable
             */
            this.fire('disable');
        },

        /**
         * ���ÿؼ�״̬Ϊ����
         *
         * @public
         * @fires module:Control#enable
         */
        enable: function () {
            this.disabled = false;

            /**
             * @event module:Control#enable
             */
            this.fire('enable');
        },

        /**
         * ��ȡ�ؼ�����״̬
         *
         * @public
         * @return {boolean} �ؼ��Ŀ���״ֵ̬
         */
        isDisabled: function () {
            return this.disabled;
        },


        /**
         * ����ӿؼ�
         *
         * @public
         * @param {module:Control} control �ؼ�ʵ��
         * @param {string} name �ӿؼ���
         */
        addChild: function (control, name) {
            var children = this.children;

            name = name || control.childName;

            if (name) {
                children[nane] = control;
            }

            children.push(control);
        },

        /**
         * �Ƴ��ӿؼ�
         *
         * @public
         * @param {module:Control} control �ӿؼ�ʵ��
         */
        removeChild: function (control) {
            T.object.each(
                this.children,
                function (child, name) {
                    if (child === control) {
                        delete this[name];
                    }
                }
            );
        },

        /**
         * ��ȡ�ӿؼ�
         *
         * @public
         * @param {string} name �ӿؼ���
         * @return {module:Control} ��ȡ�����ӿؼ�
         */
        getChild: function (name) {
            return this.children[name];
        },

        /**
         * ������ʼ���ӿؼ�
         *
         * @public
         * @param {HTMLElement} wrap ����DOMԪ��
         */
        initChildren: function (/* wrap */) {
            throw new Error('not implement initChildren');
        },

        /**
         * ����¼���
         *
         * @public
         * @param {string=} type �¼�����
         * @param {Function} listner Ҫ��Ӱ󶨵ļ�����
         */
        on: function (type, listner) {
            if (!T.isString(type)) {
                listner = type;
                type = '*';
            }

            var listners = this._listners[type] || [];

            if (indexOf(listners, listner) < 0) {
                listner.$type = type;
                listners.push(listner);
            }

            this._listners[type] = listners;

            return this;
        },

        /**
         * ����¼���
         *
         * @public
         * @param {string=} type �¼�����
         * @param {Function=} listner Ҫ����󶨵ļ�����
         */
        un: function (type, listner) {
            if (!T.isString(type)) {
                listner = type;
                type = '*';
            }

            var listners = this._listners[type];

            if (listners) {
                if (listner) {
                    var index = indexOf(listners, listner);

                    if (~index) {
                        delete listners[index];
                    }
                }
                else {
                    listners.length = 0;
                    delete this._listners[type];
                }
            }

            return this;
        },

        /**
         * ����ָ���¼�
         *
         * @public
         * @param {string} type �¼�����
         * @param {Object} args ͸�����¼����ݶ���
         */
        fire: function (type, args) {
            var listners = this._listners[type];

            if (listners) {
                T.array.each(
                    listners,
                    function (listner) {

                        args = args || {};
                        args.type = type;

                        listner.call(this, args);

                    },
                    this
                );
            }

            if (type !== '*') {
                this.fire('*', args);
            }

            return this;
        },

        /**
         * ���ٿؼ�
         *
         * @public
         * @fires module:Control#dispose
         */
        dispose: function () {

            /**
             * @event module:Control#dispose
             */
            this.fire('dispose');

            var child;
            while ((child = this.children.pop())) {
                child.dispose();
            }

            for (var type in this._listners) {
                this.un(type);
            }
        }

    };

    return Control;
});
