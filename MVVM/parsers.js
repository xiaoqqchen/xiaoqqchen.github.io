/**
 * 解析模板文本为tokens的数组
 * @param  {[type]} text 
 * @return {Array<object> | null}
 *               - {String} type
 *               - {String} value
 *               - {Boolean} [html]
 *               - {Boolean} [oneTime]      
 */
function parseText(text) {
	var textReg = /{{((?:.|\n)+?)}}/g;

	var tokens = [];
	var match;
	while(match = textReg.exec(text)){
		var value = match[1];

		tokens.push({
			value:value
		})
	}

	return tokens;
}