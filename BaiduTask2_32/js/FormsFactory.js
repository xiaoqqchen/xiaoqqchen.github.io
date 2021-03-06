/**
 * Created by PC on 2016/4/17.
 * 表单工厂
 */
var FormFactory = function(wapperId){
    this.wapper = document.getElementById(wapperId);
};

//创建表单
FormFactory.prototype.createForm = function(config){
    if(config.type === 'button'){
        return this.createBtn(config);
    }else{
        return this.createInput(config);
    }
};

/**
 * 创建Input
 * @param config
 * 示例：
 * {
        id : "name",
        label : "姓名",
        type:"input",
        validators: ['isNotEmpty', 'isValidName'], //验证器
        rule : "必填，长度为4~16个字符",
        success : "姓名格式输入正确"
    }
 * @returns {ValControl}
 */
FormFactory.prototype.createInput = function(config){
    var divGroup = document.createElement('DIV');
    divGroup.className = 'form-group';

    var label = document.createElement('LABEL');
    label.innerText = config.label;
    label.htmlFor = config.id;
    divGroup.appendChild(label);

    var input = document.createElement('INPUT');
    input.id = config.id;
    input.type = config.type;
    input.dataset.rule = config.rule;
    input.dataset.success = config.success;
    input.dataset.name = config.label;
    if(config.compare){
        input.dataset.compare = config.compare;
    }
    var p = document.createElement('P');
    p.className = 'info';

    var inputGroup = document.createElement('DIV');
    inputGroup.className = 'input-group';
    inputGroup.appendChild(input);
    inputGroup.appendChild(p);

    divGroup.appendChild(inputGroup);
    this.wapper.appendChild(divGroup);

    var valCtl = new ValControl(config.id);
    valCtl.validators = config.validators;

    return valCtl;
};

/**
 * 创建Button
 * @param config
 * submit:{
        id:"validate",
        value : "验证",
        type:"button",
        fail:'提交失败',
        success:'提交成功'
    }
 */
FormFactory.prototype.createBtn = function(config){
    var divGroup = document.createElement('DIV');
    divGroup.className = 'form-group';

    var btn = document.createElement('INPUT');
    btn.id = config.id;
    btn.type = config.type;
    btn.value = config.value;
    btn.dataset.fail = config.fail;
    btn.dataset.success = config.success;

    divGroup.appendChild(btn);

    this.wapper.appendChild(divGroup);

    return btn;
};