function compile(el, vm) {
    compileNode(el, vm);

    el.hasChildNodes() ? compileNodeList(el.childNodes, vm) : null;
}

/**
 * 编译元素Element，或者编译文本TextNode
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
function compileNode(node, vm) {
	if(node.nodeType === 1){
		return compileElement(node, vm);
	}else if(node.nodeType === 3){
		return compileTextNode(node, vm);
	}else{
		return null;
	}
}

function compileElement(node, vm){
	//TODOs
	return;
}

function compileTextNode(node, vm){
	var tokens = parseText(node.wholeText);

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		processTextToken(token);

		vm._bindDir(token, node);
	}
}

/**
 * 处理一段简单的文本标记(token),并且为其添加上descriptor属性，这对于创建指令有重要的作用
 *               - {String} name
 *               - {String} def
 *               - {Boolean} expression   
 * @return {[type]} [description]
 */
function processTextToken(token) {

	token.descriptor = {
		expression: token.value,
		name:'text',
		def: publicDirectives['text']
	};
}

function compileNodeList(nodeList, vm) {
	for (var i = 0; i < nodeList.length; i++) {
		var childNode = nodeList[i];
		compileNode(childNode, vm);

		childNode.hasChildNodes() ? compileNodeList(childNode.childNodes, vm) : null;
	}
}
