/*!
 * pangu.js
 * --------
 * @version: 3.2.1
 * @homepage: https://github.com/vinta/pangu.js
 * @license: MIT
 * @author: Vinta Chen <vinta.chen@gmail.com> (https://github.com/vinta)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pangu", [], factory);
	else if(typeof exports === 'object')
		exports["pangu"] = factory();
	else
		root["pangu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pangu = __webpack_require__(1).Pangu;
	
	// https://developer.mozilla.org/en/docs/Web/API/Node/nodeType
	var COMMENT_NODE_TYPE = 8;
	
	var BrowserPangu = function (_Pangu) {
	  _inherits(BrowserPangu, _Pangu);
	
	  function BrowserPangu() {
	    _classCallCheck(this, BrowserPangu);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BrowserPangu).call(this));
	
	    _this.topTags = /^(html|head|body|#document)$/i;
	    _this.ignoreTags = /^(code|pre|textarea)$/i;
	    _this.spaceSensitiveTags = /^(a|del|pre|s|strike|u)$/i;
	    _this.spaceLikeTags = /^(br|hr|i|img|pangu)$/i;
	    _this.blockTags = /^(div|h1|h2|h3|h4|h5|h6|p)$/i;
	
	    // TODO
	    // this.ignoreClasses
	    // this.ignoreAttributes
	    return _this;
	  }
	
	  _createClass(BrowserPangu, [{
	    key: 'canIgnoreNode',
	    value: function canIgnoreNode(node) {
	      var parentNode = node.parentNode;
	
	      while (parentNode && parentNode.nodeName && parentNode.nodeName.search(this.topTags) === -1) {
	        if (parentNode.nodeName.search(this.ignoreTags) >= 0 || parentNode.isContentEditable || parentNode.getAttribute('g_editable') === 'true') {
	          return true;
	        }
	
	        parentNode = parentNode.parentNode;
	      }
	
	      return false;
	    }
	  }, {
	    key: 'isFirstTextChild',
	    value: function isFirstTextChild(parentNode, targetNode) {
	      var childNodes = parentNode.childNodes;
	
	      // ???????????????????????? text ??? node
	      for (var i = 0; i < childNodes.length; i++) {
	        var childNode = childNodes[i];
	        if (childNode.nodeType !== COMMENT_NODE_TYPE && childNode.textContent) {
	          return childNode === targetNode;
	        }
	      }
	
	      return false;
	    }
	  }, {
	    key: 'isLastTextChild',
	    value: function isLastTextChild(parentNode, targetNode) {
	      var childNodes = parentNode.childNodes;
	
	      // ?????????????????????????????? text ??? node
	      for (var i = childNodes.length - 1; i > -1; i--) {
	        var childNode = childNodes[i];
	        if (childNode.nodeType !== COMMENT_NODE_TYPE && childNode.textContent) {
	          return childNode === targetNode;
	        }
	      }
	
	      return false;
	    }
	  }, {
	    key: 'spacingNodeByXPath',
	    value: function spacingNodeByXPath(xPathQuery, contextNode) {
	      // ?????? xPathQuery ????????? text() ????????????????????? nodes ?????? text ????????? DOM element
	      // snapshotLength ????????? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ??????
	      // https://developer.mozilla.org/en-US/docs/DOM/document.evaluate
	      // https://developer.mozilla.org/en-US/docs/Web/API/XPathResult
	      var textNodes = document.evaluate(xPathQuery, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	      var currentTextNode = void 0;
	      var nextTextNode = void 0;
	
	      // ????????????????????????????????????????????????????????????
	      for (var i = textNodes.snapshotLength - 1; i > -1; --i) {
	        currentTextNode = textNodes.snapshotItem(i);
	
	        if (this.canIgnoreNode(currentTextNode)) {
	          nextTextNode = currentTextNode;
	          continue;
	        }
	
	        var newText = this.spacing(currentTextNode.data);
	        if (currentTextNode.data !== newText) {
	          currentTextNode.data = newText;
	        }
	
	        // ??????????????? <tag> ????????????
	        if (nextTextNode) {
	          // TODO
	          // ????????????????????????????????????????????? node ????????? <br>
	          // ???????????????????????????????????????
	          if (currentTextNode.nextSibling && currentTextNode.nextSibling.nodeName.search(this.spaceLikeTags) >= 0) {
	            nextTextNode = currentTextNode;
	            continue;
	          }
	
	          // currentTextNode ?????????????????? + nextTextNode ???????????????
	          var testText = currentTextNode.data.toString().substr(-1) + nextTextNode.data.toString().substr(0, 1);
	          var testNewText = this.spacing(testText);
	          if (testNewText !== testText) {
	            // ????????? nextTextNode ??? parent node
	            // ???????????? spaceSensitiveTags
	            // ?????? nextTextNode ?????????????????? text child
	            // ????????????????????? nextTextNode ?????????
	            var nextNode = nextTextNode;
	            while (nextNode.parentNode && nextNode.nodeName.search(this.spaceSensitiveTags) === -1 && this.isFirstTextChild(nextNode.parentNode, nextNode)) {
	              nextNode = nextNode.parentNode;
	            }
	
	            var currentNode = currentTextNode;
	            while (currentNode.parentNode && currentNode.nodeName.search(this.spaceSensitiveTags) === -1 && this.isLastTextChild(currentNode.parentNode, currentNode)) {
	              currentNode = currentNode.parentNode;
	            }
	
	            if (currentNode.nextSibling) {
	              if (currentNode.nextSibling.nodeName.search(this.spaceLikeTags) >= 0) {
	                nextTextNode = currentTextNode;
	                continue;
	              }
	            }
	
	            if (currentNode.nodeName.search(this.blockTags) === -1) {
	              if (nextNode.nodeName.search(this.spaceSensitiveTags) === -1) {
	                if (nextNode.nodeName.search(this.ignoreTags) === -1 && nextNode.nodeName.search(this.blockTags) === -1) {
	                  if (nextTextNode.previousSibling) {
	                    if (nextTextNode.previousSibling.nodeName.search(this.spaceLikeTags) === -1) {
	                      nextTextNode.data = ' ' + nextTextNode.data;
	                    }
	                  } else {
	                    // dirty hack
	                    if (!this.canIgnoreNode(nextTextNode)) {
	                      nextTextNode.data = ' ' + nextTextNode.data;
	                    }
	                  }
	                }
	              } else if (currentNode.nodeName.search(this.spaceSensitiveTags) === -1) {
	                currentTextNode.data = currentTextNode.data + ' ';
	              } else {
	                var panguSpace = document.createElement('pangu');
	                panguSpace.innerHTML = ' ';
	
	                // ????????????????????????
	                if (nextNode.previousSibling) {
	                  if (nextNode.previousSibling.nodeName.search(this.spaceLikeTags) === -1) {
	                    nextNode.parentNode.insertBefore(panguSpace, nextNode);
	                  }
	                } else {
	                  nextNode.parentNode.insertBefore(panguSpace, nextNode);
	                }
	
	                // TODO
	                // ????????????????????????????????????????????? <li>?????????????????????
	                // ???????????????????????????????????????????????????
	                if (!panguSpace.previousElementSibling) {
	                  if (panguSpace.parentNode) {
	                    panguSpace.parentNode.removeChild(panguSpace);
	                  }
	                }
	              }
	            }
	          }
	        }
	
	        nextTextNode = currentTextNode;
	      }
	    }
	  }, {
	    key: 'spacingNode',
	    value: function spacingNode(contextNode) {
	      var xPathQuery = './/*/text()[normalize-space(.)]';
	      this.spacingNodeByXPath(xPathQuery, contextNode);
	    }
	  }, {
	    key: 'spacingElementById',
	    value: function spacingElementById(idName) {
	      var xPathQuery = 'id("' + idName + '")//text()';
	      this.spacingNodeByXPath(xPathQuery, document);
	    }
	  }, {
	    key: 'spacingElementByClassName',
	    value: function spacingElementByClassName(className) {
	      var xPathQuery = '//*[contains(concat(" ", normalize-space(@class), " "), "' + className + '")]//text()';
	      this.spacingNodeByXPath(xPathQuery, document);
	    }
	  }, {
	    key: 'spacingElementByTagName',
	    value: function spacingElementByTagName(tagName) {
	      var xPathQuery = '//' + tagName + '//text()';
	      this.spacingNodeByXPath(xPathQuery, document);
	    }
	  }, {
	    key: 'spacingPageTitle',
	    value: function spacingPageTitle() {
	      var xPathQuery = '/html/head/title/text()';
	      this.spacingNodeByXPath(xPathQuery, document);
	    }
	  }, {
	    key: 'spacingPageBody',
	    value: function spacingPageBody() {
	      // // >> ?????????????????????
	      // . >> ????????????
	      // .. >> ?????????
	      // [] >> ??????
	      // text() >> ?????????????????????????????? hello ?????? <tag>hello</tag>
	      //
	      // [@contenteditable]
	      // ?????? contenteditable ???????????????
	      //
	      // normalize-space(.)
	      // ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
	      // https://developer.mozilla.org/en-US/docs/XPath/Functions/normalize-space
	      //
	      // name(..)
	      // ??????????????????
	      // https://developer.mozilla.org/en-US/docs/XPath/Functions/name
	      //
	      // translate(string, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz")
	      // ??? string ???????????????????????? XML ??? case-sensitive ???
	      // https://developer.mozilla.org/en-US/docs/XPath/Functions/translate
	      //
	      // 1. ?????? <title>
	      // 2. ?????? <body> ???????????????
	      // 3. ?????? contentEditable ?????????
	      // 4. ??????????????????????????? <script> ??? <style>
	      //
	      // ?????????????????? query ???????????????????????? text ?????????
	      var xPathQuery = '/html/body//*/text()[normalize-space(.)]';
	      var _arr = ['script', 'style', 'textarea'];
	      for (var _i = 0; _i < _arr.length; _i++) {
	        var tag = _arr[_i];
	        // ?????????????????? tag ???????????????????????? tag
	        // ????????????????????? .. ????????????
	        // ex: [translate(name(..), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz") != "script"]
	        xPathQuery += '[translate(name(..),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")!="' + tag + '"]';
	      }
	      this.spacingNodeByXPath(xPathQuery, document);
	    }
	
	    // TODO: ?????? callback ??? promise
	
	  }, {
	    key: 'spacingPage',
	    value: function spacingPage() {
	      this.spacingPageTitle();
	      this.spacingPageBody();
	    }
	  }]);
	
	  return BrowserPangu;
	}(Pangu);
	
	var pangu = new BrowserPangu();
	
	exports = module.exports = pangu;
	exports.Pangu = BrowserPangu;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// CJK is short for Chinese, Japanese and Korean.
	//
	// The constant cjk contains following Unicode blocks:
	// 	\u2e80-\u2eff CJK Radicals Supplement
	// 	\u2f00-\u2fdf Kangxi Radicals
	// 	\u3040-\u309f Hiragana
	// 	\u30a0-\u30ff Katakana
	// 	\u3100-\u312f Bopomofo
	// 	\u3200-\u32ff Enclosed CJK Letters and Months
	// 	\u3400-\u4dbf CJK Unified Ideographs Extension A
	// 	\u4e00-\u9fff CJK Unified Ideographs
	// 	\uf900-\ufaff CJK Compatibility Ideographs
	//
	// For more information about Unicode blocks, see
	// 	http://unicode-table.com/en/
	//  https://github.com/vinta/pangu
	
	// ANS is short for Alphabets, Numbers and Symbols (`~!@#$%^&*()-_=+[]{}\|;:'",<.>/?).
	//
	// CAUTION: those ANS in following constants do not contain all symbols above.
	
	// cjkQuote >> ??? Go ??????????????? '
	// quoteCJK >> ??? Go ??????????????? '
	var cjkQuote = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(["])/g;
	var quoteCJK = /(["])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	var fixQuote = /(["']+)(\s*)(.+?)(\s*)(["']+)/g;
	var fixSingleQuote = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])( )(')([A-Za-z])/g;
	
	var hashANSCJKhash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#)([A-Za-z0-9\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)(#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	var cjkHash = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])(#([^ ]))/g;
	var hashCJK = /(([^ ])#)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	
	var cjkOperatorANS = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\+\-\*\/=&\\|<>])([A-Za-z0-9])/g;
	var ansOperatorCJK = /([A-Za-z0-9])([\+\-\*\/=&\\|<>])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	
	var cjkBracketCJK = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c]+(.*?)[\)\]\}>\u201d]+)([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	var cjkBracket = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([\(\[\{<\u201c>])/g;
	var bracketCJK = /([\)\]\}>\u201d<])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	var fixBracket = /([\(\[\{<\u201c]+)(\s*)(.+?)(\s*)([\)\]\}>\u201d]+)/;
	
	var fixSymbol = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([~!;:,\.\?\u2026])([A-Za-z0-9])/g;
	
	var cjkANS = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])([A-Za-z0-9`\$%\^&\*\-=\+\\\|/@\u00a1-\u00ff\u2022\u2027\u2150-\u218f])/g;
	var ansCJK = /([A-Za-z0-9`~\$%\^&\*\-=\+\\\|/!;:,\.\?\u00a1-\u00ff\u2022\u2026\u2027\u2150-\u218f])([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g;
	
	var Pangu = function () {
	  function Pangu() {
	    _classCallCheck(this, Pangu);
	  }
	
	  _createClass(Pangu, [{
	    key: 'spacing',
	    value: function spacing(text) {
	      var newText = text;
	
	      newText = newText.replace(cjkQuote, '$1 $2');
	      newText = newText.replace(quoteCJK, '$1 $2');
	      newText = newText.replace(fixQuote, '$1$3$5');
	      newText = newText.replace(fixSingleQuote, '$1$3$4');
	
	      newText = newText.replace(hashANSCJKhash, '$1 $2$3$4 $5');
	      newText = newText.replace(cjkHash, '$1 $2');
	      newText = newText.replace(hashCJK, '$1 $3');
	
	      newText = newText.replace(cjkOperatorANS, '$1 $2 $3');
	      newText = newText.replace(ansOperatorCJK, '$1 $2 $3');
	
	      var oldText = newText;
	      var tmpText = newText.replace(cjkBracketCJK, '$1 $2 $4');
	      newText = tmpText;
	      if (oldText === tmpText) {
	        newText = newText.replace(cjkBracket, '$1 $2');
	        newText = newText.replace(bracketCJK, '$1 $2');
	      }
	      newText = newText.replace(fixBracket, '$1$3$5');
	
	      newText = newText.replace(fixSymbol, '$1$2 $3');
	
	      newText = newText.replace(cjkANS, '$1 $2');
	      newText = newText.replace(ansCJK, '$1 $2');
	
	      return newText;
	    }
	  }, {
	    key: 'spacingText',
	    value: function spacingText(text) {
	      var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
	      try {
	        var newText = this.spacing(text);
	        callback(null, newText);
	      } catch (err) {
	        callback(err);
	      }
	    }
	  }]);
	
	  return Pangu;
	}();
	
	var pangu = new Pangu();
	
	exports = module.exports = pangu;
	exports.Pangu = Pangu;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pangu.js.map