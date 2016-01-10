
/*
* WidowFix v1.0.0 Copyright (c) 2016 AJ Savino
* https://github.com/koga73/WidowFix
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
var WidowFix = (function(){
	var _instance = null;
	
	var _consts = {
		WIDOW_REGEX:/\S+[\x20|\x2D]\S+\s*(<|$)/gi,
		STD_TAGS:["p", "span", "a", "h1", "h2", "h3", "h4", "h5", "h6"],
		PHRASES:[/*"hello world"*/]
	};
	
	var _methods = {
		runElements:function(elements, phrases){
			if (typeof elements === typeof undefined){
				elements = _methods._getElementsByTags(_consts.STD_TAGS);
			}
			if (typeof phrases === typeof undefined){
				phrases = _consts.PHRASES;
			}
			
			//Filter out data-widowfix='false' and nested elements
			var elementsLen = elements.length;
			for (var i = 0; i < elementsLen; i++){
				var element = elements[i];
				if (element.getAttribute("data-widowfix") == "false"){
					elements.splice(i, 1);
					elementsLen--;
					i--;
				}
				for (var j = 0; j < elementsLen; j++){
					if (element == elements[j]){
						continue;
					}
					if (_methods._elementContains(element, elements[j])){
						elements.splice(j, 1);
						elementsLen--;
						j--;
					}
				}
			}
			
			//Add non-breaking spaces and hyphens
			for (var i = 0; i < elementsLen; i++){
				var element = elements[i];
				element.innerHTML = _instance.runString(element.innerHTML, phrases);
			}
		},
		
		runString:function(inString, phrases){
			if (typeof phrases === typeof undefined){
				phrases = _consts.PHRASES;
			}
			//Phrases first
			var phrasesLen = phrases.length;
			for (var i = 0; i < phrasesLen; i++){
				inString = _methods._fix(inString, new RegExp(phrases[i], "i"));
			}
			//Remaining widows
			inString = _methods._fix(inString, _consts.WIDOW_REGEX);
			return inString;
		},
		
		_fix:function(inString, regex){
			if (typeof regex === typeof undefined){
				regex = _consts.WIDOW_REGEX;
			}
			while (match = regex.exec(inString)){
				var index = match.index;
				match = match[0];
				var matchLen = match.length;
				match = match.replace(/\x20/gi, "&nbsp;");
				match = match.replace(/\x2D/gi, "&#8209;"); //Non-breaking hyphen
				inString = inString.substr(0, index) + match + inString.substr(index + matchLen, inString.length - (index + matchLen));
			}
			return inString;
		},
		
		_getElementsByTags:function(tags, element){
			var elements = [];
			if (typeof tags === typeof undefined){
				return elements;
			}
			if (typeof element === typeof undefined){
				element = document;
			}
			var tagsLen = tags.length;
			for (var i = 0; i < tagsLen; i++){
				var tagElements = document.getElementsByTagName(tags[i]);
				if (tagElements.length){
					var tagElementsLen = tagElements.length;
					for (var j = 0; j < tagElementsLen; j++){
						elements = elements.concat(tagElements[j]);
					}
				}
			}
			return elements;
		},
		
		_elementContains:function(parent, child){
			if (parent.contains){
				return parent.contains(child);
			} else {
				return false;
			}
		}
	};
	
	_instance = {
		runElements:_methods.runElements,
		runString:_methods.runString
	};
	return _instance;
})();